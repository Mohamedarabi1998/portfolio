(function () {
    'use strict';

    var header = document.getElementById('site-header');
    var menuToggle = document.getElementById('menu-toggle');
    var navLinks = document.getElementById('nav-links');
    var navAnchors = document.querySelectorAll('.nav-link');

    /* ---------- Mobile menu ---------- */
    function setMenu(open) {
        navLinks.classList.toggle('show', open);
        menuToggle.setAttribute('aria-expanded', String(open));
    }

    menuToggle.addEventListener('click', function () {
        setMenu(!navLinks.classList.contains('show'));
    });

    navLinks.addEventListener('click', function (e) {
        if (e.target.closest('a')) setMenu(false);
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') setMenu(false);
    });

    /* ---------- Header shadow on scroll ---------- */
    function onScroll() {
        header.classList.toggle('scrolled', window.scrollY > 10);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ---------- Active link while scrolling ---------- */
    var sections = Array.prototype.slice.call(document.querySelectorAll('main section[id]'));

    if ('IntersectionObserver' in window) {
        var spy = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                navAnchors.forEach(function (a) {
                    a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
                });
            });
        }, { rootMargin: '-45% 0px -50% 0px' });

        sections.forEach(function (s) { spy.observe(s); });

        /* ---------- Reveal on scroll ---------- */
        var revealObserver = new IntersectionObserver(function (entries, obs) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        document.querySelectorAll('.reveal').forEach(function (el, i) {
            // small stagger for sibling items such as skill cards
            el.style.transitionDelay = (i % 5) * 70 + 'ms';
            revealObserver.observe(el);
        });
    } else {
        document.querySelectorAll('.reveal').forEach(function (el) {
            el.classList.add('visible');
        });
    }

    /* ---------- Footer year ---------- */
    var year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();

    /* ---------- Contact form (opens the visitor's email app) ---------- */
    var form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var name = form.elements.name.value.trim();
            var email = form.elements.email.value.trim();
            var message = form.elements.message.value.trim();

            var subject = 'Portfolio enquiry from ' + name;
            var body = message + '\n\n— ' + name + ' (' + email + ')';

            window.location.href = 'mailto:mohammad9171998@gmail.com'
                + '?subject=' + encodeURIComponent(subject)
                + '&body=' + encodeURIComponent(body);
        });
    }
})();
