document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded, initializing components...');

    // Header functionality
    initHeader();
    
    // Hero slider
    initHeroSlider();
    
    // Product sliders
    initProductSlider('recommendedSlider', 'recommendedPrev', 'recommendedNext');
    initProductSlider('newSlider', 'newPrev', 'newNext');
    
    // Search functionality
    initSearch();
    
    console.log('All components initialized');

    function initHeader() {
        // Mobile menu toggle
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const mobileMenu = document.querySelector('.mobile-menu');
        const closeMenuBtn = document.querySelector('.close-menu');

        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.add('active');
            });
        }

        if (closeMenuBtn && mobileMenu) {
            closeMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
            });
        }

        // Search toggle
        const searchBtn = document.querySelector('.search-btn');
        const searchOverlay = document.querySelector('.search-overlay');
        const closeSearchBtn = document.querySelector('.close-search');

        if (searchBtn && searchOverlay) {
            searchBtn.addEventListener('click', () => {
                searchOverlay.classList.add('active');
            });
        }

        if (closeSearchBtn && searchOverlay) {
            closeSearchBtn.addEventListener('click', () => {
                searchOverlay.classList.remove('active');
            });
        }

        // All Categories Drawer
        const allCategoriesBtn = document.getElementById('allCategoriesBtn');
        const allCategoriesDrawer = document.getElementById('allCategoriesDrawer');
        const allCategoriesOverlay = document.getElementById('allCategoriesOverlay');
        const allCategoriesClose = document.getElementById('allCategoriesClose');

        function openAllCategoriesDrawer() {
            if (allCategoriesDrawer) {
                allCategoriesDrawer.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        }

        function closeAllCategoriesDrawer() {
            if (allCategoriesDrawer) {
                allCategoriesDrawer.classList.remove('active');
                document.body.style.overflow = '';
            }
        }

        if (allCategoriesBtn) {
            allCategoriesBtn.addEventListener('click', (e) => {
                e.preventDefault();
                openAllCategoriesDrawer();
            });
        }

        if (allCategoriesOverlay) {
            allCategoriesOverlay.addEventListener('click', closeAllCategoriesDrawer);
        }

        if (allCategoriesClose) {
            allCategoriesClose.addEventListener('click', closeAllCategoriesDrawer);
        }

        // ESC key to close drawer
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && allCategoriesDrawer && allCategoriesDrawer.classList.contains('active')) {
                closeAllCategoriesDrawer();
            }
        });

        // Mobile category accordion
        const mobileCategoryBtns = document.querySelectorAll('.mobile-category-item > a');
        mobileCategoryBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const parent = btn.parentElement;
                const submenu = parent.querySelector('.mobile-submenu');
                
                if (submenu) {
                    e.preventDefault();
                    parent.classList.toggle('active');
                }
            });
        });
    }

    function initHeroSlider() {
        const heroSlides = document.querySelectorAll('.hero-slide');
        const heroDots = document.querySelectorAll('.hero-dot');
        const sliderNext = document.querySelector('.slider-next');
        const sliderPrev = document.querySelector('.slider-prev');
        const autoplayToggle = document.getElementById('sliderAutoplayToggle');
        
        if (!heroSlides.length) return;
        
        let currentSlide = 0;
        let carouselInterval;
        let isAutoplayActive = true;
        
        function showSlide(index) {
            heroSlides.forEach((slide, i) => {
                slide.classList.remove('active', 'prev', 'next');
                
                if (i === index) {
                    slide.classList.add('active');
                } else if (i === (index - 1 + heroSlides.length) % heroSlides.length) {
                    slide.classList.add('prev');
                } else if (i === (index + 1) % heroSlides.length) {
                    slide.classList.add('next');
                }
            });
            
            heroDots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % heroSlides.length;
            showSlide(currentSlide);
        }
        
        function prevSlide() {
            currentSlide = (currentSlide - 1 + heroSlides.length) % heroSlides.length;
            showSlide(currentSlide);
        }
        
        function startCarousel() {
            if (isAutoplayActive) {
                carouselInterval = setInterval(nextSlide, 5000);
            }
        }
        
        function stopCarousel() {
            clearInterval(carouselInterval);
        }
        
        function toggleAutoplay() {
            isAutoplayActive = !isAutoplayActive;
            
            if (isAutoplayActive) {
                autoplayToggle.classList.add('playing');
                startCarousel();
            } else {
                autoplayToggle.classList.remove('playing');
                stopCarousel();
            }
        }
        
        // Initialize
        showSlide(currentSlide);
        startCarousel();
        
        // Set initial state for autoplay toggle
        if (autoplayToggle) {
            autoplayToggle.classList.add('playing');
        }
        
        // Navigation buttons
        if (sliderNext) {
            sliderNext.addEventListener('click', () => {
                nextSlide();
                stopCarousel();
                startCarousel();
            });
        }

        if (sliderPrev) {
            sliderPrev.addEventListener('click', () => {
                prevSlide();
                stopCarousel();
                startCarousel();
            });
        }
        
        // Autoplay toggle button
        if (autoplayToggle) {
            autoplayToggle.addEventListener('click', toggleAutoplay);
        }
        
        // Dot navigation
        heroDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
                stopCarousel();
                startCarousel();
            });
        });

        // Pause on hover
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

        // Touch/swipe support
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
                const swipeThreshold = 50;
                const swipeDistance = touchStartX - touchEndX;

                if (Math.abs(swipeDistance) > swipeThreshold) {
                    if (swipeDistance > 0) {
                        nextSlide();
                    } else {
                        prevSlide();
                    }
                    stopCarousel();
                    startCarousel();
                }
            }
        }
    }

    // Product Sliders - 無限スクロール対応
    function initProductSlider(sliderId, prevBtnId, nextBtnId) {
        const slider = document.getElementById(sliderId);
        const track = slider?.querySelector('.slider-track');
        const prevBtn = document.getElementById(prevBtnId);
        const nextBtn = document.getElementById(nextBtnId);
        
        if (!slider || !track || !prevBtn || !nextBtn) {
            console.log(`Slider initialization failed for ${sliderId}:`, {
                slider: !!slider,
                track: !!track,
                prevBtn: !!prevBtn,
                nextBtn: !!nextBtn
            });
            return;
        }
        
        const originalCards = Array.from(track.children);
        const cardWidth = 220; // カード幅 + マージン
        let currentIndex = 3; // 複製分を考慮した初期位置
        let isTransitioning = false;
        let autoSlideInterval;
        
        console.log(`Initializing slider ${sliderId} with ${originalCards.length} cards`);
        
        // 無限スクロール用に最初と最後にカードを複製
        function setupInfiniteSlider() {
            // 最後の3枚を最初に複製
            const firstClones = originalCards.slice(-3).map(card => {
                const clone = card.cloneNode(true);
                clone.classList.add('clone');
                return clone;
            });
            
            // 最初の3枚を最後に複製
            const lastClones = originalCards.slice(0, 3).map(card => {
                const clone = card.cloneNode(true);
                clone.classList.add('clone');
                return clone;
            });
            
            // DOM に追加
            firstClones.forEach(clone => track.insertBefore(clone, track.firstChild));
            lastClones.forEach(clone => track.appendChild(clone));
            
            console.log(`Added ${firstClones.length + lastClones.length} cloned cards for infinite scroll`);
        }
        
        function updateSliderPosition(animate = true) {
            const position = currentIndex * cardWidth;
            track.style.transition = animate ? 'transform 0.4s ease-in-out' : 'none';
            track.style.transform = `translateX(-${position}px)`;
        }
        
        function nextSlide() {
            if (isTransitioning) return;
            
            isTransitioning = true;
            currentIndex++;
            updateSliderPosition(true);
            
            // 最後の複製に到達したら最初に戻る
            setTimeout(() => {
                if (currentIndex >= originalCards.length + 3) {
                    currentIndex = 3;
                    updateSliderPosition(false);
                }
                isTransitioning = false;
            }, 400);
        }
        
        function prevSlide() {
            if (isTransitioning) return;
            
            isTransitioning = true;
            currentIndex--;
            updateSliderPosition(true);
            
            // 最初の複製に到達したら最後に戻る
            setTimeout(() => {
                if (currentIndex < 3) {
                    currentIndex = originalCards.length + 2;
                    updateSliderPosition(false);
                }
                isTransitioning = false;
            }, 400);
        }
        
        function startAutoSlide() {
            autoSlideInterval = setInterval(nextSlide, 4000);
        }
        
        function stopAutoSlide() {
            clearInterval(autoSlideInterval);
        }
        
        // イベントリスナー
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoSlide();
            startAutoSlide();
        });
        
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoSlide();
            startAutoSlide();
        });
        
        // ホバー時に自動スライドを停止
        slider.addEventListener('mouseenter', stopAutoSlide);
        slider.addEventListener('mouseleave', startAutoSlide);
        
        // 初期化
        setupInfiniteSlider();
        updateSliderPosition(false);
        startAutoSlide();
        
        console.log(`Slider ${sliderId} initialized successfully`);
    }

    function initSearch() {
        // Search suggestions
        const searchInputs = document.querySelectorAll('.search-input, .mobile-search-input');
        const searchSuggestions = document.querySelector('.search-suggestions');

        searchInputs.forEach(input => {
            input.addEventListener('input', function() {
                const query = this.value.trim();
                if (query.length > 0 && searchSuggestions) {
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
                setTimeout(() => {
                    if (searchSuggestions) {
                        searchSuggestions.style.display = 'none';
                    }
                }, 150);
            });
        });

        // Click handlers for suggestion items
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('suggestion-item')) {
                searchInputs.forEach(input => {
                    input.value = e.target.textContent;
                });
                if (searchSuggestions) {
                    searchSuggestions.style.display = 'none';
                }
            }
        });
    }
});