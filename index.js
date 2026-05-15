/* ═══════════════════════════════════════════════════════
   main.js — Birthday Maa Website
   ─────────────────────────────────────────────────────
   HOW TO PERSONALISE:
   • MOM_PHONE  — change to Mom's actual phone number
   • All content (text, photos, video) is in index.html
═══════════════════════════════════════════════════════ */

// ─── CONFIG ─────────────────────────────────────────
const MOM_PHONE = '+919468535916'; // ← Replace with Mom's real number

// ════════════════════════════════
// LOADING SCREEN
// ════════════════════════════════
window.addEventListener('load', () => {
    setTimeout(() => {
        const loading = document.getElementById('loading');
        loading.classList.add('fade-out');
        setTimeout(() => {
            loading.style.display = 'none';
            document.body.classList.remove('no-scroll');
            initIntroCanvas();
            initGlobalParticles();
        }, 1200);
    }, 2800);
});

// ════════════════════════════════
// INTRO CANVAS — Animated Stars & Dust
// ════════════════════════════════
function initIntroCanvas() {
    const canvas = document.getElementById('intro-canvas');
    const ctx = canvas.getContext('2d');
    let W, H, stars = [], dust = [];

    function resize() {
        W = canvas.width = canvas.offsetWidth;
        H = canvas.height = canvas.offsetHeight;

        stars = Array.from({ length: 180 }, () => ({
            x: Math.random() * W,
            y: Math.random() * H,
            r: Math.random() * 1.8 + 0.2,
            op: Math.random(),
            speed: Math.random() * 0.008 + 0.002,
            phase: Math.random() * Math.PI * 2,
        }));

        dust = Array.from({ length: 30 }, () => ({
            x: Math.random() * W,
            y: Math.random() * H,
            r: Math.random() * 60 + 30,
            op: Math.random() * 0.04 + 0.01,
            vx: (Math.random() - 0.5) * 0.15,
            vy: (Math.random() - 0.5) * 0.15,
        }));
    }

    window.addEventListener('resize', resize);
    resize();

    let t = 0;
    function draw() {
        ctx.clearRect(0, 0, W, H);

        // Dust blobs
        dust.forEach(d => {
            ctx.beginPath();
            const g = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.r);
            g.addColorStop(0, `rgba(201,168,76,${d.op})`);
            g.addColorStop(1, 'transparent');
            ctx.fillStyle = g;
            ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
            ctx.fill();
            d.x += d.vx;
            d.y += d.vy;
            if (d.x < -d.r) d.x = W + d.r;
            if (d.x > W + d.r) d.x = -d.r;
            if (d.y < -d.r) d.y = H + d.r;
            if (d.y > H + d.r) d.y = -d.r;
        });

        // Stars
        stars.forEach(s => {
            const op = 0.3 + 0.7 * (0.5 + 0.5 * Math.sin(t * s.speed * 100 + s.phase));
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,251,240,${op * s.op})`;
            ctx.fill();
        });

        t += 0.016;
        requestAnimationFrame(draw);
    }
    draw();
}

// ════════════════════════════════
// GLOBAL FLOATING PARTICLES
// ════════════════════════════════
function initGlobalParticles() {
    const wrap = document.getElementById('particles-global');
    for (let i = 0; i < 20; i++) {
        const p = document.createElement('div');
        p.className = 'gp';
        const size = Math.random() * 4 + 2;
        p.style.cssText = `
      width:${size}px;
      height:${size}px;
      left:${Math.random() * 100}%;
      background:rgba(201,168,76,${Math.random() * 0.3 + 0.05});
      animation-duration:${Math.random() * 15 + 10}s;
      animation-delay:-${Math.random() * 20}s;
    `;
        wrap.appendChild(p);
    }
}

// ════════════════════════════════
// BEGIN JOURNEY BUTTON
// ════════════════════════════════
function beginJourney() {
    spawnHearts(document.getElementById('begin-btn'));
    document.getElementById('timeline').scrollIntoView({ behavior: 'smooth' });
}

// ════════════════════════════════
// FLOATING HEARTS EFFECT
// ════════════════════════════════
function spawnHearts(origin) {
    const rect = origin.getBoundingClientRect();
    const emojis = ['❤️', '🧡', '💛', '💕'];

    for (let i = 0; i < 8; i++) {
        const h = document.createElement('div');
        h.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        h.style.cssText = `
      position: fixed;
      z-index: 9999;
      pointer-events: none;
      font-size: ${Math.random() * 14 + 12}px;
      left: ${rect.left + rect.width / 2 + (Math.random() - 0.5) * 60}px;
      top: ${rect.top}px;
      animation: floatHeart ${Math.random() * 0.8 + 0.8}s ease-out ${Math.random() * 0.3}s forwards;
    `;
        document.body.appendChild(h);
        setTimeout(() => h.remove(), 1500);
    }
}

// ════════════════════════════════
// LETTER FLIP CARDS
// ════════════════════════════════
function toggleLetter(card) {
    card.classList.toggle('open');
    spawnHearts(card);
}

// ════════════════════════════════
// VIDEO MODAL
// ════════════════════════════════
function openVideoModal() {
    const modal = document.getElementById('video-modal');
    modal.classList.add('open');
    requestAnimationFrame(() => {
        requestAnimationFrame(() => modal.classList.add('visible'));
    });
}

function closeVideoModal() {
    const modal = document.getElementById('video-modal');
    modal.classList.remove('visible');
    setTimeout(() => modal.classList.remove('open'), 500);
}

// Close modal by clicking the dark backdrop
document.getElementById('video-modal').addEventListener('click', function (e) {
    if (e.target === this) closeVideoModal();
});

// ════════════════════════════════
// ENDING STARS CANVAS
// ════════════════════════════════
function initStarsCanvas() {
    const canvas = document.getElementById('stars-canvas');
    const ctx = canvas.getContext('2d');
    let W, H, stars = [], shoot = null;

    function resize() {
        W = canvas.width = canvas.offsetWidth;
        H = canvas.height = canvas.offsetHeight;
        stars = Array.from({ length: 280 }, () => ({
            x: Math.random() * W,
            y: Math.random() * H,
            r: Math.random() * 1.6 + 0.2,
            op: Math.random() * 0.6 + 0.2,
            speed: Math.random() * 0.006 + 0.001,
            phase: Math.random() * Math.PI * 2,
        }));
    }

    window.addEventListener('resize', resize);
    resize();

    let t = 0;
    function draw() {
        ctx.clearRect(0, 0, W, H);

        // Twinkling stars
        stars.forEach(s => {
            const op = s.op * (0.5 + 0.5 * Math.sin(t * s.speed * 80 + s.phase));
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,251,240,${op})`;
            ctx.fill();
        });

        // Random shooting star
        if (!shoot && Math.random() < 0.004) {
            shoot = {
                x: Math.random() * W,
                y: Math.random() * H * 0.4,
                vx: 4 + Math.random() * 3,
                vy: 2 + Math.random() * 2,
                life: 1,
            };
        }
        if (shoot) {
            ctx.beginPath();
            ctx.moveTo(shoot.x, shoot.y);
            ctx.lineTo(shoot.x - shoot.vx * 8, shoot.y - shoot.vy * 8);
            const g = ctx.createLinearGradient(
                shoot.x - shoot.vx * 8, shoot.y - shoot.vy * 8,
                shoot.x, shoot.y
            );
            g.addColorStop(0, 'transparent');
            g.addColorStop(1, `rgba(255,251,220,${shoot.life})`);
            ctx.strokeStyle = g;
            ctx.lineWidth = 1.5;
            ctx.stroke();
            shoot.x += shoot.vx;
            shoot.y += shoot.vy;
            shoot.life -= 0.02;
            if (shoot.life <= 0 || shoot.x > W || shoot.y > H) shoot = null;
        }

        t += 0.016;
        requestAnimationFrame(draw);
    }
    draw();
}

