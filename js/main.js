// ========================================
// LANGUAGE SWITCHER
// ========================================
let currentLang = localStorage.getItem('siteLanguage') || 'it';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('siteLanguage', lang);

    // Update all elements with data-it and data-en attributes
    document.querySelectorAll('[data-it]').forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            element.innerHTML = text;
        }
    });

    // Update active language button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
}

// Language button click handlers
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const lang = this.getAttribute('data-lang');
        setLanguage(lang);
    });
});

// Initialize language on page load
document.addEventListener('DOMContentLoaded', function() {
    setLanguage(currentLang);
});

// ========================================
// MOBILE MENU TOGGLE
// ========================================
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ========================================
// HERO SLIDER
// ========================================
const slider = document.getElementById('heroSlider');

if (slider) {
    const slides = slider.querySelectorAll('.slide');
    const dotsContainer = document.getElementById('sliderDots');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    let currentSlide = 0;
    let slideInterval;

    // Load full-resolution images in background
    slider.querySelectorAll('.slide-bg[data-full-image]').forEach(bg => {
        const fullSrc = bg.getAttribute('data-full-image');
        const img = new Image();
        img.onload = () => {
            bg.style.backgroundImage = "url('" + fullSrc + "')";
        };
        img.src = fullSrc;
    });

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.dot');

    function goToSlide(n) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');

        currentSlide = (n + slides.length) % slides.length;

        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    function startSlideshow() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function stopSlideshow() {
        clearInterval(slideInterval);
    }

    // Button event listeners
    if (nextBtn) nextBtn.addEventListener('click', () => {
        nextSlide();
        stopSlideshow();
        startSlideshow();
    });

    if (prevBtn) prevBtn.addEventListener('click', () => {
        prevSlide();
        stopSlideshow();
        startSlideshow();
    });

    // Touch events for mobile swipe
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            nextSlide();
            stopSlideshow();
            startSlideshow();
        }
        if (touchEndX > touchStartX + 50) {
            prevSlide();
            stopSlideshow();
            startSlideshow();
        }
    }

    // Pause on hover
    slider.addEventListener('mouseenter', stopSlideshow);
    slider.addEventListener('mouseleave', startSlideshow);

    // Start the slideshow
    startSlideshow();
}

// ========================================
// SMOOTH SCROLL
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


// ========================================
// FORM VALIDATION (for contact page)
// ========================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form fields
        const name = this.querySelector('[name="name"]');
        const email = this.querySelector('[name="email"]');
        const phone = this.querySelector('[name="phone"]');
        const message = this.querySelector('[name="message"]');

        let isValid = true;

        // Clear previous errors
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));

        // Validate name
        if (name && name.value.trim().length < 2) {
            showError(name, currentLang === 'it' ? 'Inserisci un nome valido' : 'Enter a valid name');
            isValid = false;
        }

        // Validate email
        if (email && !isValidEmail(email.value)) {
            showError(email, currentLang === 'it' ? 'Inserisci un\'email valida' : 'Enter a valid email');
            isValid = false;
        }

        // Validate message
        if (message && message.value.trim().length < 10) {
            showError(message, currentLang === 'it' ? 'Il messaggio deve contenere almeno 10 caratteri' : 'Message must be at least 10 characters');
            isValid = false;
        }

        if (isValid) {
            // Show success message
            const successMsg = document.createElement('div');
            successMsg.className = 'success-message';
            successMsg.textContent = currentLang === 'it'
                ? 'Grazie! Il tuo messaggio è stato inviato con successo.'
                : 'Thank you! Your message has been sent successfully.';
            this.appendChild(successMsg);

            // Reset form
            this.reset();

            // Remove success message after 5 seconds
            setTimeout(() => successMsg.remove(), 5000);
        }
    });
}

function showError(input, message) {
    input.classList.add('input-error');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    input.parentElement.appendChild(errorDiv);
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ========================================
// GALLERY / LIGHTBOX (for portfolio pages)
// ========================================
const galleryImages = document.querySelectorAll('.gallery-item img');

if (galleryImages.length > 0) {
    // Create lightbox
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <button class="lightbox-close">&times;</button>
        <button class="lightbox-prev">&#10094;</button>
        <button class="lightbox-next">&#10095;</button>
        <img src="" alt="">
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector('img');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');

    let currentImageIndex = 0;
    const images = Array.from(galleryImages);

    // Open lightbox
    galleryImages.forEach((img, index) => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
            currentImageIndex = index;
            showLightboxImage(this.src);
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close lightbox
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === this) {
            closeLightbox();
        }
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Navigation
    nextBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex + 1) % images.length;
        showLightboxImage(images[currentImageIndex].src);
    });

    prevBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        showLightboxImage(images[currentImageIndex].src);
    });

    function showLightboxImage(src) {
        lightboxImg.src = src;
    }

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextBtn.click();
        if (e.key === 'ArrowLeft') prevBtn.click();
    });
}

// ========================================
// LAZY LOADING IMAGES
// ========================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img.lazy').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========================================
// PAGE TRANSITION
// ========================================
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// ========================================
// LOGO LIGHTBOX (click to zoom)
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const logoImages = document.querySelectorAll('.logo-img, .logo-large');

    if (logoImages.length > 0) {
        // Create logo lightbox overlay
        const logoOverlay = document.createElement('div');
        logoOverlay.id = 'logo-lightbox';
        logoOverlay.style.cssText = `
            display:none; position:fixed; top:0; left:0; width:100%; height:100%;
            background:rgba(0,0,0,0.85); z-index:9999; justify-content:center;
            align-items:center; cursor:pointer;
        `;
        logoOverlay.innerHTML = `
            <img src="images/logo-vbm.png" alt="V.B.M." style="max-width:80vw; max-height:80vh; object-fit:contain; pointer-events:none;">
            <button style="position:absolute;top:20px;right:30px;background:none;border:none;color:#fff;font-size:2.5rem;cursor:pointer;line-height:1;">&times;</button>
        `;
        document.body.appendChild(logoOverlay);

        function openLogoLightbox() {
            logoOverlay.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
        function closeLogoLightbox() {
            logoOverlay.style.display = 'none';
            document.body.style.overflow = '';
        }

        logoImages.forEach(img => {
            img.style.cursor = 'zoom-in';
            img.addEventListener('click', function(e) {
                e.preventDefault();
                openLogoLightbox();
            });
        });

        logoOverlay.addEventListener('click', closeLogoLightbox);
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') closeLogoLightbox();
        });
    }
});

// ========================================
// ACTIVE NAV LINK
// ========================================
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});
