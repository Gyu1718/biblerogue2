#!/usr/bin/env node
/*
  BibleRogue2 story data validator

  Usage:
    node tools/validate-story.js

  Purpose:
    Validate story node and ending data before merging story-only changes.
    This script does not modify files.
*/

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const STORY_PATH = path.join(ROOT, 'src', 'data', 'storyNodes.js');
const STORY_PATCH_PATHS = [
  path.join(ROOT, 'src', 'data', 'exodusStructurePatch.js'),
  path.join(ROOT, 'src', 'data', 'wildernessStructurePatch.js'),
  path.join(ROOT, 'src', 'data', 'jerichoStructurePatch.js')
];
const ENDINGS_PATH = path.join(ROOT, 'src', 'data', 'endings.js');
const ENDING_PATCH_PATHS = [
  path.join(ROOT, 'src', 'data', 'jerichoEndingsPatch.js')
];

const ALLOWED_EFFECTS = new Set([
  'trust',
  'fear',
  'community',
  'discernment',
  'memory',
  'time',
  'clues',
  'delay',
  'scatter'
]);

const ALLOWED_ENDING_RESOLVERS = new Set(['exodus', 'wilderness']);

const RESOLVER_ENDING_TARGETS = {
  exodus: ['true_exodus_deliverance', 'faithful_exodus_witness', 'wounded_exodus_witness'],
  wilderness: ['true_wilderness_daily_trust', 'faithful_wilderness_witness', 'wounded_wilderness_witness']
};

const EXTRA_START_NODE_IDS = ['wilderness_01_marah_thirst', 'jericho_01_jordan_edge'];

const REQUIRED_NODE_FIELDS = [
  'id',
  'chapter',
  'location',
  'bible',
  'title',
  'day',
  'place',
  'progress',
  'copy',
  'prompt',
  'choices'
];

const REQUIRED_ENDING_FIELDS = [
  'id',
  'type',
  'title',
  'bannerLeft',
  'bannerRight',
  'grade',
  'scripture',
  'reference',
  'description'
];

function createBrowserSandbox() {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  return sandbox;
}

function runBrowserDataFile(filePath, sandbox) {
  const source = fs.readFileSync(filePath, 'utf8');
  vm.runInContext(source, sandbox, { filename: filePath });
  return sandbox.window;
}

function runOptionalBrowserDataFile(filePath, sandbox) {
  if (!fs.existsSync(filePath)) return sandbox.window;
  return runBrowserDataFile(filePath, sandbox);
}

function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function addError(errors, location, message) {
  errors.push({ level: 'error', location, message });
}

function addWarning(warnings, location, message) {
  warnings.push({ level: 'warning', location, message });
}

function validateNodeShape(nodeKey, node, errors, warnings) {
  if (!isPlainObject(node)) {
    addError(errors, nodeKey, 'Node must be an object.');
    return;
  }

  REQUIRED_NODE_FIELDS.forEach((field) => {
    if (!(field in node)) addError(errors, nodeKey, `Missing required field: ${field}`);
  });

  if (node.id !== nodeKey) {
    addError(errors, nodeKey, `Node id must match object key. Found id: ${node.id}`);
  }

  ['chapter', 'location', 'bible', 'title', 'day', 'place', 'prompt'].forEach((field) => {
    if (typeof node[field] !== 'string' || node[field].trim() === '') {
      addError(errors, nodeKey, `${field} must be a non-empty string.`);
    }
  });

  if (!Array.isArray(node.copy) || node.copy.length === 0) {
    addError(errors, nodeKey, 'copy must be a non-empty array.');
  } else {
    node.copy.forEach((paragraph, index) => {
      if (typeof paragraph !== 'string' || paragraph.trim() === '') {
        addError(errors, `${nodeKey}.copy[${index}]`, 'copy paragraph must be a non-empty string.');
      }
    });

    if (node.copy.length > 5) {
      addWarning(warnings, nodeKey, `copy has ${node.copy.length} paragraphs. Consider keeping play text compact.`);
    }
  }

  if (!isPlainObject(node.progress)) {
    addError(errors, nodeKey, 'progress must be an object.');
  } else {
    const current = Number(node.progress.current);
    const total = Number(node.progress.total);
    if (!Number.isInteger(current) || current < 1) addError(errors, nodeKey, 'progress.current must be a positive integer.');
    if (!Number.isInteger(total) || total < 1) addError(errors, nodeKey, 'progress.total must be a positive integer.');
    if (Number.isInteger(current) && Number.isInteger(total) && current > total) addError(errors, nodeKey, 'progress.current cannot be greater than progress.total.');
  }

  if (!Array.isArray(node.choices) || node.choices.length === 0) {
    addError(errors, nodeKey, 'choices must be a non-empty array.');
  } else if (node.choices.length === 1) {
    addWarning(warnings, nodeKey, 'Only one choice exists. This may feel less interactive unless intentional.');
  }
}

