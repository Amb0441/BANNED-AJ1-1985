/* ─────────────────────────────────────────
   Jordan Ban — main.js
   ───────────────────────────────────────── */

// ── LOADER ──────────────────────────────
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('done');
    }, 1200);
});

// ── CUSTOM CURSOR (desktop only) ────────
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursorRing');

if (cursor && ring) {
    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', (e) => {
        mx = e.clientX;
        my = e.clientY;
        cursor.style.left = mx + 'px';
        cursor.style.top  = my + 'px';
    });

    function animateRing() {
        rx += (mx - rx) * 0.12;
        ry += (my - ry) * 0.12;
        ring.style.left = rx + 'px';
        ring.style.top  = ry + 'px';
        requestAnimationFrame(animateRing);
    }
    animateRing();

    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width  = '16px';
            cursor.style.height = '16px';
            ring.style.width    = '52px';
            ring.style.height   = '52px';
            ring.style.borderColor = 'rgba(200,16,46,0.8)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.width  = '8px';
            cursor.style.height = '8px';
            ring.style.width    = '36px';
            ring.style.height   = '36px';
            ring.style.borderColor = 'rgba(200,16,46,0.5)';
        });
    });
}

// ── HAMBURGER / MOBILE MENU ─────────────
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        const isOpen = hamburger.classList.toggle('open');
        mobileMenu.classList.toggle('open', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });
}

// ── SCROLL REVEAL ────────────────────────
const revealEls = document.querySelectorAll(
    '.chapter, .dna-card, .pillar, .legacy-stat, .colorway-card'
);

const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('revealed');
            observer.unobserve(e.target);
        }
    });
}, { threshold: 0.08 });

revealEls.forEach(el => observer.observe(el));

// ── NAV SCROLL GLASSMORPHISM ─────────────
const nav = document.querySelector('nav');
if (nav) {
    const onScroll = () => {
        if (window.scrollY > 60) {
            nav.style.backdropFilter = 'blur(12px)';
            nav.style.webkitBackdropFilter = 'blur(12px)';
        } else {
            nav.style.backdropFilter = 'blur(0px)';
            nav.style.webkitBackdropFilter = 'blur(0px)';
        }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
}
