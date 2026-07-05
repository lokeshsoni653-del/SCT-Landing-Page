/**
 * STUDENTS CLUB THARPARKAR (SCT) — MAIN APPLICATION SCRIPT
 * Author: Lokesh Kumar
 * Functionality: Sticky Nav, Stats Count-Up, Gallery Filters, Copy Widget, Modal admissions, and Validations.
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==================== 1. STICKY NAVBAR ==================== */
  const navbarHeader = document.getElementById('navbar-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    // Add backdrop shadow on scroll
    if (window.scrollY > 50) {
      navbarHeader.classList.add('scrolled');
    } else {
      navbarHeader.classList.remove('scrolled');
    }

    // Scrollspy active state tracker
    let currentSectionId = '';
    sections.forEach(sec => {
      const secTop = sec.offsetTop - 120;
      const secHeight = sec.offsetHeight;
      if (window.scrollY >= secTop && window.scrollY < secTop + secHeight) {
        currentSectionId = sec.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });


  /* ==================== 2. MOBILE DRAWER TOGGLE ==================== */
  const mobileToggleBtn = document.getElementById('mobile-toggle-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function toggleMobileMenu() {
    mobileDrawer.classList.toggle('open');
    // Rotate/transform hamburger lines
    mobileToggleBtn.classList.toggle('active');
  }

  mobileToggleBtn.addEventListener('click', toggleMobileMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileDrawer.classList.remove('open');
      mobileToggleBtn.classList.remove('active');
    });
  });

  // Close mobile drawer when resizing window back to desktop view
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      mobileDrawer.classList.remove('open');
      mobileToggleBtn.classList.remove('active');
    }
  });


  /* ==================== 3. COPY BANK DETAILS UTILITY ==================== */
  const btnCopyAccount = document.getElementById('btn-copy-account');
  const accountNumberSpan = document.getElementById('account-number');
  const copyTooltip = document.getElementById('copy-tooltip');

  btnCopyAccount.addEventListener('click', () => {
    const rawNumber = accountNumberSpan.textContent.trim();
    
    // Copy using modern navigator clipboard API
    navigator.clipboard.writeText(rawNumber).then(() => {
      // Success feedback
      copyTooltip.textContent = 'Copied!';
      copyTooltip.classList.add('show');
      
      // Revert states after 2 seconds
      setTimeout(() => {
        copyTooltip.classList.remove('show');
        // Wait for fade transition before updating text
        setTimeout(() => {
          copyTooltip.textContent = 'Copy';
        }, 300);
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy account number: ', err);
    });
  });


  /* ==================== 4. STATS ANIMATED COUNT-UP ==================== */
  const counterNums = document.querySelectorAll('.counter-num');
  const countersBox = document.getElementById('counters-box');
  let hasCountersAnimated = false;

  function runStatsAnimation() {
    counterNums.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'), 10);
      const duration = 1500; // 1.5 seconds count duration
      const startTime = performance.now();

      function updateNumber(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing calculation (easeOutQuad)
        const easedProgress = progress * (2 - progress);
        
        const currentValue = Math.floor(easedProgress * target);
        counter.textContent = currentValue;

        if (progress < 1) {
          requestAnimationFrame(updateNumber);
        } else {
          counter.textContent = target; // Ensure exact final value
        }
      }

      requestAnimationFrame(updateNumber);
    });
  }

  // Set up intersection observer to trigger counts when section scrolls into view
  if (countersBox && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasCountersAnimated) {
          hasCountersAnimated = true;
          runStatsAnimation();
          // Stop observing after run
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2 // Trigger when 20% of section is visible
    });

    observer.observe(countersBox);
  } else {
    // Fallback if IntersectionObserver is not supported
    runStatsAnimation();
  }


  /* ==================== 5. PHOTO GALLERY TAG FILTERS ==================== */
  const filterTabs = document.querySelectorAll('.filter-tab');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Toggle active states on tabs
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterValue = tab.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        
        // Apply smooth transition opacity
        item.style.opacity = '0';
        
        setTimeout(() => {
          if (filterValue === 'all' || itemCategory === filterValue) {
            item.classList.remove('hide');
            setTimeout(() => {
              item.style.opacity = '1';
            }, 50);
          } else {
            item.classList.add('hide');
          }
        }, 300); // Sync with CSS transition timing
      });
    });
  });


  /* ==================== 6. ADMISSION REGISTRATION MODAL ==================== */
  const registerModal = document.getElementById('register-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalProgramName = document.getElementById('modal-program-name');
  const registerButtons = document.querySelectorAll('.btn-register');
  const modalForm = document.getElementById('modal-form');

  // Open modal handler
  registerButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const programName = btn.getAttribute('data-program');
      modalProgramName.textContent = programName;
      registerModal.classList.add('open');
      document.body.style.overflow = 'hidden'; // Lock background scroll
    });
  });

  // Close modal function
  function closeRegistrationModal() {
    registerModal.classList.remove('open');
    document.body.style.overflow = ''; // Unlock scroll
    modalForm.reset();
  }

  modalCloseBtn.addEventListener('click', closeRegistrationModal);

  // Close modal when clicking on overlay background
  registerModal.addEventListener('click', (e) => {
    if (e.target === registerModal) {
      closeRegistrationModal();
    }
  });


  /* ==================== 7. FORM SUBMISSIONS & SUCCESS TOAST ==================== */
  const contactForm = document.getElementById('contact-form');
  const toastNotification = document.getElementById('toast-notification');
  const toastMessage = document.getElementById('toast-message');

  function showToast(message) {
    toastMessage.textContent = message;
    toastNotification.classList.add('show');
    
    // Auto hide after 4 seconds
    setTimeout(() => {
      toastNotification.classList.remove('show');
    }, 4000);
  }

  // Handle Contact Form Submit
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Collect values for validation/receipt
      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const subject = document.getElementById('form-subject').value;
      const message = document.getElementById('form-message').value.trim();

      if (!name || !email || !subject || !message) {
        alert('Please fill in all fields before submitting.');
        return;
      }

      // Successful receipt simulation
      showToast(`Thank you, ${name}! Your inquiry has been sent successfully.`);
      contactForm.reset();
    });
  }

  // Handle Modal Registration Form Submit
  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('modal-name').value.trim();
      const email = document.getElementById('modal-email').value.trim();
      const phone = document.getElementById('modal-phone').value.trim();
      const education = document.getElementById('modal-education').value;
      const program = modalProgramName.textContent;

      if (!name || !email || !phone || !education) {
        alert('Please fill in all details.');
        return;
      }

      // Complete registration process
      closeRegistrationModal();
      showToast(`Success! Registered for ${program}. We will contact you soon.`);
    });
  }
});
