// Signup Form JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const signupForm = document.getElementById('signupForm');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const passwordToggle = document.getElementById('passwordToggle');
    const confirmPasswordToggle = document.getElementById('confirmPasswordToggle');
    const strengthBar = document.getElementById('strengthBar');
    const strengthText = document.getElementById('strengthText');
    
    // Birth date selects
    const birthYearSelect = document.getElementById('birthYear');
    const birthMonthSelect = document.getElementById('birthMonth');
    const birthDaySelect = document.getElementById('birthDay');
    
    // Initialize birth date selects
    initializeDateSelects();
    
    // Password visibility toggle
    if (passwordToggle) {
        passwordToggle.addEventListener('click', function() {
            togglePasswordVisibility('password', this);
        });
    }
    
    if (confirmPasswordToggle) {
        confirmPasswordToggle.addEventListener('click', function() {
            togglePasswordVisibility('confirmPassword', this);
        });
    }
    
    // Password strength checker
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            const strength = window.ECUtils.getPasswordStrength(password);
            
            // Update strength bar
            strengthBar.className = 'strength-bar ' + strength.level;
            strengthText.textContent = 'パスワード強度: ' + strength.text;
            
            // Validate confirm password when password changes
            if (confirmPasswordInput.value) {
                validatePasswordMatch();
            }
        });
    }
    
    // Confirm password validation
    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', validatePasswordMatch);
        confirmPasswordInput.addEventListener('blur', validatePasswordMatch);
    }
    
    // Form validation
    if (signupForm) {
        signupForm.addEventListener('submit', handleFormSubmit);
        
        // Real-time validation
        const inputs = signupForm.querySelectorAll('input[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
        });
        
        // Katakana validation for name fields
        const katakanaFields = ['lastNameKana', 'firstNameKana'];
        katakanaFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                field.addEventListener('input', function() {
                    validateKatakana(this);
                });
            }
        });
    }
    
    // Initialize date selects
    function initializeDateSelects() {
        // Years (1900-current year)
        const currentYear = new Date().getFullYear();
        for (let year = currentYear; year >= 1900; year--) {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year + '年';
            birthYearSelect.appendChild(option);
        }
        
        // Months
        for (let month = 1; month <= 12; month++) {
            const option = document.createElement('option');
            option.value = month;
            option.textContent = month + '月';
            birthMonthSelect.appendChild(option);
        }
        
        // Update days when year or month changes
        birthYearSelect.addEventListener('change', updateDays);
        birthMonthSelect.addEventListener('change', updateDays);
        
        function updateDays() {
            const year = parseInt(birthYearSelect.value);
            const month = parseInt(birthMonthSelect.value);
            
            // Clear existing days
            birthDaySelect.innerHTML = '<option value="">日</option>';
            
            if (year && month) {
                // Get days in month
                const daysInMonth = new Date(year, month, 0).getDate();
                
                for (let day = 1; day <= daysInMonth; day++) {
                    const option = document.createElement('option');
                    option.value = day;
                    option.textContent = day + '日';
                    birthDaySelect.appendChild(option);
                }
            }
        }
    }
    
    // Toggle password visibility
    function togglePasswordVisibility(fieldId, button) {
        const field = document.getElementById(fieldId);
        const isPassword = field.type === 'password';
        
        field.type = isPassword ? 'text' : 'password';
        
        // Update icon (simplified - in real app would swap between eye/eye-slash icons)
        button.style.opacity = isPassword ? '0.7' : '1';
    }
    
    // Validate password match
    function validatePasswordMatch() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        const errorDiv = document.getElementById('confirmPasswordError');
        
        if (confirmPassword && password !== confirmPassword) {
            showFieldError('confirmPassword', 'パスワードが一致しません');
            return false;
        } else {
            clearFieldError('confirmPassword');
            return true;
        }
    }
    
    // Validate katakana input
    function validateKatakana(field) {
        const value = field.value;
        const katakanaRegex = /^[ァ-ヶー]*$/;
        
        if (value && !katakanaRegex.test(value)) {
            showFieldError(field.id, 'カタカナで入力してください');
            return false;
        } else {
            clearFieldError(field.id);
            return true;
        }
    }
    
    // Field validation
    function validateField(field) {
        const value = field.value.trim();
        const fieldId = field.id;
        
        // Clear previous errors
        clearFieldError(fieldId);
        
        // Required field validation
        if (field.hasAttribute('required') && !value) {
            showFieldError(fieldId, 'この項目は必須です');
            return false;
        }
        
        // Email validation
        if (fieldId === 'email' && value && !window.ECUtils.validateEmail(value)) {
            showFieldError(fieldId, '正しいメールアドレスを入力してください');
            return false;
        }
        
        // Password validation
        if (fieldId === 'password' && value && !window.ECUtils.validatePassword(value)) {
            showFieldError(fieldId, 'パスワードは8文字以上で入力してください');
            return false;
        }
        
        // Name validation (no numbers or special characters)
        if ((fieldId === 'lastName' || fieldId === 'firstName') && value) {
            const nameRegex = /^[ぁ-んァ-ヶ一-龠々ー\s]+$/;
            if (!nameRegex.test(value)) {
                showFieldError(fieldId, '正しい名前を入力してください');
                return false;
            }
        }
        
        return true;
    }
    
    // Show field error
    function showFieldError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const errorDiv = document.getElementById(fieldId + 'Error');
        
        if (field) {
            field.classList.add('error');
        }
        
        if (errorDiv) {
            errorDiv.textContent = message;
            errorDiv.style.display = 'block';
        }
    }
    
    // Clear field error
    function clearFieldError(fieldId) {
        const field = document.getElementById(fieldId);
        const errorDiv = document.getElementById(fieldId + 'Error');
        
        if (field) {
            field.classList.remove('error');
        }
        
        if (errorDiv) {
            errorDiv.textContent = '';
            errorDiv.style.display = 'none';
        }
    }
    
    // Handle form submission
    function handleFormSubmit(e) {
        e.preventDefault();
        
        // Validate all fields
        let isValid = true;
        const requiredFields = signupForm.querySelectorAll('input[required]');
        
        requiredFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        
        // Validate password match
        if (!validatePasswordMatch()) {
            isValid = false;
        }
        
        // Validate terms acceptance
        const termsCheckbox = document.getElementById('terms');
        if (!termsCheckbox.checked) {
            showFieldError('terms', '利用規約とプライバシーポリシーに同意してください');
            isValid = false;
        }
        
        if (!isValid) {
            window.ECUtils.showNotification('入力内容を確認してください', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = document.getElementById('signupBtn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        
        submitBtn.disabled = true;
        btnText.style.opacity = '0';
        btnLoading.style.display = 'block';
        
        // Simulate API call
        setTimeout(() => {
            // Success simulation
            window.ECUtils.showNotification('会員登録が完了しました！', 'success');
            
            // Redirect to login page
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        }, 2000);
    }
    
    // Demo data button
    const demoBtn = document.createElement('button');
    demoBtn.innerHTML = 'デモデータ';
    demoBtn.className = 'demo-btn';
    demoBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        padding: 12px 20px;
        border-radius: 25px;
        cursor: pointer;
        font-weight: 600;
        font-size: 14px;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    demoBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
    });
    
    demoBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
    });
    
    demoBtn.addEventListener('click', function() {
        // Fill form with demo data
        document.getElementById('lastName').value = '山田';
        document.getElementById('firstName').value = '太郎';
        document.getElementById('lastNameKana').value = 'ヤマダ';
        document.getElementById('firstNameKana').value = 'タロウ';
        document.getElementById('email').value = 'demo@example.com';
        document.getElementById('password').value = 'Demo123456';
        document.getElementById('confirmPassword').value = 'Demo123456';
        
        // Set birth date
        document.getElementById('birthYear').value = '1990';
        document.getElementById('birthMonth').value = '5';
        // Trigger month change to populate days
        document.getElementById('birthMonth').dispatchEvent(new Event('change'));
        setTimeout(() => {
            document.getElementById('birthDay').value = '15';
        }, 100);
        
        // Check male gender
        document.querySelector('input[value="male"]').checked = true;
        
        // Check terms
        document.getElementById('terms').checked = true;
        
        // Check newsletter
        document.getElementById('newsletter').checked = true;
        
        // Trigger password strength check
        passwordInput.dispatchEvent(new Event('input'));
        
        window.ECUtils.showNotification('デモデータを入力しました', 'success');
    });
    
    document.body.appendChild(demoBtn);
});