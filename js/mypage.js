// My Page JavaScript

class MyPageManager {
    constructor() {
        this.currentSection = 'dashboard';
        this.init();
    }

    init() {
        this.bindEvents();
        this.initializeSection();
        this.setupModals();
        this.loadUserData();
    }

    bindEvents() {
        // Sidebar navigation
        document.querySelectorAll('.sidebar-nav a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const sectionId = e.currentTarget.getAttribute('data-section');
                if (sectionId) {
                    this.showSection(sectionId);
                }
            });
        });

        // Dashboard view all links
        document.querySelectorAll('.view-all-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const sectionId = e.currentTarget.getAttribute('data-section');
                if (sectionId) {
                    this.showSection(sectionId);
                }
            });
        });

        // Orders filter
        const searchBtn = document.querySelector('.search-btn');
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                this.filterOrders();
            });
        }

        // Favorites bulk actions
        this.bindFavoritesEvents();
        this.bindAddressEvents();
        this.bindPaymentEvents();
        this.bindProfileEvents();
        this.bindNotificationEvents();
        this.bindSecurityEvents();
    }

    bindFavoritesEvents() {
        // Select all favorites
        const selectAllCheckbox = document.getElementById('select-all-favorites');
        if (selectAllCheckbox) {
            selectAllCheckbox.addEventListener('change', (e) => {
                const checkboxes = document.querySelectorAll('.favorites-grid .item-checkbox');
                checkboxes.forEach(checkbox => {
                    checkbox.checked = e.target.checked;
                });
                this.updateBulkActions();
            });
        }

        // Individual checkboxes
        document.querySelectorAll('.favorites-grid .item-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.updateBulkActions();
            });
        });

        // Remove favorite buttons
        document.querySelectorAll('.remove-favorite-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const favoriteItem = e.target.closest('.favorite-item');
                if (favoriteItem && confirm('この商品をお気に入りから削除しますか？')) {
                    this.removeFavorite(favoriteItem);
                }
            });
        });

        // Add to cart buttons
        document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = e.target.getAttribute('data-product-id');
                this.addToCart(productId);
            });
        });

        // Notify buttons
        document.querySelectorAll('.notify-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = e.target.getAttribute('data-product-id');
                this.setRestockNotification(productId);
            });
        });

        // Sort favorites
        const sortSelect = document.querySelector('.favorites-actions .sort-select');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.sortFavorites(e.target.value);
            });
        }
    }

    bindAddressEvents() {
        // Add address button
        const addAddressBtn = document.querySelector('.add-address-btn');
        if (addAddressBtn) {
            addAddressBtn.addEventListener('click', () => {
                this.showAddressModal();
            });
        }

        // Edit address buttons
        document.querySelectorAll('.edit-address-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const addressCard = e.target.closest('.address-card');
                this.showAddressModal(addressCard);
            });
        });

        // Set default buttons
        document.querySelectorAll('.set-default-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const addressCard = e.target.closest('.address-card');
                this.setDefaultAddress(addressCard);
            });
        });

        // Delete address buttons
        document.querySelectorAll('.delete-address-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const addressCard = e.target.closest('.address-card');
                if (confirm('この配送先を削除しますか？')) {
                    this.deleteAddress(addressCard);
                }
            });
        });
    }

    bindPaymentEvents() {
        // Add payment button
        const addPaymentBtn = document.querySelector('.add-payment-btn');
        if (addPaymentBtn) {
            addPaymentBtn.addEventListener('click', () => {
                this.showPaymentModal();
            });
        }

        // Edit payment buttons
        document.querySelectorAll('.edit-payment-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const paymentCard = e.target.closest('.payment-card');
                this.showPaymentModal(paymentCard);
            });
        });

        // Set default payment buttons
        document.querySelectorAll('.payment-card .set-default-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const paymentCard = e.target.closest('.payment-card');
                this.setDefaultPayment(paymentCard);
            });
        });

        // Delete payment buttons
        document.querySelectorAll('.delete-payment-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const paymentCard = e.target.closest('.payment-card');
                if (confirm('この支払い方法を削除しますか？')) {
                    this.deletePayment(paymentCard);
                }
            });
        });

        // Payment type selector in modal
        const paymentTypeSelect = document.querySelector('.payment-type-select');
        if (paymentTypeSelect) {
            paymentTypeSelect.addEventListener('change', (e) => {
                this.togglePaymentFields(e.target.value);
            });
        }
    }

    bindProfileEvents() {
        // Save profile button
        const saveProfileBtn = document.querySelector('.save-profile-btn');
        if (saveProfileBtn) {
            saveProfileBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.saveProfile();
            });
        }

        // Cancel buttons
        document.querySelectorAll('.cancel-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.resetForm(e.target.closest('form') || e.target.closest('.content-section'));
            });
        });
    }

    bindNotificationEvents() {
        // Save notifications button
        const saveNotificationsBtn = document.querySelector('.save-notifications-btn');
        if (saveNotificationsBtn) {
            saveNotificationsBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.saveNotificationSettings();
            });
        }

        // Toggle switches
        document.querySelectorAll('.toggle input').forEach(toggle => {
            toggle.addEventListener('change', (e) => {
                this.updateNotificationSetting(e.target);
            });
        });
    }

    bindSecurityEvents() {
        // Change password button
        const changePasswordBtn = document.querySelector('.change-password-btn');
        if (changePasswordBtn) {
            changePasswordBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.changePassword();
            });
        }

        // Delete account button
        const deleteAccountBtn = document.querySelector('.delete-account-btn');
        if (deleteAccountBtn) {
            deleteAccountBtn.addEventListener('click', (e) => {
                if (confirm('本当にアカウントを削除しますか？この操作は取り消すことができません。')) {
                    if (confirm('最終確認: アカウントを削除すると全てのデータが失われます。続行しますか？')) {
                        this.deleteAccount();
                    }
                }
            });
        }

        // Logout all sessions button
        const logoutAllBtn = document.querySelector('.security-section .btn-outline');
        if (logoutAllBtn && logoutAllBtn.textContent.includes('ログアウト')) {
            logoutAllBtn.addEventListener('click', () => {
                if (confirm('すべてのセッションからログアウトしますか？')) {
                    this.logoutAllSessions();
                }
            });
        }
    }

    setupModals() {
        // Close modal buttons
        document.querySelectorAll('.close-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal');
                if (modal) {
                    this.hideModal(modal);
                }
            });
        });

        // Click outside modal to close
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.hideModal(modal);
                }
            });
        });

        // Form submissions
        const addressForm = document.querySelector('.address-form');
        if (addressForm) {
            addressForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveAddress(e.target);
            });
        }

        const paymentForm = document.querySelector('.payment-form');
        if (paymentForm) {
            paymentForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.savePayment(e.target);
            });
        }
    }

    showSection(sectionId) {
        // Update sidebar navigation
        document.querySelectorAll('.sidebar-nav li').forEach(li => {
            li.classList.remove('active');
        });
        
        const activeLink = document.querySelector(`[data-section="${sectionId}"]`);
        if (activeLink) {
            activeLink.parentElement.classList.add('active');
        }

        // Show/hide content sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });

        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            this.currentSection = sectionId;
        }

        // Load section-specific data
        this.loadSectionData(sectionId);
    }

    initializeSection() {
        this.showSection('dashboard');
    }

    loadSectionData(sectionId) {
        switch (sectionId) {
            case 'orders':
                this.loadOrders();
                break;
            case 'favorites':
                this.loadFavorites();
                break;
            case 'addresses':
                this.loadAddresses();
                break;
            case 'payment':
                this.loadPaymentMethods();
                break;
            case 'profile':
                this.loadProfile();
                break;
        }
    }

    loadUserData() {
        // Load dashboard stats
        this.updateDashboardStats();
        this.loadRecentOrders();
        this.loadRecommendations();
    }

    updateDashboardStats() {
        // Simulate API call to get user stats
        const stats = {
            monthlyOrders: 12,
            monthlyAmount: 145600,
            favorites: 28,
            points: 2450,
            pointsExpiry: '2024/12/31',
            shipping: 2
        };

        // Update stat cards
        document.querySelector('.stat-card .stat-number').textContent = `${stats.monthlyOrders}件`;
        document.querySelector('.stat-card .stat-amount').textContent = `¥${stats.monthlyAmount.toLocaleString()}`;
    }

    loadRecentOrders() {
        // This would typically fetch from an API
        const recentOrders = [
            {
                id: 'ORD-2024-001',
                date: '2024年1月15日',
                status: 'shipped',
                amount: 24800
            },
            {
                id: 'ORD-2024-002',
                date: '2024年1月18日',
                status: 'processing',
                amount: 15200
            }
        ];

        // Update recent orders display
        const ordersContainer = document.querySelector('.recent-orders');
        if (ordersContainer && recentOrders.length > 0) {
            // Orders are already populated in HTML for demo
        }
    }

    loadRecommendations() {
        // This would typically fetch personalized recommendations from an API
        const recommendations = [
            { id: 1, name: 'A4コピー用紙', price: 890 },
            { id: 2, name: 'ボールペン 10本セット', price: 1200 },
            { id: 3, name: 'クリアファイル', price: 320 }
        ];

        // Recommendations are already populated in HTML for demo
    }

    filterOrders() {
        const periodFilter = document.querySelector('.orders-filter select:first-child').value;
        const statusFilter = document.querySelector('.orders-filter select:last-child').value;

        // Simulate filtering orders
        console.log('Filtering orders:', { period: periodFilter, status: statusFilter });
        
        // Show loading state
        this.showLoadingState('.orders-list');
        
        // Simulate API call
        setTimeout(() => {
            this.hideLoadingState('.orders-list');
            this.showNotification('注文履歴を更新しました', 'success');
        }, 1000);
    }

    updateBulkActions() {
        const checkedItems = document.querySelectorAll('.favorites-grid .item-checkbox:checked');
        const bulkActionButtons = document.querySelectorAll('.bulk-actions button');
        
        bulkActionButtons.forEach(btn => {
            btn.disabled = checkedItems.length === 0;
        });

        // Update select all checkbox state
        const selectAllCheckbox = document.getElementById('select-all-favorites');
        const allCheckboxes = document.querySelectorAll('.favorites-grid .item-checkbox');
        if (selectAllCheckbox && allCheckboxes.length > 0) {
            selectAllCheckbox.checked = checkedItems.length === allCheckboxes.length;
            selectAllCheckbox.indeterminate = checkedItems.length > 0 && checkedItems.length < allCheckboxes.length;
        }
    }

    removeFavorite(favoriteItem) {
        favoriteItem.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        favoriteItem.style.opacity = '0';
        favoriteItem.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            favoriteItem.remove();
            this.showNotification('お気に入りから削除しました', 'success');
        }, 300);
    }

    addToCart(productId) {
        // Simulate adding to cart
        this.showNotification('カートに追加しました', 'success');
        
        // Update cart count in header
        const cartCount = document.querySelector('.cart .count');
        if (cartCount) {
            const currentCount = parseInt(cartCount.textContent) || 0;
            cartCount.textContent = currentCount + 1;
        }
    }

    setRestockNotification(productId) {
        this.showNotification('入荷通知を設定しました', 'success');
    }

    sortFavorites(sortBy) {
        const favoritesGrid = document.querySelector('.favorites-grid');
        const favoriteItems = Array.from(favoritesGrid.children);
        
        favoriteItems.sort((a, b) => {
            switch (sortBy) {
                case 'newest':
                    // Sort by newest (reverse order for demo)
                    return b.dataset.addedDate - a.dataset.addedDate;
                case 'oldest':
                    // Sort by oldest
                    return a.dataset.addedDate - b.dataset.addedDate;
                case 'price-low':
                    // Sort by price low to high
                    const priceA = parseFloat(a.querySelector('.price').textContent.replace(/[^\d]/g, ''));
                    const priceB = parseFloat(b.querySelector('.price').textContent.replace(/[^\d]/g, ''));
                    return priceA - priceB;
                case 'price-high':
                    // Sort by price high to low
                    const priceC = parseFloat(a.querySelector('.price').textContent.replace(/[^\d]/g, ''));
                    const priceD = parseFloat(b.querySelector('.price').textContent.replace(/[^\d]/g, ''));
                    return priceD - priceC;
                default:
                    return 0;
            }
        });

        // Re-append sorted items
        favoriteItems.forEach(item => favoritesGrid.appendChild(item));
        
        this.showNotification('お気に入りを並び替えました', 'success');
    }

    showAddressModal(addressCard = null) {
        const modal = document.getElementById('addressModal');
        const form = modal.querySelector('.address-form');
        
        if (addressCard) {
            // Populate form with existing address data
            const addressData = this.extractAddressData(addressCard);
            this.populateAddressForm(form, addressData);
        } else {
            // Clear form for new address
            form.reset();
        }
        
        this.showModal(modal);
    }

    showPaymentModal(paymentCard = null) {
        const modal = document.getElementById('paymentModal');
        const form = modal.querySelector('.payment-form');
        
        if (paymentCard) {
            // Populate form with existing payment data
            const paymentData = this.extractPaymentData(paymentCard);
            this.populatePaymentForm(form, paymentData);
        } else {
            // Clear form for new payment method
            form.reset();
            this.togglePaymentFields('credit'); // Default to credit card
        }
        
        this.showModal(modal);
    }

    showModal(modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Focus first input
        const firstInput = modal.querySelector('input, select');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }
    }

    hideModal(modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }

    togglePaymentFields(paymentType) {
        const creditFields = document.getElementById('creditCardFields');
        const bankFields = document.getElementById('bankTransferFields');
        
        if (creditFields && bankFields) {
            creditFields.style.display = paymentType === 'credit' ? 'block' : 'none';
            bankFields.style.display = paymentType === 'bank' ? 'block' : 'none';
        }
    }

    extractAddressData(addressCard) {
        return {
            name: addressCard.querySelector('.address-header h3').textContent,
            recipient: addressCard.querySelector('.recipient').textContent,
            company: addressCard.querySelector('.company')?.textContent || '',
            postalCode: addressCard.querySelector('.postal-code').textContent.replace('〒', ''),
            address1: addressCard.querySelectorAll('.address')[0].textContent,
            address2: addressCard.querySelectorAll('.address')[1]?.textContent || '',
            phone: addressCard.querySelector('.phone').textContent.replace('TEL: ', '')
        };
    }

    extractPaymentData(paymentCard) {
        const paymentType = paymentCard.querySelector('.payment-type span').textContent;
        const details = paymentCard.querySelectorAll('.payment-details p');
        
        return {
            type: paymentType.includes('VISA') ? 'credit' : paymentType.includes('銀行') ? 'bank' : 'cod',
            details: Array.from(details).map(p => p.textContent)
        };
    }

    populateAddressForm(form, data) {
        form.querySelector('input[placeholder="例: メインオフィス"]').value = data.name;
        // Add more form population logic here
    }

    populatePaymentForm(form, data) {
        const typeSelect = form.querySelector('.payment-type-select');
        if (typeSelect) {
            typeSelect.value = data.type;
            this.togglePaymentFields(data.type);
        }
        // Add more form population logic here
    }

    saveAddress(form) {
        const formData = new FormData(form);
        
        // Validate form
        if (!this.validateAddressForm(formData)) {
            return;
        }
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '保存中...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            this.hideModal(document.getElementById('addressModal'));
            this.showNotification('配送先を保存しました', 'success');
            this.loadAddresses(); // Refresh addresses list
        }, 1000);
    }

    savePayment(form) {
        const formData = new FormData(form);
        
        // Validate form
        if (!this.validatePaymentForm(formData)) {
            return;
        }
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '保存中...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            this.hideModal(document.getElementById('paymentModal'));
            this.showNotification('支払い方法を保存しました', 'success');
            this.loadPaymentMethods(); // Refresh payment methods list
        }, 1000);
    }

    validateAddressForm(formData) {
        // Add form validation logic
        return true;
    }

    validatePaymentForm(formData) {
        // Add form validation logic
        const paymentType = formData.get('paymentType');
        if (paymentType === 'credit') {
            const cardNumber = formData.get('cardNumber');
            if (!this.validateCreditCard(cardNumber)) {
                this.showNotification('有効なクレジットカード番号を入力してください', 'error');
                return false;
            }
        }
        return true;
    }

    validateCreditCard(cardNumber) {
        // Luhn algorithm for credit card validation
        const num = cardNumber.replace(/\s/g, '');
        if (!/^\d+$/.test(num)) return false;
        
        let sum = 0;
        let shouldDouble = false;
        
        for (let i = num.length - 1; i >= 0; i--) {
            let digit = parseInt(num.charAt(i));
            
            if (shouldDouble) {
                digit *= 2;
                if (digit > 9) digit -= 9;
            }
            
            sum += digit;
            shouldDouble = !shouldDouble;
        }
        
        return sum % 10 === 0;
    }

    setDefaultAddress(addressCard) {
        // Remove default from all address cards
        document.querySelectorAll('.address-card').forEach(card => {
            card.classList.remove('default');
            const badge = card.querySelector('.default-badge');
            if (badge) badge.remove();
        });
        
        // Set new default
        addressCard.classList.add('default');
        const header = addressCard.querySelector('.address-header');
        const badge = document.createElement('span');
        badge.className = 'default-badge';
        badge.textContent = '既定';
        header.appendChild(badge);
        
        this.showNotification('既定の配送先を変更しました', 'success');
    }

    setDefaultPayment(paymentCard) {
        // Remove default from all payment cards
        document.querySelectorAll('.payment-card').forEach(card => {
            card.classList.remove('default');
            const badge = card.querySelector('.default-badge');
            if (badge) badge.remove();
        });
        
        // Set new default
        paymentCard.classList.add('default');
        const header = paymentCard.querySelector('.payment-header');
        const badge = document.createElement('span');
        badge.className = 'default-badge';
        badge.textContent = '既定';
        header.appendChild(badge);
        
        this.showNotification('既定の支払い方法を変更しました', 'success');
    }

    deleteAddress(addressCard) {
        addressCard.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        addressCard.style.opacity = '0';
        addressCard.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            addressCard.remove();
            this.showNotification('配送先を削除しました', 'success');
        }, 300);
    }

    deletePayment(paymentCard) {
        paymentCard.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        paymentCard.style.opacity = '0';
        paymentCard.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            paymentCard.remove();
            this.showNotification('支払い方法を削除しました', 'success');
        }, 300);
    }

    saveProfile() {
        const form = document.querySelector('.profile-form');
        const formData = new FormData(form);
        
        // Show loading state
        const saveBtn = document.querySelector('.save-profile-btn');
        const originalText = saveBtn.textContent;
        saveBtn.textContent = '保存中...';
        saveBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            saveBtn.textContent = originalText;
            saveBtn.disabled = false;
            this.showNotification('プロフィールを更新しました', 'success');
        }, 1000);
    }

    saveNotificationSettings() {
        const settings = this.gatherNotificationSettings();
        
        // Show loading state
        const saveBtn = document.querySelector('.save-notifications-btn');
        const originalText = saveBtn.textContent;
        saveBtn.textContent = '保存中...';
        saveBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            saveBtn.textContent = originalText;
            saveBtn.disabled = false;
            this.showNotification('通知設定を更新しました', 'success');
        }, 1000);
    }

    gatherNotificationSettings() {
        const settings = {};
        document.querySelectorAll('.notifications-settings .toggle input').forEach(toggle => {
            const settingName = toggle.closest('.setting-item').querySelector('h4').textContent;
            settings[settingName] = toggle.checked;
        });
        return settings;
    }

    updateNotificationSetting(toggle) {
        const settingName = toggle.closest('.setting-item').querySelector('h4').textContent;
        console.log(`Notification setting changed: ${settingName} = ${toggle.checked}`);
    }

    changePassword() {
        const currentPassword = document.querySelector('input[placeholder="現在のパスワードを入力"]').value;
        const newPassword = document.querySelector('input[placeholder="新しいパスワードを入力"]').value;
        const confirmPassword = document.querySelector('input[placeholder="新しいパスワードを再入力"]').value;
        
        if (!currentPassword || !newPassword || !confirmPassword) {
            this.showNotification('すべてのフィールドを入力してください', 'error');
            return;
        }
        
        if (newPassword !== confirmPassword) {
            this.showNotification('新しいパスワードが一致しません', 'error');
            return;
        }
        
        if (newPassword.length < 8) {
            this.showNotification('パスワードは8文字以上で設定してください', 'error');
            return;
        }
        
        // Show loading state
        const changeBtn = document.querySelector('.change-password-btn');
        const originalText = changeBtn.textContent;
        changeBtn.textContent = '変更中...';
        changeBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            changeBtn.textContent = originalText;
            changeBtn.disabled = false;
            
            // Clear form
            document.querySelectorAll('#security input[type="password"]').forEach(input => {
                input.value = '';
            });
            
            this.showNotification('パスワードを変更しました', 'success');
        }, 1500);
    }

    deleteAccount() {
        // This would typically involve a more complex flow with email confirmation
        this.showNotification('アカウント削除の確認メールを送信しました', 'info');
    }

    logoutAllSessions() {
        this.showNotification('すべてのセッションからログアウトしました', 'success');
        // In a real application, this would redirect to login page
    }

    resetForm(container) {
        const form = container.querySelector('form');
        if (form) {
            form.reset();
        }
        this.showNotification('変更をキャンセルしました', 'info');
    }

    loadOrders() {
        // Simulate loading orders from API
        console.log('Loading orders...');
    }

    loadFavorites() {
        // Simulate loading favorites from API
        console.log('Loading favorites...');
    }

    loadAddresses() {
        // Simulate loading addresses from API
        console.log('Loading addresses...');
    }

    loadPaymentMethods() {
        // Simulate loading payment methods from API
        console.log('Loading payment methods...');
    }

    loadProfile() {
        // Simulate loading profile data from API
        console.log('Loading profile...');
    }

    showLoadingState(selector) {
        const element = document.querySelector(selector);
        if (element) {
            element.style.opacity = '0.5';
            element.style.pointerEvents = 'none';
        }
    }

    hideLoadingState(selector) {
        const element = document.querySelector(selector);
        if (element) {
            element.style.opacity = '';
            element.style.pointerEvents = '';
        }
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        // Add styles if not already present
        if (!document.querySelector('#notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    z-index: 10000;
                    max-width: 400px;
                    padding: 1rem;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                    transform: translateX(100%);
                    transition: transform 0.3s ease;
                }
                .notification-success {
                    background: #d4edda;
                    color: #155724;
                    border: 1px solid #c3e6cb;
                }
                .notification-error {
                    background: #f8d7da;
                    color: #721c24;
                    border: 1px solid #f5c6cb;
                }
                .notification-info {
                    background: #d1ecf1;
                    color: #0c5460;
                    border: 1px solid #bee5eb;
                }
                .notification-content {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                .notification-close {
                    background: none;
                    border: none;
                    font-size: 1.25rem;
                    cursor: pointer;
                    margin-left: 1rem;
                    opacity: 0.7;
                }
                .notification-close:hover {
                    opacity: 1;
                }
                .notification.show {
                    transform: translateX(0);
                }
            `;
            document.head.appendChild(styles);
        }

        // Add to document
        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        // Auto hide after 5 seconds
        const hideTimeout = setTimeout(() => {
            this.hideNotification(notification);
        }, 5000);

        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            clearTimeout(hideTimeout);
            this.hideNotification(notification);
        });
    }

    hideNotification(notification) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }
}

// Initialize My Page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const myPage = new MyPageManager();
});