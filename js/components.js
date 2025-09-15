/**
 * Common Header and Footer Component Loader
 * 動的にヘッダーとフッターを読み込むためのスクリプト
 */

class ComponentLoader {
    constructor() {
        this.cache = new Map();
        this.loadPromises = new Map();
        this.isFileProtocol = window.location.protocol === 'file:';
    }

    /**
     * HTMLファイルを非同期で読み込む
     * @param {string} url - 読み込むHTMLファイルのURL
     * @returns {Promise<string>} HTML内容
     */
    async loadHTML(url) {
        // キャッシュから取得
        if (this.cache.has(url)) {
            return this.cache.get(url);
        }

        // 既に読み込み中の場合は同じPromiseを返す
        if (this.loadPromises.has(url)) {
            return this.loadPromises.get(url);
        }

        // file:// プロトコルの場合はフォールバック
        if (this.isFileProtocol) {
            console.warn('File protocol detected. Component loading may not work properly. Please use a local server.');
            return this.getStaticComponent(url);
        }

        // 新しい読み込みPromiseを作成
        const loadPromise = fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load ${url}: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                // キャッシュに保存
                this.cache.set(url, html);
                this.loadPromises.delete(url);
                return html;
            })
            .catch(error => {
                this.loadPromises.delete(url);
                console.error('Error loading component:', error);
                // フォールバックとして静的コンポーネントを返す
                return this.getStaticComponent(url);
            });

        this.loadPromises.set(url, loadPromise);
        return loadPromise;
    }

    /**
     * 静的なコンポーネントHTMLを返す（フォールバック用）
     * @param {string} url - コンポーネントURL
     * @returns {string} 静的HTML
     */
    getStaticComponent(url) {
        if (url.includes('header.html')) {
            return this.getStaticHeader();
        } else if (url.includes('footer.html')) {
            return this.getStaticFooter();
        }
        return '';
    }

    /**
     * 静的ヘッダーHTML
     */
    getStaticHeader() {
        return `
<!-- Top Bar -->
<div class="top-bar">
    <div class="container">
        <div class="top-bar-left">
            <span>プロ向け事務用品通販サイト</span>
        </div>
        <div class="top-bar-right">
            <a href="#"><i class="fas fa-phone"></i>お問い合わせ</a>
            <a href="#"><i class="fas fa-info-circle"></i>ヘルプ</a>
            <a href="login.html"><i class="fas fa-sign-in-alt"></i>ログイン</a>
            <a href="signup.html" class="signup-link">新規登録</a>
        </div>
    </div>
</div>

<!-- Main Header -->
<header class="main-header">
    <div class="container">
        <div class="header-content">
            <!-- Logo -->
            <div class="logo">
                <a href="index.html">
                    <img src="img/header_logo.png" alt="ECサイト" class="logo-img" style="display: none;">
                    <h1>EC Design</h1>
                </a>
            </div>

            <!-- Search Bar -->
            <div class="search-container">
                <div class="search-wrapper">
                    <input type="text" placeholder="商品名・型番・メーカー名などで検索" class="search-input">
                    <button class="search-button">
                        <i class="fas fa-search"></i>
                    </button>
                </div>
                <div class="search-suggestions">
                    <!-- 検索候補がここに表示される -->
                </div>
            </div>

            <!-- Right Functions -->
            <div class="header-functions">
                <a href="favorites.html" class="function-item favorites">
                    <i class="fas fa-heart"></i>
                    <span>お気に入り</span>
                    <span class="count" id="favoritesCount">0</span>
                </a>
                <a href="cart.html" class="function-item cart">
                    <i class="fas fa-shopping-cart"></i>
                    <span>カート</span>
                    <span class="count" id="cartCount">0</span>
                </a>
                <a href="mypage.html#orders" class="function-item orders">
                    <i class="fas fa-clipboard-list"></i>
                    <span>注文履歴</span>
                </a>
                <a href="mypage.html" class="function-item account">
                    <i class="fas fa-user"></i>
                    <span>マイページ</span>
                </a>
            </div>
        </div>
    </div>
</header>

<!-- Global Navigation -->
<nav class="global-nav">
    <div class="container">
        <ul class="nav-categories">
            <li><a href="product-list.html"><i class="fas fa-desktop"></i>オフィス用品</a></li>
            <li><a href="product-list.html"><i class="fas fa-print"></i>文具・事務用品</a></li>
            <li><a href="product-list.html"><i class="fas fa-tools"></i>工具・作業用品</a></li>
            <li><a href="#"><i class="fas fa-medkit"></i>医療・介護用品</a></li>
            <li><a href="#"><i class="fas fa-tshirt"></i>制服・作業服</a></li>
            <li><a href="#"><i class="fas fa-coffee"></i>食品・飲料</a></li>
            <li><a href="#"><i class="fas fa-spray-can"></i>清掃・衛生用品</a></li>
            <li><a href="#"><i class="fas fa-tag"></i>セール商品</a></li>
        </ul>
    </div>
</nav>`;
    }

    /**
     * 静的フッターHTML
     */
    getStaticFooter() {
        return `
<footer class="main-footer">
    <div class="container">
        <div class="footer-content">
            <div class="footer-section">
                <h3>サービス</h3>
                <ul>
                    <li><a href="#">商品カテゴリ</a></li>
                    <li><a href="#">セール・特価</a></li>
                    <li><a href="#">新商品情報</a></li>
                    <li><a href="#">カタログ請求</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h3>サポート</h3>
                <ul>
                    <li><a href="#">お問い合わせ</a></li>
                    <li><a href="#">よくある質問</a></li>
                    <li><a href="#">配送について</a></li>
                    <li><a href="#">返品・交換</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h3>会社情報</h3>
                <ul>
                    <li><a href="#">会社概要</a></li>
                    <li><a href="#">プライバシーポリシー</a></li>
                    <li><a href="#">利用規約</a></li>
                    <li><a href="#">採用情報</a></li>
                </ul>
            </div>
            <div class="footer-section contact">
                <h3>お問い合わせ</h3>
                <p><i class="fas fa-phone"></i> 0120-123-456</p>
                <p><i class="fas fa-envelope"></i> support@ecdesign.com</p>
                <p><i class="fas fa-clock"></i> 平日 9:00-18:00</p>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2024 EC Design. All rights reserved.</p>
        </div>
    </div>
</footer>`;
    }

    /**
     * ヘッダーコンポーネントを読み込む
     * @param {string} targetSelector - 挿入先のセレクター
     */
    async loadHeader(targetSelector = '#header-placeholder') {
        try {
            console.log('Loading header component...');
            const headerHTML = await this.loadHTML('includes/header.html');
            const targetElement = document.querySelector(targetSelector);
            
            if (!targetElement) {
                console.warn(`Header target element not found: ${targetSelector}`);
                console.log('Available elements:', document.querySelectorAll('[id*="header"]'));
                return;
            }

            targetElement.innerHTML = headerHTML;
            
            // ヘッダー読み込み完了後のイベントを発火
            document.dispatchEvent(new CustomEvent('headerLoaded'));
            
            console.log('Header component loaded successfully');
        } catch (error) {
            console.error('Failed to load header component:', error);
            console.error('Error details:', error.message);
        }
    }

    /**
     * フッターコンポーネントを読み込む
     * @param {string} targetSelector - 挿入先のセレクター
     */
    async loadFooter(targetSelector = '#footer-placeholder') {
        try {
            console.log('Loading footer component...');
            const footerHTML = await this.loadHTML('includes/footer.html');
            const targetElement = document.querySelector(targetSelector);
            
            if (!targetElement) {
                console.warn(`Footer target element not found: ${targetSelector}`);
                console.log('Available elements:', document.querySelectorAll('[id*="footer"]'));
                return;
            }

            targetElement.innerHTML = footerHTML;
            
            // フッター読み込み完了後のイベントを発火
            document.dispatchEvent(new CustomEvent('footerLoaded'));
            
            console.log('Footer component loaded successfully');
        } catch (error) {
            console.error('Failed to load footer component:', error);
            console.error('Error details:', error.message);
        }
    }

    /**
     * ヘッダーとフッターの両方を読み込む
     * @param {Object} options - オプション設定
     */
    async loadAll(options = {}) {
        const {
            headerSelector = '#header-placeholder',
            footerSelector = '#footer-placeholder'
        } = options;

        try {
            // 並行して読み込み
            await Promise.all([
                this.loadHeader(headerSelector),
                this.loadFooter(footerSelector)
            ]);

            // 全コンポーネント読み込み完了後のイベントを発火
            document.dispatchEvent(new CustomEvent('componentsLoaded'));
            
            console.log('All components loaded successfully');
        } catch (error) {
            console.error('Failed to load components:', error);
        }
    }

    /**
     * 現在のページに応じてアクティブな状態を設定
     */
    setActiveStates() {
        const currentPath = window.location.pathname;
        const filename = currentPath.split('/').pop() || 'index.html';

        // ヘッダーの機能アイテムのアクティブ状態を設定
        const functionItems = document.querySelectorAll('.function-item');
        functionItems.forEach(item => {
            item.classList.remove('active');
            
            const href = item.getAttribute('href');
            if (href && href.includes(filename)) {
                item.classList.add('active');
            }
        });

        // グローバルナビゲーションのアクティブ状態を設定
        const navLinks = document.querySelectorAll('.nav-categories a');
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.includes(filename)) {
                link.parentElement.classList.add('active');
            }
        });
    }

    /**
     * カートと お気に入りの件数を更新
     */
    updateCounts() {
        // カート件数の更新
        const cartCount = localStorage.getItem('cartItemsCount') || '0';
        const cartCountElements = document.querySelectorAll('#cartCount, .cart .count');
        cartCountElements.forEach(element => {
            if (element) element.textContent = cartCount;
        });

        // お気に入り件数の更新
        const favoritesCount = localStorage.getItem('favoritesCount') || '0';
        const favoritesCountElements = document.querySelectorAll('#favoritesCount, .favorites .count');
        favoritesCountElements.forEach(element => {
            if (element) element.textContent = favoritesCount;
        });
    }
}

