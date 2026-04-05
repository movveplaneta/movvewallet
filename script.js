/* ============================================================
    MOVVE WALLET - SCRIPT PRINCIPAL (OPTIMIZADO NIVEL DIOS)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. NAVEGACIÓN Y MENÚ MÓVIL
    const nav = document.querySelector('.navbar');
    const mobileMenu = document.getElementById('mobile-menu');
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

    // 4. CONTADORES
    function startCounters() {
        const counter = (id, start, end, speed, prefix = "", suffix = "") => {
            let obj = document.getElementById(id);
            if (!obj) return;
            let current = start;
            let step = Math.ceil((end - start) / 100);
            let interval = setInterval(() => {
                current += step;
                if (current >= end) { current = end; clearInterval(interval); }
                obj.innerHTML = prefix + current.toLocaleString() + suffix;
            }, speed);
        };
        counter("balance", 0, 42637892364, 20, "$");
        counter("profit", 0, 124, 20, "", "%");
        counter("users", 0, 20540, 20);
    }
    startCounters();

    // 5. ANIMACIÓN BARRA PROGRESO
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        const finalWidth = progressFill.style.width;
        progressFill.style.width = '0';
        setTimeout(() => {
            progressFill.style.transition = "width 1.5s cubic-bezier(0.1, 0.5, 0.5, 1)";
            progressFill.style.width = finalWidth;
        }, 500);
    }

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

    // 7. EFECTO TYPING HERO
    const typing = document.getElementById("typing");
    if (typing) {
        const words = ["Digital", "Financiero", "Inteligente", "Web3", "Global"];
        let i = 0, j = 0, isDeleting = false;
        function type() {
            let currentWord = words[i];
            typing.textContent = isDeleting ? currentWord.substring(0, j--) : currentWord.substring(0, j++);
            if (!isDeleting && j === currentWord.length) { isDeleting = true; setTimeout(type, 1200); return; }
            if (isDeleting && j === 0) { isDeleting = false; i = (i + 1) % words.length; }
            setTimeout(type, isDeleting ? 50 : 90);
        }
        type();
    }
});

/* =========================
   🚀 MONETIZACIÓN Y POPUPS (FUERA DEL DOMCONTENTLOADED)
   ========================= */

function activarPush() {
    if (window.pushCargado) return;
    window.pushCargado = true;
    let script = document.createElement("script");
    script.src = "https://5gvci.com/act/files/tag.min.js?z=10800531";
    script.setAttribute("data-cfasync", "false");
    script.async = true;
    document.body.appendChild(script);
}

function esMovil() { return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent); }

window.addEventListener("load", () => {
    // Popup logic
    const popup = document.getElementById("popup");
    if (popup) {
        let tiempoGuardado = localStorage.getItem("popup_time");
        let ahora = Date.now();
        if (!tiempoGuardado || (ahora - parseInt(tiempoGuardado)) > 86400000) {
            popup.style.display = "flex";
        }
    }
    // Autostart push
    setTimeout(activarPush, 3000);
});

function continuar() {
    activarPush();
    localStorage.setItem("popup_time", Date.now().toString());
    const popup = document.getElementById("popup");
    if (popup) {
        popup.style.opacity = "0";
        setTimeout(() => popup.style.display = "none", 300);
    }
}

function toggleMovveMenu() {
    document.getElementById('movveMenu')?.classList.toggle('active');
}

// Cierre de menú flotante al clickear fuera
document.addEventListener('click', (e) => {
    const container = document.querySelector('.movve-floating-container');
    const menu = document.getElementById('movveMenu');
    if (menu?.classList.contains('active') && !container?.contains(e.target)) {
        menu.classList.remove('active');
    }
});
