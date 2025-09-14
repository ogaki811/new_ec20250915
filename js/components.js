/**
 * Common Header and Footer Component Loader
 * 動的にヘッダーとフッターを読み込むためのスクリプト
 */

class ComponentLoader {
    constructor() {
        this.cache = new Map();
        this.loadPromises = new Map();
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
                throw error;
            });

        this.loadPromises.set(url, loadPromise);
        return loadPromise;
    }

    /**
     * ヘッダーコンポーネントを読み込む
     * @param {string} targetSelector - 挿入先のセレクター
     */
    async loadHeader(targetSelector = '#header-placeholder') {
        try {
            const headerHTML = await this.loadHTML('includes/header.html');
            const targetElement = document.querySelector(targetSelector);
            
            if (!targetElement) {
                console.warn(`Header target element not found: ${targetSelector}`);
                return;
            }

            targetElement.innerHTML = headerHTML;
            
            // ヘッダー読み込み完了後のイベントを発火
            document.dispatchEvent(new CustomEvent('headerLoaded'));
            
            console.log('Header component loaded successfully');
        } catch (error) {
            console.error('Failed to load header component:', error);
        }
    }

    /**
     * フッターコンポーネントを読み込む
     * @param {string} targetSelector - 挿入先のセレクター
     */
    async loadFooter(targetSelector = '#footer-placeholder') {
        try {
            const footerHTML = await this.loadHTML('includes/footer.html');
            const targetElement = document.querySelector(targetSelector);
            
            if (!targetElement) {
                console.warn(`Footer target element not found: ${targetSelector}`);
                return;
            }

            targetElement.innerHTML = footerHTML;
            
            // フッター読み込み完了後のイベントを発火
            document.dispatchEvent(new CustomEvent('footerLoaded'));
            
            console.log('Footer component loaded successfully');
        } catch (error) {
            console.error('Failed to load footer component:', error);
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