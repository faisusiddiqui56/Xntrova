/**
 * Xntrova Technologies – Homepage Redesign
 * Main JavaScript Module
 * ──────────────────────────────────────────
 * Handles: mobile nav, smooth scroll, sticky header,
 * scroll animations, counter, testimonials, form validation,
 * active nav highlighting, and back-to-top.
 */

(function () {
    'use strict';

    // ── DOM Cache ──
    const $ = (sel, ctx = document) => ctx.querySelector(sel);
    const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

    const header      = $('#header');
    const navToggle   = $('#navToggle');
    const navMenu     = $('#navMenu');
    const navLinks    = $$('.navbar__link');
    const backToTop   = $('#backToTop');
    const contactForm = $('#contactForm');
    const submitBtn   = $('#submitBtn');
    const formSuccess = $('#formSuccess');

    // ── Mobile Navigation ──
    function toggleMobileNav() {
        const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !isOpen);
        navMenu.classList.toggle('open', !isOpen);

        // Prevent body scroll when menu is open
        document.body.style.overflow = !isOpen ? 'hidden' : '';
    }

    function closeMobileNav() {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('open');
        document.body.style.overflow = '';
    }

    navToggle.addEventListener('click', toggleMobileNav);

    // Close mobile nav when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileNav();
        });
    });

    // Close mobile nav on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('open')) {
            closeMobileNav();
            navToggle.focus();
        }
    });

    // Close mobile nav on outside click
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('open') &&
            !navMenu.contains(e.target) &&
            !navToggle.contains(e.target)) {
            closeMobileNav();
        }
    });


    // ── Sticky Header Scroll Effect ──
    let lastScrollY = 0;
    let ticking = false;

    function handleHeaderScroll() {
        const scrollY = window.scrollY;

        if (scrollY > 50) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }

        lastScrollY = scrollY;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(handleHeaderScroll);
            ticking = true;
        }
    }, { passive: true });


    // ── Smooth Scroll for Anchor Links ──
    $$('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;

            const target = $(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });


    // ── Active Navigation Highlighting ──
    const sections = $$('section[id]');

    function highlightActiveNav() {
        const scrollY = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', () => {
        requestAnimationFrame(highlightActiveNav);
    }, { passive: true });


    // ── Scroll Reveal Animations ──
    function createScrollObserver() {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -80px 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const delay = parseInt(el.dataset.delay) || 0;

                    setTimeout(() => {
                        el.classList.add('animated');
                    }, delay);

                    observer.unobserve(el);
                }
            });
        }, observerOptions);

        $$('[data-animate]').forEach(el => observer.observe(el));
    }

    createScrollObserver();


    // ── Counter Animation ──
    function animateCounters() {
        const counters = $$('[data-count]');
        const observerOptions = {
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.dataset.count);
                    const duration = 2000;
                    const startTime = performance.now();

                    function updateCounter(currentTime) {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);

                        // Ease out cubic
                        const eased = 1 - Math.pow(1 - progress, 3);
                        const current = Math.floor(eased * target);

                        el.textContent = current;

                        if (progress < 1) {
                            requestAnimationFrame(updateCounter);
                        } else {
                            el.textContent = target;
                        }
                    }

                    requestAnimationFrame(updateCounter);
                    observer.unobserve(el);
                }
            });
        }, observerOptions);

        counters.forEach(counter => observer.observe(counter));
    }

    animateCounters();


    // ── Testimonials Carousel ──
    const testimonialCards = $$('.testimonial-card');
    const testimonialDots  = $$('.testimonials__dot');
    const prevBtn = $('#prevTestimonial');
    const nextBtn = $('#nextTestimonial');
    let currentTestimonial = 0;
    let autoplayInterval;

    function showTestimonial(index) {
        // Normalize index
        if (index < 0) index = testimonialCards.length - 1;
        if (index >= testimonialCards.length) index = 0;

        testimonialCards.forEach((card, i) => {
            card.classList.remove('active');
            if (i === index) {
                card.classList.add('active');
            }
        });

        testimonialDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });

        currentTestimonial = index;
    }

    function nextTestimonial() {
        showTestimonial(currentTestimonial + 1);
    }

    function prevTestimonial() {
        showTestimonial(currentTestimonial - 1);
    }

    function startAutoplay() {
        autoplayInterval = setInterval(nextTestimonial, 5000);
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            stopAutoplay();
            prevTestimonial();
            startAutoplay();
        });

        nextBtn.addEventListener('click', () => {
            stopAutoplay();
            nextTestimonial();
            startAutoplay();
        });
    }

    testimonialDots.forEach(dot => {
        dot.addEventListener('click', () => {
            stopAutoplay();
            showTestimonial(parseInt(dot.dataset.index));
            startAutoplay();
        });
    });

    // Touch/swipe support for testimonials
    let touchStartX = 0;
    let touchEndX = 0;
    const carousel = $('#testimonialCarousel');

    if (carousel) {
        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > 50) {
                stopAutoplay();
                if (diff > 0) {
                    nextTestimonial();
                } else {
                    prevTestimonial();
                }
                startAutoplay();
            }
        }, { passive: true });

        startAutoplay();
    }


    // ── Contact Form Validation ──
    if (contactForm) {
        const validators = {
            name: (value) => value.trim().length >= 2,
            email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            phone: (value) => !value || /^\+?[0-9]{10,15}$/.test(value.replace(/[\s\-]/g, ''))
        };

        function validateField(field) {
            const group = field.closest('.form-group');
            if (!group) return true;

            const name = field.name;
            const value = field.value;
            let isValid = true;

            if (field.required && !value.trim()) {
                isValid = false;
            } else if (validators[name]) {
                isValid = validators[name](value);
            }

            group.classList.toggle('error', !isValid);
            return isValid;
        }

        // Real-time validation on blur
        $$('input, textarea', contactForm).forEach(field => {
            field.addEventListener('blur', () => validateField(field));
            field.addEventListener('input', () => {
                const group = field.closest('.form-group');
                if (group && group.classList.contains('error')) {
                    validateField(field);
                }
            });
        });

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Check honeypot
            const honeypot = contactForm.querySelector('[name="website_url"]');
            if (honeypot && honeypot.value) return;

            // Validate all required fields
            const requiredFields = $$('[required]', contactForm);
            let allValid = true;

            requiredFields.forEach(field => {
                if (!validateField(field)) {
                    allValid = false;
                }
            });

            // Also validate phone if filled
            const phoneField = contactForm.querySelector('[name="phone"]');
            if (phoneField && phoneField.value && !validateField(phoneField)) {
                allValid = false;
            }

            if (!allValid) {
                const firstError = contactForm.querySelector('.form-group.error input, .form-group.error textarea');
                if (firstError) firstError.focus();
                return;
            }

            // Simulate form submission
            submitBtn.classList.add('btn--loading');
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.classList.remove('btn--loading');
                submitBtn.disabled = false;
                contactForm.reset();
                formSuccess.classList.add('show');

                // Hide success message after 6 seconds
                setTimeout(() => {
                    formSuccess.classList.remove('show');
                }, 6000);
            }, 1500);
        });
    }


    // ── Back to Top Button ──
    function handleBackToTop() {
        if (window.scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', () => {
        requestAnimationFrame(handleBackToTop);
    }, { passive: true });

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }


    // ── Performance: Lazy load resources ──
    // Pause marquee animation when not visible
    const trustedSection = $('.trusted');
    if (trustedSection) {
        const trustedObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const logos = entry.target.querySelector('.trusted__logos');
                if (logos) {
                    logos.style.animationPlayState = entry.isIntersecting ? 'running' : 'paused';
                }
            });
        });
        trustedObserver.observe(trustedSection);
    }


    // ── Initialize: Set correct scroll state on load ──
    handleHeaderScroll();
    handleBackToTop();
    highlightActiveNav();

})();

