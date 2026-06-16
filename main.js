document.addEventListener('DOMContentLoaded', () => {
  // Header scroll effect
  const header = document.querySelector('.site-header');

  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });

    // --- Mobile navigation (hamburger) ---
    const container = header.querySelector('.header-container');
    const mobileQuery = window.matchMedia('(max-width: 900px)');

    // Build the hamburger button
    const toggle = document.createElement('button');
    toggle.className = 'nav-toggle';
    toggle.setAttribute('aria-label', '메뉴 열기');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.innerHTML = '<span></span><span></span><span></span>';
    container.appendChild(toggle);

    const closeMenu = () => {
      header.classList.remove('nav-open');
      document.body.classList.remove('nav-lock');
      toggle.setAttribute('aria-expanded', 'false');
    };

    toggle.addEventListener('click', () => {
      const open = header.classList.toggle('nav-open');
      document.body.classList.toggle('nav-lock', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    // Program dropdown: tap to expand on mobile (no hover on touch)
    const dropdownParent = header.querySelector('.has-dropdown');
    if (dropdownParent) {
      const parentLink = dropdownParent.querySelector(':scope > a');
      parentLink.addEventListener('click', (e) => {
        if (mobileQuery.matches) {
          e.preventDefault();
          dropdownParent.classList.toggle('open');
          return;
        }
        // Desktop: if the "교육 프로그램" section is on this page (home),
        // smooth-scroll to it instead of reloading the page.
        const target = document.getElementById('programs');
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    // Tapping any real navigation link closes the menu
    header.querySelectorAll('.gnb a').forEach((a) => {
      a.addEventListener('click', () => {
        if (!a.parentElement.classList.contains('has-dropdown')) closeMenu();
      });
    });

    // Reset menu state when leaving mobile width
    mobileQuery.addEventListener('change', (e) => {
      if (!e.matches) {
        closeMenu();
        if (dropdownParent) dropdownParent.classList.remove('open');
      }
    });
  }

  // Programs accordion (home): single-open.
  // Desktop -> open on hover and keep the last-hovered panel open.
  // Touch/mobile -> tap to toggle.
  const accordion = document.querySelector('.pa-accordion');
  if (accordion) {
    const items = accordion.querySelectorAll('.pa-item');
    const hoverable = window.matchMedia('(hover: hover) and (min-width: 901px)');

    const openOnly = (item) => {
      items.forEach((i) => i.classList.toggle('is-open', i === item));
    };

    items.forEach((item) => {
      // Hover (desktop): switch the open panel; it stays open on mouse leave
      item.addEventListener('mouseenter', () => {
        if (hoverable.matches) openOnly(item);
      });
      // Click (mobile / general): toggle this panel
      const head = item.querySelector('.pa-head');
      head.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');
        items.forEach((i) => i.classList.remove('is-open'));
        if (!isOpen) item.classList.add('is-open');
      });
    });
  }

  // Initialize Swiper only on pages that have the slider
  if (typeof Swiper !== 'undefined' && document.querySelector('.mySwiper')) {
    new Swiper('.mySwiper', {
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }
});
