// Enable transitions after page load to prevent flash on initial render
setTimeout(() => {
    document.body.classList.add('dark-mode-loaded');
}, 100);

// ========================================
// Dark Mode Toggle
// ========================================
const darkModeToggle = document.getElementById('darkModeToggle');

if (darkModeToggle) {
    const getStorageKey = () => {
        const title = document.querySelector('title')?.textContent || 'default';
        return 'siteTheme_' + title.replace(/[^a-zA-Z0-9]/g, '_');
    };

    const defaultTheme = '{{default_theme}}';

    darkModeToggle.addEventListener('click', () => {
        const storageKey = getStorageKey();

        // Remove init class on first toggle to allow transitions
        document.documentElement.classList.remove('dark-mode-init');

        if (defaultTheme === 'color') {
            // Color mode sites: toggle between color-mode and dark-mode
            const isDark = document.documentElement.classList.contains('dark-mode');
            if (isDark) {
                document.documentElement.classList.remove('dark-mode');
                document.body.classList.remove('dark-mode');
                document.documentElement.classList.add('color-mode');
                document.body.classList.add('color-mode');
                localStorage.setItem(storageKey, 'color');
            } else {
                document.documentElement.classList.remove('color-mode');
                document.body.classList.remove('color-mode');
                document.documentElement.classList.add('dark-mode');
                document.body.classList.add('dark-mode');
                localStorage.setItem(storageKey, 'dark');
            }
        } else {
            // Light/Dark mode sites: toggle between light and dark
            document.documentElement.classList.toggle('dark-mode');
            document.body.classList.toggle('dark-mode');

            if (document.documentElement.classList.contains('dark-mode')) {
                localStorage.setItem(storageKey, 'dark');
            } else {
                localStorage.setItem(storageKey, 'light');
            }
        }
    });
}

// Hero image crossfade transition
const heroImages = document.querySelectorAll('.hero-image');
if (heroImages.length > 1) {
    let currentImageIndex = 0;

    // First transition after 3 seconds
    setTimeout(() => {
        heroImages[currentImageIndex].classList.remove('active');
        currentImageIndex = (currentImageIndex + 1) % heroImages.length;
        heroImages[currentImageIndex].classList.add('active');

        // Then continue with 5 second intervals
        setInterval(() => {
            heroImages[currentImageIndex].classList.remove('active');
            currentImageIndex = (currentImageIndex + 1) % heroImages.length;
            heroImages[currentImageIndex].classList.add('active');
        }, 5000);
    }, 3000); // First change after 3 seconds
}

// Smooth scrolling for navigation links
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

// Video play button functionality (for the team video section only)
const teamVideoSection = document.querySelector('.video-section .play-button');
if (teamVideoSection) {
    teamVideoSection.addEventListener('click', function() {
        alert('Video player would open here');
        // In a real implementation, this would open a video modal or start video playback
    });
}

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('.main-header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// Luxury scroll fade-in animations
const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, {
    threshold: 0.05,
    rootMargin: '0px 0px -50px 0px'
});

// Observe all fade-in sections
document.querySelectorAll('.fade-in-section').forEach(section => {
    fadeInObserver.observe(section);
});

// Additional subtle animations for individual cards
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 200);
        }
    });
}, {
    threshold: 0.05,
    rootMargin: '0px 0px -30px 0px'
});

document.querySelectorAll('.project-card, .service-card, .award-item, .testimonial-card, .intro-left, .intro-center, .intro-right, .awards-image, .awards-content, .video-content, .video-player, .contact-info, .contact-form').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'opacity 1.5s cubic-bezier(0.16, 1, 0.3, 1), transform 1.5s cubic-bezier(0.16, 1, 0.3, 1)';
    cardObserver.observe(el);
});

// Button click handlers for enquiry forms
document.querySelectorAll('.btn-ghost, .btn-primary, .btn-secondary').forEach(button => {
    if (button.textContent.includes('Enquire') ||
        button.textContent.includes('GET IN TOUCH') ||
        button.textContent.includes('ENQUIRE')) {
        button.addEventListener('click', function(e) {
            if (!this.getAttribute('href')) {
                e.preventDefault();
                alert('Contact form would open here');
                // In a real implementation, this would open a contact modal or redirect to contact page
            }
        });
    }
});

// Lazy loading for images (if needed for performance)
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.loading = 'lazy';
    });
}

// Mobile menu toggle (if implementing responsive menu)
const createMobileMenu = () => {
    const nav = document.querySelector('.main-nav');
    const header = document.querySelector('.main-header .container');

    if (window.innerWidth <= 768) {
        const menuButton = document.createElement('button');
        menuButton.innerHTML = '☰';
        menuButton.classList.add('mobile-menu-toggle');
        menuButton.style.cssText = 'background: none; border: none; font-size: 1.5rem; cursor: pointer;';

        menuButton.addEventListener('click', () => {
            nav.classList.toggle('mobile-active');
        });

        if (!header.querySelector('.mobile-menu-toggle')) {
            header.appendChild(menuButton);
        }
    }
};

window.addEventListener('resize', createMobileMenu);
createMobileMenu();

// Lazy load video function for intro section
function loadIntroVideo() {
    const video = document.getElementById('intro-video-thumbnail');
    const playButton = document.querySelector('#intro-video-container .play-button');

    // Reset to beginning
    video.currentTime = 0;

    // Enable controls and unmute
    video.controls = true;
    video.muted = false;

    // Hide play button
    if (playButton) {
        playButton.style.display = 'none';
    }

    // Play the video
    video.play();
}

// Portfolio carousel functionality
let currentPortfolioPage = 0;
const portfolioCarousel = document.getElementById('portfolioCarousel');
const portfolioCards = portfolioCarousel ? portfolioCarousel.querySelectorAll('.service-card') : [];
const itemsPerPage = 4;
const totalPages = Math.ceil(portfolioCards.length / itemsPerPage);

// Add transition styles to all portfolio cards
portfolioCards.forEach(card => {
    card.style.transition = 'opacity 0.5s ease-in-out';
});

function updatePortfolioDisplay() {
    // Fade out all cards first
    portfolioCards.forEach(card => {
        card.style.opacity = '0';
    });

    // After fade out completes, update visibility and fade in
    setTimeout(() => {
        portfolioCards.forEach((card, index) => {
            const startIndex = currentPortfolioPage * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;

            if (index >= startIndex && index < endIndex) {
                card.style.display = 'block';
                // Trigger reflow to ensure transition works
                card.offsetHeight;
                card.style.opacity = '1';
            } else {
                card.style.display = 'none';
            }
        });
    }, 500);
}

function portfolioNext() {
    currentPortfolioPage = (currentPortfolioPage + 1) % totalPages;
    updatePortfolioDisplay();
}

function portfolioPrev() {
    currentPortfolioPage = (currentPortfolioPage - 1 + totalPages) % totalPages;
    updatePortfolioDisplay();
}

// Initialize portfolio display
if (portfolioCarousel) {
    portfolioCards.forEach(card => {
        const startIndex = currentPortfolioPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const index = Array.from(portfolioCards).indexOf(card);

        if (index >= startIndex && index < endIndex) {
            card.style.display = 'block';
            card.style.opacity = '1';
        } else {
            card.style.display = 'none';
            card.style.opacity = '0';
        }
    });
}

console.log('{{business_name}} - Website Loaded Successfully');