// ════════════════════════════════
// CALL MOM — Confetti + Dialer
// ════════════════════════════════
function callMom() {
    launchConfetti();
    spawnHearts(document.getElementById('call-btn'));
    setTimeout(() => {
        window.location.href = `tel:${MOM_PHONE}`;
    }, 800);
}

function launchConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    const ctx = canvas.getContext('2d');
    const colors = ['#c9a84c', '#e8c97a', '#f5e9c8', '#f2d4c4', '#d4856a', '#ffd700', '#fff0a0', '#ffe4e1'];
    const pieces = [];

    for (let i = 0; i < 180; i++) {
        pieces.push({
            x: innerWidth / 2,
            y: innerHeight * 0.7,
            vx: (Math.random() - 0.5) * 18,
            vy: -(Math.random() * 16 + 8),
            r: Math.random() * 6 + 3,
            color: colors[Math.floor(Math.random() * colors.length)],
            rot: Math.random() * 360,
            vrot: (Math.random() - 0.5) * 8,
            shape: Math.random() > 0.5 ? 'rect' : 'circle',
            life: 1,
        });
    }

    let frame = 0;
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        pieces.forEach(p => {
            ctx.save();
            ctx.globalAlpha = p.life;
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rot * Math.PI / 180);
            ctx.fillStyle = p.color;
            if (p.shape === 'rect') {
                ctx.fillRect(-p.r, -p.r / 2, p.r * 2, p.r);
            } else {
                ctx.beginPath();
                ctx.arc(0, 0, p.r, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();
            p.x += p.vx;
            p.vy += 0.4;
            p.y += p.vy;
            p.rot += p.vrot;
            p.life -= 0.012;
        });
        if (frame++ < 180) requestAnimationFrame(draw);
        else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    draw();
}

