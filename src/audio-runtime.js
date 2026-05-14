// Independent BGM runtime for BibleRogue2.
// This file does not touch story data, chapter routing, game save data, or responsive logic.

(function () {
  const AUDIO_SETTINGS_KEY = 'biblerogue2.audio.v1';
  const DEFAULT_SETTINGS = {
    version: 1,
    enabled: false,
    volume: 0.4
  };

  let bgm = null;
  let settings = { ...DEFAULT_SETTINGS };
  let initialized = false;

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

  function initAudioRuntime() {
    if (initialized) return;
    initialized = true;

    settings = readAudioSettings();
    document.body.dataset.bgmEnabled = String(settings.enabled);
    document.body.dataset.bgmStatus = settings.enabled ? 'waiting-user-gesture' : 'off';

    injectAudioStyles();
    injectAudioControls();
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
