const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
const transitionStorageKey = 'midou-page-transition';
const transitionWindowName = '__midou_page_transition_pending__';

function getTransitionState() {
  try {
    return sessionStorage.getItem(transitionStorageKey) || (window.name === transitionWindowName ? 'pending' : null);
  } catch {
    return window.name === transitionWindowName ? 'pending' : null;
  }
}

function setTransitionState(value) {
  window.name = value === 'pending' ? transitionWindowName : '';
  try {
    sessionStorage.setItem(transitionStorageKey, value);
  } catch {
    // file:// previews can use an opaque origin where storage is unavailable.
  }
}

function clearTransitionState() {
  if (window.name === transitionWindowName) window.name = '';
  try {
    sessionStorage.removeItem(transitionStorageKey);
  } catch {
    // Keep navigation working even when storage is unavailable.
  }
}

function createPageTransitionOverlay() {
  const overlay = document.createElement('div');
  overlay.className = 'page-transition-overlay';
  overlay.setAttribute('aria-hidden', 'true');
  document.body.appendChild(overlay);
  return overlay;
}

const pageTransitionOverlay = createPageTransitionOverlay();

function drawExistingPageLines() {
  const overlayRect = pageTransitionOverlay.getBoundingClientRect();
  const seenLines = new Set();
  const lines = [];
  const candidates = [document.querySelector('main'), ...document.querySelectorAll('main *')].filter(Boolean);

  const addLine = (orientation, start, cross, length) => {
    const roundedStart = Math.round(start);
    const roundedCross = Math.round(cross);
    const roundedLength = Math.round(length);
    if (roundedLength < 40) return;
    const key = `${orientation}-${roundedStart}-${roundedCross}-${roundedLength}`;
    if (seenLines.has(key)) return;
    seenLines.add(key);
    lines.push({ orientation, start: roundedStart, cross: roundedCross, length: roundedLength });
  };

  candidates.forEach((element) => {
    const rect = element.getBoundingClientRect();
    if (rect.bottom <= overlayRect.top || rect.top >= overlayRect.bottom) return;
    if (rect.right <= overlayRect.left || rect.left >= overlayRect.right) return;

    const style = window.getComputedStyle(element);
    const left = Math.max(rect.left, overlayRect.left) - overlayRect.left;
    const right = Math.min(rect.right, overlayRect.right) - overlayRect.left;
    const top = Math.max(rect.top, overlayRect.top) - overlayRect.top;
    const bottom = Math.min(rect.bottom, overlayRect.bottom) - overlayRect.top;

    if (parseFloat(style.borderTopWidth) > 0) addLine('horizontal', left, rect.top - overlayRect.top, right - left);
    if (parseFloat(style.borderBottomWidth) > 0) addLine('horizontal', left, rect.bottom - overlayRect.top, right - left);
    if (parseFloat(style.borderLeftWidth) > 0) addLine('vertical', top, rect.left - overlayRect.left, bottom - top);
    if (parseFloat(style.borderRightWidth) > 0) addLine('vertical', top, rect.right - overlayRect.left, bottom - top);
  });

  const horizontalLines = lines.filter((line) => line.orientation === 'horizontal');
  const verticalLines = lines.filter((line) => line.orientation === 'vertical');
  const headingLine = horizontalLines
    .filter((line) => line.cross > 56 && line.cross < overlayRect.height * 0.42 && line.length >= overlayRect.width * 0.55)
    .sort((a, b) => a.cross - b.cross)[0];

  const orderedLines = [];
  if (headingLine) orderedLines.push({ ...headingLine, delay: 45 });

  verticalLines
    .sort((a, b) => {
      const aDistance = Math.abs(a.cross - overlayRect.width / 2);
      const bDistance = Math.abs(b.cross - overlayRect.width / 2);
      return bDistance - aDistance || a.cross - b.cross || a.start - b.start;
    })
    .forEach((line, index) => orderedLines.push({ ...line, delay: 150 + Math.floor(index / 2) * 48 }));

  horizontalLines
    .filter((line) => line !== headingLine)
    .sort((a, b) => a.cross - b.cross || a.start - b.start)
    .forEach((line, index) => orderedLines.push({ ...line, delay: Math.min(365 + index * 32, 560) }));

  orderedLines.forEach((line) => {
      const lineElement = document.createElement('span');
      lineElement.className = `page-transition-line is-${line.orientation}`;
      lineElement.style.setProperty('--line-start', `${line.start}px`);
      lineElement.style.setProperty('--line-cross', `${line.cross}px`);
      lineElement.style.setProperty('--line-length', `${line.length}px`);
      lineElement.style.setProperty('--line-delay', `${line.delay}ms`);
      pageTransitionOverlay.appendChild(lineElement);
    });
}