// ════════════════════════════════
// SCROLL REVEAL — Intersection Observers
// ════════════════════════════════
let starsInited = false;

// General reveal observer (timeline, letters, counters, polaroids, ending)
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');

            // Special case: trigger ending animation once
            if (e.target.id === 'ending' && !starsInited) {
                starsInited = true;
                initStarsCanvas();
                triggerEndingSequence();
            }
        }
    });
}, { threshold: 0.15 });

document
    .querySelectorAll('.timeline-card, .letter-card, .counter-card, .polaroid')
    .forEach(el => revealObserver.observe(el));

revealObserver.observe(document.getElementById('ending'));

// Video section reveal
const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
    });
}, { threshold: 0.2 });

document.querySelectorAll('[data-reveal]').forEach(el => videoObserver.observe(el));

// ════════════════════════════════
// ENDING CINEMATIC SEQUENCE
// ════════════════════════════════
function triggerEndingSequence() {
    const sequence = [
        { id: 'e1', delay: 200 },
        { id: 'ed1', delay: 600 },
        { id: 'e2', delay: 1000 },
        { id: 'ed2', delay: 1400 },
        { id: 'e3', delay: 1800 },
        { id: 'call-btn', delay: 2400 },
    ];

    sequence.forEach(({ id, delay }) => {
        setTimeout(() => {
            document.getElementById(id)?.classList.add('visible');
        }, delay);
    });
}

// ════════════════════════════════
// ANIMATED COUNTER
// ════════════════════════════════
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            const el = e.target.querySelector('[data-count]');
            if (el) animateCounter(el);
            counterObserver.unobserve(e.target);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.counter-card').forEach(c => counterObserver.observe(c));

function animateCounter(el) {
    const target = parseInt(el.dataset.count);
    const duration = 1800;
    const step = target / (duration / 16);
    let cur = 0;

    const interval = setInterval(() => {
        cur = Math.min(cur + step, target);
        el.textContent = Math.round(cur) + '+';
        if (cur >= target) clearInterval(interval);
    }, 16);
}

// ════════════════════════════════
// STAGGERED ANIMATION DELAYS
// ════════════════════════════════
document.querySelectorAll('.letter-card').forEach((c, i) => {
    c.style.transitionDelay = (i * 0.05) + 's';
});

document.querySelectorAll('.counter-card').forEach((c, i) => {
    c.style.transitionDelay = (i * 0.05) + 's';
});

document.querySelectorAll('.polaroid').forEach((c, i) => {
    c.style.transitionDelay = (i * 0.04) + 's';
});