function validateChoice(nodeKey, choice, index, allNodeIds, allEndingIds, errors, warnings) {
  const location = `${nodeKey}.choices[${index}]`;

  if (!isPlainObject(choice)) {
    addError(errors, location, 'Choice must be an object.');
    return;
  }

  if (typeof choice.key !== 'string' || choice.key.trim() === '') addError(errors, location, 'Choice key must be a non-empty string.');
  if (typeof choice.text !== 'string' || choice.text.trim() === '') addError(errors, location, 'Choice text must be a non-empty string.');

  if (!isPlainObject(choice.effects)) {
    addWarning(warnings, location, 'effects is missing or not an object. Use effects: {} when no effect is intended.');
  } else {
    Object.entries(choice.effects).forEach(([effectKey, effectValue]) => {
      if (!ALLOWED_EFFECTS.has(effectKey)) addError(errors, location, `Unknown effect key: ${effectKey}`);
      if (typeof effectValue !== 'number' || !Number.isFinite(effectValue)) addError(errors, location, `Effect value for ${effectKey} must be a finite number.`);
    });
  }

  const routeCount = ['next', 'ending', 'endingResolver'].filter((field) => choice[field]).length;
  if (routeCount === 0) addError(errors, location, 'Choice must have one route: next, ending, or endingResolver.');
  if (routeCount > 1) addWarning(warnings, location, 'Choice has multiple route fields. Confirm this is intentional.');

  if (choice.next && !allNodeIds.has(choice.next)) addError(errors, location, `next target does not exist: ${choice.next}`);
  if (choice.ending && !allEndingIds.has(choice.ending)) addError(errors, location, `ending target does not exist: ${choice.ending}`);

  if (choice.endingResolver) {
    if (!ALLOWED_ENDING_RESOLVERS.has(choice.endingResolver)) {
      addError(errors, location, `Unknown endingResolver: ${choice.endingResolver}`);
    } else {
      (RESOLVER_ENDING_TARGETS[choice.endingResolver] || []).forEach((endingId) => {
        if (!allEndingIds.has(endingId)) addError(errors, location, `endingResolver ${choice.endingResolver} can resolve to missing ending: ${endingId}`);
      });
    }
  }

  if (!Array.isArray(choice.companions)) {
    addWarning(warnings, location, 'companions is missing or not an array.');
  } else if (choice.companions.length === 0) {
    addWarning(warnings, location, 'companions is empty.');
  } else {
    choice.companions.forEach((line, companionIndex) => {
      const companionLocation = `${location}.companions[${companionIndex}]`;
      if (!isPlainObject(line)) {
        addError(errors, companionLocation, 'Companion line must be an object.');
        return;
      }
      ['name', 'role', 'portrait', 'text'].forEach((field) => {
        if (typeof line[field] !== 'string' || line[field].trim() === '') addError(errors, companionLocation, `${field} must be a non-empty string.`);
      });
    });
  }
}

function validateChoiceKeys(nodeKey, choices, errors) {
  if (!Array.isArray(choices)) return;
  const seen = new Set();
  choices.forEach((choice, index) => {
    if (!choice || typeof choice.key !== 'string') return;
    if (seen.has(choice.key)) addError(errors, `${nodeKey}.choices[${index}]`, `Duplicate choice key in this node: ${choice.key}`);
    seen.add(choice.key);
  });
}

function validateEndingShape(endingKey, ending, errors, warnings) {
  if (!isPlainObject(ending)) {
    addError(errors, endingKey, 'Ending must be an object.');
    return;
  }

  REQUIRED_ENDING_FIELDS.forEach((field) => {
    if (!(field in ending)) addError(errors, endingKey, `Missing required field: ${field}`);
  });

  if (ending.id !== endingKey) addError(errors, endingKey, `Ending id must match object key. Found id: ${ending.id}`);

  ['id', 'type', 'title', 'bannerLeft', 'bannerRight', 'grade', 'scripture', 'reference'].forEach((field) => {
    if (typeof ending[field] !== 'string' || ending[field].trim() === '') addError(errors, endingKey, `${field} must be a non-empty string.`);
  });

  if (!Array.isArray(ending.description) || ending.description.length === 0) addError(errors, endingKey, 'description must be a non-empty array.');
  if (!['true', 'good', 'mixed', 'bad'].includes(ending.type)) addWarning(warnings, endingKey, `Unexpected ending type: ${ending.type}`);
}

function validateProgressSequence(storyNodes, warnings) {
  const nodes = Object.values(storyNodes).filter((node) => node && node.progress);
  const totalsByChapter = new Map();
  nodes.forEach((node) => {
    const chapter = node.chapter || 'unknown';
    const total = Number(node.progress.total);
    if (!totalsByChapter.has(chapter)) totalsByChapter.set(chapter, new Set());
    if (Number.isFinite(total)) totalsByChapter.get(chapter).add(total);
  });
  totalsByChapter.forEach((totals, chapter) => {
    if (totals.size > 1) addWarning(warnings, `progress:${chapter}`, `Multiple progress totals found: ${Array.from(totals).join(', ')}`);
  });
}