function revealTransitionPage() {
  if (reducedMotionQuery.matches) return;
  if (getTransitionState() !== 'pending') return;

  clearTransitionState();
  document.body.classList.add('page-transition-enter');
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => document.body.classList.add('page-transition-reveal'));
  });
  window.setTimeout(() => {
    document.body.classList.remove('page-transition-enter', 'page-transition-reveal');
    pageTransitionOverlay.replaceChildren();
  }, 420);
}

function isTransitionLink(link, event) {
  if (!link || event.defaultPrevented || event.button !== 0) return false;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return false;
  if (link.target === '_blank' || link.hasAttribute('download')) return false;
  if (!link.href || link.protocol === 'mailto:' || link.protocol === 'tel:') return false;
  if (link.origin !== window.location.origin) return false;
  if (link.pathname === window.location.pathname && link.search === window.location.search) return false;
  return true;
}

document.addEventListener('click', (event) => {
  const link = event.target.closest('a');
  if (!isTransitionLink(link, event) || reducedMotionQuery.matches) return;

  event.preventDefault();
  document.body.classList.add('page-transition-leave');
  setTransitionState('pending');
  window.setTimeout(() => {
    window.location.href = link.href;
  }, 150);
}, true);

revealTransitionPage();

window.addEventListener('pageshow', () => {
  // A page restored from the browser cache can retain its leaving class.
  document.body.classList.remove('page-transition-leave');
});

