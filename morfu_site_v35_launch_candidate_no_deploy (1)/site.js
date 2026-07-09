const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const isOpen = document.body.classList.toggle('nav-open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      document.body.classList.remove('nav-open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });
}

// v30 — premium World Map interactions
const morfuMap = document.querySelector('.map-paper-v30');
if (morfuMap) {
  const lands = morfuMap.querySelectorAll('.map-land-v30');
  const toast = morfuMap.querySelector('.map-toast-v30');
  let toastTimer;

  lands.forEach((land) => {
    const world = land.dataset.world || 'base';
    land.addEventListener('mouseenter', () => morfuMap.dataset.activeWorld = world);
    land.addEventListener('focus', () => morfuMap.dataset.activeWorld = world);
    land.addEventListener('mouseleave', () => morfuMap.dataset.activeWorld = 'base');
    land.addEventListener('blur', () => morfuMap.dataset.activeWorld = 'base');

    if (land.classList.contains('locked-land-v29')) {
      land.addEventListener('click', () => {
        if (!toast) return;
        toast.textContent = `${land.querySelector('strong')?.textContent || 'This land'} is coming soon, Explorer!`;
        toast.classList.add('is-visible');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2200);
      });
    }
  });
}

// v31 — Hidden Golden Feather Hunt
const featherButtonsV31 = document.querySelectorAll('.hidden-feather-v31');
if (featherButtonsV31.length) {
  const featherToast = document.querySelector('.feather-toast-v31');
  const featherCount = document.querySelector('[data-feather-count]');
  const mapPaper = document.querySelector('.map-paper-v30');
  const found = new Set();
  let featherTimer;

  featherButtonsV31.forEach((button) => {
    button.addEventListener('click', () => {
      const id = button.dataset.featherId;
      if (found.has(id)) return;
      found.add(id);
      button.classList.add('is-found');
      button.setAttribute('aria-label', `Golden Feather ${id} found`);

      if (featherCount) featherCount.textContent = String(found.size);
      if (featherToast) {
        featherToast.textContent = found.size === featherButtonsV31.length
          ? 'Explorer Badge unlocked! You found every Golden Feather!'
          : `You found a Golden Feather! ${found.size}/${featherButtonsV31.length}`;
        featherToast.classList.add('is-visible');
        clearTimeout(featherTimer);
        featherTimer = setTimeout(() => featherToast.classList.remove('is-visible'), 2600);
      }
      if (found.size === featherButtonsV31.length && mapPaper) {
        mapPaper.classList.add('feather-complete-v31');
        setTimeout(() => mapPaper.classList.remove('feather-complete-v31'), 1400);
      }
    });
  });
}


// v35 — launch candidate helpers
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && document.body.classList.contains('nav-open')) {
    document.body.classList.remove('nav-open');
    if (menuButton) menuButton.setAttribute('aria-expanded', 'false');
  }
});
document.addEventListener('click', (event) => {
  if (!document.body.classList.contains('nav-open')) return;
  if (nav && nav.contains(event.target)) return;
  if (menuButton && menuButton.contains(event.target)) return;
  document.body.classList.remove('nav-open');
  if (menuButton) menuButton.setAttribute('aria-expanded', 'false');
});

// Remember Golden Feathers during the same browser visit.
try {
  const savedFeathers = JSON.parse(localStorage.getItem('morfuFoundFeathersV35') || '[]');
  if (savedFeathers.length && featherButtonsV31.length) {
    savedFeathers.forEach((id) => {
      const button = document.querySelector(`[data-feather-id="${id}"]`);
      if (button) {
        button.classList.add('is-found');
        button.setAttribute('aria-label', `Golden Feather ${id} found`);
      }
    });
    if (featherCount) featherCount.textContent = String(savedFeathers.length);
  }
  featherButtonsV31.forEach((button) => {
    button.addEventListener('click', () => {
      const ids = [...document.querySelectorAll('.hidden-feather-v31.is-found')]
        .map((el) => el.dataset.featherId)
        .filter(Boolean);
      localStorage.setItem('morfuFoundFeathersV35', JSON.stringify([...new Set(ids)]));
    });
  });
} catch (error) {
  // localStorage may be unavailable in some privacy modes; the hunt still works without saving.
}

// Cloudflare/static launch-safe forms: avoid failed POSTs until a live email/newsletter backend is connected.
document.querySelectorAll('form[data-launch-form="true"]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const existing = form.querySelector('.launch-form-status-v35');
    if (existing) existing.remove();
    const note = document.createElement('p');
    note.className = 'launch-form-status-v35';
    note.setAttribute('role', 'status');
    note.textContent = 'Thanks, Explorer! This form is ready for launch. Connect the final email/newsletter service before collecting messages.';
    form.append(note);
  });
});
