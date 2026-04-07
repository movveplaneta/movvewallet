// ================= NAVBAR MOVVE NIVEL DIOS =================

const navbar = document.querySelector(".navbar");
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-links");
const navLinks = document.querySelectorAll(".nav-menu a");

let lastScroll = 0;

// ================= SCROLL EFECTO NAVBAR =================

window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;

    // Activar estilo scrolled (usa tu CSS)
    if (currentScroll > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

    // OCULTAR / MOSTRAR NAVBAR (ULTRA PRO)
    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.style.transform = "translateY(-100%)";
    } else {
        navbar.style.transform = "translateY(0)";
    }

    lastScroll = currentScroll;
});

// ================= MENU HAMBURGUESA =================

menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    navMenu.classList.toggle("active");

    // BLOQUEAR SCROLL CUANDO MENÚ ABIERTO
    document.body.classList.toggle("no-scroll");
});

// ================= CERRAR MENÚ AL HACER CLICK =================

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        menuToggle.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.classList.remove("no-scroll");
    });
});

// ================= EFECTO LINK ACTIVO =================

const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
    let scrollPos = window.scrollY + 120;

    sections.forEach(section => {
        if (
            scrollPos >= section.offsetTop &&
            scrollPos < section.offsetTop + section.offsetHeight
        ) {
            navLinks.forEach(link => {
                link.classList.remove("active-link");

                if (link.getAttribute("href") === "#" + section.id) {
                    link.classList.add("active-link");
                }
            });
        }
    });
});

// ================= CERRAR MENÚ AL TOCAR FUERA (PRO) =================

document.addEventListener("click", (e) => {
    if (
        navMenu.classList.contains("active") &&
        !navMenu.contains(e.target) &&
        !menuToggle.contains(e.target)
    ) {
        menuToggle.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.classList.remove("no-scroll");
    }
});

// ================= EFECTO SCROLL SUAVE =================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});

// ================= POPUP MOVVE NIVEL DIOS =================

const popup = document.getElementById("popup");

// ===== MOSTRAR POPUP DESPUÉS DE TIEMPO =====
window.addEventListener("load", () => {
    setTimeout(() => {
        if (!localStorage.getItem("popupVisto")) {
            popup.classList.add("show");
        }
    }, 6000); // 6 segundos
});

// ===== DETECTAR INTENCIÓN DE SALIDA (PC) =====
document.addEventListener("mouseout", (e) => {
    if (
        e.clientY < 10 &&
        !localStorage.getItem("popupVisto")
    ) {
        popup.classList.add("show");
    }
});

// ===== FUNCIÓN BOTÓN =====
function continuar() {
    localStorage.setItem("popupVisto", "true");

    // 🔥 REDIRECCIÓN (CAMBIA ESTO A TU LINK)
    window.open("https://wa.me/18495942190?text=Hola%20quiero%20activar%20Movve", "_blank");

    cerrarPopup();
}

// ===== CERRAR POPUP =====
function cerrarPopup() {
    popup.classList.remove("show");
}

// ===== CERRAR AL HACER CLICK FUERA =====
popup.addEventListener("click", (e) => {
    if (e.target === popup) {
        cerrarPopup();
    }
});

