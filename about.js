const aboutVersionButtons = [...document.querySelectorAll('[data-about-version]')];
const aboutVersionViews = [...document.querySelectorAll('[data-about-view]')];
const aboutVersionKey = 'midou-about-version';

function readSavedAboutVersion() {
  try {
    return localStorage.getItem(aboutVersionKey);
  } catch {
    return null;
  }
}

function saveAboutVersion(version) {
  try {
    localStorage.setItem(aboutVersionKey, version);
  } catch {
    // file:// previews can use an opaque origin where storage is unavailable.
  }
}

function setAboutVersion(version, save = true) {
  const selectedVersion = version === '2' ? '2' : '1';

  aboutVersionButtons.forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.aboutVersion === selectedVersion));
  });

  aboutVersionViews.forEach((view) => {
    view.hidden = view.dataset.aboutView !== selectedVersion;
  });

  document.body.dataset.aboutVersion = selectedVersion;
  if (save) saveAboutVersion(selectedVersion);

  const activeView = aboutVersionViews.find((view) => !view.hidden);
  requestAnimationFrame(() => window.initializeScrollLineReveal?.(activeView));
}

aboutVersionButtons.forEach((button) => {
  button.addEventListener('click', () => setAboutVersion(button.dataset.aboutVersion));
});

setAboutVersion(readSavedAboutVersion() || '1', false);
