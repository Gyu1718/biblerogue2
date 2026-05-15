// Independent BGM runtime for BibleRogue2.
// This file does not touch story data, chapter routing, game save data, or responsive logic.

(function () {
  const AUDIO_SETTINGS_KEY = 'biblerogue2.audio.v1';
  const DEFAULT_SETTINGS = {
    version: 1,
    enabled: false,
    volume: 0.4
  };

  const HOME_PART_SCRIPTURES = {
    story: {
      quote: '여호와께서 너희를 위하여 싸우시리니 너희는 가만히 있을지니라',
      reference: '출애굽기 14:14'
    },
    'part-02': {
      quote: '순종이 제사보다 낫고 듣는 것이 숫양의 기름보다 나으니',
      reference: '사무엘상 15:22'
    },
    'part-03': {
      quote: '오직 정의를 물 같이, 공의를 마르지 않는 강 같이 흐르게 할지어다',
      reference: '아모스 5:24'
    },
    'part-04': {
      quote: '그렇게 하지 아니하실지라도 왕이여 우리가 왕의 신들을 섬기지도 아니하고',
      reference: '다니엘 3:18'
    },
    'part-05': {
      quote: '이는 우리 하나님의 긍휼로 인함이라 이로써 돋는 해가 위로부터 우리에게 임하여',
      reference: '누가복음 1:78'
    },
    'part-06': {
      quote: '땅 끝까지 이르러 내 증인이 되리라 하시니라',
      reference: '사도행전 1:8'
    }
  };

  let bgm = null;
  let settings = { ...DEFAULT_SETTINGS };
  let initialized = false;
  let currentHomeScripturePanel = 'story';

  function canUseStorage() {
    try {
      const testKey = `${AUDIO_SETTINGS_KEY}.test`;
      window.localStorage.setItem(testKey, '1');
      window.localStorage.removeItem(testKey);
      return true;
    } catch (error) {
      return false;
    }
  }

  function clampVolume(value) {
    const number = Number(value);
    if (!Number.isFinite(number)) return DEFAULT_SETTINGS.volume;
    return Math.max(0, Math.min(1, number));
  }

  function readAudioSettings() {
    if (!canUseStorage()) return { ...DEFAULT_SETTINGS };

    try {
      const raw = window.localStorage.getItem(AUDIO_SETTINGS_KEY);
      if (!raw) return { ...DEFAULT_SETTINGS };
      const parsed = JSON.parse(raw);
      if (!parsed || parsed.version !== 1) return { ...DEFAULT_SETTINGS };

      return {
        version: 1,
        enabled: Boolean(parsed.enabled),
        volume: clampVolume(parsed.volume)
      };
    } catch (error) {
      console.warn('Audio settings could not be read.', error);
      return { ...DEFAULT_SETTINGS };
    }
  }

  function writeAudioSettings() {
    if (!canUseStorage()) return;

    try {
      window.localStorage.setItem(AUDIO_SETTINGS_KEY, JSON.stringify(settings));
    } catch (error) {
      console.warn('Audio settings could not be written.', error);
    }
  }

  function ensureAudioElement() {
    if (bgm) return bgm;

    bgm = document.createElement('audio');
    bgm.id = 'bgm-audio';
    bgm.preload = 'none';
    bgm.loop = true;
    bgm.volume = settings.volume;
    bgm.dataset.audioRole = 'bgm';

    const mp3Source = document.createElement('source');
    mp3Source.src = 'assets/audio/bgm-main.mp3';
    mp3Source.type = 'audio/mpeg';
    bgm.appendChild(mp3Source);

    const oggSource = document.createElement('source');
    oggSource.src = 'assets/audio/bgm-main.ogg';
    oggSource.type = 'audio/ogg';
    bgm.appendChild(oggSource);

    bgm.addEventListener('error', () => {
      document.body.dataset.bgmStatus = 'missing';
      updateAudioUi('음원 필요');
    });

    document.body.appendChild(bgm);
    return bgm;
  }

  function updateAudioUi(statusText) {
    const toggle = document.getElementById('bgm-toggle');
    const volume = document.getElementById('bgm-volume');
    const volumeLabel = document.getElementById('bgm-volume-label');
    const status = document.getElementById('bgm-status');

    if (toggle) {
      toggle.textContent = settings.enabled ? '켜짐' : '꺼짐';
      toggle.setAttribute('aria-pressed', String(settings.enabled));
      toggle.dataset.enabled = String(settings.enabled);
    }

    if (volume) volume.value = String(Math.round(settings.volume * 100));
    if (volumeLabel) volumeLabel.textContent = `${Math.round(settings.volume * 100)}%`;
    if (status) status.textContent = statusText || (settings.enabled ? '재생 중' : '사용자가 켰을 때만 재생됩니다.');
  }

  function applyVolume(value) {
    settings.volume = clampVolume(value);
    if (bgm) bgm.volume = settings.volume;
    writeAudioSettings();
    updateAudioUi();
  }

  function pauseBgm() {
    if (bgm) bgm.pause();
    document.body.dataset.bgmEnabled = 'false';
    document.body.dataset.bgmStatus = 'paused';
    updateAudioUi('정지됨');
  }

  function playBgmFromUserGesture() {
    const audio = ensureAudioElement();
    audio.volume = settings.volume;

    const playPromise = audio.play();
    if (!playPromise || typeof playPromise.catch !== 'function') {
      document.body.dataset.bgmStatus = 'playing';
      updateAudioUi('재생 중');
      return;
    }

    playPromise
      .then(() => {
        document.body.dataset.bgmStatus = 'playing';
        updateAudioUi('재생 중');
      })
      .catch((error) => {
        console.warn('BGM could not be played.', error);
        settings.enabled = false;
        writeAudioSettings();
        document.body.dataset.bgmEnabled = 'false';
        document.body.dataset.bgmStatus = 'blocked';
        updateAudioUi('재생할 수 없음');
      });
  }

  function setBgmEnabled(nextEnabled) {
    settings.enabled = Boolean(nextEnabled);
    document.body.dataset.bgmEnabled = String(settings.enabled);
    writeAudioSettings();

    if (settings.enabled) {
      playBgmFromUserGesture();
      return;
    }

    pauseBgm();
  }

  function injectAudioStyles() {
    if (document.getElementById('audio-runtime-style')) return;

    const style = document.createElement('style');
    style.id = 'audio-runtime-style';
    style.textContent = `
      .audio-settings {
        display: grid;
        gap: 14px;
        padding: 18px 20px;
        border: 1px solid rgba(196, 154, 85, .32);
        background: linear-gradient(180deg, rgba(4, 7, 10, .62), rgba(2, 4, 7, .78));
        box-shadow: inset 0 0 28px rgba(0, 0, 0, .26);
      }

      .audio-setting-row,
      .audio-volume-row {
        display: grid;
        grid-template-columns: 84px 1fr auto;
        align-items: center;
        gap: 14px;
        color: var(--text-gold, #d5ad68);
      }

      .audio-setting-row b,
      .audio-volume-row b {
        color: var(--gold-bright, #efd18a);
        font-size: 16px;
      }

      .audio-setting-row button {
        width: 104px;
        min-height: 36px;
        border: 1px solid rgba(196, 154, 85, .54);
        background: rgba(3, 6, 9, .72);
        color: var(--gold-bright, #efd18a);
        letter-spacing: .08em;
      }

      .audio-setting-row button[data-enabled="true"] {
        background: rgba(196, 154, 85, .18);
        border-color: rgba(239, 209, 138, .78);
      }

      .audio-volume-row input[type="range"] {
        width: 100%;
        accent-color: var(--gold, #c49a55);
      }

      #bgm-volume-label,
      #bgm-status {
        color: rgba(213, 173, 104, .82);
        font-size: 13px;
        white-space: nowrap;
      }

      #bgm-status {
        grid-column: 2 / 4;
      }
    `;
    document.head.appendChild(style);
  }

  function injectAudioControls() {
    const settingsList = document.querySelector('#home-screen [data-home-panel="settings"] .home-settings-list');
    if (!settingsList || document.getElementById('bgm-toggle')) return;

    const panel = document.createElement('div');
    panel.className = 'audio-settings';
    panel.innerHTML = `
      <div class="audio-setting-row">
        <b>BGM</b>
        <button id="bgm-toggle" type="button" aria-pressed="false" data-enabled="false">꺼짐</button>
        <span id="bgm-status">사용자가 켰을 때만 재생됩니다.</span>
      </div>
      <label class="audio-volume-row" for="bgm-volume">
        <b>볼륨</b>
        <input id="bgm-volume" type="range" min="0" max="100" value="40" />
        <span id="bgm-volume-label">40%</span>
      </label>
    `;

    const firstItem = settingsList.querySelector('p');
    if (firstItem?.nextSibling) settingsList.insertBefore(panel, firstItem.nextSibling);
    else settingsList.appendChild(panel);

    const toggle = document.getElementById('bgm-toggle');
    const volume = document.getElementById('bgm-volume');

    toggle?.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      setBgmEnabled(!settings.enabled);
    });

    volume?.addEventListener('input', (event) => {
      applyVolume(Number(event.target.value) / 100);
    });
  }

  function setImportantStyle(element, property, value) {
    if (element) element.style.setProperty(property, value, 'important');
  }

  function applyHomeScriptureLayout(scripture) {
    setImportantStyle(scripture, 'position', 'absolute');
    setImportantStyle(scripture, 'left', 'auto');
    setImportantStyle(scripture, 'right', '86px');
    setImportantStyle(scripture, 'top', '138px');
    setImportantStyle(scripture, 'bottom', 'auto');
    setImportantStyle(scripture, 'width', '430px');
    setImportantStyle(scripture, 'min-height', '0');
    setImportantStyle(scripture, 'z-index', '8');
    setImportantStyle(scripture, 'padding', '14px 18px 13px');
    setImportantStyle(scripture, 'text-align', 'left');
    setImportantStyle(scripture, 'pointer-events', 'none');
    setImportantStyle(scripture, 'border', '1px solid rgba(196,154,85,.22)');
    setImportantStyle(scripture, 'background', 'linear-gradient(180deg, rgba(13, 12, 9, .58), rgba(4, 5, 6, .44))');
    setImportantStyle(scripture, 'box-shadow', '0 12px 28px rgba(0,0,0,.22), inset 0 0 18px rgba(0,0,0,.26)');

    const quote = scripture.querySelector('.quote');
    const reference = scripture.querySelector('.reference');

    [quote, reference].forEach((element) => {
      if (!element) return;
      setImportantStyle(element, 'position', 'static');
      setImportantStyle(element, 'left', 'auto');
      setImportantStyle(element, 'top', 'auto');
      setImportantStyle(element, 'width', 'auto');
      setImportantStyle(element, 'height', 'auto');
      setImportantStyle(element, 'margin', '0');
      setImportantStyle(element, 'text-align', 'left');
    });

    if (quote) {
      setImportantStyle(quote, 'font-size', '15px');
      setImportantStyle(quote, 'line-height', '1.55');
      setImportantStyle(quote, 'word-break', 'keep-all');
      setImportantStyle(quote, 'text-shadow', '0 2px 8px rgba(0,0,0,.88)');
    }

    if (reference) {
      setImportantStyle(reference, 'margin-top', '7px');
      setImportantStyle(reference, 'font-size', '13px');
      setImportantStyle(reference, 'letter-spacing', '.06em');
      setImportantStyle(reference, 'color', '#a98143');
    }
  }

  function updateHomeScripture(panelName = currentHomeScripturePanel) {
    const home = document.getElementById('home-screen');
    const scripture = home?.querySelector?.('.scripture');
    if (!home || !scripture) return;

    const partPanelName = HOME_PART_SCRIPTURES[panelName] ? panelName : currentHomeScripturePanel;
    const scriptureData = HOME_PART_SCRIPTURES[partPanelName] || HOME_PART_SCRIPTURES.story;

    currentHomeScripturePanel = partPanelName;
    home.dataset.scripturePanel = partPanelName;

    const quote = scripture.querySelector('.quote');
    const reference = scripture.querySelector('.reference');
    if (quote) quote.textContent = scriptureData.quote;
    if (reference) reference.textContent = scriptureData.reference;

    applyHomeScriptureLayout(scripture);
  }

  function bindHomeScriptureRuntime() {
    updateHomeScripture('story');

    document.addEventListener('click', (event) => {
      const panelTrigger = event.target?.closest?.('[data-panel]');
      if (panelTrigger) {
        window.setTimeout(() => updateHomeScripture(panelTrigger.dataset.panel), 0);
        return;
      }

      const homeTrigger = event.target?.closest?.('[data-go="home"]');
      if (homeTrigger) window.setTimeout(() => updateHomeScripture('story'), 0);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;

      const panelTrigger = event.target?.closest?.('[data-panel]');
      if (panelTrigger) {
        window.setTimeout(() => updateHomeScripture(panelTrigger.dataset.panel), 0);
        return;
      }

      const homeTrigger = event.target?.closest?.('[data-go="home"]');
      if (homeTrigger) window.setTimeout(() => updateHomeScripture('story'), 0);
    });

    window.BIBLE_ROGUE_HOME_SCRIPTURES = HOME_PART_SCRIPTURES;
  }

  function initAudioRuntime() {
    if (initialized) return;
    initialized = true;

    settings = readAudioSettings();
    document.body.dataset.bgmEnabled = String(settings.enabled);
    document.body.dataset.bgmStatus = settings.enabled ? 'waiting-user-gesture' : 'off';

    injectAudioStyles();
    injectAudioControls();
    bindHomeScriptureRuntime();
    updateAudioUi(settings.enabled ? '켜짐: 버튼을 다시 눌러 재생합니다.' : undefined);

    window.BIBLE_ROGUE_AUDIO = {
      readAudioSettings,
      setBgmEnabled,
      setBgmVolume: applyVolume
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAudioRuntime);
  } else {
    initAudioRuntime();
  }
})();
