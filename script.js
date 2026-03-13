// Verifica que el script cargue
console.log("Script del Hero cargado");

const textElement = document.getElementById('typing');
const words = ["Global", "Sostenible", "Financiero", "Digital"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        textElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        textElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    // Velocidad: 150ms escribiendo, 75ms borrando
    let speed = isDeleting ? 75 : 150;

    if (!isDeleting && charIndex === currentWord.length) {
        speed = 2000; // Pausa al final de la palabra
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 500;
    }

    setTimeout(typeEffect, speed);
}

// Iniciar la función solo si el elemento existe
if (textElement) {
    typeEffect();
} else {
    console.error("No se encontró el elemento #typing");
}

document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        // 1. Si el usuario baja más de 100px, ocultar la barra
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            nav.style.transform = "translateY(-100%)";
            nav.style.boxShadow = "none";
        } 
        // 2. Si el usuario sube, mostrar la barra inmediatamente
        else {
            nav.style.transform = "translateY(0)";
        }

        // 3. Aplicar estilo de scroll (fondo difuminado) si no está arriba del todo
        if (currentScrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        lastScrollY = currentScrollY;
    });
});

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. ANIMACIÓN DE CONTADORES ---
    const counters = document.querySelectorAll('.counter');
    
    const animateCounters = () => {
        counters.forEach(el => {
            const target = +el.getAttribute('data-target');
            const prefix = el.getAttribute('data-prefix') || '';
            const suffix = el.getAttribute('data-suffix') || '';
            let current = 0;
            const increment = target / 50; // Velocidad de subida

            const updateCount = () => {
                current += increment;
                if (current < target) {
                    el.innerText = prefix + Math.floor(current).toLocaleString() + suffix;
                    setTimeout(updateCount, 20);
                } else {
                    el.innerText = prefix + target.toLocaleString() + suffix;
                }
            };
            updateCount();
        });
    };

    // --- 2. CONFIGURACIÓN DE LA GRÁFICA (Chart.js) ---
    const ctx = document.getElementById('movveChart');
    if (ctx) {
        const chartCtx = ctx.getContext('2d');
        
        // Creamos un degradado verde neón para el área debajo de la línea
        const gradient = chartCtx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(0, 255, 136, 0.3)'); // Verde neón suave
        gradient.addColorStop(1, 'rgba(0, 255, 136, 0)');   // Transparente

        new Chart(chartCtx, {
            type: 'line',
            data: {
                labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
                datasets: [{
                    label: 'Rendimiento',
                    data: [12000, 19000, 15000, 25000, 22000, 30000],
                    borderColor: '#00ff88', // Tu verde neón
                    borderWidth: 3,
                    pointBackgroundColor: '#ffffff',
                    pointBorderColor: '#00ff88',
                    pointHoverRadius: 7,
                    tension: 0.4, // Curva suave
                    fill: true,
                    backgroundColor: gradient
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false } // Ocultamos leyenda para minimalismo
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(255, 255, 255, 0.05)' },
                        ticks: { color: '#a0a0a0' }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { color: '#a0a0a0' }
                    }
                }
            }
        });
    }

    // --- 3. ANIMACIÓN DE BARRA DE PROGRESO ---
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        // Reiniciamos a 0 para animarla después
        const finalWidth = progressFill.style.width;
        progressFill.style.width = '0';
        
        setTimeout(() => {
            progressFill.style.transition = "width 1.5s cubic-bezier(0.1, 0.5, 0.5, 1)";
            progressFill.style.width = finalWidth;
        }, 500);
    }

    // Ejecutamos la animación de números
    animateCounters();
});

document.addEventListener('DOMContentLoaded', () => {
    const scrollBtn = document.getElementById('scrollTop');

    // 1. Lógica de Visibilidad (Aparece después de 300px de scroll)
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollBtn.style.opacity = "1";
            scrollBtn.style.visibility = "visible";
            scrollBtn.style.transform = "translateY(0)";
        } else {
            scrollBtn.style.opacity = "0";
            scrollBtn.style.visibility = "hidden";
            scrollBtn.style.transform = "translateY(20px)";
        }
    });

    // 2. Lógica de Click (Regreso suave al inicio)
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Desplazamiento fluido, no brusco
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // 1. Seleccionamos el contenedor principal de esta galería
    const galeria = document.querySelector('.galeria-crecimiento');
    if (!galeria) return; // Seguridad por si no existe en la página

    const slides = galeria.querySelectorAll('.gallery-image');
    const dots = galeria.querySelectorAll('.dot');
    const caption = document.getElementById('imageCaption'); // Selección directa por ID
    const btnNext = galeria.querySelector('.next-btn');
    const btnPrev = galeria.querySelector('.prev-btn');
    
    let currentIndex = 0;
    let autoPlayInterval;

    // 2. Función para cambiar imagen
    function updateGallery(index) {
        // Remover clases activas
        slides.forEach(img => img.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));

        // Activar la nueva
        slides[index].classList.add('active');
        dots[index].classList.add('active');

        // Actualizar el texto (País)
        if (caption) {
            caption.innerText = slides[index].alt;
        }

        currentIndex = index;
    }

    // 3. Funciones de control
    function nextSlide() {
        let index = (currentIndex + 1) % slides.length;
        updateGallery(index);
    }

    function prevSlide() {
        let index = (currentIndex - 1 + slides.length) % slides.length;
        updateGallery(index);
    }

    // 4. Iniciar / Reiniciar Autoplay
    function startAutoPlay() {
        stopAutoPlay(); // Limpiamos cualquier intervalo previo
        autoPlayInterval = setInterval(nextSlide, 4000); // 4 segundos
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    // 5. Eventos de Click
    btnNext.addEventListener('click', () => {
        nextSlide();
        startAutoPlay(); // Reinicia el tiempo al hacer click
    });

    btnPrev.addEventListener('click', () => {
        prevSlide();
        startAutoPlay();
    });

    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            updateGallery(idx);
            startAutoPlay();
        });
    });

    // 6. Arrancar por primera vez
    startAutoPlay();
});

