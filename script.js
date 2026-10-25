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
