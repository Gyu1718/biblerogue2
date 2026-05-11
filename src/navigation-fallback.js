// Navigation fallback for the branching prototype.
// This file intentionally runs after main.js and post-cleanup.js.
// It keeps the home -> play transition working even if another renderer throws while the prototype is changing quickly.

(function () {
  const START_NODE_ID = window.START_NODE_ID || 'exodus_01_slave_day';
  let nodeId = START_NODE_ID;
  let selectedChoiceIndex = 0;

  const state = {
    trust: 0,
    community: 0,
    discernment: 0,
    memory: 0,
    fear: 0,
    delay: 0,
    scatter: 0
  };

  function $(selector, root = document) {
    return root.querySelector(selector);
  }

  function $all(selector, root = document) {
    return Array.from(root.querySelectorAll(selector));
  }

  function setText(el, text) {
    if (el) el.textContent = text || '';
  }

  function show(screenName) {
    const target = document.getElementById(`${screenName}-screen`);
    if (!target) return;
    $all('.screen').forEach((screen) => screen.classList.toggle('screen-active', screen === target));
    document.body.dataset.screen = screenName;
  }

  function resetState() {
    Object.keys(state).forEach((key) => { state[key] = 0; });
    nodeId = START_NODE_ID;
    selectedChoiceIndex = 0;
  }

  function currentNode() {
    return window.STORY_NODES?.[nodeId] || window.STORY_NODES?.[START_NODE_ID] || null;
  }

  function currentChoice() {
    const node = currentNode();
    return node?.choices?.[selectedChoiceIndex] || node?.choices?.[0] || null;
  }

  function applyEffects(choice) {
    Object.entries(choice?.effects || {}).forEach(([key, value]) => {
      if (key in state) state[key] = Math.max(0, state[key] + value);
    });
  }

  function renderStats() {
    const play = document.getElementById('play-screen');
    if (!play) return;
    setText($('.play-stats span:nth-child(1)', play), `신뢰 ${state.trust}`);
    setText($('.play-stats span:nth-child(2)', play), `공동체 ${state.community}`);
    setText($('.play-stats span:nth-child(3)', play), `분별 ${state.discernment}`);
  }

  function renderDialogue(choice) {
    const right = $('.right-panel');
    if (!right) return;
    right.innerHTML = '';

    const panel = document.createElement('section');
    panel.className = 'companion-dialogue';
    panel.setAttribute('aria-label', '동행자 대화');

    const title = document.createElement('h3');
    title.textContent = '동행자';
    panel.appendChild(title);

    (choice?.companions || []).forEach((line) => {
      const item = document.createElement('article');
      item.className = 'companion-line';

      const portrait = document.createElement('div');
      portrait.className = `companion-portrait portrait ${line.portrait || 'p1'}`;

      const body = document.createElement('div');
      body.className = 'companion-line-body';

      const name = document.createElement('strong');
      name.textContent = line.name || '';
      const role = document.createElement('em');
      role.textContent = line.role || '';
      const text = document.createElement('p');
      text.textContent = line.text || '';

      body.append(name, role, text);
      item.append(portrait, body);
      panel.appendChild(item);
    });

    right.appendChild(panel);
  }

  function renderNode(node) {
    const play = document.getElementById('play-screen');
    if (!play || !node) return;

    selectedChoiceIndex = 0;
    setText($('.play-brand-text span', play), node.chapter);
    setText($('.scene-plaque strong', play), node.location);
    setText($('.scene-plaque span', play), node.bible);
    setText($('.narrative-panel h2', play), node.title);
    setText($('.day-panel', play), node.day);
    setText($('.location-panel', play), node.place);
    setText($('.story-progress strong', play), `${node.progress?.current || 1} / ${node.progress?.total || 12}`);

    const copy = $('.narrative-copy', play);
    if (copy) {
      copy.innerHTML = '';
      (node.copy || []).forEach((line, index, arr) => {
        if (index === arr.length - 1) copy.appendChild(document.createElement('hr'));
        const p = document.createElement('p');
        p.textContent = line;
        copy.appendChild(p);
      });
      const prompt = document.createElement('strong');
      prompt.textContent = node.prompt || '';
      copy.appendChild(prompt);
    }

    const list = $('.choice-list', play);
    if (list) {
      list.innerHTML = '';
      (node.choices || []).forEach((choice, index) => {
        const button = document.createElement('button');
        button.className = `choice${index === 0 ? ' active' : ''}`;
        button.type = 'button';
        button.dataset.choiceIndex = String(index);
        const icon = document.createElement('span');
        icon.textContent = choice.icon || '◇';
        button.appendChild(icon);
        button.append(document.createTextNode(` ${index + 1}  ${choice.text || ''}`));
        list.appendChild(button);
      });
    }

    renderStats();
    renderDialogue((node.choices || [])[0]);
  }

  function resolveEnding(choice) {
    if (choice?.ending) return choice.ending;
    if (choice?.endingResolver === 'exodus') {
      if (state.trust >= 4 && state.community >= 3 && state.memory >= 3) return 'true_exodus_deliverance';
      if (state.fear >= 4 || state.scatter >= 3 || state.delay >= 3) return 'wounded_exodus_witness';
      return 'faithful_exodus_witness';
    }
    return null;
  }

  function renderEnding(endingId) {
    const ending = window.STORY_ENDINGS?.[endingId] || window.STORY_ENDINGS?.true_exodus_deliverance;
    const screen = document.getElementById('ending-screen');
    if (!screen || !ending) return;

    setText($('.ending-panel h2', screen), ending.title);
    const banner = $all('.ending-banner span', screen);
    setText(banner[0], ending.bannerLeft);
    setText(banner[1], ending.bannerRight);

    const desc = $('.ending-desc', screen);
    if (desc) {
      desc.innerHTML = '';
      (ending.description || []).forEach((line) => {
        const p = document.createElement('p');
        p.textContent = line;
        desc.appendChild(p);
      });
    }

    const cards = $all('.ending-summary article', screen);
    const values = [
      ['✦', '신뢰의 걸음', String(state.trust)],
      ['◇', '공동체 돌봄', String(state.community)],
      ['◎', '기억과 분별', String(state.memory + state.discernment)],
      ['♕', '최종 평가', ending.grade || ending.title]
    ];
    cards.forEach((card, index) => {
      const data = values[index];
      if (!data) return;
      setText($('i', card), data[0]);
      setText($('span', card), data[1]);
      setText($('strong', card), data[2]);
    });

    setText($('.ending-scripture p', screen), ending.scripture);
    setText($('.ending-scripture span', screen), ending.reference);
    show('ending');
  }

  function startPlay() {
    resetState();
    renderNode(currentNode());
    show('play');
  }

  function next() {
    const choice = currentChoice();
    applyEffects(choice);
    const endingId = resolveEnding(choice);
    if (endingId) {
      renderEnding(endingId);
      return;
    }
    if (choice?.next && window.STORY_NODES?.[choice.next]) {
      nodeId = choice.next;
      renderNode(currentNode());
      show('play');
    }
  }

  window.__forceStartPlay = startPlay;
  window.__forceNextStory = next;

  function handleNavigationEvent(event) {
    const choiceButton = event.target.closest('.choice');
    if (choiceButton) {
      event.preventDefault();
      event.stopImmediatePropagation();
      selectedChoiceIndex = Number(choiceButton.dataset.choiceIndex || 0);
      $all('.choice').forEach((button) => button.classList.remove('active'));
      choiceButton.classList.add('active');
      renderDialogue(currentChoice());
      return;
    }

    const trigger = event.target.closest('[data-force-start], [data-go]');
    if (!trigger) return;

    if (trigger.dataset.forceStart === 'play' || trigger.dataset.go === 'play') {
      event.preventDefault();
      event.stopImmediatePropagation();
      startPlay();
      return;
    }

    if (trigger.dataset.go === 'next-play-scene') {
      event.preventDefault();
      event.stopImmediatePropagation();
      next();
      return;
    }

    if (trigger.dataset.go === 'home') {
      event.preventDefault();
      event.stopImmediatePropagation();
      resetState();
      show('home');
    }
  }

  ['pointerdown', 'mousedown', 'touchstart', 'click'].forEach((type) => {
    document.addEventListener(type, handleNavigationEvent, true);
  });
})();
