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
