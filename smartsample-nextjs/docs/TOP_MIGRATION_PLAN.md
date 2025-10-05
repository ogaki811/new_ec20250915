# TOPページ・メインスライダー移行計画

## 📋 目的

React AppのTOPページ（Home.jsx）とメインスライダー（HeroSlider.jsx）を完全移行し、同様のレイアウトと機能を実現する。

---

## 🔍 現状分析：差分確認

### React App（元）の構造

#### セクション構成（上から順に）
1. ✅ **HeroSlider（メインバナー）** - 7枚のスライド画像
2. ✅ **人気カテゴリー** - 6個のアイコン付きカード（bg-gray-50）
3. ✅ **おすすめ商品** - ProductSlider使用、12商品
4. ✅ **新着商品** - ProductCard compact × 6（bg-gray-50）
5. ✅ **セール商品** - ProductCard compact × 6、期間限定メッセージ
6. ✅ **新着情報** - ニュースリスト、3件表示

#### HeroSliderの特徴
- **Swiper使用** (swiper/react)
- **7枚のスライド**: top_bnr_*.png
- **スライドサイズ**: 900px × 280px
- **centeredSlides**: true
- **loop**: true
- **autoplay**: 5秒間隔
- **Navigation**: 左右ボタン（calc(50% - 470px)配置）
- **Pagination**: ドット表示、下部配置
- **アクティブスライド**: scale-105 opacity-100
- **非アクティブスライド**: scale-95 opacity-80
- **styled-jsx**: カスタムスタイル定義

#### BEMクラス名
- `ec-home`, `ec-home__categories`, `ec-home__category-list`
- `ec-home__category-item`, `ec-home__category-icon`, `ec-home__category-name`
- `ec-home__recommended`, `ec-home__section-header`, `ec-home__section-title`
- `ec-home__view-all`, `ec-home__new-arrivals`, `ec-home__product-grid`
- `ec-home__sale`, `ec-home__sale-message`
- `ec-home__news`, `ec-home__news-container`, `ec-home__news-list`
- `ec-home__news-item`, `ec-home__news-date`, `ec-home__news-label`, `ec-home__news-link`
- `ec-hero-slider`, `ec-hero-slider__container`, `ec-hero-slider__slide`
- `ec-hero-slider__link`, `ec-hero-slider__link--active`, `ec-hero-slider__image`

---

### Next.js App（現在）の構造

#### セクション構成
1. ❌ **グラデーションバナー** - HeroSlider無し
2. ❌ **人気商品** - ProductGrid、BEMクラス無し
3. ❌ **新商品** - ProductGrid、BEMクラス無し
4. ❌ **おすすめ商品** - ProductGrid、BEMクラス無し

#### 不足している要素
- ❌ HeroSliderコンポーネント
- ❌ ProductSliderコンポーネント
- ❌ 人気カテゴリーセクション
- ❌ セール商品セクション
- ❌ 新着情報セクション
- ❌ BEMクラス名
- ❌ ProductCard compact size

---

## 🎯 移行計画

### Phase 1: コンポーネント準備（所要時間: 45分）

#### 1.1 HeroSliderコンポーネントの移行
- [ ] React AppのHeroSlider.jsxを読み込み
- [ ] TypeScript化（HeroSlider.tsx）
- [ ] Next.js用に修正
  - `'use client'` ディレクティブ追加
  - styled-jsx → Tailwind CSS or CSS Modules
- [ ] `src/components/home/HeroSlider.tsx` に配置
- [ ] Swiperパッケージ確認・インストール

#### 1.2 ProductSliderコンポーネントの移行
- [ ] React AppのProductSlider.jsxを読み込み
- [ ] TypeScript化（ProductSlider.tsx）
- [ ] Next.js用に修正（react-router-dom → next/link）
- [ ] `src/components/product/ProductSlider.tsx` に配置

#### 1.3 ProductCard compactサイズ対応
- [ ] ProductCard.tsxに `size?: 'default' | 'compact'` プロパティ追加
- [ ] compactスタイルの実装

---

### Phase 2: TOPページ完全書き換え（所要時間: 60分）

#### 2.1 セクション1: HeroSlider
```tsx
<HeroSlider />
```

#### 2.2 セクション2: 人気カテゴリー
```tsx
<section className="ec-home__categories py-12 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="ec-home__section-title text-3xl font-bold text-gray-900 mb-8 text-center">
      人気カテゴリー
    </h2>
    <div className="ec-home__category-list grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {/* 6個のカテゴリーカード */}
      <Link href="/category/office" className="ec-home__category-item bg-white rounded-lg p-6...">
        <div className="ec-home__category-icon...">
          <svg>...</svg>
        </div>
        <h3 className="ec-home__category-name...">オフィス用品</h3>
      </Link>
      {/* 他5個 */}
    </div>
  </div>
</section>
```

