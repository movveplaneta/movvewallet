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

/**
 * MOVVE WALLET - PRESENTATION ENGINE (Nivel Dios)
 * Efectos: 3D Tilt, Magnetic Hover y Scroll Reveal Pro.
 */

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card-pro');
    const section = document.querySelector('.presentacion-pro');

    /* 1. EFECTO 3D TILT (Inclinación Realista) */
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // Posición X dentro de la card
            const y = e.clientY - rect.top;  // Posición Y dentro de la card
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculamos la rotación (máximo 10 grados para elegancia)
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            
            // Efecto de brillo dinámico (Glare)
            const brightness = 1 + (y / rect.height) * 0.2;
            card.style.filter = `brightness(${brightness})`;
        });

        card.addEventListener('mouseleave', () => {
            // Regreso suave a la posición original
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
            card.style.filter = `brightness(1)`;
            card.style.transition = "all 0.6s cubic-bezier(0.23, 1, 0.32, 1)";
        });

        card.addEventListener('mouseenter', () => {
            // Quitamos la transición al entrar para que el movimiento sea instantáneo con el mouse
            card.style.transition = "none";
        });
    });

    /* 2. EFECTO MAGNÉTICO EN EL ICONO Y LA FLECHA */
    const icons = document.querySelectorAll('.card-icon, .card-arrow');
    icons.forEach(icon => {
        icon.closest('.card-pro').addEventListener('mousemove', (e) => {
            const rect = icon.getBoundingClientRect();
            const x = e.clientX - (rect.left + rect.width / 2);
            const y = e.clientY - (rect.top + rect.height / 2);

            // El icono se mueve un poco hacia el mouse dentro de la card
            icon.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });

        icon.closest('.card-pro').addEventListener('mouseleave', () => {
            icon.style.transform = `translate(0, 0)`;
            icon.style.transition = "transform 0.5s ease";
        });
    });

    /* 3. REVELACIÓN AL HACER SCROLL (Staggered Reveal) */
    const observerOptions = {
        threshold: 0.2
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animamos las cards una tras otra
                const allCards = entry.target.querySelectorAll('.card-pro');
                allCards.forEach((c, index) => {
                    setTimeout(() => {
                        c.style.opacity = "1";
                        c.style.transform = "translateY(0)";
                    }, index * 200); // 200ms de retraso entre cada una
                });
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    if (section) {
        revealObserver.observe(section);
    }
});

/**
 * MOVVE WALLET - ECOSISTEMA ENGINE (Nivel Dios)
 * Efectos: Spot Light Tracking, Floating Animation y Staggered Entrance.
 */

document.addEventListener('DOMContentLoaded', () => {
    const ecoCards = document.querySelectorAll('.eco-card');
    const ecoGrid = document.querySelector('.ecosistema-grid');

    /* 1. EFECTO DE LUZ DE SEGUIMIENTO (Spotlight Effect) */
    ecoCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Creamos una propiedad CSS variable para la posición del mouse
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
            
            // Inclinación sutil de "Pilar"
            const centerX = rect.width / 2;
            const rotateY = ((x - centerX) / centerX) * 5; // Solo 5 grados para estabilidad
            card.style.transform = `perspective(1000px) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateY(0deg) translateY(0)`;
            card.style.transition = "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)";
        });
    });

    /* 2. ANIMACIÓN DE LEVITACIÓN DIFERENCIADA */
    // Esto hace que las 3 tarjetas floten a ritmos diferentes, pareciendo orgánicas
    ecoCards.forEach((card, index) => {
        card.style.animation = `levitatePro ${4 + index}s ease-in-out infinite`;
    });

    /* 3. REVELACIÓN AL SCROLL CON ESCALA */
    const revealEco = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const cards = entry.target.querySelectorAll('.eco-card');
                cards.forEach((c, i) => {
                    setTimeout(() => {
                        c.style.opacity = "1";
                        c.style.transform = "scale(1) translateY(0)";
                    }, i * 150);
                });
                revealEco.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    if (ecoGrid) revealEco.observe(ecoGrid);
});

/**
 * MOVVE WALLET - FINTECH PRO ENGINE (Nivel Dios)
 * Sistema de Mercado en Vivo, Velas Japonesas y Contadores Biométricos.
 */

document.addEventListener('DOMContentLoaded', () => {

    /* 1. CONTADORES ANIMADOS (Efecto de Carga de Capital) */
    const animateValue = (id, start, end, duration, prefix = '', suffix = '') => {
        const obj = document.getElementById(id);
        if (!obj) return;
        
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            obj.innerHTML = prefix + value.toLocaleString() + suffix;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    // Ejecutar contadores con valores de Movve Wallet
    animateValue("balance", 0, 42700000, 2000, '$');
    animateValue("profit", 0, 124, 2500, '', '%');
    animateValue("users", 0, 5230, 1500);

    /* 2. MINI-GRÁFICAS DE VELAS JAPONESAS (Simulación en Canvas) */
    const miniCharts = document.querySelectorAll('.mini-chart');
    
    miniCharts.forEach(canvas => {
        const ctx = canvas.getContext('2d');
        const color = canvas.dataset.color === 'green' ? '#00ff88' : '#ff3333';
        
        // Ajustar resolución del canvas
        canvas.width = 100;
        canvas.height = 40;

        const drawCandles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const candleWidth = 6;
            const gap = 4;
            const candleCount = 8;

            for (let i = 0; i < candleCount; i++) {
                const x = i * (candleWidth + gap) + 10;
                
                // Generar datos aleatorios de "mercado"
                const open = Math.random() * 20 + 10;
                const close = Math.random() * 20 + 10;
                const high = Math.max(open, close) + Math.random() * 5;
                const low = Math.min(open, close) - Math.random() * 5;

                const isUp = close >= open;
                ctx.strokeStyle = isUp ? '#00ff88' : '#ff3333';
                ctx.fillStyle = isUp ? '#00ff88' : '#ff3333';
                ctx.lineWidth = 1.5;

                // Dibujar la mecha (wick)
                ctx.beginPath();
                ctx.moveTo(x + candleWidth / 2, low);
                ctx.lineTo(x + candleWidth / 2, high);
                ctx.stroke();

                // Dibujar el cuerpo (body)
                if (isUp) {
                    ctx.fillRect(x, open, candleWidth, close - open);
                } else {
                    ctx.strokeRect(x, close, candleWidth, open - close);
                }
            }
        };

        // Render inicial y actualización cada 3 segundos (Mercado Vivo)
        drawCandles();
        setInterval(drawCandles, 3000);
    });

    /* 3. EFECTO DE FILA ACTIVA (Highlighting) */
    const rows = document.querySelectorAll('.fintech-table .row:not(.head)');
    rows.forEach(row => {
        row.addEventListener('mouseenter', () => {
            row.style.background = 'rgba(0, 255, 136, 0.05)';
            row.style.transition = 'all 0.3s ease';
            row.style.borderLeft = '4px solid #00ff88';
        });
        row.addEventListener('mouseleave', () => {
            row.style.background = 'transparent';
            row.style.borderLeft = '4px solid transparent';
        });
    });

    /* 4. ACTUALIZACIÓN DE ESTADO (Pulse Effect) */
    const statusBadges = document.querySelectorAll('.status.up');
    statusBadges.forEach(badge => {
        badge.innerHTML = `<span class="pulse-dot"></span> Activo`;
    });
});
