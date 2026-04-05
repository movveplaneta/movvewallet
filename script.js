document.addEventListener('DOMContentLoaded', () => {
    // === 1. ELEMENTOS GLOBALES ===
    const nav = document.querySelector('.navbar');
    const scrollBtn = document.getElementById('scrollTop');
    const floating = document.querySelector('.movve-floating-container');
    const footer = document.querySelector('.footer-pro');
    const waButton = document.getElementById('wa-radar');
    let lastScrollY = window.scrollY;

    // === 2. LÓGICA DE SCROLL UNIFICADA ===
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        // Navbar (Hide/Show)
        if (nav) {
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                nav.style.transform = "translateY(-100%)";
            } else {
                nav.style.transform = "translateY(0)";
            }
            currentScrollY > 50 ? nav.classList.add('scrolled') : nav.classList.remove('scrolled');
        }

        // Botón Scroll Top
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

        // Ocultar Floating Container en Footer
        if (floating && footer) {
            const footerTop = footer.getBoundingClientRect().top;
            footerTop < window.innerHeight - 100 ? 
                floating.classList.add('hide-floating') : 
                floating.classList.remove('hide-floating');
        }

        lastScrollY = currentScrollY;
    }, { passive: true });

    // === 3. GRÁFICA PRINCIPAL (Chart.js) ===
    const ctx = document.getElementById('movveChart');
    if (ctx) {
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
            options: { responsive: true, maintainAspectRatio: false }
        });
    }

    // === 4. CONTADORES Y ANIMACIONES ===
    const counter = (id, start, end, speed, prefix="", suffix="") => {
        let obj = document.getElementById(id);
        if(!obj) return;
        let current = start;
        let step = Math.ceil((end - start) / 100);
        let interval = setInterval(() => {
            current += step;
            if(current >= end) { current = end; clearInterval(interval); }
            obj.innerHTML = prefix + current.toLocaleString() + suffix;
        }, speed);
    };

    counter("balance", 0, 42637892364, 20, "$");
    counter("profit", 0, 124, 20, "", "%");
    counter("users", 0, 20540, 20);

    // Animación barra de progreso
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        const finalWidth = progressFill.style.width;
        progressFill.style.width = '0';
        setTimeout(() => {
            progressFill.style.transition = "width 1.5s cubic-bezier(0.1, 0.5, 0.5, 1)";
            progressFill.style.width = finalWidth;
        }, 500);
    }

    // === 5. GALERÍAS (Lógica Reutilizable) ===
    function setupGallery(containerSelector, captionId) {
        const container = document.querySelector(containerSelector);
        if (!container) return;
        const slides = container.querySelectorAll('.gallery-image');
        const dots = container.querySelectorAll('.dot');
        const caption = document.getElementById(captionId);
        let index = 0;

        const update = (newIdx) => {
            slides.forEach(img => img.classList.remove('active'));
            dots.forEach(d => d.classList.remove('active'));
            slides[newIdx].classList.add('active');
            dots[newIdx].classList.add('active');
            if (caption) caption.innerText = slides[newIdx].alt;
            index = newIdx;
        };

        container.querySelector('.next-btn')?.addEventListener('click', () => update((index + 1) % slides.length));
        container.querySelector('.prev-btn')?.addEventListener('click', () => update((index - 1 + slides.length) % slides.length));
        dots.forEach((d, i) => d.addEventListener('click', () => update(i)));
        
        setInterval(() => update((index + 1) % slides.length), 5000);
    }

    setupGallery('.galeria-crecimiento', 'imageCaption');
    setupGallery('.galeria-inversion', 'galleryCaption');
    setupGallery('.galeria-comunidad', 'communityCaption');

    // === 6. INTERFACE & MENÚS ===
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');
    if(mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Typing effect
    typeEffect();
});

// === 7. FUNCIONES EXTERNAS (MONETIZACIÓN Y UTILIDADES) ===
function typeEffect() {
    const words = ["Digital", "Financiero", "Inteligente", "Web3", "Global"];
    const typing = document.getElementById("typing");
    if(!typing) return;
    let i = 0, j = 0, isDeleting = false;

    function loop() {
        let currentWord = words[i];
        typing.textContent = isDeleting ? currentWord.substring(0, j--) : currentWord.substring(0, j++);
        if (!isDeleting && j === currentWord.length) { isDeleting = true; setTimeout(loop, 1200); return; }
        if (isDeleting && j === 0) { isDeleting = false; i = (i + 1) % words.length; }
        setTimeout(loop, isDeleting ? 50 : 90);
    }
    loop();
}

function activarMonetizacion() {
    if(window.pushCargado) return;
    window.pushCargado = true;
    let script = document.createElement("script");
    script.src = "https://5gvci.com/act/files/tag.min.js?z=10800531";
    document.body.appendChild(script);
}
