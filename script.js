/* ============================================================
    MOVVE WALLET - SCRIPT PRINCIPAL (OPTIMIZADO NIVEL DIOS)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. NAVEGACIÓN Y MENÚ MÓVIL
    const nav = document.querySelector('.navbar');
    const mobileMenu = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    let lastScrollY = window.scrollY;

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        document.querySelectorAll('.nav-menu li a').forEach(n => n.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navLinks.classList.remove('active');
        }));
    }

    // 2. LÓGICA DE SCROLL (NAVBAR Y BOTÓN SUBIR)
    const scrollBtn = document.getElementById('scrollTop');
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        // Navbar esconder/mostrar
        if (nav) {
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                nav.style.transform = "translateY(-100%)";
            } else {
                nav.style.transform = "translateY(0)";
            }
            currentScrollY > 50 ? nav.classList.add('scrolled') : nav.classList.remove('scrolled');
        }

        // Visibilidad botón subir
        if (scrollBtn) {
            if (currentScrollY > 300) {
                scrollBtn.style.opacity = "1";
                scrollBtn.style.visibility = "visible";
                scrollBtn.style.transform = "translateY(0)";
            } else {
                scrollBtn.style.opacity = "0";
                scrollBtn.style.visibility = "hidden";
                scrollBtn.style.transform = "translateY(20px)";
            }
        }
        lastScrollY = currentScrollY;
    }, { passive: true });

    if (scrollBtn) {
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }


