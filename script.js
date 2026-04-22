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
