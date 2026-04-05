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

// ================= HERO DINÁMICO =================

// ===== TYPING EFECTO =====
const typingElement = document.getElementById("typing");
const typingWords = ["ganancias", "libertad financiera", "ingresos pasivos", "experiencia automática"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const current = typingWords[wordIndex];
    let displayed = current.substring(0, charIndex);

    typingElement.textContent = displayed;

    if (!isDeleting && charIndex < current.length) {
        charIndex++;
        setTimeout(type, 120);
    } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(type, 60);
    } else {
        isDeleting = !isDeleting;
        if (!isDeleting) {
            wordIndex = (wordIndex + 1) % typingWords.length;
        }
        setTimeout(type, 800);
    }
}

type();

// ===== USUARIOS EN VIVO =====
const liveUsers = document.querySelector(".live-users");

function updateLiveUsers() {
    const randomUsers = Math.floor(100 + Math.random() * 50);
    liveUsers.textContent = `🟢 ${randomUsers} personas activas ahora mismo`;
}
setInterval(updateLiveUsers, 5000);

// ===== STATS ANIMADOS AL SCROLL =====
const stats = document.querySelectorAll(".hero-stats-live strong");

function animateStats() {
    stats.forEach(stat => {
        const target = parseInt(stat.textContent.replace(/\D/g, "")) || 0;
        let count = 0;
        const increment = Math.ceil(target / 100);
        const interval = setInterval(() => {
            count += increment;
            if (count >= target) {
                count = target;
                clearInterval(interval);
            }
            stat.textContent = stat.textContent.includes("%") ? `${count}%` : `$${count.toLocaleString()}`;
        }, 20);
    });
}

let statsAnimated = false;
window.addEventListener("scroll", () => {
    const heroStats = document.querySelector(".hero-stats-live");
    const rect = heroStats.getBoundingClientRect();
    if (!statsAnimated && rect.top < window.innerHeight) {
        animateStats();
        statsAnimated = true;
    }
});

// ===== BOTONES MICROINTERACCION =====
const heroBtns = document.querySelectorAll(".hero-buttons a");
heroBtns.forEach(btn => {
    btn.addEventListener("mouseenter", () => {
        btn.style.transform = "scale(1.05)";
    });
    btn.addEventListener("mouseleave", () => {
        btn.style.transform = "scale(1)";
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
    const stepTime = Math.max(Math.floor(duration / (end - start)), 20);
    const timer = setInterval(() => {
        current += 1;
        el.textContent = current.toLocaleString() + suffix;
        if (current >= end) clearInterval(timer);
    }, stepTime);
}

animateValue(balanceEl, 0, 42000000, 1500, '$');
animateValue(profitEl, 0, 124, 1500, '%');
animateValue(usersEl, 0, 20000, 1500);

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

// =================== BOTONES FLOTANTES OCULTAR/mostrar ===================

document.addEventListener("DOMContentLoaded", () => {
    const movveBtn = document.querySelector(".movve-floating-container");
    const waBtn = document.querySelector("#wa-radar");
    const footer = document.querySelector("footer"); // Asegúrate que tu footer tenga etiqueta <footer>

    if (!footer) return; // Si no hay footer, no hacer nada

    function toggleFloatingButtons() {
        const scrollPos = window.scrollY + window.innerHeight;
        const footerTop = footer.offsetTop;

        if (scrollPos >= footerTop) {
            // Ocultar botones
            movveBtn.classList.add("hide-floating");
            waBtn.classList.add("hide-floating");
        } else {
            // Mostrar botones
            movveBtn.classList.remove("hide-floating");
            waBtn.classList.remove("hide-floating");
        }
    }

    // Escuchar scroll y resize
    window.addEventListener("scroll", toggleFloatingButtons);
    window.addEventListener("resize", toggleFloatingButtons);

    // Ejecutar una vez al inicio
    toggleFloatingButtons();
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
