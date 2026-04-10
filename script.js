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

// ================= INIT =================
document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll(".mini-chart").forEach(canvas => {
        iniciarVelas(canvas);
    });

});


// ================= GENERAR VELAS =================
function generarVelas(cantidad = 30) {

    let data = [];
    let precio = 100;

    for (let i = 0; i < cantidad; i++) {

        let open = precio;
        let close = open + (Math.random() - 0.5) * 4;
        let high = Math.max(open, close) + Math.random() * 2;
        let low = Math.min(open, close) - Math.random() * 2;

        data.push({ open, high, low, close });

        precio = close;
    }

    return data;
}


// ================= MOTOR PRINCIPAL =================
function iniciarVelas(canvas) {

    const ctx = canvas.getContext("2d");
    let velas = generarVelas();

    function render() {

        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        dibujarVelas(ctx, canvas, velas);

        actualizarMercado(velas);
    }

    render();
    setInterval(render, 3000);
}


// ================= DIBUJAR VELAS =================
function dibujarVelas(ctx, canvas, velas) {

    const w = canvas.width;
    const h = canvas.height;

    const max = Math.max(...velas.map(v => v.high));
    const min = Math.min(...velas.map(v => v.low));

    const candleWidth = w / velas.length * 0.6;
    const gap = w / velas.length;

    ctx.clearRect(0, 0, w, h);

    velas.forEach((v, i) => {

        const x = i * gap + gap / 2;

        // escalar precios a canvas
        const yOpen = escalar(v.open, min, max, h);
        const yClose = escalar(v.close, min, max, h);
        const yHigh = escalar(v.high, min, max, h);
        const yLow = escalar(v.low, min, max, h);

        const isUp = v.close >= v.open;

        const color = isUp ? "#00e676" : "#ff5252";

        // MECHA
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;
        ctx.moveTo(x, yHigh);
        ctx.lineTo(x, yLow);
        ctx.stroke();

        // CUERPO
        ctx.beginPath();
        ctx.fillStyle = color;

        const bodyTop = Math.min(yOpen, yClose);
        const bodyHeight = Math.abs(yClose - yOpen);

        ctx.fillRect(
            x - candleWidth / 2,
            bodyTop,
            candleWidth,
            bodyHeight || 1
        );

    });
}


// ================= ESCALA =================
function escalar(valor, min, max, height) {
    return height - ((valor - min) / (max - min)) * height;
}


// ================= MERCADO EN VIVO =================
function actualizarMercado(velas) {

    let ultima = velas[velas.length - 1];

    let open = ultima.close;
    let close = open + (Math.random() - 0.5) * 3;
    let high = Math.max(open, close) + Math.random() * 1.5;
    let low = Math.min(open, close) - Math.random() * 1.5;

    velas.push({ open, high, low, close });
    velas.shift(); // mantener tamaño
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

    // 🔊 SONIDO EN VIVO
    const liveSound = document.getElementById("liveSound");
    let wasLive = false;

    // ===== POPUP INTELIGENTE =====
    setTimeout(() => popup?.classList.add("show"), 6000);

    setInterval(() => {
        popup?.classList.add("show");

        setTimeout(() => {
            popup?.classList.remove("show");
        }, 10000);

    }, 50000);

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

    // ===== TIEMPO COLOMBIA =====
    function getColombiaTime() {
        return new Date(new Date().toLocaleString("en-US", {
            timeZone: "America/Bogota"
        }));
    }

    function getNextThursday8AM() {
        const now = getColombiaTime();
        const target = new Date(now);

        const day = now.getDay();
        let diff = 4 - day;

        if (diff < 0) diff += 7;

        // si ya pasó 9:15 AM → siguiente semana
        if (diff === 0 && (now.getHours() > 9 || (now.getHours() === 9 && now.getMinutes() >= 15))) {
            diff = 7;
        }

        target.setDate(now.getDate() + diff);
        target.setHours(8, 0, 0, 0);

        return target;
    }

    // ===== UPDATE GENERAL =====
    function updateAll() {

        const now = getColombiaTime();
        const target = getNextThursday8AM();

        const liveStart = new Date(target);
        const liveEnd = new Date(target);
        liveEnd.setMinutes(30); // 8:30 AM

        const openEnd = new Date(target);
        openEnd.setHours(9, 15, 0, 0);

        const diff = target - now;

        // reloj
        const clockEl = document.getElementById("dubaiTime");
        if (clockEl) {
            clockEl.textContent = now.toLocaleTimeString("es-CO");
        }

        // ===== ESTADO 1: EN VIVO =====
        if (now >= liveStart && now < liveEnd) {

            if (eventText) eventText.textContent = "🚀 EN VIVO AHORA";

            // 🔊 SONIDO SOLO 1 VEZ
            if (!wasLive) {
                liveSound?.play().catch(() => {});
                wasLive = true;
            }

            btn?.classList.remove("locked");
            btn?.classList.add("active");

            if (btn) {
                btn.textContent = "🚀 Ver en vivo";
                btn.onclick = () => window.open(LINK_MOVVE, "_blank");
            }

        } 

        // ===== ESTADO 2: DISPONIBLE =====
        else if (now >= liveEnd && now < openEnd) {

            if (eventText) eventText.textContent = "🚀 Disponible ahora";

            btn?.classList.remove("locked");
            btn?.classList.add("active");

            if (btn) {
                btn.textContent = "🚀 Entrar ahora";
                btn.onclick = () => window.open(LINK_MOVVE, "_blank");
            }

        } 

        // ===== ESTADO 3: CUENTA REGRESIVA =====
        else if (now < target) {

            const d = Math.floor(diff / (1000 * 60 * 60 * 24));
            const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const m = Math.floor((diff / (1000 * 60)) % 60);
            const s = Math.floor((diff / 1000) % 60);

            daysEl && (daysEl.textContent = d);
            hoursEl && (hoursEl.textContent = h);
            minutesEl && (minutesEl.textContent = m);
            secondsEl && (secondsEl.textContent = s);

            if (eventText) {
                eventText.textContent =
                    (d === 0 && h === 0 && m < 10)
                        ? `🔥 Empieza en ${m}m ${s}s`
                        : `⏳ En ${d}d ${h}h ${m}m`;
            }

            btn?.classList.add("locked");
            btn?.classList.remove("active");

            if (btn) btn.textContent = "🔒 Disponible pronto";
        }

        // ===== ESTADO 4: FINALIZADO =====
        else {

            if (eventText) eventText.textContent = "🔒 Evento finalizado";

            btn?.classList.add("locked");
            btn?.classList.remove("active");

            if (btn) btn.textContent = "🔒 Disponible pronto";
        }

        // 🔁 RESET DEL SONIDO (IMPORTANTE)
        if (!(now >= liveStart && now < liveEnd)) {
            wasLive = false;
        }
    }

    setInterval(updateAll, 1000);
    updateAll();

});

// ================= PDF MODAL COMPLETO =================

document.addEventListener("DOMContentLoaded", () => {

    const modal = document.getElementById("pdfModal");

    // ===== ABRIR =====
    window.openPdfSelector = function(e) {
        e.preventDefault();
        modal.classList.add("active");
    };

    // ===== CERRAR =====
    window.closePdf = function() {
        modal.classList.remove("active");
    };

    // ===== CLICK FUERA =====
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("active");
        }
    });

    // ===== TECLA ESC =====
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            modal.classList.remove("active");
        }
    });

});
