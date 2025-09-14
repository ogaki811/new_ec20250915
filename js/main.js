// EC Site JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const drawerMenu = document.getElementById('drawerMenu');
    const body = document.body;
    let overlay;

    // Create overlay element
    function createOverlay() {
        overlay = document.createElement('div');
        overlay.className = 'overlay';
        document.body.appendChild(overlay);
        
        overlay.addEventListener('click', function() {
            closeDrawer();
            closeSearchModal();
        });
    }

    // Open drawer menu
    function openDrawer() {
        if (!overlay) createOverlay();
        drawerMenu.classList.add('open');
        overlay.classList.add('active');
        menuToggle.classList.add('active');
        body.style.overflow = 'hidden';
    }

    // Close drawer menu
    function closeDrawer() {
        drawerMenu.classList.remove('open');
        if (overlay) overlay.classList.remove('active');
        menuToggle.classList.remove('active');
        body.style.overflow = '';
    }

    // Toggle drawer menu
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            if (drawerMenu.classList.contains('open')) {
                closeDrawer();
            } else {
                openDrawer();
            }
        });
    }

    // Drawer submenu toggle
    const drawerSubmenuItems = document.querySelectorAll('.drawer-nav .has-submenu > a');
    drawerSubmenuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const parent = this.parentElement;
            const submenu = parent.querySelector('.submenu');
            
            // Toggle current submenu
            parent.classList.toggle('open');
            submenu.classList.toggle('open');
            
            // Close other submenus
            drawerSubmenuItems.forEach(otherItem => {
                if (otherItem !== item) {
                    const otherParent = otherItem.parentElement;
                    const otherSubmenu = otherParent.querySelector('.submenu');
                    otherParent.classList.remove('open');
                    otherSubmenu.classList.remove('open');
                }
            });
        });
    });

    // Mobile Search Modal
    const searchToggle = document.querySelector('.mobile-search-toggle');
    const mobileSearchToggle = document.getElementById('mobileSearchToggle');
    const searchModal = document.getElementById('searchModal');
    const searchModalClose = document.querySelector('.search-modal-close');

    function openSearchModal() {
        if (!overlay) createOverlay();
        searchModal.classList.add('open');
        overlay.classList.add('active');
        body.style.overflow = 'hidden';
        
        // Focus on search input
        const searchInput = document.querySelector('.mobile-search-input');
        if (searchInput) {
            setTimeout(() => searchInput.focus(), 100);
        }
    }

    function closeSearchModal() {
        searchModal.classList.remove('open');
        if (overlay) overlay.classList.remove('active');
        body.style.overflow = '';
    }

    if (searchToggle) {
        searchToggle.addEventListener('click', openSearchModal);
    }
    
    if (mobileSearchToggle) {
        mobileSearchToggle.addEventListener('click', openSearchModal);
    }

    if (searchModalClose) {
        searchModalClose.addEventListener('click', closeSearchModal);
    }

    // Hero Carousel
    const heroSlides = document.querySelectorAll('.hero-slide');
    const heroDots = document.querySelectorAll('.dot');
    const sliderPrev = document.getElementById('sliderPrev');
    const sliderNext = document.getElementById('sliderNext');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        // Hide all slides
        heroSlides.forEach((slide, i) => {
            slide.classList.remove('active', 'slide-in-right', 'slide-in-left');
            if (i === index) {
                slide.classList.add('active');
                // Add slide direction based on current vs previous index
                if (i > currentSlide) {
                    slide.classList.add('slide-in-right');
                } else if (i < currentSlide) {
                    slide.classList.add('slide-in-left');
                }
            }
        });
        heroDots.forEach(dot => dot.classList.remove('active'));
        
        // Update dots
        if (heroDots[index]) {
            heroDots[index].classList.add('active');
        }
    }

    function nextSlide() {
        const prevIndex = currentSlide;
        currentSlide = (currentSlide + 1) % heroSlides.length;
        showSlideWithDirection(currentSlide, 'next');
    }

    function prevSlide() {
        const prevIndex = currentSlide;
        currentSlide = (currentSlide - 1 + heroSlides.length) % heroSlides.length;
        showSlideWithDirection(currentSlide, 'prev');
    }

    function showSlideWithDirection(index, direction) {
        // Hide all slides first
        heroSlides.forEach(slide => {
            slide.classList.remove('active', 'slide-in-right', 'slide-in-left', 'slide-out-right', 'slide-out-left');
        });
        heroDots.forEach(dot => dot.classList.remove('active'));
        
        // Show new slide with animation
        if (heroSlides[index]) {
            heroSlides[index].classList.add('active');
            if (direction === 'next') {
                heroSlides[index].classList.add('slide-in-right');
            } else if (direction === 'prev') {
                heroSlides[index].classList.add('slide-in-left');
            }
        }
        
        if (heroDots[index]) {
            heroDots[index].classList.add('active');
        }
    }

    function startCarousel() {
        slideInterval = setInterval(nextSlide, 6000); // Change slide every 6 seconds
    }

    function stopCarousel() {
        clearInterval(slideInterval);
    }

    // Initialize carousel if slides exist
    if (heroSlides.length > 0) {
        startCarousel();
        
        // Arrow button handlers
        if (sliderNext) {
            sliderNext.addEventListener('click', () => {
                nextSlide();
                stopCarousel();
                startCarousel(); // Restart the interval
            });
        }

        if (sliderPrev) {
            sliderPrev.addEventListener('click', () => {
                prevSlide();
                stopCarousel();
                startCarousel(); // Restart the interval
            });
        }
        
        // Dot click handlers
        heroDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
                stopCarousel();
                startCarousel(); // Restart the interval
            });
        });

        // Pause carousel on hover
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.addEventListener('mouseenter', stopCarousel);
            heroSection.addEventListener('mouseleave', startCarousel);
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                prevSlide();
                stopCarousel();
                startCarousel();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
                stopCarousel();
                startCarousel();
            }
        });

        // Touch/swipe support for mobile
        let touchStartX = 0;
        let touchEndX = 0;

        if (heroSection) {
            heroSection.addEventListener('touchstart', e => {
                touchStartX = e.changedTouches[0].screenX;
            });

            heroSection.addEventListener('touchend', e => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            });

            function handleSwipe() {
                const swipeThreshold = 50; // minimum distance for swipe
                const swipeDistance = touchStartX - touchEndX;

                if (Math.abs(swipeDistance) > swipeThreshold) {
                    if (swipeDistance > 0) {
                        // Swipe left - next slide
                        nextSlide();
                    } else {
                        // Swipe right - previous slide
                        prevSlide();
                    }
                    stopCarousel();
                    startCarousel();
                }
            }
        }
    }

    // Search Suggestions (Mock functionality)
    const searchInputs = document.querySelectorAll('.search-input, .mobile-search-input');
    const searchSuggestions = document.querySelector('.search-suggestions');

    searchInputs.forEach(input => {
        input.addEventListener('input', function() {
            const query = this.value.trim();
            if (query.length > 0 && searchSuggestions) {
                // Mock suggestions - in real app, this would be an API call
                const suggestions = [
                    'Tシャツ',
                    'デニムパンツ',
                    'スニーカー',
                    'ワンピース',
                    'バッグ'
                ].filter(item => item.toLowerCase().includes(query.toLowerCase()));

                if (suggestions.length > 0) {
                    searchSuggestions.innerHTML = suggestions
                        .map(item => `<div class="suggestion-item">${item}</div>`)
                        .join('');
                    searchSuggestions.style.display = 'block';
                } else {
                    searchSuggestions.style.display = 'none';
                }
            } else if (searchSuggestions) {
                searchSuggestions.style.display = 'none';
            }
        });

        input.addEventListener('blur', function() {
            // Delay hiding to allow clicking on suggestions
            setTimeout(() => {
                if (searchSuggestions) {
                    searchSuggestions.style.display = 'none';
                }
            }, 200);
        });
    });

    // Footer Accordion (Mobile)
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const item = this.parentElement;
            const content = item.querySelector('.accordion-content');
            
            // Toggle current accordion
            item.classList.toggle('open');
            content.classList.toggle('open');
        });
    });

    // Add to Cart functionality (Mock)
    const addToCartButtons = document.querySelectorAll('.btn-add-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Mock add to cart
            const originalText = this.textContent;
            this.textContent = '追加中...';
            this.disabled = true;
            
            setTimeout(() => {
                this.textContent = '追加完了';
                this.style.backgroundColor = '#28a745';
                
                // Update cart badge
                updateCartBadge();
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.disabled = false;
                    this.style.backgroundColor = '';
                }, 1000);
            }, 500);
        });
    });

    // Update cart badge
    function updateCartBadge() {
        const badges = document.querySelectorAll('.badge');
        badges.forEach(badge => {
            let currentCount = parseInt(badge.textContent) || 0;
            badge.textContent = currentCount + 1;
        });
    }

    // Favorite button toggle
    const favoriteButtons = document.querySelectorAll('.product-favorite');
    favoriteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const svg = this.querySelector('svg');
            if (svg.style.fill === 'currentColor' || svg.style.fill === '#dc3545') {
                // Remove from favorites
                svg.style.fill = '';
                svg.style.stroke = 'currentColor';
                this.style.backgroundColor = 'white';
            } else {
                // Add to favorites
                svg.style.fill = '#dc3545';
                svg.style.stroke = '#dc3545';
                this.style.backgroundColor = '#ffe6e6';
            }
        });
    });

    // Smooth scroll for anchor links
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

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            // Close mobile elements when switching to desktop
            closeDrawer();
            closeSearchModal();
        }
    });

    // Lazy loading for images (simple intersection observer)
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src; // This would be img.dataset.src in real implementation
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});

