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
     * 静的ヘッダーHTML（Tailwind版）
     */
    getStaticHeader() {
        return `
<!-- Top Bar -->
<div class="bg-gray-100 border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-2 text-sm">
            <div class="text-gray-600">
                <span>プロ向け事務用品通販サイト</span>
            </div>
            <div class="flex items-center space-x-6">
                <a href="#" class="text-gray-600 hover:text-blue-600 flex items-center space-x-1">
                    <i class="fas fa-phone"></i>
                    <span>お問い合わせ</span>
                </a>
                <a href="#" class="text-gray-600 hover:text-blue-600 flex items-center space-x-1">
                    <i class="fas fa-info-circle"></i>
                    <span>ヘルプ</span>
                </a>
                <a href="login.html" class="text-gray-600 hover:text-blue-600 flex items-center space-x-1">
                    <i class="fas fa-sign-in-alt"></i>
                    <span>ログイン</span>
                </a>
                <a href="signup.html" class="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                    新規登録
                </a>
            </div>
        </div>
    </div>
</div>

<!-- Main Header -->
<header class="bg-white shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between py-4">
            <!-- Logo -->
            <div class="flex-shrink-0">
                <a href="index.html" class="flex items-center">
                    <img src="img/header_logo.png" alt="ECサイト" class="h-8 w-auto hidden">
                    <h1 class="text-2xl font-bold text-blue-600">EC Design</h1>
                </a>
            </div>

            <!-- Search Bar -->
            <div class="flex-1 max-w-2xl mx-8 relative">
                <div class="relative">
                    <input type="text" 
                           placeholder="商品名・型番・メーカー名などで検索" 
                           class="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent search-input">
                    <button class="absolute right-0 top-0 h-full px-4 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors search-button">
                        <i class="fas fa-search"></i>
                    </button>
                </div>
                <div class="search-suggestions absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-b-lg shadow-lg hidden z-50">
                    <!-- 検索候補がここに表示される -->
                </div>
            </div>

            <!-- Right Functions -->
            <div class="flex items-center space-x-4">
                <a href="favorites.html" class="function-item favorites flex flex-col items-center p-2 text-gray-600 hover:text-red-500 transition-colors">
                    <div class="relative">
                        <i class="fas fa-heart text-xl"></i>
                        <span class="count absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center" id="favoritesCount">0</span>
                    </div>
                    <span class="text-xs mt-1">お気に入り</span>
                </a>
                <a href="cart.html" class="function-item cart flex flex-col items-center p-2 text-gray-600 hover:text-blue-500 transition-colors">
                    <div class="relative">
                        <i class="fas fa-shopping-cart text-xl"></i>
                        <span class="count absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center" id="cartCount">0</span>
                    </div>
                    <span class="text-xs mt-1">カート</span>
                </a>
                <a href="mypage.html#orders" class="function-item orders flex flex-col items-center p-2 text-gray-600 hover:text-green-500 transition-colors">
                    <i class="fas fa-clipboard-list text-xl"></i>
                    <span class="text-xs mt-1">注文履歴</span>
                </a>
                <a href="mypage.html" class="function-item account flex flex-col items-center p-2 text-gray-600 hover:text-purple-500 transition-colors">
                    <i class="fas fa-user text-xl"></i>
                    <span class="text-xs mt-1">マイページ</span>
                </a>
            </div>
        </div>
    </div>
</header>

<!-- Global Navigation -->
<nav class="bg-gray-800 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul class="flex flex-wrap items-center justify-center lg:justify-start space-x-8 py-3">
            <li>
                <a href="product-list.html" class="flex items-center space-x-2 hover:text-blue-300 transition-colors py-2">
                    <i class="fas fa-desktop"></i>
                    <span>オフィス用品</span>
                </a>
            </li>
            <li>
                <a href="product-list.html" class="flex items-center space-x-2 hover:text-blue-300 transition-colors py-2">
                    <i class="fas fa-print"></i>
                    <span>文具・事務用品</span>
                </a>
            </li>
            <li>
                <a href="product-list.html" class="flex items-center space-x-2 hover:text-blue-300 transition-colors py-2">
                    <i class="fas fa-tools"></i>
                    <span>工具・作業用品</span>
                </a>
            </li>
            <li>
                <a href="#" class="flex items-center space-x-2 hover:text-blue-300 transition-colors py-2">
                    <i class="fas fa-medkit"></i>
                    <span>医療・介護用品</span>
                </a>
            </li>
            <li>
                <a href="#" class="flex items-center space-x-2 hover:text-blue-300 transition-colors py-2">
                    <i class="fas fa-tshirt"></i>
                    <span>制服・作業服</span>
                </a>
            </li>
            <li>
                <a href="#" class="flex items-center space-x-2 hover:text-blue-300 transition-colors py-2">
                    <i class="fas fa-coffee"></i>
                    <span>食品・飲料</span>
                </a>
            </li>
            <li>
                <a href="#" class="flex items-center space-x-2 hover:text-blue-300 transition-colors py-2">
                    <i class="fas fa-spray-can"></i>
                    <span>清掃・衛生用品</span>
                </a>
            </li>
            <li>
                <a href="#" class="flex items-center space-x-2 hover:text-yellow-300 transition-colors py-2">
                    <i class="fas fa-tag"></i>
                    <span class="font-semibold">セール商品</span>
                </a>
            </li>
        </ul>
    </div>
</nav>`;
    }

    /**
     * 静的フッターHTML（Tailwind版）
     */
    getStaticFooter() {
        return `
<footer class="bg-gray-900 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div class="footer-section">
                <h3 class="text-lg font-semibold mb-4 text-blue-300">サービス</h3>
                <ul class="space-y-2">
                    <li><a href="#" class="text-gray-300 hover:text-white transition-colors">商品カテゴリ</a></li>
                    <li><a href="#" class="text-gray-300 hover:text-white transition-colors">セール・特価</a></li>
                    <li><a href="#" class="text-gray-300 hover:text-white transition-colors">新商品情報</a></li>
                    <li><a href="#" class="text-gray-300 hover:text-white transition-colors">カタログ請求</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h3 class="text-lg font-semibold mb-4 text-blue-300">サポート</h3>
                <ul class="space-y-2">
                    <li><a href="#" class="text-gray-300 hover:text-white transition-colors">お問い合わせ</a></li>
                    <li><a href="#" class="text-gray-300 hover:text-white transition-colors">よくある質問</a></li>
                    <li><a href="#" class="text-gray-300 hover:text-white transition-colors">配送について</a></li>
                    <li><a href="#" class="text-gray-300 hover:text-white transition-colors">返品・交換</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h3 class="text-lg font-semibold mb-4 text-blue-300">会社情報</h3>
                <ul class="space-y-2">
                    <li><a href="#" class="text-gray-300 hover:text-white transition-colors">会社概要</a></li>
                    <li><a href="#" class="text-gray-300 hover:text-white transition-colors">プライバシーポリシー</a></li>
                    <li><a href="#" class="text-gray-300 hover:text-white transition-colors">利用規約</a></li>
                    <li><a href="#" class="text-gray-300 hover:text-white transition-colors">採用情報</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h3 class="text-lg font-semibold mb-4 text-blue-300">お問い合わせ</h3>
                <div class="space-y-3">
                    <p class="flex items-center text-gray-300">
                        <i class="fas fa-phone mr-3 text-blue-400"></i>
                        <span>0120-123-456</span>
                    </p>
                    <p class="flex items-center text-gray-300">
                        <i class="fas fa-envelope mr-3 text-blue-400"></i>
                        <span>support@ecdesign.com</span>
                    </p>
                    <p class="flex items-center text-gray-300">
                        <i class="fas fa-clock mr-3 text-blue-400"></i>
                        <span>平日 9:00-18:00</span>
                    </p>
                </div>
            </div>
        </div>
        <div class="border-t border-gray-700 mt-12 pt-8">
            <p class="text-center text-gray-400">&copy; 2024 EC Design. All rights reserved.</p>
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