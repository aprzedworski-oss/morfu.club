(() => {
  'use strict';
  const storageKey = 'morfuExplorerProgressV1';
  const intro = document.getElementById('mission-intro');
  const game = document.getElementById('mission-game');
  const complete = document.getElementById('mission-complete');
  const startButton = document.getElementById('start-mission');
  const featherButton = document.getElementById('golden-feather');
  const hintButton = document.getElementById('show-hint');
  const playAgainButton = document.getElementById('play-again');
  const scene = document.getElementById('reef-scene');
  const hintText = document.getElementById('mission-hint');
  const nameInput = document.getElementById('explorer-name');
  const completeMessage = document.getElementById('complete-message');
  const featherCount = document.getElementById('feather-count');
  const powerCount = document.getElementById('power-count');

  let attempts = 0;

  const readProgress = () => {
    try {
      return JSON.parse(localStorage.getItem(storageKey)) || {};
    } catch (_) {
      return {};
    }
  };

  const saveProgress = (progress) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(progress));
    } catch (_) {
      // The mission still works if browser storage is unavailable.
    }
  };

  const updateStatus = () => {
    const progress = readProgress();
    featherCount.textContent = progress.mission001Complete ? '1' : '0';
    powerCount.textContent = progress.dolphinPower ? '1' : '0';
    if (progress.explorerName) nameInput.value = progress.explorerName;
  };

  const showStage = (stage) => {
    intro.hidden = stage !== 'intro';
    game.hidden = stage !== 'game';
    complete.hidden = stage !== 'complete';
    const target = stage === 'intro' ? intro : stage === 'game' ? game : complete;
    target.focus?.({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const startMission = () => {
    const progress = readProgress();
    const name = nameInput.value.trim().replace(/[<>]/g, '').slice(0, 18);
    if (name) progress.explorerName = name;
    saveProgress(progress);
    attempts = 0;
    hintText.textContent = 'Tap the reef to search. The feather is partly hidden.';
    featherButton.classList.remove('is-hinting');
    showStage('game');
    featherButton.focus({ preventScroll: true });
  };

  const finishMission = () => {
    const progress = readProgress();
    progress.mission001Complete = true;
    progress.dolphinPower = true;
    progress.goldenFeathers = 1;
    saveProgress(progress);
    updateStatus();
    scene.classList.add('mission-success-flash');
    document.body.classList.add('completed');
    const explorer = progress.explorerName ? `, Explorer ${progress.explorerName}` : '';
    completeMessage.textContent = `You did it${explorer}! You helped Morfu and Little Octopus find the Golden Feather.`;
    window.setTimeout(() => showStage('complete'), 650);
  };

  const handleWrongSearch = (event) => {
    if (event.target.closest('#golden-feather')) return;
    attempts += 1;
    const messages = [
      'Good searching! Try looking near the right side of the reef.',
      'You are getting warmer. Look close to the colorful coral.',
      'Almost there! The feather is hiding above the lower corals.'
    ];
    hintText.textContent = messages[Math.min(attempts - 1, messages.length - 1)];
    if (attempts >= 3) featherButton.classList.add('is-hinting');
  };

  startButton.addEventListener('click', startMission);
  nameInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') startMission();
  });
  featherButton.addEventListener('click', finishMission);
  scene.addEventListener('click', handleWrongSearch);
  hintButton.addEventListener('click', () => {
    hintText.textContent = 'Look on the right side, near the colorful coral. The feather is tilted.';
    featherButton.classList.remove('is-hinting');
    void featherButton.offsetWidth;
    featherButton.classList.add('is-hinting');
  });
  playAgainButton.addEventListener('click', () => {
    scene.classList.remove('mission-success-flash');
    featherButton.classList.remove('is-hinting');
    document.body.classList.remove('completed');
    attempts = 0;
    showStage('game');
  });

  updateStatus();
})();