// Utility functions for other pages
window.ECUtils = {
    showNotification: function(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 5px;
            color: white;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        switch(type) {
            case 'success':
                notification.style.backgroundColor = '#28a745';
                break;
            case 'error':
                notification.style.backgroundColor = '#dc3545';
                break;
            case 'warning':
                notification.style.backgroundColor = '#ffc107';
                notification.style.color = '#333';
                break;
            default:
                notification.style.backgroundColor = '#17a2b8';
        }
        
        document.body.appendChild(notification);
        
        // Fade in
        setTimeout(() => {
            notification.style.opacity = '1';
        }, 100);
        
        // Auto remove
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    },
    
    validateEmail: function(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },
    
    validatePassword: function(password) {
        return password.length >= 8;
    },
    
    getPasswordStrength: function(password) {
        let strength = 0;
        if (password.length >= 8) strength += 25;
        if (password.match(/[a-z]/)) strength += 25;
        if (password.match(/[A-Z]/)) strength += 25;
        if (password.match(/[0-9]/)) strength += 25;
        
        if (strength < 50) return { level: 'weak', text: '弱い' };
        if (strength < 75) return { level: 'medium', text: '普通' };
        if (strength < 100) return { level: 'strong', text: '強い' };
        return { level: 'very-strong', text: 'とても強い' };
    }
};