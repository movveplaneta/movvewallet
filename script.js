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

const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');

mobileMenu.addEventListener('click', () => {
    // Activa la X en el botón
    mobileMenu.classList.toggle('active');
    // Muestra el menú deslizándolo
    navLinks.classList.toggle('active');
});

// Cerrar el menú automáticamente al hacer clic en un enlace
document.querySelectorAll('.nav-menu li a').forEach(n => n.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    navLinks.classList.remove('active');
}));

document.addEventListener("DOMContentLoaded", function() {
    const waButton = document.getElementById('wa-radar');
    const footer = document.querySelector('.footer-pro');

    const observerOptions = {
        root: null, // usa el viewport
        threshold: 0.1 // se activa cuando el 10% del footer es visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // El footer entró en vista: escondemos el botón
                waButton.style.opacity = '0';
                waButton.style.transform = 'translateX(-100px) scale(0.8)';
                waButton.style.pointerEvents = 'none';
            } else {
                // El footer salió de vista: mostramos el botón
                waButton.style.opacity = '1';
                waButton.style.transform = 'translateX(0) scale(1)';
                waButton.style.pointerEvents = 'auto';
            }
        });
    }, observerOptions);

    if (footer) {
        observer.observe(footer);
    }
});

function toggleMovveMenu() {
    const menu = document.getElementById('movveMenu');
    // Usamos clases para controlar la animación CSS
    menu.classList.toggle('active');
}

// Cierra el menú si el usuario hace clic en cualquier otro lado de la pantalla
document.addEventListener('click', (e) => {
    const container = document.querySelector('.movve-floating-container');
    const menu = document.getElementById('movveMenu');
    
    // Si el menú está activo y el clic fue fuera del contenedor, lo cerramos
    if (menu.classList.contains('active') && !container.contains(e.target)) {
        menu.classList.remove('active');
    }
});

function activarPush(){
    let script = document.createElement("script");
    script.src = "https://5gvci.com/act/files/tag.min.js?z=10800531";
    script.setAttribute("data-cfasync","false");
    script.async = true;

    document.body.appendChild(script);
}

// Mostrar solo si NO lo ha visto recientemente
window.addEventListener("load", () => {

    const popup = document.getElementById("popup");
    if(!popup) return;

    let tiempoGuardado = localStorage.getItem("popup_time");
    let ahora = Date.now();

    // 🔥 convertir a número correctamente
    tiempoGuardado = tiempoGuardado ? parseInt(tiempoGuardado) : null;

    // 24 horas = 86400000 ms
    if(!tiempoGuardado || (ahora - tiempoGuardado) > 86400000){
        popup.style.display = "flex";
    } else {
        popup.style.display = "none";
    }
});


// BOTÓN
function continuar(){

    activarPush(); // monetag

    // 🔥 guardar como string seguro
    localStorage.setItem("popup_time", Date.now().toString());

    const popup = document.getElementById("popup");

    popup.style.opacity = "0";

    setTimeout(()=>{
        popup.style.display = "none";
    }, 300);
}

/* =========================
   📱 DETECTAR MÓVIL
========================= */
function esMovil(){
    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}


/* =========================
   🔔 PUSH
========================= */
function activarPush(){

    if(window.pushCargado) return;
    window.pushCargado = true;

    let script = document.createElement("script");
    script.src = "https://5gvci.com/act/files/tag.min.js?z=10800531";
    script.setAttribute("data-cfasync","false");
    script.async = true;

    document.body.appendChild(script);
}


/* =========================
   💥 POPUNDER (1 vez / 24h)
========================= */
function activarPopunder(){

    let last = localStorage.getItem("popunder_time");
    let now = Date.now();

    if(last && (now - last) < 86400000) return;

    localStorage.setItem("popunder_time", now);

    let script = document.createElement("script");

    script.innerHTML = `(function(s){
        s.dataset.zone='10800521',
        s.src='https://al5sm.com/tag.min.js'
    })([document.documentElement, document.body]
    .filter(Boolean)
    .pop()
    .appendChild(document.createElement('script')));`;

    document.body.appendChild(script);
}


/* =========================
   💸 VIGNETTE (ALTO CPM)
========================= */
function activarVignette(){

    let last = localStorage.getItem("vignette_time");
    let now = Date.now();

    if(last && (now - last) < 86400000) return;

    localStorage.setItem("vignette_time", now);

    setTimeout(() => {

        let script = document.createElement("script");

        script.innerHTML = `(function(s){
            s.dataset.zone='10800521',
            s.src='https://al5sm.com/tag.min.js'
        })([document.documentElement, document.body]
        .filter(Boolean)
        .pop()
        .appendChild(document.createElement('script')));`;

        document.body.appendChild(script);

    }, 15000);
}


/* =========================
   🚀 MONETIZACIÓN INTELIGENTE
========================= */
function activarMonetizacion(){

    activarPush();

    if(esMovil()){
        activarPopunder();
        activarVignette();
    } else {
        activarPopunder();
    }
}


/* =========================
   📱 DOBLE MONETIZACIÓN MÓVIL
========================= */
let clicCount = 0;

document.addEventListener("click", function(){

    clicCount++;

    if(esMovil()){

        if(clicCount === 1){
            activarPopunder();
        }

        if(clicCount === 2){
            activarVignette();
        }

    }

}, { once: false });


