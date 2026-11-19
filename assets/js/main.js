(function () {
    document.documentElement.classList.remove('no-js');

    var nav = document.querySelector('.nav');
    var toggle = document.querySelector('.nav-toggle');
    var links = document.querySelectorAll('.nav-links a[href^="#"]');

    // nav background once the page scrolls
    function onScroll() {
        nav.classList.toggle('scrolled', window.scrollY > 20);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    // mobile menu
    toggle.addEventListener('click', function () {
        var open = nav.classList.toggle('open');
        toggle.setAttribute('aria-expanded', open);
        toggle.querySelector('i').className = open ? 'fa fa-times' : 'fa fa-bars';
    });
    links.forEach(function (a) {
        a.addEventListener('click', function () {
            nav.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.querySelector('i').className = 'fa fa-bars';
        });
    });

    if (!('IntersectionObserver' in window)) {
        document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
        return;
    }

    // reveal on scroll
    var revealer = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
            if (e.isIntersecting) {
                e.target.classList.add('in');
                revealer.unobserve(e.target);
            }
        });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(function (el) { revealer.observe(el); });

    // highlight the nav link for the section in view
    var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
            if (!e.isIntersecting) return;
            links.forEach(function (a) {
                a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id);
            });
        });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('section[id]').forEach(function (s) { spy.observe(s); });

    document.getElementById('year').textContent = new Date().getFullYear();
})();
