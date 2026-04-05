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