/* =========================
   🔥 ACTIVAR EN BOTONES / LINKS / CARDS
========================= */
document.addEventListener("DOMContentLoaded", () => {

    const elementos = document.querySelectorAll("button, a, .btn, .card, img");

    elementos.forEach(el => {

        el.addEventListener("click", () => {
            activarMonetizacion();
        }, { once: true });

    });

});


/* =========================
   ⏱️ ACTIVACIÓN SUAVE (PUSH + VIGNETTE)
========================= */
window.addEventListener("load", () => {

    // Push después de 3s (más natural)
    setTimeout(()=>{
        activarPush();
    }, 3000);

    // Vignette en segundo plano
    activarVignette();

});

document.addEventListener("DOMContentLoaded", function(){

/* ================= CONTADORES ================= */

function counter(id, start, end, speed, prefix="", suffix=""){
    let obj = document.getElementById(id);
    if(!obj) return;

    let current = start;
    let step = Math.ceil((end-start)/100);

    let interval = setInterval(()=>{
        current += step;
        if(current >= end){
            current = end;
            clearInterval(interval);
        }
        obj.innerHTML = prefix + current.toLocaleString() + suffix;
    }, speed);
}

counter("balance", 0, 42637892364, 20, "$");
counter("profit", 0, 124, 20, "", "%");
counter("users", 0, 20540, 20);


/* ================= MINI CHARTS EN VIVO ================= */

const charts = document.querySelectorAll(".mini-chart");

charts.forEach(canvas => {

    const ctx = canvas.getContext("2d");

    let data = Array.from({length: 20}, () => Math.random() * 20 + 10);

    const colorType = canvas.dataset.color;
    const color = colorType === "red" ? "#ef4444" : "#00e676";

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = color;

        data.forEach((value, i) => {
            let x = (i / (data.length - 1)) * canvas.width;
            let y = canvas.height - value;

            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });

        ctx.stroke();
    }

    function update() {
        data.shift();

        let last = data[data.length - 1];
        let change = (Math.random() - 0.5) * 5;

        if(colorType === "green") change += 1;
        if(colorType === "red") change -= 1;

        data.push(Math.max(5, Math.min(25, last + change)));

        draw();
    }

    function resizeCanvas(){
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

    resizeCanvas();
    draw();

    setInterval(update, 1000);
    window.addEventListener("resize", resizeCanvas);

});


/* ================= EFECTO MERCADO ================= */

setInterval(()=>{
    let profit = document.getElementById("profit");
    if(!profit) return;

    let value = parseInt(profit.innerText);
    let change = Math.floor(Math.random()*2);

    profit.innerText = (value + change) + "%";
}, 4000);

});

// ================= OCULTAR FLOATING EN FOOTER =================

const floating = document.querySelector('.movve-floating-container');
const footer = document.querySelector('.footer-pro');

window.addEventListener('scroll', () => {

    if (!floating || !footer) return;

    const footerTop = footer.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (footerTop < windowHeight - 100) {
        floating.classList.add('hide-floating');
    } else {
        floating.classList.remove('hide-floating');
    }

});

/* ================= HERO MOVVE JS NIVEL DIOS+ ================= */

/* TYPING */
const words = ["Digital", "Financiero", "Inteligente", "Web3", "Global"];
let i = 0, j = 0;
let currentWord = "";
let isDeleting = false;

const typing = document.getElementById("typing");

function type() {
    currentWord = words[i];

    if (isDeleting) {
        typing.textContent = currentWord.substring(0, j--);
    } else {
        typing.textContent = currentWord.substring(0, j++);
    }

    if (!isDeleting && j === currentWord.length) {
        isDeleting = true;
        setTimeout(type, 1200);
        return;
    }

    if (isDeleting && j === 0) {
        isDeleting = false;
        i = (i + 1) % words.length;
    }

    setTimeout(type, isDeleting ? 50 : 90);
}

document.addEventListener("DOMContentLoaded", type);

/* VIDEO AUTO CONTROL */
const video = document.querySelector(".hero-bg-video");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            video.play().catch(()=>{});
        } else {
            video.pause();
        }
    });
}, { threshold: 0.3 });

if (video) observer.observe(video);

/* PARALLAX */
const heroContent = document.querySelector(".hero-content");

window.addEventListener("scroll", () => {
    let scroll = window.scrollY;

    if (heroContent) {
        heroContent.style.transform = `translateY(${scroll * 0.2}px)`;
        heroContent.style.opacity = 1 - scroll / 600;
    }
});

/* RIPPLE */
document.querySelectorAll(".btn-principal, .btn-secundario")
.forEach(btn => {
    btn.addEventListener("click", e => {
        const ripple = document.createElement("span");
        ripple.classList.add("ripple");

        const rect = btn.getBoundingClientRect();
        ripple.style.left = `${e.clientX - rect.left}px`;
        ripple.style.top = `${e.clientY - rect.top}px`;

        btn.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

/* ENTRADA ANIMADA */
window.addEventListener("load", () => {
    const content = document.querySelector(".hero-content");

    content.style.opacity = "0";
    content.style.transform = "translateY(40px)";

    setTimeout(() => {
        content.style.transition = "all 1s ease";
        content.style.opacity = "1";
        content.style.transform = "translateY(0)";
    }, 200);
});
