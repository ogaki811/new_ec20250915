// Common JavaScript for All Pages

// Global favorites management
const FavoritesManager = {
    // Get all favorites
    getFavorites: function() {
        const stored = localStorage.getItem('favorites');
        return stored ? JSON.parse(stored) : [];
    },

    // Add to favorites
    addToFavorites: function(product) {
        let favorites = this.getFavorites();
        
        // Check if already exists
        if (!favorites.find(item => item.id === product.id)) {
            product.addedDate = new Date().toISOString().split('T')[0];
            favorites.push(product);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            this.updateBadges();
            return true;
        }
        return false;
    },

    // Remove from favorites
    removeFromFavorites: function(productId) {
        let favorites = this.getFavorites();
        favorites = favorites.filter(item => item.id !== productId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        this.updateBadges();
        return true;
    },

    // Toggle favorite
    toggleFavorite: function(product) {
        const favorites = this.getFavorites();
        const exists = favorites.find(item => item.id === product.id);
        
        if (exists) {
            this.removeFromFavorites(product.id);
            return false;
        } else {
            this.addToFavorites(product);
            return true;
        }
    },

    // Check if favorited
    isFavorited: function(productId) {
        const favorites = this.getFavorites();
        return favorites.some(item => item.id === productId);
    },

    // Update badges
    updateBadges: function() {
        const favorites = this.getFavorites();
        const badges = document.querySelectorAll('.favorites .count, #favoritesCount');
        badges.forEach(badge => {
            badge.textContent = favorites.length;
        });
    }
};

// Global cart management
const CartManager = {
    // Get cart items
    getCart: function() {
        const stored = localStorage.getItem('cart');
        return stored ? JSON.parse(stored) : [];
    },

    // Add to cart
    addToCart: function(product, quantity = 1) {
        let cart = this.getCart();
        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                ...product,
                quantity: quantity
            });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        this.updateBadges();
        return true;
    },

    // Remove from cart
    removeFromCart: function(productId) {
        let cart = this.getCart();
        cart = cart.filter(item => item.id !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        this.updateBadges();
        return true;
    },

    // Update quantity
    updateQuantity: function(productId, quantity) {
        let cart = this.getCart();
        const item = cart.find(item => item.id === productId);
        
        if (item) {
            if (quantity <= 0) {
                this.removeFromCart(productId);
            } else {
                item.quantity = quantity;
                localStorage.setItem('cart', JSON.stringify(cart));
                this.updateBadges();
            }
        }
    },

    // Clear cart
    clearCart: function() {
        localStorage.removeItem('cart');
        this.updateBadges();
    },

    // Update badges
    updateBadges: function() {
        const cart = this.getCart();
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const badges = document.querySelectorAll('.cart .count');
        badges.forEach(badge => {
            badge.textContent = totalItems;
        });
    }
};

