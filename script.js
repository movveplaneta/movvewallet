const navbar = document.querySelector('.navbar');
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-links');

if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });
}

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const revealItems = document.querySelectorAll('.feature-card,.info-card,.company-card,.video-card,.steps-card,.hero-panel,.rank-card');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach(item => {
  item.style.opacity = 0;
  item.style.transform = 'translateY(18px)';
  item.style.transition = 'opacity .55s ease, transform .55s ease, box-shadow .28s ease, border-color .28s ease';
  revealObserver.observe(item);
});

// Carrusel 3D automático tipo coverflow
const carousel = document.getElementById('rankCarousel');
if (carousel) {
  const track = carousel.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  const prevBtn = document.getElementById('rankPrev');
  const nextBtn = document.getElementById('rankNext');
  const dotsWrap = document.getElementById('rankDots');
  let current = 0;
  let autoplay;
  let touchStartX = 0;
  let touchEndX = 0;

  const shortestOffset = index => {
    let offset = index - current;
    const half = Math.floor(slides.length / 2);
    if (offset > half) offset -= slides.length;
    if (offset < -half) offset += slides.length;
    return offset;
  };

  const createDots = () => {
    slides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.className = `carousel-dot${index === 0 ? ' active' : ''}`;
      dot.type = 'button';
      dot.setAttribute('aria-label', `Ir al slide ${index + 1}`);
      dot.addEventListener('click', () => {
        goTo(index);
        restartAutoplay();
      });
      dotsWrap.appendChild(dot);
    });
  };

  const updateDots = () => {
    dotsWrap.querySelectorAll('.carousel-dot').forEach((dot, index) => {
      dot.classList.toggle('active', index === current);
    });
  };

  const updateSlides = () => {
    slides.forEach((slide, index) => {
      const offset = shortestOffset(index);
      slide.className = 'carousel-slide';

      if (offset === 0) slide.classList.add('is-active');
      else if (offset === -1) slide.classList.add('is-prev');
      else if (offset === 1) slide.classList.add('is-next');
      else if (offset === -2) slide.classList.add('is-prev-2');
      else if (offset === 2) slide.classList.add('is-next-2');
      else if (offset < 0) slide.classList.add('is-hidden-left');
      else slide.classList.add('is-hidden-right');
    });
    updateDots();
  };

  const goTo = index => {
    current = (index + slides.length) % slides.length;
    updateSlides();
  };

  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);

  const startAutoplay = () => {
    stopAutoplay();
    autoplay = window.setInterval(next, 3500);
  };

  const stopAutoplay = () => {
    if (autoplay) window.clearInterval(autoplay);
  };

  const restartAutoplay = () => {
    stopAutoplay();
    startAutoplay();
  };

  createDots();
  goTo(0);
  startAutoplay();

  nextBtn?.addEventListener('click', () => {
    next();
    restartAutoplay();
  });

  prevBtn?.addEventListener('click', () => {
    prev();
    restartAutoplay();
  });

  carousel.addEventListener('mouseenter', stopAutoplay);
  carousel.addEventListener('mouseleave', startAutoplay);

  carousel.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
    stopAutoplay();
  }, { passive: true });

  carousel.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 45) {
      if (diff < 0) next();
      else prev();
    }
    startAutoplay();
  }, { passive: true });

  window.addEventListener('keydown', e => {
    if (!carousel) return;
    if (e.key === 'ArrowRight') {
      next();
      restartAutoplay();
    }
    if (e.key === 'ArrowLeft') {
      prev();
      restartAutoplay();
    }
  });
}


// Videos de YouTube dentro de la misma página
const videoModal = document.getElementById('videoModal');
const youtubeFrame = document.getElementById('youtubeFrame');

/**
 * Extrae el video ID o playlist ID de cualquier formato de URL de YouTube:
 * https://youtu.be/VIDEO_ID
 * https://www.youtube.com/watch?v=VIDEO_ID
 * https://youtube.com/shorts/VIDEO_ID
 * https://www.youtube.com/playlist?list=PLAYLIST_ID
 */
function parseYouTubeUrl(url) {
  if (!url) return { videoId: '', playlistId: '' };

  try {
    const u = new URL(url);

    // Playlist explícita
    const listParam = u.searchParams.get('list');
    if (u.pathname.includes('/playlist') && listParam) {
      return { videoId: '', playlistId: listParam };
    }

    // youtu.be/VIDEO_ID
    if (u.hostname === 'youtu.be') {
      return { videoId: u.pathname.replace('/', ''), playlistId: '' };
    }

    // youtube.com/shorts/VIDEO_ID
    const shortsMatch = u.pathname.match(/\/shorts\/([^/?&]+)/);
    if (shortsMatch) {
      return { videoId: shortsMatch[1], playlistId: '' };
    }

    // youtube.com/watch?v=VIDEO_ID
    const vParam = u.searchParams.get('v');
    if (vParam) {
      return { videoId: vParam, playlistId: '' };
    }
  } catch (e) {
    // Si no es una URL válida, devolver vacío
  }

  return { videoId: '', playlistId: '' };
}

function openMovveVideo(rawUrl) {
  if (!videoModal || !youtubeFrame || !rawUrl) return;

  const { videoId, playlistId } = parseYouTubeUrl(rawUrl);

  let src = '';
  if (videoId) {
    src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
  } else if (playlistId) {
    src = `https://www.youtube.com/embed/videoseries?list=${playlistId}&autoplay=1&rel=0`;
  } else {
    console.warn('No se pudo extraer el ID de YouTube de:', rawUrl);
    return;
  }

  youtubeFrame.src = src;
  videoModal.classList.add('active');
  videoModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeMovveVideo() {
  if (!videoModal || !youtubeFrame) return;
  videoModal.classList.remove('active');
  videoModal.setAttribute('aria-hidden', 'true');
  youtubeFrame.src = '';
  document.body.style.overflow = '';
}

document.querySelectorAll('.video-card-media').forEach(card => {
  card.addEventListener('click', () => {
    // Acepta tanto data-youtube como data-playlist (ambos son URLs completas)
    const rawUrl = card.dataset.youtube || card.dataset.playlist || '';
    openMovveVideo(rawUrl);
  });
});

document.querySelectorAll('[data-close-video]').forEach(closeBtn => {
  closeBtn.addEventListener('click', closeMovveVideo);
});

window.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeMovveVideo();
});


// Video presentación local en la misma página
const presentationVideoModal = document.getElementById('presentationVideoModal');
const presentationVideoPlayer = document.getElementById('presentationVideoPlayer');

function openPresentationVideo() {
  if (!presentationVideoModal || !presentationVideoPlayer) return;
  presentationVideoModal.classList.add('active');
  presentationVideoModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  presentationVideoPlayer.play().catch(() => {});
}

function closePresentationVideo() {
  if (!presentationVideoModal || !presentationVideoPlayer) return;
  presentationVideoPlayer.pause();
  presentationVideoModal.classList.remove('active');
  presentationVideoModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

['openPresentationVideoHero','openPresentationVideo','openPresentationVideoSecondary'].forEach(id => {
  const btn = document.getElementById(id);
  if (btn) btn.addEventListener('click', openPresentationVideo);
});

document.querySelectorAll('[data-close-presentation-video]').forEach(closeBtn => {
  closeBtn.addEventListener('click', closePresentationVideo);
});

window.addEventListener('keydown', event => {
  if (event.key === 'Escape') closePresentationVideo();
});