function initializeScrollLineReveal(root = document) {
  if (reducedMotionQuery.matches) return;

  const borderSides = [
    { name: 'top', width: 'borderTopWidth', style: 'borderTopStyle', color: 'borderTopColor', length: 'width' },
    { name: 'right', width: 'borderRightWidth', style: 'borderRightStyle', color: 'borderRightColor', length: 'height' },
    { name: 'bottom', width: 'borderBottomWidth', style: 'borderBottomStyle', color: 'borderBottomColor', length: 'width' },
    { name: 'left', width: 'borderLeftWidth', style: 'borderLeftStyle', color: 'borderLeftColor', length: 'height' },
  ];
  const hosts = [];
  const measuredHosts = [];

  const candidates = root === document
    ? document.querySelectorAll('main, main *')
    : [root, ...root.querySelectorAll('*')];

  // Read every layout value first. Mixing these reads with DOM writes caused a
  // visible pause on border-heavy pages such as Exhibitions.
  candidates.forEach((element) => {
    if (!(element instanceof HTMLElement) || element.closest('.page-transition-overlay') || element.closest('[data-static-lines]')) return;
    if (element.classList.contains('scroll-line-host')) return;

    const rect = element.getBoundingClientRect();
    const style = window.getComputedStyle(element);
    const animatedSides = borderSides.filter((side) => {
      const sideLength = side.length === 'width' ? rect.width : rect.height;
      const isVeryLongVertical = side.length === 'height' && sideLength > window.innerHeight * 1.35;
      return parseFloat(style[side.width]) > 0
        && style[side.style] !== 'none'
        && style[side.color] !== 'transparent'
        && sideLength >= 40
        && !isVeryLongVertical;
    });

    if (!animatedSides.length) return;
    measuredHosts.push({ element, animatedSides, needsPosition: style.position === 'static' });
  });

  measuredHosts.forEach(({ element, animatedSides, needsPosition }) => {
    if (needsPosition) element.style.position = 'relative';
    element.classList.add('scroll-line-host');

    animatedSides.forEach((side, index) => {
      const line = document.createElement('span');
      line.className = `scroll-border-line is-${side.name}`;
      const isHorizontal = side.name === 'top' || side.name === 'bottom';
      const origin = isHorizontal
        ? (Math.random() < 0.5 ? 'left center' : 'right center')
        : (Math.random() < 0.5 ? 'center top' : 'center bottom');
      line.style.setProperty('--scroll-line-origin', origin);
      line.style.setProperty('--scroll-line-delay', `${index * 110}ms`);
      line.setAttribute('aria-hidden', 'true');
      element.style.setProperty(`border-${side.name}-color`, 'transparent');
      element.appendChild(line);
    });

    hosts.push(element);
  });

  if (!('IntersectionObserver' in window)) {
    hosts.forEach((host) => host.classList.add('is-line-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
      .forEach((entry, index) => {
      entry.target.style.setProperty('--scroll-host-delay', `${Math.min(index * 70, 280)}ms`);
      entry.target.classList.add('is-line-visible');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.01 });

  hosts.forEach((host) => observer.observe(host));
}

window.initializeScrollLineReveal = initializeScrollLineReveal;
initializeScrollLineReveal();

function initializeGeneratedGridLineReveal(root = document) {
  if (reducedMotionQuery.matches) return;
  const grids = root.matches?.('.artists-grid,.news-card-grid')
    ? [root]
    : [...root.querySelectorAll('.artists-grid,.news-card-grid')];

  grids.forEach((grid) => {
    if (grid.classList.contains('grid-line-reveal')) return;
    grid.classList.add(
      'grid-line-reveal',
      Math.random() < 0.5 ? 'grid-lines-x-from-left' : 'grid-lines-x-from-right',
      Math.random() < 0.5 ? 'grid-lines-y-from-top' : 'grid-lines-y-from-bottom',
    );

    const showGridLines = () => grid.classList.add('is-grid-line-visible');
    if (!('IntersectionObserver' in window)) {
      showGridLines();
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      showGridLines();
      observer.disconnect();
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.01 });
    observer.observe(grid);
  });
}

window.initializeGeneratedGridLineReveal = initializeGeneratedGridLineReveal;
initializeGeneratedGridLineReveal();

const rows = [...document.querySelectorAll('.project-row')];
const preview = document.querySelector('.project-preview');
const previewImage = preview?.querySelector('img');

rows.forEach((row) => {
  const showPreview = () => {
    rows.forEach((item) => item.classList.remove('is-active'));
    row.classList.add('is-active');
    if (!preview || !previewImage) return;
    const listRect = row.parentElement.getBoundingClientRect();
    const rowRect = row.getBoundingClientRect();
    preview.style.top = `${rowRect.top - listRect.top + 12}px`;
    previewImage.src = row.dataset.image;
    preview.style.opacity = '1';
    preview.style.transform = 'translateY(0) scale(1)';
  };
  row.addEventListener('mouseenter', showPreview);
  row.addEventListener('focus', showPreview);
  const hidePreview = () => {
    row.classList.remove('is-active');
    if (!preview) return;
    preview.style.opacity = '0';
    preview.style.transform = 'translateY(8px) scale(.98)';
  };
  row.addEventListener('mouseleave', hidePreview);
  row.addEventListener('blur', hidePreview);
});

const heroSlides = [
  { image:'assets/hero.jpg', alt:'纖遇蘚：王瑞華纖維創作計畫主視覺', href:'#project-fiber', label:'查看纖遇蘚展覽', type:'Current Exhibition', date:'2025/12/06 – 2026/01/31', place:'王瑞華纖維創作計畫－纖遇蘚' },
  { image:'assets/project-1.jpg', alt:'那些死過人的樹，都被做成衛生紙展覽主視覺', href:'#project-trees', label:'查看那些死過人的樹展覽', type:'Current Exhibition', date:'2025/12/06 – 2026/01/31', place:'那些死過人的樹，都被做成衛生紙' },
  { image:'assets/project-3.png', alt:'家裡的蒼蠅：張程鈞個展主視覺', href:'#project-flies', label:'查看家裡的蒼蠅展覽', type:'Past Exhibition', date:'2025/11/01 – 2025/11/22', place:'家裡的蒼蠅：張程鈞個展' }
];

let activeSlide = 0;
const heroImage = document.querySelector('.hero-image');
const heroLink = document.querySelector('.hero-link');
const slideCounter = document.querySelector('.slide-index span');
const captionGroups = [...document.querySelectorAll('.hero-caption > div')];

function renderSlide(index) {
  activeSlide = (index + heroSlides.length) % heroSlides.length;
  const slide = heroSlides[activeSlide];
  heroImage.classList.add('is-changing');
  window.setTimeout(() => {
    heroImage.src = slide.image;
    heroImage.alt = slide.alt;
    heroLink.href = slide.href;
    heroLink.setAttribute('aria-label', slide.label);
    slideCounter.textContent = `${String(activeSlide + 1).padStart(2, '0')}＿${String(heroSlides.length).padStart(2, '0')}`;
    [slide.type, slide.date, slide.place].forEach((value, groupIndex) => {
      const span = captionGroups[groupIndex]?.querySelector('span');
      if (span) span.textContent = value;
    });
    heroImage.classList.remove('is-changing');
  }, 180);
}

document.querySelector('.slide-prev')?.addEventListener('click', () => renderSlide(activeSlide - 1));
document.querySelector('.slide-next')?.addEventListener('click', () => renderSlide(activeSlide + 1));

const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
menuButton?.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.textContent = open ? 'Close' : 'Menu';
});
mobileNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  mobileNav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.textContent = 'Menu';
}));

const homePaletteButtons = [...document.querySelectorAll('[data-home-palette-option]')];
const homePaletteStorageKey = 'midou-home-palette';