// グローバルインスタンスを作成
const componentLoader = new ComponentLoader();

// DOM読み込み完了後にコンポーネントを読み込み
document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM loaded, initializing components...');
    console.log('Protocol:', window.location.protocol);
    console.log('Looking for header placeholder:', document.querySelector('#header-placeholder'));
    console.log('Looking for footer placeholder:', document.querySelector('#footer-placeholder'));
    
    await componentLoader.loadAll();
    
    // コンポーネント読み込み完了後の処理
    componentLoader.setActiveStates();
    componentLoader.updateCounts();
});

// コンポーネント読み込み完了後のイベントリスナー
document.addEventListener('componentsLoaded', () => {
    // 検索機能の初期化
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');
    
    if (searchInput && searchButton) {
        searchButton.addEventListener('click', (e) => {
            e.preventDefault();
            const query = searchInput.value.trim();
            if (query) {
                window.location.href = `product-list.html?search=${encodeURIComponent(query)}`;
            }
        });

        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const query = searchInput.value.trim();
                if (query) {
                    window.location.href = `product-list.html?search=${encodeURIComponent(query)}`;
                }
            }
        });
    }
});

// カウント更新イベントリスナー
document.addEventListener('cartUpdated', () => {
    componentLoader.updateCounts();
});

document.addEventListener('favoritesUpdated', () => {
    componentLoader.updateCounts();
});

// グローバルに公開
window.ComponentLoader = ComponentLoader;
window.componentLoader = componentLoader;