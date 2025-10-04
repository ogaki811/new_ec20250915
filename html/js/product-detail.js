// Product Detail Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Image Gallery Functionality
    initImageGallery();
    
    // Quantity Controls
    initQuantityControls();
    
    // Add to Cart Functionality
    initAddToCart();
    
    // Favorite Toggle
    initFavoriteToggle();
    
    // Product Tabs
    initProductTabs();
    
    // Q&A Accordion
    initQAAccordion();
    
    // Buy Now Functionality
    initBuyNow();
    
    // Image Zoom
    initImageZoom();
    
    // Initialize Image Gallery
    function initImageGallery() {
        const mainImage = document.getElementById('mainProductImage');
        const thumbnails = document.querySelectorAll('.thumbnail');
        
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function() {
                const newImageSrc = this.getAttribute('data-image');
                
                // Remove active class from all thumbnails
                thumbnails.forEach(thumb => thumb.classList.remove('active'));
                
                // Add active class to clicked thumbnail
                this.classList.add('active');
                
                // Update main image with fade effect
                mainImage.style.opacity = '0';
                setTimeout(() => {
                    mainImage.src = newImageSrc;
                    mainImage.style.opacity = '1';
                }, 150);
            });
        });
    }
    
    // Initialize Quantity Controls
    function initQuantityControls() {
        const quantityInput = document.getElementById('quantityInput');
        const decreaseBtn = document.getElementById('decreaseBtn');
        const increaseBtn = document.getElementById('increaseBtn');
        
        if (!quantityInput || !decreaseBtn || !increaseBtn) return;
        
        decreaseBtn.addEventListener('click', function() {
            const currentValue = parseInt(quantityInput.value) || 1;
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
                updateQuantityDisplay();
            }
        });
        
        increaseBtn.addEventListener('click', function() {
            const currentValue = parseInt(quantityInput.value) || 1;
            const maxValue = parseInt(quantityInput.getAttribute('max')) || 999;
            if (currentValue < maxValue) {
                quantityInput.value = currentValue + 1;
                updateQuantityDisplay();
            }
        });
        
        quantityInput.addEventListener('input', function() {
            let value = parseInt(this.value) || 1;
            const min = parseInt(this.getAttribute('min')) || 1;
            const max = parseInt(this.getAttribute('max')) || 999;
            
            if (value < min) value = min;
            if (value > max) value = max;
            
            this.value = value;
            updateQuantityDisplay();
        });
        
        function updateQuantityDisplay() {
            const quantity = parseInt(quantityInput.value) || 1;
            
            // Update bulk pricing display if quantity >= 10
            updateBulkPricingDisplay(quantity);
            
            // Update total price if needed
            updateTotalPriceDisplay(quantity);
        }
        
        function updateBulkPricingDisplay(quantity) {
            const bulkDiscount = document.querySelector('.bulk-discount');
            if (bulkDiscount) {
                if (quantity >= 10) {
                    bulkDiscount.style.background = '#d4edda';
                    bulkDiscount.style.borderLeft = '4px solid #28a745';
                } else {
                    bulkDiscount.style.background = '#e8f4fd';
                    bulkDiscount.style.borderLeft = '4px solid transparent';
                }
            }
        }
        
        function updateTotalPriceDisplay(quantity) {
            // This could show total price calculation
            const price = quantity >= 10 ? 308 : 342;
            const total = price * quantity;
            
            // You could add a total price display element here
            console.log(`Total: ¥${total.toLocaleString()}`);
        }
    }
    
    // Initialize Add to Cart
    function initAddToCart() {
        const addToCartBtn = document.getElementById('addToCartBtn');
        const quantityInput = document.getElementById('quantityInput');
        
        if (!addToCartBtn) return;
        
        addToCartBtn.addEventListener('click', function() {
            const quantity = parseInt(quantityInput?.value) || 1;
            
            // Show loading state
            const originalText = this.innerHTML;
            this.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="animate-spin">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M8 12l2 2 4-4"></path>
                </svg>
                追加中...
            `;
            this.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Show success state
                this.innerHTML = `
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                    追加完了！
                `;
                this.style.background = '#28a745';
                
                // Update cart badge in header
                updateCartBadge(quantity);
                
                // Show success notification
                if (window.ECUtils) {
                    window.ECUtils.showNotification(`${quantity}個をカートに追加しました`, 'success');
                }
                
                // Reset button after delay
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.disabled = false;
                    this.style.background = '';
                }, 2000);
            }, 1000);
        });
    }
    
    // Initialize Favorite Toggle
    function initFavoriteToggle() {
        const favoriteBtn = document.getElementById('favoriteBtn');
        
        if (!favoriteBtn) return;
        
        favoriteBtn.addEventListener('click', function() {
            const isActive = this.classList.contains('active');
            
            if (isActive) {
                // Remove from favorites
                this.classList.remove('active');
                this.innerHTML = `
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                    お気に入り
                `;
                
                if (window.ECUtils) {
                    window.ECUtils.showNotification('お気に入りから削除しました', 'info');
                }
            } else {
                // Add to favorites
                this.classList.add('active');
                this.innerHTML = `
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                    お気に入り済み
                `;
                
                // Update favorites badge in header
                updateFavoritesBadge(1);
                
                if (window.ECUtils) {
                    window.ECUtils.showNotification('お気に入りに追加しました', 'success');
                }
            }
        });
    }
    
    // Initialize Product Tabs
    function initProductTabs() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const targetTab = this.getAttribute('data-tab');
                
                // Remove active class from all tabs and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked tab and corresponding content
                this.classList.add('active');
                document.getElementById(targetTab)?.classList.add('active');
                
                // Smooth scroll to tabs if on mobile
                if (window.innerWidth <= 768) {
                    document.querySelector('.tabs-container').scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    // Initialize Q&A Accordion
    function initQAAccordion() {
        const qaQuestions = document.querySelectorAll('.qa-question');
        
        qaQuestions.forEach(question => {
            question.addEventListener('click', function() {
                const qaItem = this.parentElement;
                const isOpen = qaItem.classList.contains('open');
                
                // Close all other Q&A items
                document.querySelectorAll('.qa-item').forEach(item => {
                    if (item !== qaItem) {
                        item.classList.remove('open');
                    }
                });
                
                // Toggle current Q&A item
                qaItem.classList.toggle('open');
                
                // Scroll into view if opening on mobile
                if (!isOpen && window.innerWidth <= 768) {
                    setTimeout(() => {
                        qaItem.scrollIntoView({
                            behavior: 'smooth',
                            block: 'nearest'
                        });
                    }, 300);
                }
            });
        });
    }
    
    // Initialize Buy Now
    function initBuyNow() {
        const buyNowBtn = document.getElementById('buyNowBtn');
        const quantityInput = document.getElementById('quantityInput');
        
        if (!buyNowBtn) return;
        
        buyNowBtn.addEventListener('click', function() {
            const quantity = parseInt(quantityInput?.value) || 1;
            
            // Show loading state
            const originalText = this.textContent;
            this.textContent = '処理中...';
            this.disabled = true;
            
            // Simulate quick purchase flow
            setTimeout(() => {
                // Add to cart and redirect to checkout
                updateCartBadge(quantity);
                
                if (window.ECUtils) {
                    window.ECUtils.showNotification('カートに追加してチェックアウトに進みます...', 'success');
                }
                
                // Reset button
                this.textContent = originalText;
                this.disabled = false;
                
                // Redirect to checkout (mock)
                setTimeout(() => {
                    // window.location.href = 'checkout.html';
                    console.log('Redirecting to checkout...');
                }, 1000);
            }, 800);
        });
    }
    
    // Initialize Image Zoom
    function initImageZoom() {
        const zoomBtn = document.getElementById('zoomBtn');
        const mainImage = document.getElementById('mainProductImage');
        
        if (!zoomBtn || !mainImage) return;
        
        zoomBtn.addEventListener('click', function() {
            openImageZoom(mainImage.src);
        });
        
        // Also allow clicking on main image to zoom
        mainImage.addEventListener('click', function() {
            openImageZoom(this.src);
        });
        
        function openImageZoom(imageSrc) {
            // Create zoom modal
            const zoomModal = document.createElement('div');
            zoomModal.className = 'zoom-modal';
            zoomModal.innerHTML = `
                <div class="zoom-overlay">
                    <button class="zoom-close">&times;</button>
                    <img src="${imageSrc}" alt="拡大画像" class="zoom-image">
                </div>
            `;
            
            // Add styles
            zoomModal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: opacity 0.3s;
            `;
            
            const zoomOverlay = zoomModal.querySelector('.zoom-overlay');
            zoomOverlay.style.cssText = `
                position: relative;
                max-width: 90%;
                max-height: 90%;
            `;
            
            const zoomClose = zoomModal.querySelector('.zoom-close');
            zoomClose.style.cssText = `
                position: absolute;
                top: -40px;
                right: 0;
                background: none;
                border: none;
                color: white;
                font-size: 30px;
                cursor: pointer;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
            `;
            
            const zoomImage = zoomModal.querySelector('.zoom-image');
            zoomImage.style.cssText = `
                max-width: 100%;
                max-height: 100%;
                object-fit: contain;
            `;
            
            document.body.appendChild(zoomModal);
            document.body.style.overflow = 'hidden';
            
            // Fade in
            setTimeout(() => {
                zoomModal.style.opacity = '1';
            }, 10);
            
            // Close functionality
            function closeZoom() {
                zoomModal.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(zoomModal);
                    document.body.style.overflow = '';
                }, 300);
            }
            
            zoomClose.addEventListener('click', closeZoom);
            zoomModal.addEventListener('click', function(e) {
                if (e.target === zoomModal) {
                    closeZoom();
                }
            });
            
            // Close on ESC key
            document.addEventListener('keydown', function handleEscape(e) {
                if (e.key === 'Escape') {
                    closeZoom();
                    document.removeEventListener('keydown', handleEscape);
                }
            });
        }
    }
    
    // Helper Functions
    function updateCartBadge(increment = 1) {
        const badges = document.querySelectorAll('.function-badge');
        badges.forEach(badge => {
            if (badge.parentElement.querySelector('.function-text')?.textContent.includes('カート')) {
                let currentCount = parseInt(badge.textContent) || 0;
                badge.textContent = currentCount + increment;
            }
        });
    }
    
    function updateFavoritesBadge(increment = 1) {
        const badges = document.querySelectorAll('.function-badge');
        badges.forEach(badge => {
            if (badge.parentElement.querySelector('.function-text')?.textContent.includes('お気に入り')) {
                let currentCount = parseInt(badge.textContent) || 0;
                badge.textContent = currentCount + increment;
            }
        });
    }
    
    // Helpful Review Buttons
    const helpfulBtns = document.querySelectorAll('.helpful-btn');
    helpfulBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const currentText = this.textContent;
            const match = currentText.match(/\((\d+)\)/);
            const currentCount = match ? parseInt(match[1]) : 0;
            
            this.textContent = currentText.replace(/\(\d+\)/, `(${currentCount + 1})`);
            this.style.background = '#e3f2fd';
            this.style.borderColor = '#2196f3';
            this.style.color = '#1976d2';
            this.disabled = true;
            
            if (window.ECUtils) {
                window.ECUtils.showNotification('参考になったに投票しました', 'success');
            }
        });
    });
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        .animate-spin {
            animation: spin 1s linear infinite;
        }
        .main-image img {
            transition: opacity 0.15s ease;
        }
        .quantity-btn:active {
            transform: scale(0.95);
        }
        .btn:active {
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // Intersection Observer for lazy loading related products
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        observer.observe(img);
    });
});