// Authentication JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Login Form Handler
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
        
        // Real-time validation
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        
        if (emailInput) {
            emailInput.addEventListener('blur', () => validateEmail(emailInput));
            emailInput.addEventListener('input', () => clearError('emailError'));
        }
        
        if (passwordInput) {
            passwordInput.addEventListener('input', () => clearError('passwordError'));
        }
    }
    
    // Signup Form Handler
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
        
        // Real-time validation for signup
        const signupEmail = document.getElementById('signupEmail');
        const signupPassword = document.getElementById('signupPassword');
        const confirmPassword = document.getElementById('confirmPassword');
        
        if (signupEmail) {
            signupEmail.addEventListener('blur', () => validateEmail(signupEmail));
            signupEmail.addEventListener('input', () => clearError('signupEmailError'));
        }
        
        if (signupPassword) {
            signupPassword.addEventListener('input', () => {
                validatePasswordStrength(signupPassword);
                clearError('signupPasswordError');
                if (confirmPassword && confirmPassword.value) {
                    validatePasswordMatch(signupPassword, confirmPassword);
                }
            });
        }
        
        if (confirmPassword) {
            confirmPassword.addEventListener('input', () => {
                validatePasswordMatch(signupPassword, confirmPassword);
                clearError('confirmPasswordError');
            });
        }
    }
    
    // Forgot Password Form Handler
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', handleForgotPassword);
    }
    
    // Reset Password Form Handler
    const resetPasswordForm = document.getElementById('resetPasswordForm');
    if (resetPasswordForm) {
        resetPasswordForm.addEventListener('submit', handleResetPassword);
        
        const newPassword = document.getElementById('newPassword');
        const confirmNewPassword = document.getElementById('confirmNewPassword');
        
        if (newPassword) {
            newPassword.addEventListener('input', () => {
                validatePasswordStrength(newPassword);
                clearError('newPasswordError');
                if (confirmNewPassword && confirmNewPassword.value) {
                    validatePasswordMatch(newPassword, confirmNewPassword);
                }
            });
        }
        
        if (confirmNewPassword) {
            confirmNewPassword.addEventListener('input', () => {
                validatePasswordMatch(newPassword, confirmNewPassword);
                clearError('confirmNewPasswordError');
            });
        }
    }
    
    // Password Toggle Functionality
    const passwordToggles = document.querySelectorAll('.password-toggle');
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const passwordField = this.parentElement.querySelector('input[type="password"], input[type="text"]');
            const isPassword = passwordField.type === 'password';
            
            passwordField.type = isPassword ? 'text' : 'password';
            
            // Update icon
            const svg = this.querySelector('svg');
            if (isPassword) {
                // Show "hide" icon
                svg.innerHTML = `
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                `;
            } else {
                // Show "show" icon
                svg.innerHTML = `
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                `;
            }
        });
    });
    
    // Social Login Handlers
    const socialButtons = document.querySelectorAll('.btn-social');
    socialButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const provider = this.classList.contains('btn-google') ? 'Google' : 
                           this.classList.contains('btn-facebook') ? 'Facebook' : 'LINE';
            
            // Mock social login
            this.innerHTML = `<span>接続中...</span>`;
            this.disabled = true;
            
            setTimeout(() => {
                window.ECUtils.showNotification(`${provider}でのログインは現在準備中です`, 'info');
                this.disabled = false;
                // Restore original content
                location.reload();
            }, 1500);
        });
    });
    
    // Auto-fill demo data (for testing purposes)
    const demoButton = document.createElement('button');
    demoButton.textContent = 'デモデータ入力';
    demoButton.type = 'button';
    demoButton.className = 'demo-button';
    demoButton.style.cssText = `
        position: fixed; 
        bottom: 20px; 
        right: 20px; 
        z-index: 9999; 
        background-color: var(--color-info, #17a2b8); 
        color: white; 
        border: none; 
        border-radius: var(--border-radius-pill, 25px); 
        padding: 12px 20px; 
        font-size: 14px; 
        font-weight: 500; 
        cursor: pointer; 
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); 
        transition: all 0.3s ease;
        font-family: var(--font-family-primary, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
    `;
    
    // ホバーエフェクトを追加
    demoButton.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.2)';
    });
    
    demoButton.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    });
    
    demoButton.addEventListener('click', function() {
        // クリック時のフィードバック
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'translateY(0)';
        }, 150);
        
        if (document.getElementById('email')) {
            document.getElementById('email').value = 'demo@example.com';
            document.getElementById('password').value = 'demo123456';
        }
        if (document.getElementById('signupEmail')) {
            document.getElementById('signupEmail').value = 'newuser@example.com';
            document.getElementById('signupPassword').value = 'NewPassword123!';
            document.getElementById('confirmPassword').value = 'NewPassword123!';
            validatePasswordStrength(document.getElementById('signupPassword'));
        }
        if (document.getElementById('resetEmail')) {
            document.getElementById('resetEmail').value = 'reset@example.com';
        }
        
        // 成功フィードバック
        window.ECUtils.showNotification('デモデータを入力しました', 'info');
    });
    
    document.body.appendChild(demoButton);
});