function traceReachableGraph(storyNodes, startNodeId) {
  const reachableNodes = new Set();
  const reachableEndings = new Set();
  const queue = [startNodeId];

  while (queue.length) {
    const nodeId = queue.shift();
    if (!nodeId || reachableNodes.has(nodeId)) continue;
    const node = storyNodes[nodeId];
    if (!node) continue;
    reachableNodes.add(nodeId);
    (node.choices || []).forEach((choice) => {
      if (choice.next && !reachableNodes.has(choice.next)) queue.push(choice.next);
      if (choice.ending) reachableEndings.add(choice.ending);
      if (choice.endingResolver) (RESOLVER_ENDING_TARGETS[choice.endingResolver] || []).forEach((endingId) => reachableEndings.add(endingId));
    });
  }

  return { reachableNodes, reachableEndings };
}

function validateReachability(storyNodes, endings, startNodeIds, warnings) {
  const allReachableNodes = new Set();
  const allReachableEndings = new Set();

  startNodeIds.filter((id) => id && storyNodes[id]).forEach((startNodeId) => {
    const { reachableNodes, reachableEndings } = traceReachableGraph(storyNodes, startNodeId);
    reachableNodes.forEach((id) => allReachableNodes.add(id));
    reachableEndings.forEach((id) => allReachableEndings.add(id));
  });

  Object.keys(storyNodes).forEach((nodeId) => {
    if (!allReachableNodes.has(nodeId)) addWarning(warnings, nodeId, 'Node is not reachable from registered start nodes.');
  });

  Object.keys(endings).forEach((endingId) => {
    if (!allReachableEndings.has(endingId)) addWarning(warnings, endingId, 'Ending is not reachable from registered start nodes.');
  });

  if (allReachableEndings.size === 0) addWarning(warnings, 'story graph', 'No reachable endings were found.');
}

function run() {
  const storySandbox = createBrowserSandbox();
  const storyWindow = runBrowserDataFile(STORY_PATH, storySandbox);
  STORY_PATCH_PATHS.forEach((patchPath) => runOptionalBrowserDataFile(patchPath, storySandbox));

  const endingSandbox = createBrowserSandbox();
  const endingWindow = runBrowserDataFile(ENDINGS_PATH, endingSandbox);
  ENDING_PATCH_PATHS.forEach((patchPath) => runOptionalBrowserDataFile(patchPath, endingSandbox));

  const storyNodes = storyWindow.STORY_NODES;
  const storyStartNodeId = storyWindow.START_NODE_ID;
  const endings = endingWindow.STORY_ENDINGS;
  const registeredStartIds = [storyStartNodeId, storyWindow.WILDERNESS_START_NODE_ID, storyWindow.JERICHO_START_NODE_ID, ...EXTRA_START_NODE_IDS].filter(Boolean);

  const errors = [];
  const warnings = [];

  if (!isPlainObject(storyNodes)) addError(errors, 'STORY_NODES', 'STORY_NODES must be an object.');
  if (!isPlainObject(endings)) addError(errors, 'STORY_ENDINGS', 'STORY_ENDINGS must be an object.');

  if (errors.length === 0) {
    const allNodeIds = new Set(Object.keys(storyNodes));
    const allEndingIds = new Set(Object.keys(endings));

    if (!storyStartNodeId) addError(errors, 'START_NODE_ID', 'START_NODE_ID is missing.');
    else if (!allNodeIds.has(storyStartNodeId)) addError(errors, 'START_NODE_ID', `START_NODE_ID target does not exist: ${storyStartNodeId}`);

    registeredStartIds.forEach((startId) => {
      if (!allNodeIds.has(startId)) addError(errors, 'registered start node', `Registered start node does not exist: ${startId}`);
    });

    Object.entries(endings).forEach(([endingKey, ending]) => validateEndingShape(endingKey, ending, errors, warnings));

    Object.entries(storyNodes).forEach(([nodeKey, node]) => {
      validateNodeShape(nodeKey, node, errors, warnings);
      validateChoiceKeys(nodeKey, node.choices, errors);
      if (Array.isArray(node.choices)) node.choices.forEach((choice, index) => validateChoice(nodeKey, choice, index, allNodeIds, allEndingIds, errors, warnings));
    });

    validateProgressSequence(storyNodes, warnings);
    validateReachability(storyNodes, endings, registeredStartIds, warnings);
  }

  warnings.forEach((warning) => console.warn(`WARNING ${warning.location}: ${warning.message}`));
  errors.forEach((error) => console.error(`ERROR ${error.location}: ${error.message}`));

  const nodeCount = storyNodes ? Object.keys(storyNodes).length : 0;
  const endingCount = endings ? Object.keys(endings).length : 0;
  console.log(`\nValidated ${nodeCount} story nodes and ${endingCount} endings.`);
  console.log(`${errors.length} error(s), ${warnings.length} warning(s).`);

  if (errors.length > 0) process.exit(1);
}

try {
  run();
} catch (error) {
  console.error('ERROR validator: failed to load or execute story data.');
  console.error(error && error.stack ? error.stack : error);
  process.exit(1);
}