document.addEventListener('DOMContentLoaded', () => {
    // 1. Buscamos específicamente el contenedor de INVERSIÓN
    const invSection = document.querySelector('.galeria-inversion');
    if (!invSection) return;

    const invImages = invSection.querySelectorAll('.gallery-image');
    const invDots = invSection.querySelectorAll('.dot');
    const invCaption = document.getElementById('galleryCaption');
    const invNext = invSection.querySelector('.next-btn');
    const invPrev = invSection.querySelector('.prev-btn');
    
    let invIndex = 0;
    let invInterval;

    // 2. Función de actualización
    function updateInversion(index) {
        invImages.forEach(img => img.classList.remove('active'));
        invDots.forEach(dot => dot.classList.remove('active'));

        invImages[index].classList.add('active');
        invDots[index].classList.add('active');

        if (invCaption) {
            invCaption.innerText = invImages[index].alt;
        }
        
        invIndex = index;
    }

    function nextInv() {
        let index = (invIndex + 1) % invImages.length;
        updateInversion(index);
    }

    function prevInv() {
        let index = (invIndex - 1 + invImages.length) % invImages.length;
        updateInversion(index);
    }

    // 3. Control del Temporizador
    function startInvAuto() {
        stopInvAuto();
        invInterval = setInterval(nextInv, 5000); // Cambia cada 5 segundos
    }

    function stopInvAuto() {
        clearInterval(invInterval);
    }

    // 4. Eventos
    invNext.addEventListener('click', () => {
        nextInv();
        startInvAuto();
    });

    invPrev.addEventListener('click', () => {
        prevInv();
        startInvAuto();
    });

    invDots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            updateInversion(idx);
            startInvAuto();
        });
    });

    // 5. Arrancar Autoplay
    startInvAuto();
});

document.addEventListener('DOMContentLoaded', () => {
    // 1. Selección exclusiva del contenedor de COMUNIDAD
    const commSection = document.querySelector('.galeria-comunidad');
    if (!commSection) return;

    const commImages = commSection.querySelectorAll('.gallery-image');
    const commDots = commSection.querySelectorAll('.dot');
    const commCaption = document.getElementById('communityCaption');
    const commNext = commSection.querySelector('.next-btn');
    const commPrev = commSection.querySelector('.prev-btn');
    
    let commIndex = 0;
    let commInterval;

    // 2. Función de actualización de vista
    function updateCommunity(index) {
        // Limpiar estados
        commImages.forEach(img => img.classList.remove('active'));
        commDots.forEach(dot => dot.classList.remove('active'));

        // Activar nuevos
        commImages[index].classList.add('active');
        commDots[index].classList.add('active');

        // Cambiar el texto usando el ALT de la imagen
        if (commCaption) {
            commCaption.innerText = commImages[index].alt;
        }
        
        commIndex = index;
    }

    function nextComm() {
        let index = (commIndex + 1) % commImages.length;
        updateCommunity(index);
    }

    function prevComm() {
        let index = (commIndex - 1 + commImages.length) % commImages.length;
        updateCommunity(index);
    }

    // 3. Sistema de Autoplay (Cada 4.5 segundos)
    function startCommAuto() {
        stopCommAuto();
        commInterval = setInterval(nextComm, 4500); 
    }

    function stopCommAuto() {
        clearInterval(commInterval);
    }

    // 4. Eventos de usuario
    commNext.addEventListener('click', () => {
        nextComm();
        startCommAuto(); // Reinicia el contador para que no salte rápido
    });

    commPrev.addEventListener('click', () => {
        prevComm();
        startCommAuto();
    });

    commDots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            updateCommunity(idx);
            startCommAuto();
        });
    });

    // 5. Encender la galería al cargar
    startCommAuto();
});