function setHomePalette(palette, save = true) {
  const allowedPalettes = ['default', 'version-6', 'version-7', 'version-3'];
  const selectedPalette = allowedPalettes.includes(palette) ? palette : 'default';
  document.documentElement.dataset.homePalette = selectedPalette;
  homePaletteButtons.forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.homePaletteOption === selectedPalette));
  });
  if (!save) return;
  try {
    localStorage.setItem(homePaletteStorageKey, selectedPalette);
  } catch {
    // Local file previews can block storage; the switch still works for the current page view.
  }
}

if (homePaletteButtons.length) {
  let savedPalette = 'default';
  try {
    savedPalette = localStorage.getItem(homePaletteStorageKey) || 'default';
  } catch {
    savedPalette = 'default';
  }
  setHomePalette(savedPalette, false);
  homePaletteButtons.forEach((button) => {
    button.addEventListener('click', () => setHomePalette(button.dataset.homePaletteOption));
  });
}

const projectSectionLinks = [...document.querySelectorAll('.project-section-nav a')];
const projectSections = projectSectionLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

if (projectSectionLinks.length && projectSections.length) {
  const updateProjectSectionNav = () => {
    const marker = window.innerWidth <= 760 ? 96 : 80;
    let currentSection = projectSections[0];
    projectSections.forEach((section) => {
      if (section.getBoundingClientRect().top <= marker) currentSection = section;
    });
    projectSectionLinks.forEach((link) => {
      const isActive = link.getAttribute('href') === `#${currentSection.id}`;
      link.classList.toggle('active', isActive);
      if (isActive) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  };
  window.addEventListener('scroll', updateProjectSectionNav, { passive: true });
  updateProjectSectionNav();
}

const imageGalleries = [...document.querySelectorAll('.work-grid, .space-gallery')];

if (imageGalleries.length) {
  const lightbox = document.createElement('div');
  lightbox.className = 'image-lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.setAttribute('aria-label', '圖片放大預覽');
  lightbox.setAttribute('aria-hidden', 'true');
  lightbox.innerHTML = '<button class="image-lightbox-close" type="button" aria-label="關閉圖片預覽">×</button><button class="image-lightbox-nav image-lightbox-prev" type="button" aria-label="上一張圖片">←</button><figure class="image-lightbox-stage"><img alt=""><figcaption><span class="image-lightbox-caption"></span><span class="image-lightbox-count"></span></figcaption></figure><button class="image-lightbox-nav image-lightbox-next" type="button" aria-label="下一張圖片">→</button>';
  document.body.appendChild(lightbox);

  const enlargedImage = lightbox.querySelector('img');
  const closeButton = lightbox.querySelector('.image-lightbox-close');
  const previousButton = lightbox.querySelector('.image-lightbox-prev');
  const nextButton = lightbox.querySelector('.image-lightbox-next');
  const caption = lightbox.querySelector('.image-lightbox-caption');
  const counter = lightbox.querySelector('.image-lightbox-count');
  let lastFocusedImage = null;
  let activeImages = [];
  let activeImageIndex = 0;

  const renderLightboxImage = () => {
    const image = activeImages[activeImageIndex];
    if (!image) return;
    enlargedImage.src = image.currentSrc || image.src;
    enlargedImage.alt = image.alt;
    caption.textContent = image.dataset.caption || image.alt;
    counter.textContent = `${activeImageIndex + 1} / ${activeImages.length}`;
    const hasMultipleImages = activeImages.length > 1;
    previousButton.hidden = !hasMultipleImages;
    nextButton.hidden = !hasMultipleImages;
  };

  const showImage = (offset) => {
    activeImageIndex = (activeImageIndex + offset + activeImages.length) % activeImages.length;
    renderLightboxImage();
  };

  const openLightbox = (image, galleryImages) => {
    lastFocusedImage = image;
    activeImages = galleryImages;
    activeImageIndex = activeImages.indexOf(image);
    renderLightboxImage();
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
    closeButton.focus();
  };

  const closeLightbox = () => {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');
    lastFocusedImage?.focus();
  };

  imageGalleries.forEach((gallery) => {
    const galleryImages = [...gallery.querySelectorAll('img')];
    galleryImages.forEach((image) => {
      image.tabIndex = 0;
      image.setAttribute('role', 'button');
      image.setAttribute('aria-label', `${image.dataset.caption || image.alt}，點擊放大`);
      image.addEventListener('click', () => openLightbox(image, galleryImages));
      image.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openLightbox(image, galleryImages);
        }
      });
    });
  });

  closeButton.addEventListener('click', closeLightbox);
  previousButton.addEventListener('click', () => showImage(-1));
  nextButton.addEventListener('click', () => showImage(1));
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (event) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowLeft') showImage(-1);
    if (event.key === 'ArrowRight') showImage(1);
  });
}
