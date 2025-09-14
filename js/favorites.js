// Favorites Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Favorites data structure
    const favoritesData = {
        items: [],
        selectedItems: [],
        currentCategory: 'all',
        currentSort: 'date-desc',
        currentView: 'grid',
        itemsPerPage: 12,
        currentPage: 1
    };

    // Initialize favorites from localStorage
    initializeFavorites();

    // Bind events
    bindEvents();

    // Load and display favorites
    loadFavorites();

    function initializeFavorites() {
        // Load favorites from localStorage
        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
            try {
                favoritesData.items = JSON.parse(storedFavorites);
            } catch (e) {
                console.error('Error loading favorites:', e);
                favoritesData.items = [];
            }
        } else {
            // Demo data for testing
            favoritesData.items = [
                {
                    id: 'FAV001',
                    name: 'A4コピー用紙 高白色 500枚×5冊',
                    brand: 'コクヨ',
                    model: 'KB-39N',
                    price: 2480,
                    originalPrice: null,
                    image: 'https://via.placeholder.com/300x300',
                    category: 'office',
                    stock: 'in-stock',
                    stockText: '在庫あり',
                    addedDate: '2024-01-15',
                    badges: []
                },
                {
                    id: 'FAV002',
                    name: 'ボールペン ジェットストリーム 0.5mm 黒 10本',
                    brand: '三菱鉛筆',
                    model: 'SXN-150-05',
                    price: 980,
                    originalPrice: 1200,
                    image: 'https://via.placeholder.com/300x300',
                    category: 'stationery',
                    stock: 'low-stock',
                    stockText: '残りわずか',
                    addedDate: '2024-01-18',
                    badges: ['sale']
                },
                {
                    id: 'FAV003',
                    name: 'クリアファイル A4 20枚入り',
                    brand: 'コクヨ',
                    model: 'フ-E750',
                    price: 680,
                    originalPrice: null,
                    image: 'https://via.placeholder.com/300x300',
                    category: 'stationery',
                    stock: 'in-stock',
                    stockText: '在庫あり',
                    addedDate: '2024-01-20',
                    badges: []
                }
            ];
            saveFavorites();
        }
    }

    function bindEvents() {
        // View toggle
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const view = this.getAttribute('data-view');
                changeView(view);
            });
        });

        // Sort change
        const sortSelect = document.getElementById('sortFavorites');
        if (sortSelect) {
            sortSelect.addEventListener('change', function() {
                favoritesData.currentSort = this.value;
                sortAndDisplay();
            });
        }

        // Category tabs
        document.querySelectorAll('.category-tab').forEach(tab => {
            tab.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                changeCategory(category);
            });
        });

        // Select all button
        const selectAllBtn = document.getElementById('selectAllFavorites');
        if (selectAllBtn) {
            selectAllBtn.addEventListener('click', function() {
                toggleSelectAll();
            });
        }

        // Add selected to cart
        const addToCartBtn = document.getElementById('addSelectedToCart');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', function() {
                addSelectedToCart();
            });
        }

        // Remove selected
        const removeSelectedBtn = document.getElementById('removeSelectedFavorites');
        if (removeSelectedBtn) {
            removeSelectedBtn.addEventListener('click', function() {
                removeSelectedFavorites();
            });
        }

        // Recommendation quick add to favorites
        document.querySelectorAll('.quick-add-favorite').forEach(btn => {
            btn.addEventListener('click', function() {
                toggleQuickFavorite(this);
            });
        });

        // Recommendation add to cart
        document.querySelectorAll('.recommendation-card .btn-add-to-cart').forEach(btn => {
            btn.addEventListener('click', function() {
                const card = this.closest('.recommendation-card');
                addRecommendationToCart(card);
            });
        });
    }

    function loadFavorites() {
        updateCounts();
        sortAndDisplay();
    }

    function changeView(view) {
        favoritesData.currentView = view;
        
        // Update button states
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`.view-btn[data-view="${view}"]`).classList.add('active');
        
        // Update grid class
        const grid = document.getElementById('favoritesGrid');
        grid.className = `favorites-grid ${view}-view`;
        
        // Re-render items with new view
        displayFavorites();
    }

    function changeCategory(category) {
        favoritesData.currentCategory = category;
        favoritesData.currentPage = 1;
        
        // Update tab states
        document.querySelectorAll('.category-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`.category-tab[data-category="${category}"]`).classList.add('active');
        
        // Display filtered items
        sortAndDisplay();
    }

    function sortAndDisplay() {
        let items = [...favoritesData.items];
        
        // Filter by category
        if (favoritesData.currentCategory !== 'all') {
            items = items.filter(item => item.category === favoritesData.currentCategory);
        }
        
        // Sort items
        switch (favoritesData.currentSort) {
            case 'date-desc':
                items.sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate));
                break;
            case 'date-asc':
                items.sort((a, b) => new Date(a.addedDate) - new Date(b.addedDate));
                break;
            case 'price-asc':
                items.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                items.sort((a, b) => b.price - a.price);
                break;
            case 'name-asc':
                items.sort((a, b) => a.name.localeCompare(b.name));
                break;
        }
        
        displayFavorites(items);
    }

    function displayFavorites(items = null) {
        const grid = document.getElementById('favoritesGrid');
        const emptyState = document.getElementById('emptyState');
        
        if (!items) {
            items = favoritesData.items;
        }
        
        // Clear grid
        grid.innerHTML = '';
        
        if (items.length === 0) {
            // Show empty state
            if (emptyState) {
                emptyState.style.display = 'block';
            }
            document.getElementById('favoritesPagination').style.display = 'none';
            return;
        }
        
        // Hide empty state
        if (emptyState) {
            emptyState.style.display = 'none';
        }
        
        // Calculate pagination
        const startIndex = (favoritesData.currentPage - 1) * favoritesData.itemsPerPage;
        const endIndex = startIndex + favoritesData.itemsPerPage;
        const paginatedItems = items.slice(startIndex, endIndex);
        
        // Display items
        paginatedItems.forEach(item => {
            const itemElement = createFavoriteItem(item);
            grid.appendChild(itemElement);
        });
        
        // Update pagination
        updatePagination(items.length);
        
        // Rebind item events
        bindItemEvents();
    }

    function createFavoriteItem(item) {
        const template = document.getElementById('favoriteItemTemplate');
        const clone = template.content.cloneNode(true);
        const element = clone.querySelector('.favorite-item');
        
        element.setAttribute('data-product-id', item.id);
        
        // Set checkbox
        const checkbox = element.querySelector('.item-checkbox');
        checkbox.checked = favoritesData.selectedItems.includes(item.id);
        
        // Set image
        const img = element.querySelector('.item-image img');
        img.src = item.image;
        img.alt = item.name;
        
        // Set badges
        const badgesContainer = element.querySelector('.item-badges');
        item.badges.forEach(badge => {
            const badgeEl = document.createElement('span');
            badgeEl.className = `badge ${badge}-badge`;
            badgeEl.textContent = badge === 'sale' ? 'セール' : badge === 'new' ? '新商品' : badge;
            badgesContainer.appendChild(badgeEl);
        });
        
        // Set details
        element.querySelector('.item-name').textContent = item.name;
        element.querySelector('.item-brand').textContent = item.brand;
        element.querySelector('.item-model').textContent = `型番: ${item.model}`;
        
        // Set price
        const priceContainer = element.querySelector('.item-price');
        if (item.originalPrice) {
            priceContainer.innerHTML = `
                <span class="price-original">¥${item.originalPrice.toLocaleString()}</span>
                <span class="price-current">¥${item.price.toLocaleString()}</span>
            `;
        } else {
            priceContainer.innerHTML = `
                <span class="price-current">¥${item.price.toLocaleString()}</span>
            `;
        }
        
        // Set stock status
        const stockEl = element.querySelector('.item-stock');
        stockEl.className = `item-stock stock-${item.stock.replace('-stock', '')}`;
        stockEl.innerHTML = `<i class="fas fa-${item.stock === 'in-stock' ? 'check-circle' : item.stock === 'low-stock' ? 'exclamation-triangle' : 'times-circle'}"></i> ${item.stockText}`;
        
        // Set added date
        element.querySelector('.item-added-date span').textContent = item.addedDate;
        
        return element;
    }

    function bindItemEvents() {
        // Item checkboxes
        document.querySelectorAll('.favorite-item .item-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const itemId = this.closest('.favorite-item').getAttribute('data-product-id');
                toggleItemSelection(itemId, this.checked);
            });
        });
        
        // Move to cart buttons
        document.querySelectorAll('.btn-move-to-cart').forEach(btn => {
            btn.addEventListener('click', function() {
                const itemId = this.closest('.favorite-item').getAttribute('data-product-id');
                moveItemToCart(itemId);
            });
        });
        
        // Quick order buttons
        document.querySelectorAll('.btn-quick-order').forEach(btn => {
            btn.addEventListener('click', function() {
                const itemId = this.closest('.favorite-item').getAttribute('data-product-id');
                quickOrder(itemId);
            });
        });
        
        // Remove buttons
        document.querySelectorAll('.btn-remove-favorite').forEach(btn => {
            btn.addEventListener('click', function() {
                const itemId = this.closest('.favorite-item').getAttribute('data-product-id');
                removeFromFavorites(itemId);
            });
        });
    }

    function toggleItemSelection(itemId, isSelected) {
        const itemElement = document.querySelector(`.favorite-item[data-product-id="${itemId}"]`);
        
        if (isSelected) {
            if (!favoritesData.selectedItems.includes(itemId)) {
                favoritesData.selectedItems.push(itemId);
            }
            itemElement.classList.add('selected');
        } else {
            favoritesData.selectedItems = favoritesData.selectedItems.filter(id => id !== itemId);
            itemElement.classList.remove('selected');
        }
        
        updateBulkActionButtons();
    }

    function toggleSelectAll() {
        const allCheckboxes = document.querySelectorAll('.favorite-item .item-checkbox');
        const selectAllBtn = document.getElementById('selectAllFavorites');
        const allChecked = favoritesData.selectedItems.length === allCheckboxes.length;
        
        if (allChecked) {
            // Unselect all
            favoritesData.selectedItems = [];
            allCheckboxes.forEach(checkbox => {
                checkbox.checked = false;
                checkbox.closest('.favorite-item').classList.remove('selected');
            });
            selectAllBtn.innerHTML = '<i class="fas fa-check-square"></i> すべて選択';
        } else {
            // Select all
            favoritesData.selectedItems = [];
            allCheckboxes.forEach(checkbox => {
                checkbox.checked = true;
                const itemId = checkbox.closest('.favorite-item').getAttribute('data-product-id');
                favoritesData.selectedItems.push(itemId);
                checkbox.closest('.favorite-item').classList.add('selected');
            });
            selectAllBtn.innerHTML = '<i class="fas fa-square"></i> 選択解除';
        }
        
        updateBulkActionButtons();
    }

    function updateBulkActionButtons() {
        const addToCartBtn = document.getElementById('addSelectedToCart');
        const removeBtn = document.getElementById('removeSelectedFavorites');
        const hasSelected = favoritesData.selectedItems.length > 0;
        
        if (addToCartBtn) {
            addToCartBtn.disabled = !hasSelected;
        }
        
        if (removeBtn) {
            removeBtn.disabled = !hasSelected;
        }
        
        // Update select all button text
        const selectAllBtn = document.getElementById('selectAllFavorites');
        const allCheckboxes = document.querySelectorAll('.favorite-item .item-checkbox');
        if (selectAllBtn && allCheckboxes.length > 0) {
            const allChecked = favoritesData.selectedItems.length === allCheckboxes.length;
            selectAllBtn.innerHTML = allChecked ? 
                '<i class="fas fa-square"></i> 選択解除' : 
                '<i class="fas fa-check-square"></i> すべて選択';
        }
    }

    function addSelectedToCart() {
        const selectedItems = favoritesData.items.filter(item => 
            favoritesData.selectedItems.includes(item.id)
        );
        
        if (selectedItems.length === 0) return;
        
        // Add to cart (integrate with cart system)
        selectedItems.forEach(item => {
            addToCart(item);
        });
        
        showNotification(`${selectedItems.length}件の商品をカートに追加しました`, 'success');
        
        // Clear selections
        favoritesData.selectedItems = [];
        document.querySelectorAll('.favorite-item .item-checkbox').forEach(checkbox => {
            checkbox.checked = false;
        });
        document.querySelectorAll('.favorite-item.selected').forEach(item => {
            item.classList.remove('selected');
        });
        
        updateBulkActionButtons();
    }

    function removeSelectedFavorites() {
        if (favoritesData.selectedItems.length === 0) return;
        
        if (confirm(`選択した${favoritesData.selectedItems.length}件の商品をお気に入りから削除しますか？`)) {
            favoritesData.items = favoritesData.items.filter(item => 
                !favoritesData.selectedItems.includes(item.id)
            );
            
            saveFavorites();
            showNotification(`${favoritesData.selectedItems.length}件の商品を削除しました`, 'info');
            
            favoritesData.selectedItems = [];
            updateCounts();
            sortAndDisplay();
        }
    }

    function moveItemToCart(itemId) {
        const item = favoritesData.items.find(i => i.id === itemId);
        if (!item) return;
        
        addToCart(item);
        showNotification(`${item.name}をカートに追加しました`, 'success');
    }

    function quickOrder(itemId) {
        const item = favoritesData.items.find(i => i.id === itemId);
        if (!item) return;
        
        // Add to cart and redirect to checkout
        addToCart(item);
        window.location.href = 'checkout.html';
    }

    function removeFromFavorites(itemId) {
        const item = favoritesData.items.find(i => i.id === itemId);
        if (!item) return;
        
        if (confirm(`${item.name}をお気に入りから削除しますか？`)) {
            // Animate removal
            const itemElement = document.querySelector(`.favorite-item[data-product-id="${itemId}"]`);
            if (itemElement) {
                itemElement.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                itemElement.style.opacity = '0';
                itemElement.style.transform = 'scale(0.9)';
                
                setTimeout(() => {
                    favoritesData.items = favoritesData.items.filter(i => i.id !== itemId);
                    saveFavorites();
                    updateCounts();
                    sortAndDisplay();
                    showNotification('お気に入りから削除しました', 'info');
                }, 300);
            }
        }
    }

    function toggleQuickFavorite(button) {
        button.classList.toggle('active');
        const icon = button.querySelector('i');
        
        if (button.classList.contains('active')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            showNotification('お気に入りに追加しました', 'success');
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            showNotification('お気に入りから削除しました', 'info');
        }
    }

    function addRecommendationToCart(card) {
        const productName = card.querySelector('h3').textContent;
        showNotification(`${productName}をカートに追加しました`, 'success');
        updateCartBadge(1);
    }

    function addToCart(item) {
        // Get existing cart or create new
        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
        
        // Check if item already in cart
        const existingItem = cart.find(cartItem => cartItem.id === item.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...item,
                quantity: 1
            });
        }
        
        // Save cart
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Update cart badge
        updateCartBadge();
    }

    function updateCartBadge(increment = 0) {
        const cartBadges = document.querySelectorAll('.cart .count');
        cartBadges.forEach(badge => {
            const currentCount = parseInt(badge.textContent) || 0;
            badge.textContent = currentCount + increment;
        });
    }

    function updateCounts() {
        // Update total count
        document.getElementById('totalFavorites').textContent = favoritesData.items.length;
        document.getElementById('favoritesCount').textContent = favoritesData.items.length;
        
        // Update category counts
        const categoryCounts = {
            all: favoritesData.items.length,
            office: 0,
            stationery: 0,
            tools: 0,
            other: 0
        };
        
        favoritesData.items.forEach(item => {
            if (categoryCounts[item.category] !== undefined) {
                categoryCounts[item.category]++;
            } else {
                categoryCounts.other++;
            }
        });
        
        // Update badges
        document.querySelectorAll('.category-tab').forEach(tab => {
            const category = tab.getAttribute('data-category');
            const badge = tab.querySelector('.badge');
            if (badge) {
                badge.textContent = categoryCounts[category] || 0;
            }
        });
    }

    function updatePagination(totalItems) {
        const pagination = document.getElementById('favoritesPagination');
        if (!pagination) return;
        
        const totalPages = Math.ceil(totalItems / favoritesData.itemsPerPage);
        
        if (totalPages <= 1) {
            pagination.style.display = 'none';
            return;
        }
        
        pagination.style.display = 'flex';
        
        // Update prev button
        const prevBtn = pagination.querySelector('.prev');
        prevBtn.disabled = favoritesData.currentPage === 1;
        
        // Update next button
        const nextBtn = pagination.querySelector('.next');
        nextBtn.disabled = favoritesData.currentPage === totalPages;
        
        // Update page numbers
        const pageNumbers = pagination.querySelector('.page-numbers');
        pageNumbers.innerHTML = '';
        
        for (let i = 1; i <= Math.min(totalPages, 5); i++) {
            const pageBtn = document.createElement('button');
            pageBtn.className = 'page-number';
            pageBtn.textContent = i;
            if (i === favoritesData.currentPage) {
                pageBtn.classList.add('active');
            }
            pageBtn.addEventListener('click', () => {
                favoritesData.currentPage = i;
                sortAndDisplay();
            });
            pageNumbers.appendChild(pageBtn);
        }
        
        // Bind pagination events
        prevBtn.onclick = () => {
            if (favoritesData.currentPage > 1) {
                favoritesData.currentPage--;
                sortAndDisplay();
            }
        };
        
        nextBtn.onclick = () => {
            if (favoritesData.currentPage < totalPages) {
                favoritesData.currentPage++;
                sortAndDisplay();
            }
        };
    }

    function saveFavorites() {
        localStorage.setItem('favorites', JSON.stringify(favoritesData.items));
    }

    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : type === 'warning' ? '#ffc107' : '#17a2b8'};
            color: ${type === 'warning' ? '#212529' : 'white'};
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
});