カテゴリー:
1. オフィス用品 (`/category/office`)
2. 文具 (`/category/stationery`)
3. 電化製品 (`/category/electronics`)
4. 家具 (`/category/furniture`)
5. 収納用品 (`/category/storage`)
6. 清掃用品 (`/category/cleaning`)

#### 2.3 セクション3: おすすめ商品
```tsx
<section className="ec-home__recommended py-12">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="ec-home__section-header flex justify-between items-center mb-8">
      <h2 className="ec-home__section-title text-3xl font-bold text-gray-900">おすすめ商品</h2>
      <Link href="/products" className="ec-home__view-all text-blue-600 hover:text-blue-800">
        すべて見る →
      </Link>
    </div>
    <ProductSlider products={recommendedProducts} />
  </div>
</section>
```

商品フィルター:
```tsx
const recommendedProducts = sampleProducts
  .filter(p => p.tags.includes('人気') || p.rating >= 4.5)
  .sort((a, b) => b.rating - a.rating)
  .slice(0, 12);
```

#### 2.4 セクション4: 新着商品
```tsx
<section className="ec-home__new-arrivals py-12 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="ec-home__section-header flex justify-between items-center mb-8">
      <h2 className="ec-home__section-title text-3xl font-bold text-gray-900">新着商品</h2>
      <Link href="/search" className="ec-home__view-all text-blue-600 hover:text-blue-800">
        すべて見る →
      </Link>
    </div>
    <div className="ec-home__product-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {newProducts.map((product) => (
        <ProductCard key={product.id} product={product} size="compact" />
      ))}
    </div>
  </div>
</section>
```

商品フィルター:
```tsx
const newProducts = sampleProducts
  .filter(p => p.tags.includes('新商品'))
  .slice(0, 6);
```

#### 2.5 セクション5: セール商品
```tsx
<section className="ec-home__sale py-12">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="ec-home__section-header flex justify-between items-center mb-8">
      <div>
        <h2 className="ec-home__section-title text-3xl font-bold text-gray-900">セール商品</h2>
        <p className="ec-home__sale-message text-red-600 font-semibold mt-2">
          期間限定！お得なプライス
        </p>
      </div>
      <Link href="/search" className="ec-home__view-all text-blue-600 hover:text-blue-800">
        すべて見る →
      </Link>
    </div>
    <div className="ec-home__product-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {saleProducts.map((product) => (
        <ProductCard key={product.id} product={product} size="compact" />
      ))}
    </div>
  </div>
</section>
```

商品フィルター:
```tsx
const saleProducts = sampleProducts
  .filter(p => p.tags.includes('セール'))
  .slice(0, 6);
```

#### 2.6 セクション6: 新着情報
```tsx
<section className="ec-home__news py-12 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="ec-home__section-title text-3xl font-bold text-gray-900 mb-8 text-center">
      新着情報
    </h2>
    <div className="ec-home__news-container bg-white rounded-lg shadow-sm p-6 max-w-3xl mx-auto">
      <div className="ec-home__news-list space-y-4">
        {newsItems.map((news) => (
          <div key={news.id} className="ec-home__news-item border-b border-gray-200 py-4">
            <div className="flex items-center gap-4">
              <span className="ec-home__news-date text-sm text-gray-500">{news.date}</span>
              <span className={`ec-home__news-label ${news.labelColor} text-white px-2 py-1 text-xs rounded`}>
                {news.label}
              </span>
              <Link href={news.link} className="ec-home__news-link text-gray-800 hover:text-blue-600">
                {news.title}
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="ec-home__news-view-all text-center mt-6">
        <Link href="#" className="text-blue-600 hover:text-blue-800 text-sm">
          すべての新着情報を見る →
        </Link>
      </div>
    </div>
  </div>
</section>
```

ニュースデータ:
```tsx
const newsItems = [
  { id: 1, date: '2024.01.15', label: 'お知らせ', labelColor: 'bg-blue-600', title: 'サイトリニューアルのお知らせ', link: '#' },
  { id: 2, date: '2024.01.12', label: 'キャンペーン', labelColor: 'bg-orange-600', title: '新春セール開催中！最大50%オフ', link: '#' },
  { id: 3, date: '2024.01.08', label: '商品情報', labelColor: 'bg-green-600', title: '新商品「プレミアム文具セット」発売', link: '#' },
];
```

---

### Phase 3: Swiperインストール・設定（所要時間: 20分）

#### 3.1 パッケージインストール
```bash
npm install swiper@11.1.14
```

