// ================= NAVBAR =================

const navbar = document.querySelector(".navbar");
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-links");
const navLinks = document.querySelectorAll(".nav-menu a");

let lastScroll = 0;

window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.style.transform = "translateY(-100%)";
    } else {
        navbar.style.transform = "translateY(0)";
    }

    lastScroll = currentScroll;
});

// ================= MENU =================

menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
    document.body.classList.toggle("no-scroll");
});

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        menuToggle.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.classList.remove("no-scroll");
    });
});

// ================= SCROLL SUAVE =================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

// ================= WHATSAPP FLOAT =================

document.addEventListener("DOMContentLoaded", () => {
    const waBtn = document.getElementById("wa-radar");
    const footer = document.querySelector("footer");

    if (!waBtn || !footer) return;

    function toggleWaButton() {
        const scrollPos = window.scrollY + window.innerHeight;
        const footerTop = footer.offsetTop;

        if (scrollPos >= footerTop) {
            waBtn.classList.add("hide-floating");
        } else {
            waBtn.classList.remove("hide-floating");
        }
    }

    window.addEventListener("scroll", toggleWaButton);
    toggleWaButton();
});

// PARTICULAS
const container = document.getElementById("particles");
for (let i = 0; i < 40; i++) {
    let p = document.createElement("div");
    p.classList.add("particle");
    p.style.left = Math.random() * 100 + "%";
    p.style.animationDuration = (5 + Math.random() * 10) + "s";
    p.style.animationDelay = Math.random() * 5 + "s";
    container.appendChild(p);
}

// SCROLL ANIMATION
const elements = document.querySelectorAll(".fade, .resumen-card");

const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add("show");
        }
    });
}, { threshold: 0.2 });

elements.forEach(el => observer.observe(el));

// BOTON SCROLL TOP
const scrollBtn = document.getElementById("scrollTop");

// MOSTRAR / OCULTAR
window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        scrollBtn.classList.add("show");
    } else {
        scrollBtn.classList.remove("show");
    }
});

// CLICK → SUBIR SUAVE
scrollBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

document.addEventListener("DOMContentLoaded", function () {

    const boton = document.getElementById("wa-radar");
    const badge = document.getElementById("waBadge");
    const title = document.getElementById("waTitle");
    const icon = document.getElementById("waIcon");

    const estados = [
        {
            badge: "ATENCIÓN DIRECTA",
            title: "Escríbenos ahora",
            link: "https://wa.me/18495942190?text=Hola",
            clase: "estado-1",
            icono: "fab fa-whatsapp"
        },
        {
            badge: "ACCESO RÁPIDO",
            title: "Entrar al sistema",
            link: "https://app.movvewallet.com/register/TBwPNoUJCphFFh52NaizpC8kAgy5xAmHi8",
            clase: "estado-2",
            icono: "fas fa-user-plus"
        }
    ];

    let index = 0;

    setInterval(() => {
        index = (index + 1) % estados.length;

        // Texto
        badge.textContent = estados[index].badge;
        title.textContent = estados[index].title;

        // Link
        boton.href = estados[index].link;

        // Clase
        boton.classList.remove("estado-1", "estado-2");
        boton.classList.add(estados[index].clase);

        // ICONO (FIX CLAVE)
        icon.className = estados[index].icono;

    }, 10000);

});