// Notification system
const NotificationManager = {
    show: function(message, type = 'info', duration = 3000) {
        // Remove existing notifications
        const existing = document.querySelector('.notification');
        if (existing) {
            existing.remove();
        }

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        const icon = {
            success: '<i class="fas fa-check-circle"></i>',
            error: '<i class="fas fa-exclamation-circle"></i>',
            warning: '<i class="fas fa-exclamation-triangle"></i>',
            info: '<i class="fas fa-info-circle"></i>'
        }[type] || '<i class="fas fa-info-circle"></i>';
        
        notification.innerHTML = `
            <div class="notification-content">
                ${icon}
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : type === 'warning' ? '#ffc107' : '#17a2b8'};
            color: ${type === 'warning' ? '#212529' : 'white'};
            padding: 1rem 1.5rem;
            border-radius: 8px;
            font-weight: 500;
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 350px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        `;
        
        const content = notification.querySelector('.notification-content');
        content.style.cssText = `
            display: flex;
            align-items: center;
            gap: 0.75rem;
        `;
        
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: inherit;
            font-size: 1.5rem;
            cursor: pointer;
            margin-left: 1rem;
            opacity: 0.8;
            transition: opacity 0.3s;
        `;
        
        closeBtn.addEventListener('click', () => {
            this.hide(notification);
        });
        
        closeBtn.addEventListener('mouseenter', () => {
            closeBtn.style.opacity = '1';
        });
        
        closeBtn.addEventListener('mouseleave', () => {
            closeBtn.style.opacity = '0.8';
        });
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Auto hide
        if (duration > 0) {
            setTimeout(() => {
                this.hide(notification);
            }, duration);
        }
        
        return notification;
    },

    hide: function(notification) {
        if (!notification) return;
        
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Update all badges
    FavoritesManager.updateBadges();
    CartManager.updateBadges();

    // Add favorite button functionality to product cards
    initializeFavoriteButtons();
    
    // Add cart button functionality
    initializeCartButtons();

    // Initialize search functionality
    initializeSearch();
});

// Initialize favorite buttons
function initializeFavoriteButtons() {
    // For product cards
    document.querySelectorAll('.product-card').forEach(card => {
        const favoriteBtn = card.querySelector('.favorite-btn, .btn-favorite');
        if (!favoriteBtn) return;

        const productId = card.getAttribute('data-product-id');
        
        // Check if already favorited
        if (FavoritesManager.isFavorited(productId)) {
            favoriteBtn.classList.add('active');
            const icon = favoriteBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('far');
                icon.classList.add('fas');
            }
        }

        favoriteBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const product = {
                id: productId,
                name: card.querySelector('.product-title, .product-name, h3')?.textContent || 'Unknown Product',
                price: parseInt(card.querySelector('.price, .product-price')?.textContent.replace(/[^\d]/g, '')) || 0,
                image: card.querySelector('img')?.src || 'https://via.placeholder.com/300x300',
                brand: card.querySelector('.brand, .product-brand')?.textContent || '',
                category: card.getAttribute('data-category') || 'other',
                stock: 'in-stock',
                stockText: '在庫あり'
            };

            const added = FavoritesManager.toggleFavorite(product);
            
            if (added) {
                this.classList.add('active');
                const icon = this.querySelector('i');
                if (icon) {
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                }
                NotificationManager.show(`${product.name}をお気に入りに追加しました`, 'success');
            } else {
                this.classList.remove('active');
                const icon = this.querySelector('i');
                if (icon) {
                    icon.classList.remove('fas');
                    icon.classList.add('far');
                }
                NotificationManager.show(`${product.name}をお気に入りから削除しました`, 'info');
            }
        });
    });
}

// Initialize cart buttons
function initializeCartButtons() {
    document.querySelectorAll('.add-to-cart-btn, .btn-add-to-cart').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const card = this.closest('.product-card, .recommendation-card, .product-item');
            if (!card) return;
            
            const product = {
                id: card.getAttribute('data-product-id') || 'PROD' + Date.now(),
                name: card.querySelector('.product-title, .product-name, h3')?.textContent || 'Unknown Product',
                price: parseInt(card.querySelector('.price, .product-price, .sale-price')?.textContent.replace(/[^\d]/g, '')) || 0,
                image: card.querySelector('img')?.src || 'https://via.placeholder.com/300x300',
                brand: card.querySelector('.brand, .product-brand')?.textContent || '',
                category: card.getAttribute('data-category') || 'other'
            };
            
            CartManager.addToCart(product);
            NotificationManager.show(`${product.name}をカートに追加しました`, 'success');
            
            // Animate button
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
}

// Initialize search
function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');
    
    if (searchInput && searchButton) {
        searchButton.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    function performSearch() {
        const query = searchInput.value.trim();
        if (query) {
            window.location.href = `product-list.html?search=${encodeURIComponent(query)}`;
        }
    }
}

// Export for use in other scripts
window.FavoritesManager = FavoritesManager;
window.CartManager = CartManager;
window.NotificationManager = NotificationManager;