#### 3.2 HeroSliderスタイル実装
- styled-jsx からTailwind CSS + CSS Modules に変換
- または、Next.js 15のスタイル機能を活用

---

### Phase 4: 構造化データ・メタデータ（所要時間: 15分）

#### 4.1 WebSite構造化データ追加
```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "smartsample",
      "url": "https://smartsample.example.com",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://smartsample.example.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    })
  }}
/>
```

#### 4.2 Organization構造化データ追加
```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "smartsample",
      "url": "https://smartsample.example.com",
      "logo": "https://smartsample.example.com/logo.png"
    })
  }}
/>
```

---

### Phase 5: テスト・検証（所要時間: 20分）

#### 5.1 機能テスト
- [ ] HeroSlider自動再生確認
- [ ] HeroSliderナビゲーション確認（左右ボタン、ドット）
- [ ] 人気カテゴリーリンク動作確認
- [ ] ProductSlider動作確認
- [ ] ProductCard compactサイズ表示確認
- [ ] 新着情報リンク確認

#### 5.2 レスポンシブテスト
- [ ] 320px（モバイル最小）
- [ ] 768px（タブレット）
- [ ] 1024px（デスクトップ）
- [ ] 1920px（大画面）

#### 5.3 パフォーマンステスト
- [ ] TypeScriptエラー 0件
- [ ] ビルドエラー 0件
- [ ] Lighthouse SEOスコア確認

---

## 📝 実装順序

### Step 1: HeroSlider移行
1. Swiperパッケージインストール
2. HeroSlider.tsxを作成
3. styled-jsx → Tailwind CSS変換
4. テスト

### Step 2: ProductSlider移行
1. ProductSlider.tsxを作成
2. TypeScript化
3. テスト

### Step 3: ProductCard compactサイズ対応
1. ProductCard.tsxに`size`プロパティ追加
2. compactスタイル実装
3. テスト

### Step 4: page.tsx完全書き換え
1. 全6セクションを実装
2. BEMクラス名適用
3. 商品フィルター実装
4. ニュースデータ定義

### Step 5: 構造化データ・テスト
1. WebSite・Organization構造化データ追加
2. 全機能テスト
3. レスポンシブテスト

---

## 🎯 完了基準

- [ ] React AppとNext.js AppのTOPページが**視覚的に同一**
- [ ] **HeroSlider**が正常に動作（自動再生、ナビゲーション）
- [ ] **人気カテゴリー**が6個表示、リンク動作
- [ ] **ProductSlider**が正常に動作
- [ ] **新着商品・セール商品**がcompactサイズで表示
- [ ] **新着情報**が3件表示
- [ ] **BEMクラス名**が適切に適用
- [ ] **TypeScriptエラー 0件**
- [ ] **ビルドエラー 0件**
- [ ] **構造化データ**が正しく出力

---

## ⚠️ 注意事項

### Swiper使用時の注意
1. **'use client' 必須**: Swiperはクライアントサイドコンポーネント
2. **CSSインポート**: swiper/css系のインポートが必要
3. **styled-jsx制限**: Next.js 15ではstyled-jsxの使用に制約あり
   - Tailwind CSS + CSS Modulesで代替
   - またはグローバルCSSに定義

### CSS設計
- BEMクラス名を維持（機能的な意味はないが、元のコードに合わせる）
- Tailwind CSSと併用

### 画像パス
- `/img/mainbanner/` 配下の7枚の画像が既にpublicにコピー済み

---

## 📊 見積もり時間

| Phase | タスク | 時間 |
|-------|--------|------|
| Phase 1 | HeroSlider・ProductSlider・ProductCard移行 | 45分 |
| Phase 2 | TOPページ完全書き換え | 60分 |
| Phase 3 | Swiperインストール・設定 | 20分 |
| Phase 4 | 構造化データ・メタデータ | 15分 |
| Phase 5 | テスト・検証 | 20分 |
| **合計** | | **2時間40分** |

---

**作成日**: 2025年10月5日
**更新日**: 2025年10月5日
**ステータス**: ✅ 完了

## 実装結果

### ✅ 完了項目
- [x] Swiper.js インストール
- [x] HeroSlider コンポーネント作成
- [x] ProductSlider コンポーネント作成
- [x] ProductCard サイズバリアント追加（compact/default/large）
- [x] TOPページ完全書き換え（6セクション）
- [x] BEMクラス名適用
- [x] 構造化データ追加
- [x] TypeScript エラー: 0件
- [x] ビルドエラー: 0件
- [x] 16ページ静的生成成功

### コミット情報
- コミットID: 9cdedd1
- ブランチ: feature/nextjs-migration
- ファイル数: 9ファイル変更（868行追加、80行削除）