// Login Handler
async function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;
    
    // Validate inputs
    let isValid = true;
    
    if (!validateEmail(document.getElementById('email'))) {
        isValid = false;
    }
    
    if (!password) {
        showError('passwordError', 'パスワードを入力してください');
        isValid = false;
    }
    
    if (!isValid) return;
    
    // Show loading state
    const loginBtn = document.getElementById('loginBtn');
    const btnText = loginBtn.querySelector('.btn-text');
    const btnLoading = loginBtn.querySelector('.btn-loading');
    
    btnText.style.display = 'none';
    btnLoading.style.display = 'block';
    loginBtn.disabled = true;
    
    try {
        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock success response
        const mockResponse = {
            success: true,
            user: {
                email: email,
                name: 'テストユーザー',
                id: 12345
            }
        };
        
        if (mockResponse.success) {
            // Store user data (in real app, this would be JWT tokens)
            if (remember) {
                localStorage.setItem('rememberedUser', email);
            }
            
            sessionStorage.setItem('currentUser', JSON.stringify(mockResponse.user));
            
            window.ECUtils.showNotification('ログインしました', 'success');
            
            // Redirect to dashboard or previous page
            setTimeout(() => {
                const returnUrl = new URLSearchParams(window.location.search).get('returnUrl');
                window.location.href = returnUrl || 'index.html';
            }, 1000);
        }
    } catch (error) {
        window.ECUtils.showNotification('ログインに失敗しました', 'error');
        
        // Reset button
        btnText.style.display = 'block';
        btnLoading.style.display = 'none';
        loginBtn.disabled = false;
    }
}

// Signup Handler
async function handleSignup(e) {
    e.preventDefault();
    
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;
    const agreePrivacy = document.getElementById('agreePrivacy').checked;
    
    // Validate inputs
    let isValid = true;
    
    if (!validateEmail(document.getElementById('signupEmail'))) {
        isValid = false;
    }
    
    if (!validatePasswordStrength(document.getElementById('signupPassword'))) {
        isValid = false;
    }
    
    if (!validatePasswordMatch(document.getElementById('signupPassword'), document.getElementById('confirmPassword'))) {
        isValid = false;
    }
    
    if (!agreeTerms) {
        showError('termsError', '利用規約に同意してください');
        isValid = false;
    }
    
    if (!agreePrivacy) {
        showError('privacyError', 'プライバシーポリシーに同意してください');
        isValid = false;
    }
    
    if (!isValid) return;
    
    // Show loading state
    const signupBtn = document.getElementById('signupBtn');
    const originalText = signupBtn.textContent;
    signupBtn.textContent = '登録中...';
    signupBtn.disabled = true;
    
    try {
        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Mock success response
        const mockResponse = { success: true };
        
        if (mockResponse.success) {
            window.ECUtils.showNotification('会員登録が完了しました', 'success');
            
            setTimeout(() => {
                window.location.href = 'login.html?message=signup_success';
            }, 1500);
        }
    } catch (error) {
        window.ECUtils.showNotification('登録に失敗しました', 'error');
        signupBtn.textContent = originalText;
        signupBtn.disabled = false;
    }
}