// ================= HERO NIVEL DIOS =================
document.addEventListener('DOMContentLoaded', () => {

    // ===== MÁQUINA DE ESCRIBIR =====
    const typingEl = document.getElementById('typing');
    const typingWords = ["constante", "inteligente", "rentable", "automática"];
    let typingIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeLoop() {
        if (!typingEl) return;
        const currentWord = typingWords[typingIndex];
        if (!deleting) {
            typingEl.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === currentWord.length) {
                deleting = true;
                setTimeout(typeLoop, 800);
            } else {
                setTimeout(typeLoop, 120);
            }
        } else {
            typingEl.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                deleting = false;
                typingIndex = (typingIndex + 1) % typingWords.length;
                setTimeout(typeLoop, 200);
            } else {
                setTimeout(typeLoop, 60);
            }
        }
    }
    typeLoop();

    // ===== ANIMACIÓN DE NÚMEROS =====
    function animateValue(element, start, end, duration = 2000, suffix = '') {
        if (!element) return;
        let startTime = null;

        function easeOutQuad(t) { return t * (2 - t); }

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const value = Math.floor(start + (end - start) * easeOutQuad(progress));

            if (suffix === '%') element.textContent = `${value}%`;
            else if (suffix === '$') element.textContent = `$${value.toLocaleString()}`;
            else element.textContent = value.toLocaleString();

            if (progress < 1) requestAnimationFrame(step);
            else {
                // asegurar valor final exacto
                if (suffix === '%') element.textContent = `${end}%`;
                else if (suffix === '$') element.textContent = `$${end.toLocaleString()}`;
                else element.textContent = end.toLocaleString();
            }
        }
        requestAnimationFrame(step);
    }

    const statsEls = document.querySelectorAll('.hero-stats-live strong');
    if (statsEls.length >= 3) {
        animateValue(statsEls[0], 0, 42000000, 2500, '$');  // Balance
        animateValue(statsEls[1], 0, 124, 2500, '%');       // Rentabilidad
        statsEls[2].textContent = "24/7";                   // Actividad fija
    }

    // ===== USUARIOS EN VIVO =====
    const liveUsersEl = document.querySelector('.live-users');
    let liveUsers = 128;
    function updateLiveUsers() {
        if (!liveUsersEl) return;
        let delta = Math.floor(Math.random() * 5) - 2; // -2 a +2
        liveUsers = Math.max(50, liveUsers + delta);
        liveUsersEl.textContent = `🟢 ${liveUsers} personas activas ahora mismo`;
    }
    setInterval(updateLiveUsers, 4000);

    // ===== SCROLL HERO =====
    const heroOverlay = document.querySelector('.hero-overlay');
    window.addEventListener('scroll', () => {
        if (!heroOverlay) return;
        heroOverlay.style.opacity = Math.min(0.6, window.scrollY / 800);
    });

});

// JS: Animación secuencial al scroll
const presentCards = document.querySelectorAll(".cards-pro .card-pro");

function animatePresentCards() {
    presentCards.forEach((card, i) => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            setTimeout(() => card.classList.add("active"), i * 150);
        }
    });
}

window.addEventListener("scroll", animatePresentCards);

const ecoCards = document.querySelectorAll(".eco-card");

function animateEcoCards() {
    ecoCards.forEach((card, i) => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            setTimeout(() => card.classList.add("active"), i * 150);
        }
    });
}

window.addEventListener("scroll", animateEcoCards);

// ================= STATS ANIMADOS =================
const balanceEl = document.getElementById('balance');
const profitEl = document.getElementById('profit');
const usersEl = document.getElementById('users');

function animateValue(el, start, end, duration, suffix = '') {
    let current = start;
    const stepTime = Math.max(Math.floor(duration / (end - start)), 1);
    const timer = setInterval(() => {
        current += 1;
        el.textContent = current.toLocaleString() + suffix;
        if (current >= end) clearInterval(timer);
    }, stepTime);
}

animateValue(balanceEl, 41999990, 42000000, 1000, '$');
animateValue(profitEl, 0, 124, 1000, '%');
animateValue(usersEl, 19988, 20000, 1000);

// ================= MINI CHARTS DINÁMICOS =================
document.querySelectorAll('.mini-chart').forEach((canvas) => {
    const ctx = canvas.getContext('2d');
    const color = canvas.dataset.color === 'green' ? 'rgba(0,230,118,1)' : 'rgba(255,0,85,1)';
    
    const data = Array.from({length: 10}, () => Math.random() * 10 + 50);
    
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({length: 10}, (_, i) => i + 1),
            datasets: [{
                data: data,
                borderColor: color,
                backgroundColor: color.replace('1', '0.2'),
                borderWidth: 2,
                tension: 0.4,
                fill: true,
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { x: { display: false }, y: { display: false } }
        }
    });

    // ANIMACION DE MERCADO EN VIVO
    setInterval(() => {
        data.shift();
        data.push(Math.random() * 10 + 50);
        chart.update();
    }, 2000);
});

