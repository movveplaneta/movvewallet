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

/**
 * MOVVE WALLET - HERO ENGINE "GOD MODE" 
 * Enfoque: Alta Conversión, Seguridad y Fluidez.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    /* 1. CONFIGURACIÓN DE PALABRAS DE PODER (Psicología de Confianza) */
    const typingElement = document.getElementById("typing");
    if (typingElement) {
        // Palabras elegidas para eliminar el miedo y despertar la ambición
        const phrases = [
            "Seguro",       // Elimina el miedo al riesgo
            "Rentable",     // Despierta el deseo de ganancia
            "Verificable",  // Aporta transparencia (Blockchain)
            "Escalable",    // Habla de crecimiento futuro
            "Automatizado"  // Promete libertad de tiempo
        ];
        
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 150;

        function typeEffect() {
            const currentPhrase = phrases[phraseIndex];
            
            // Lógica de tipeo con variaciones de velocidad para realismo
            if (isDeleting) {
                typingElement.textContent = currentPhrase.substring(0, charIndex--);
                typeSpeed = 60; 
            } else {
                typingElement.textContent = currentPhrase.substring(0, charIndex++);
                typeSpeed = 120;
            }

            // Pausas estratégicas para que el usuario lea la palabra completa
            if (!isDeleting && charIndex > currentPhrase.length) {
                isDeleting = true;
                typeSpeed = 2500; // Pausa larga al terminar: permite asimilar el mensaje
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 400; 
            }

            setTimeout(typeEffect, typeSpeed);
        }
        typeEffect();
    }

    /* 2. MOTOR DE USUARIOS EN VIVO (Simulación de Actividad Real) */
    const liveUsersText = document.querySelector(".live-users");
    if (liveUsersText) {
        let currentUsers = 128;
        setInterval(() => {
            // Variación orgánica: nunca baja de 110, nunca sube de 160 bruscamente
            const change = Math.floor(Math.random() * 5) - 2; // -2, -1, 0, 1, 2
            currentUsers = Math.max(115, Math.min(158, currentUsers + change));
            liveUsersText.innerHTML = `🟢 <strong style="color: #00ff88;">${currentUsers}</strong> personas activas ahora mismo`;
        }, 4000);
    }

    /* 3. PARALLAX INTELIGENTE (Profundidad Visual) */
    const heroContent = document.querySelector(".hero-content");
    const videoBg = document.querySelector(".hero-bg-video");

    window.addEventListener("scroll", () => {
        const scroll = window.scrollY;
        if (scroll < 900) {
            // El contenido sube más lento (efecto cine)
            if(heroContent) heroContent.style.transform = `translateY(${scroll * 0.25}px)`;
            // El video se mueve sutilmente hacia abajo
            if(videoBg) videoBg.style.transform = `translateY(${scroll * 0.1}px)`;
            // Desvanecimiento suave
            if(heroContent) heroContent.style.opacity = 1 - (scroll / 700);
        }
    }, { passive: true });

    /* 4. REVELACIÓN DE STATS (Efecto Contador) */
    const stats = document.querySelectorAll('.hero-stats-live strong');
    const revealStats = () => {
        stats.forEach(stat => {
            const rect = stat.getBoundingClientRect();
            if (rect.top < window.innerHeight && !stat.dataset.animated) {
                stat.dataset.animated = "true";
                const target = stat.innerText.replace(/[^0-9]/g, '');
                if(!isNaN(target) && target > 0) {
                   // Aquí podrías meter una lógica de conteo si los números fueran solo dígitos
                }
            }
        });
    };
    window.addEventListener('scroll', revealStats);

    /* 5. MICRO-INTERACCIÓN EN BOTONES (Feedback Visual) */
    document.querySelectorAll('.btn-principal, .btn-secundario').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = "scale(1.05) translateY(-3px)";
            btn.style.boxShadow = "0 10px 20px rgba(0, 255, 136, 0.3)";
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = "scale(1) translateY(0)";
            btn.style.boxShadow = "none";
        });
    });

    /* 6. CARGA INICIAL "GLASS-FADE" */
    if (heroContent) {
        heroContent.style.opacity = "0";
        heroContent.style.filter = "blur(10px)";
        setTimeout(() => {
            heroContent.style.transition = "all 1.5s cubic-bezier(0.16, 1, 0.3, 1)";
            heroContent.style.opacity = "1";
            heroContent.style.filter = "blur(0px)";
        }, 200);
    }
});
