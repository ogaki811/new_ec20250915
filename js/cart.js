// Shopping Cart JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize cart functionality
    initCartFunctionality();
    initQuantityControls();
    initItemSelection();
    initPromoCode();
    initRecommendations();
    
    // Cart data management
    let cartData = {
        items: [
            {
                id: 'item001',
                name: 'コクヨ ファイルボックス-FS ピース B4 グレー',
                code: 'フボ-FSB4M',
                brand: 'コクヨ',
                price: 342,
                originalPrice: 380,
                quantity: 2,
                maxQuantity: 999,
                stock: 98,
                bulkPrice: 308,
                bulkMinQuantity: 10,
                image: 'img/product/A-74769_l1.jpg',
                features: ['翌日配送', '送料無料対象']
            },
            {
                id: 'item002',
                name: 'リヒトラブ インデックスラベル 5色セット',
                code: 'HK753',
                brand: 'リヒトラブ',
                price: 156,
                quantity: 5,
                maxQuantity: 999,
                stock: 156,
                image: 'img/product/AW75003_l1.jpg',
                features: ['翌日配送']
            },
            {
                id: 'item003',
                name: 'プラス クリアファイル A4 20ポケット ブルー',
                code: 'FC-122EL',
                brand: 'プラス',
                price: 420,
                quantity: 1,
                maxQuantity: 3,
                stock: 3,
                image: 'img/product/XU14820_l1.jpg',
                features: ['翌日配送', '送料無料対象']
            }
        ],
        selectedItems: ['item001', 'item002', 'item003'],
        promos: {
            'FIRST10': {
                name: '初回購入10%OFF',
                discount: 0.1,
                available: true
            }
        },
        appliedPromos: [],
        shippingThreshold: 1900
    };
    
    // Initialize cart functionality
    function initCartFunctionality() {
        updateCartDisplay();
        updateOrderSummary();
        
        // Continue shopping button
        const continueBtn = document.getElementById('continueShoppingBtn');
        if (continueBtn) {
            continueBtn.addEventListener('click', function() {
                window.location.href = 'product-list.html';
            });
        }
        
        // Checkout button
        const checkoutBtn = document.getElementById('checkoutBtn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', function() {
                if (cartData.selectedItems.length === 0) {
                    showNotification('選択された商品がありません', 'warning');
                    return;
                }
                
                // Show loading state
                this.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="animate-spin" style="animation: spin 1s linear infinite;">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M8 12l2 2 4-4"></path>
                    </svg>
                    処理中...
                `;
                this.disabled = true;
                
                // Simulate processing
                setTimeout(() => {
                    window.location.href = 'checkout.html';
                }, 1500);
            });
        }
    }
    
    // Initialize quantity controls
    function initQuantityControls() {
        const quantityButtons = document.querySelectorAll('.quantity-btn');
        const quantityInputs = document.querySelectorAll('.quantity-input');
        
        quantityButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const cartItem = this.closest('.cart-item');
                const itemId = cartItem.getAttribute('data-item-id');
                const action = this.getAttribute('data-action');
                const input = cartItem.querySelector('.quantity-input');
                const currentValue = parseInt(input.value) || 1;
                
                const item = cartData.items.find(i => i.id === itemId);
                if (!item) return;
                
                let newValue = currentValue;
                
                if (action === 'increase' && currentValue < item.maxQuantity) {
                    newValue = currentValue + 1;
                } else if (action === 'decrease' && currentValue > 1) {
                    newValue = currentValue - 1;
                }
                
                if (newValue !== currentValue) {
                    input.value = newValue;
                    updateItemQuantity(itemId, newValue);
                }
            });
        });
        
        quantityInputs.forEach(input => {
            input.addEventListener('input', function() {
                const cartItem = this.closest('.cart-item');
                const itemId = cartItem.getAttribute('data-item-id');
                let value = parseInt(this.value) || 1;
                
                const item = cartData.items.find(i => i.id === itemId);
                if (!item) return;
                
                // Validate quantity
                if (value < 1) value = 1;
                if (value > item.maxQuantity) value = item.maxQuantity;
                
                this.value = value;
                updateItemQuantity(itemId, value);
            });
            
            input.addEventListener('blur', function() {
                if (!this.value || parseInt(this.value) < 1) {
                    this.value = 1;
                    const cartItem = this.closest('.cart-item');
                    const itemId = cartItem.getAttribute('data-item-id');
                    updateItemQuantity(itemId, 1);
                }
            });
        });
    }
    
    // Initialize item selection
    function initItemSelection() {
        const selectAllCheckbox = document.getElementById('selectAll');
        const itemCheckboxes = document.querySelectorAll('.item-checkbox');
        const removeSelectedBtn = document.getElementById('removeSelected');
        
        // Select all functionality
        if (selectAllCheckbox) {
            selectAllCheckbox.addEventListener('change', function() {
                const isChecked = this.checked;
                itemCheckboxes.forEach(checkbox => {
                    checkbox.checked = isChecked;
                    const itemId = checkbox.closest('.cart-item').getAttribute('data-item-id');
                    
                    if (isChecked) {
                        if (!cartData.selectedItems.includes(itemId)) {
                            cartData.selectedItems.push(itemId);
                        }
                    } else {
                        cartData.selectedItems = cartData.selectedItems.filter(id => id !== itemId);
                    }
                });
                
                updateOrderSummary();
                updateRemoveSelectedButton();
            });
        }
        
        // Individual item selection
        itemCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const itemId = this.closest('.cart-item').getAttribute('data-item-id');
                
                if (this.checked) {
                    if (!cartData.selectedItems.includes(itemId)) {
                        cartData.selectedItems.push(itemId);
                    }
                } else {
                    cartData.selectedItems = cartData.selectedItems.filter(id => id !== itemId);
                }
                
                updateSelectAllState();
                updateOrderSummary();
                updateRemoveSelectedButton();
            });
        });
        
        // Remove selected items
        if (removeSelectedBtn) {
            removeSelectedBtn.addEventListener('click', function() {
                if (cartData.selectedItems.length === 0) {
                    showNotification('削除する商品を選択してください', 'warning');
                    return;
                }
                
                if (confirm(`選択した${cartData.selectedItems.length}個の商品をカートから削除しますか？`)) {
                    cartData.selectedItems.forEach(itemId => {
                        removeCartItem(itemId);
                    });
                    cartData.selectedItems = [];
                    updateCartDisplay();
                    updateOrderSummary();
                    showNotification('選択した商品をカートから削除しました', 'success');
                }
            });
        }
        
        // Individual remove buttons
        const removeButtons = document.querySelectorAll('.btn-remove');
        removeButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const cartItem = this.closest('.cart-item');
                const itemId = cartItem.getAttribute('data-item-id');
                const itemName = cartItem.querySelector('.item-name a').textContent;
                
                if (confirm(`「${itemName}」をカートから削除しますか？`)) {
                    removeCartItem(itemId);
                    updateCartDisplay();
                    updateOrderSummary();
                    showNotification('商品をカートから削除しました', 'success');
                }
            });
        });
        
        // Favorite buttons
        const favoriteButtons = document.querySelectorAll('.btn-favorite');
        favoriteButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const cartItem = this.closest('.cart-item');
                const itemName = cartItem.querySelector('.item-name a').textContent;
                
                // Toggle favorite state (visual feedback)
                this.classList.toggle('active');
                
                if (this.classList.contains('active')) {
                    this.innerHTML = `
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                    `;
                    showNotification(`「${itemName}」をお気に入りに追加しました`, 'success');
                } else {
                    this.innerHTML = `
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                    `;
                    showNotification(`「${itemName}」をお気に入りから削除しました`, 'info');
                }
            });
        });
    }
    
    // Initialize promo code functionality
    function initPromoCode() {
        const promoInput = document.querySelector('.promo-code');
        const applyBtn = document.querySelector('.btn-apply-promo');
        const promoCheckboxes = document.querySelectorAll('.promo-item input[type=\"checkbox\"]');
        
        if (applyBtn && promoInput) {
            applyBtn.addEventListener('click', function() {
                const code = promoInput.value.trim().toUpperCase();
                applyPromoCode(code);
            });
            
            promoInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    const code = this.value.trim().toUpperCase();
                    applyPromoCode(code);
                }
            });
        }
        
        promoCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const promoCode = this.id.replace('promo', '').toUpperCase();
                
                if (this.checked) {
                    if (!cartData.appliedPromos.includes(promoCode)) {
                        cartData.appliedPromos.push(promoCode);
                    }
                } else {
                    cartData.appliedPromos = cartData.appliedPromos.filter(code => code !== promoCode);
                }
                
                updateOrderSummary();
            });
        });
    }
    
    // Initialize recommendations
    function initRecommendations() {
        const addToCartBtns = document.querySelectorAll('.recommendations .btn-add-to-cart');
        
        addToCartBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const recommendedItem = this.closest('.recommended-item');
                const itemName = recommendedItem.querySelector('.item-name').textContent;
                
                // Show loading state
                const originalHTML = this.innerHTML;
                this.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="animate-spin" style="animation: spin 1s linear infinite;">
                        <circle cx="12" cy="12" r="10"></circle>
                    </svg>
                `;
                this.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    this.innerHTML = `
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M20 6L9 17l-5-5"></path>
                        </svg>
                    `;
                    this.style.backgroundColor = '#28a745';
                    
                    showNotification(`「${itemName}」をカートに追加しました`, 'success');
                    
                    // Reset button
                    setTimeout(() => {
                        this.innerHTML = originalHTML;
                        this.disabled = false;
                        this.style.backgroundColor = '';
                    }, 2000);
                }, 1000);
            });
        });
    }
    
    // Update item quantity
    function updateItemQuantity(itemId, newQuantity) {
        const item = cartData.items.find(i => i.id === itemId);
        if (item) {
            item.quantity = newQuantity;
            updateItemDisplay(itemId);
            updateOrderSummary();
            
            // Show bulk discount notification if applicable
            if (item.bulkMinQuantity && newQuantity >= item.bulkMinQuantity && !item.bulkNotified) {
                showNotification(`${item.bulkMinQuantity}個以上で単価が¥${item.bulkPrice}になります！`, 'info');
                item.bulkNotified = true;
            }
        }
    }
    
    // Update individual item display
    function updateItemDisplay(itemId) {
        const item = cartData.items.find(i => i.id === itemId);
        const cartItemElement = document.querySelector(`[data-item-id=\"${itemId}\"]`);
        
        if (!item || !cartItemElement) return;
        
        // Update total price
        const effectivePrice = (item.bulkPrice && item.quantity >= item.bulkMinQuantity) 
            ? item.bulkPrice 
            : item.price;
        const total = effectivePrice * item.quantity;
        
        const totalPriceElement = cartItemElement.querySelector('.total-price');
        if (totalPriceElement) {
            totalPriceElement.textContent = `¥${total.toLocaleString()}`;
        }
        
        // Update unit price display if bulk pricing applies
        const unitPriceElement = cartItemElement.querySelector('.current-price');
        if (unitPriceElement) {
            unitPriceElement.textContent = `¥${effectivePrice.toLocaleString()}`;
        }
        
        // Update bulk discount visibility
        const bulkDiscountElement = cartItemElement.querySelector('.bulk-discount');
        if (bulkDiscountElement && item.bulkPrice) {
            if (item.quantity >= item.bulkMinQuantity) {
                bulkDiscountElement.style.background = '#e8f5e8';
                bulkDiscountElement.style.color = '#28a745';
                bulkDiscountElement.style.fontWeight = '600';
            } else {
                bulkDiscountElement.style.background = '#f8f9fa';
                bulkDiscountElement.style.color = '#6c757d';
                bulkDiscountElement.style.fontWeight = '400';
            }
        }
    }
    
    // Remove cart item
    function removeCartItem(itemId) {
        cartData.items = cartData.items.filter(item => item.id !== itemId);
        cartData.selectedItems = cartData.selectedItems.filter(id => id !== itemId);
        
        // Remove from DOM
        const cartItemElement = document.querySelector(`[data-item-id="${itemId}"]`);
        if (cartItemElement) {
            cartItemElement.style.opacity = '0';
            cartItemElement.style.transform = 'translateX(-100%)';
            setTimeout(() => {
                cartItemElement.remove();
            }, 300);
        }
    }
    
    // Update cart display
    function updateCartDisplay() {
        const itemCountElement = document.querySelector('.item-count');
        if (itemCountElement) {
            const totalItems = cartData.items.reduce((sum, item) => sum + item.quantity, 0);
            itemCountElement.textContent = totalItems;
        }
        
        // Update header cart badge
        const cartBadges = document.querySelectorAll('.function-badge');
        cartBadges.forEach(badge => {
            if (badge.parentElement.querySelector('.function-text')?.textContent.includes('カート')) {
                const totalItems = cartData.items.reduce((sum, item) => sum + item.quantity, 0);
                badge.textContent = totalItems;
            }
        });
        
        updateSelectAllState();
        updateRemoveSelectedButton();
    }
    
    // Update select all checkbox state
    function updateSelectAllState() {
        const selectAllCheckbox = document.getElementById('selectAll');
        const itemCheckboxes = document.querySelectorAll('.item-checkbox');
        
        if (selectAllCheckbox && itemCheckboxes.length > 0) {
            const checkedCount = Array.from(itemCheckboxes).filter(cb => cb.checked).length;
            
            if (checkedCount === itemCheckboxes.length) {
                selectAllCheckbox.checked = true;
                selectAllCheckbox.indeterminate = false;
            } else if (checkedCount === 0) {
                selectAllCheckbox.checked = false;
                selectAllCheckbox.indeterminate = false;
            } else {
                selectAllCheckbox.checked = false;
                selectAllCheckbox.indeterminate = true;
            }
        }
    }
    
    // Update remove selected button state
    function updateRemoveSelectedButton() {
        const removeSelectedBtn = document.getElementById('removeSelected');
        if (removeSelectedBtn) {
            const hasSelected = cartData.selectedItems.length > 0;
            removeSelectedBtn.disabled = !hasSelected;
            removeSelectedBtn.textContent = hasSelected 
                ? `選択商品を削除 (${cartData.selectedItems.length})` 
                : '選択商品を削除';
        }
    }
    
    // Apply promo code
    function applyPromoCode(code) {
        const promoInput = document.querySelector('.promo-code');
        
        if (!code) {
            showNotification('プロモーションコードを入力してください', 'warning');
            return;
        }
        
        if (cartData.appliedPromos.includes(code)) {
            showNotification('このプロモーションコードは既に適用されています', 'info');
            promoInput.value = '';
            return;
        }
        
        const promo = cartData.promos[code];
        if (promo && promo.available) {
            cartData.appliedPromos.push(code);
            showNotification(`プロモーションコード「${code}」を適用しました`, 'success');
            promoInput.value = '';
            updateOrderSummary();
        } else {
            showNotification('無効なプロモーションコードです', 'error');
            promoInput.focus();
        }
    }
    
    // Show notification
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : type === 'warning' ? '#ffc107' : '#17a2b8'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 6px;
            font-weight: 500;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    // Initialize
    updateRemoveSelectedButton();
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        
        .cart-item {
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
        
        .quantity-btn:active {
            transform: scale(0.95);
        }
        
        .btn-checkout:active,
        .btn-continue-shopping:active {
            transform: translateY(0);
        }
        
        .recommended-item:hover .btn-add-to-cart {
            transform: scale(1.05);
        }
    `;
    document.head.appendChild(style);
});