// ================= CAMBIO DINÁMICO DE STATUS =================
const rows = document.querySelectorAll('.fintech-table .row:not(.head)');
rows.forEach(row => {
    setInterval(() => {
        const status = row.querySelector('.status');
        const change = Math.random() > 0.5;
        status.textContent = change ? 'Activo' : 'Bajo';
        status.className = change ? 'status up' : 'status down';
    }, 4000);
});

// 6. SISTEMA DE GALERÍAS (CRECIMIENTO, INVERSIÓN, COMUNIDAD)
    function initGallery(selector, captionId, intervalTime) {
        const section = document.querySelector(selector);
        if (!section) return;
        const slides = section.querySelectorAll('.gallery-image');
        const dots = section.querySelectorAll('.dot');
        const caption = document.getElementById(captionId);
        let index = 0;
        let timer;

        function update(newIdx) {
            slides.forEach(img => img.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            slides[newIdx].classList.add('active');
            dots[newIdx].classList.add('active');
            if (caption) caption.innerText = slides[newIdx].alt;
            index = newIdx;
        }

        section.querySelector('.next-btn')?.addEventListener('click', () => { update((index + 1) % slides.length); startAuto(); });
        section.querySelector('.prev-btn')?.addEventListener('click', () => { update((index - 1 + slides.length) % slides.length); startAuto(); });
        dots.forEach((dot, idx) => dot.addEventListener('click', () => { update(idx); startAuto(); }));

        function startAuto() { clearInterval(timer); timer = setInterval(() => update((index + 1) % slides.length), intervalTime); }
        startAuto();
    }

    initGallery('.galeria-crecimiento', 'imageCaption', 4000);
    initGallery('.galeria-inversion', 'galleryCaption', 5000);
    initGallery('.galeria-comunidad', 'communityCaption', 4500);

// 3. GRÁFICA (Chart.js)
    const ctx = document.getElementById('movveChart');
    if (ctx && typeof Chart !== 'undefined') {
        const chartCtx = ctx.getContext('2d');
        const gradient = chartCtx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(0, 255, 136, 0.3)');
        gradient.addColorStop(1, 'rgba(0, 255, 136, 0)');

        new Chart(chartCtx, {
            type: 'line',
            data: {
                labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
                datasets: [{
                    label: 'Rendimiento',
                    data: [12000, 19000, 15000, 25000, 22000, 30000],
                    borderColor: '#00ff88',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true,
                    backgroundColor: gradient
                }]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
        });
    }

// =================== MOVVE FLOATING BUTTON: ABRIR Y OCULTAR ===================
document.addEventListener("DOMContentLoaded", () => {
    const movveBtn = document.querySelector(".movve-floating-container");
    const movveMenu = document.getElementById("movveMenu");
    const footer = document.querySelector("footer");

    if (!movveBtn || !movveMenu || !footer) return;

    // Función para abrir/cerrar menú
    window.toggleMovveMenu = function() {
        movveMenu.classList.toggle("active");
        movveBtn.classList.toggle("menu-open"); // opcional para animaciones del botón
    };

    // Función para ocultar botón al llegar al footer
    function toggleMovveButton() {
        const scrollPos = window.scrollY + window.innerHeight;
        const footerTop = footer.offsetTop;

        if (scrollPos >= footerTop) {
            // Ocultar botón y cerrar menú si estaba abierto
            movveBtn.classList.add("hide-floating");
            movveMenu.classList.remove("active");
        } else {
            // Mostrar botón
            movveBtn.classList.remove("hide-floating");
        }
    }

    // Escuchar scroll y resize
    window.addEventListener("scroll", toggleMovveButton);
    window.addEventListener("resize", toggleMovveButton);

    // Ejecutar al inicio
    toggleMovveButton();
});

document.addEventListener("DOMContentLoaded", () => {
    const waBtn = document.getElementById("wa-radar");
    const footer = document.querySelector("footer");

    if (!waBtn || !footer) return;

    function toggleWaButton() {
        const scrollPos = window.scrollY + window.innerHeight;
        const footerTop = footer.offsetTop;

        if (scrollPos >= footerTop) {
            waBtn.classList.add("hide-floating");
            waBtn.classList.remove("show-floating");
        } else {
            waBtn.classList.add("show-floating");
            waBtn.classList.remove("hide-floating");
        }
    }

    // Escuchar scroll y resize
    window.addEventListener("scroll", toggleWaButton);
    window.addEventListener("resize", toggleWaButton);

    // Ejecutar al inicio
    toggleWaButton();
});

// 🔒 ENVOLVER TODO PARA QUE NO ROMPA NADA
document.addEventListener("DOMContentLoaded", () => {

    const LINK_MOVVE = "https://TU-LINK-AQUI.com";

    const popup = document.getElementById("trading-popup");
    const btn = document.getElementById("btnUrgente");
    const ceoText = document.getElementById("ceoText");
    const eventText = document.getElementById("eventText");

    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    // ===== POPUP INTELIGENTE =====
    setTimeout(() => popup?.classList.add("show"), 6000);

    setInterval(() => {
        popup?.classList.add("show");

        setTimeout(() => {
            popup?.classList.remove("show");
        }, 20000);

    }, 20000);
    
    window.closeTrading = () => popup?.classList.remove("show");

    // ===== MENSAJES DINÁMICOS =====
    const messages = [
        "El CEO está operando en tiempo real",
        "Nueva operación cerrada +3.2%",
        "+12 personas se unieron hace 5 min",
        "Sistema generando ingresos ahora mismo"
    ];

    let msgIndex = 0;

    setInterval(() => {
        if (ceoText) {
            msgIndex = (msgIndex + 1) % messages.length;
            ceoText.textContent = messages[msgIndex];
        }
    }, 4000);

    // ===== EVENTO DUBAI =====
    function getNextDubaiEvent() {
        const now = new Date();
        const dubai = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Dubai" }));

        let target = new Date(dubai);
        let day = dubai.getDay();

        let diff = 4 - day;
        if (diff < 0) diff += 7;

        if (diff === 0 && dubai.getHours() >= 13) diff = 7;

        target.setDate(dubai.getDate() + diff);
        target.setHours(13, 0, 0, 0);

        return target;
    }

    // ===== UPDATE GENERAL =====
    function updateAll() {

        const now = new Date();
        const dubai = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Dubai" }));
        const target = getNextDubaiEvent();
        const diff = target - dubai;

        // reloj
        const clockEl = document.getElementById("dubaiTime");
        if (clockEl) {
            clockEl.textContent = dubai.toLocaleTimeString();
        }

        if (diff > 0) {

            const d = Math.floor(diff / (1000*60*60*24));
            const h = Math.floor((diff / (1000*60*60)) % 24);
            const m = Math.floor((diff / (1000*60)) % 60);
            const s = Math.floor((diff / 1000) % 60);

            daysEl && (daysEl.textContent = d);
            hoursEl && (hoursEl.textContent = h);
            minutesEl && (minutesEl.textContent = m);
            secondsEl && (secondsEl.textContent = s);

            if (eventText) {
                if (d === 0 && h === 0 && m < 10) {
                    eventText.textContent = `🔥 Empieza en ${m}m ${s}s`;
                } else {
                    eventText.textContent = `⏳ En ${d}d ${h}h ${m}m`;
                }
            }

            btn?.classList.add("locked");
            btn?.classList.remove("active");
            if (btn) btn.textContent = "🔒 Disponible pronto";

        } else {

            if (eventText) eventText.textContent = "🚀 EN VIVO AHORA";

            btn?.classList.remove("locked");
            btn?.classList.add("active");

            if (btn) {
                btn.textContent = "🚀 Entrar ahora";
                btn.onclick = () => window.open(LINK_MOVVE, "_blank");
            }
        }
    }

    setInterval(updateAll, 1000);
    updateAll();

});