// Forgot Password Handler
async function handleForgotPassword(e) {
    e.preventDefault();
    
    const email = document.getElementById('resetEmail').value.trim();
    
    if (!validateEmail(document.getElementById('resetEmail'))) {
        return;
    }
    
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '送信中...';
    submitBtn.disabled = true;
    
    try {
        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        window.ECUtils.showNotification('パスワード再設定メールを送信しました', 'success');
        
        setTimeout(() => {
            window.location.href = 'reset-password.html?token=mock_token&email=' + encodeURIComponent(email);
        }, 2000);
        
    } catch (error) {
        window.ECUtils.showNotification('送信に失敗しました', 'error');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

// Reset Password Handler
async function handleResetPassword(e) {
    e.preventDefault();
    
    const newPassword = document.getElementById('newPassword').value;
    const confirmNewPassword = document.getElementById('confirmNewPassword').value;
    
    let isValid = true;
    
    if (!validatePasswordStrength(document.getElementById('newPassword'))) {
        isValid = false;
    }
    
    if (!validatePasswordMatch(document.getElementById('newPassword'), document.getElementById('confirmNewPassword'))) {
        isValid = false;
    }
    
    if (!isValid) return;
    
    const resetBtn = document.getElementById('resetBtn');
    const originalText = resetBtn.textContent;
    resetBtn.textContent = '変更中...';
    resetBtn.disabled = true;
    
    try {
        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        window.ECUtils.showNotification('パスワードを変更しました', 'success');
        
        setTimeout(() => {
            window.location.href = 'reset-complete.html';
        }, 1500);
        
    } catch (error) {
        window.ECUtils.showNotification('変更に失敗しました', 'error');
        resetBtn.textContent = originalText;
        resetBtn.disabled = false;
    }
}

// Validation Functions
function validateEmail(emailInput) {
    const email = emailInput.value.trim();
    const errorElement = emailInput.getAttribute('id') + 'Error';
    
    if (!email) {
        showError(errorElement, 'メールアドレスを入力してください');
        emailInput.classList.add('error');
        return false;
    }
    
    if (!window.ECUtils.validateEmail(email)) {
        showError(errorElement, '正しいメールアドレスを入力してください');
        emailInput.classList.add('error');
        return false;
    }
    
    clearError(errorElement);
    emailInput.classList.remove('error');
    emailInput.classList.add('success');
    return true;
}

function validatePasswordStrength(passwordInput) {
    const password = passwordInput.value;
    const errorElement = passwordInput.getAttribute('id') + 'Error';
    const strengthIndicator = document.querySelector('.password-strength');
    
    if (!password) {
        showError(errorElement, 'パスワードを入力してください');
        passwordInput.classList.add('error');
        return false;
    }
    
    if (password.length < 8) {
        showError(errorElement, 'パスワードは8文字以上で入力してください');
        passwordInput.classList.add('error');
        return false;
    }
    
    // Update strength indicator if present
    if (strengthIndicator) {
        const strength = window.ECUtils.getPasswordStrength(password);
        const strengthLabel = strengthIndicator.querySelector('.strength-label');
        const strengthFill = strengthIndicator.querySelector('.strength-fill');
        
        if (strengthLabel) {
            strengthLabel.textContent = `強度: ${strength.text}`;
        }
        
        if (strengthFill) {
            strengthFill.className = `strength-fill ${strength.level}`;
        }
    }
    
    clearError(errorElement);
    passwordInput.classList.remove('error');
    passwordInput.classList.add('success');
    return true;
}

function validatePasswordMatch(passwordInput, confirmPasswordInput) {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const errorElement = confirmPasswordInput.getAttribute('id') + 'Error';
    
    if (!confirmPassword) {
        showError(errorElement, 'パスワード（確認）を入力してください');
        confirmPasswordInput.classList.add('error');
        return false;
    }
    
    if (password !== confirmPassword) {
        showError(errorElement, 'パスワードが一致しません');
        confirmPasswordInput.classList.add('error');
        return false;
    }
    
    clearError(errorElement);
    confirmPasswordInput.classList.remove('error');
    confirmPasswordInput.classList.add('success');
    return true;
}

// Helper Functions
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
    }
}

function clearError(elementId) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = '';
    }
}

// Check for messages in URL params
window.addEventListener('load', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const message = urlParams.get('message');
    
    if (message === 'signup_success') {
        showAuthMessage('会員登録が完了しました。ログインしてください。', 'success');
    } else if (message === 'password_reset') {
        showAuthMessage('パスワードを再設定しました。新しいパスワードでログインしてください。', 'success');
    }
});

function showAuthMessage(message, type) {
    const authCard = document.querySelector('.auth-card');
    if (authCard) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `auth-message ${type}`;
        messageDiv.textContent = message;
        
        authCard.insertBefore(messageDiv, authCard.firstChild);
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
}