# メインスライダーコンポーネント実装計画

## 概要
TOPページのメインビジュアルスライダーを実装します。
既存HTMLの7枚バナースライダーをReactコンポーネント化し、**3枚同時表示・中央フォーカス**のカルーセル形式で、自動再生・ナビゲーション機能を提供します。

## 🎨 デザイン仕様

### ビジュアル要件
- ✅ **縦幅: 細め（250px - 400px）**
- ✅ **3枚同時表示**（左・中央・右）
- ✅ **中央の画像: フル表示**（100%幅）
- ✅ **左右の画像: 半分見切れ表示**（50%幅）
- ✅ **中央にフォーカス**（centeredSlides）
- ✅ **レスポンシブ対応**（モバイル1枚、タブレット2枚、デスクトップ3枚）

## 📦 使用ライブラリ

### Swiper.js (推奨)
**選定理由:**
- ✅ React対応 (`swiper/react`)
- ✅ モダンで軽量 (約45KB gzipped)
- ✅ タッチ・キーボード・マウス操作対応
- ✅ 自動再生・ページネーション・ナビゲーション標準搭載
- ✅ レスポンシブ対応
- ✅ アクセシビリティ対応 (ARIA属性)
- ✅ TypeScript対応
- ✅ 豊富なカスタマイズオプション

**インストール:**
```bash
npm install swiper
```

**インポート:**
```jsx
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
```

---

## 🎨 コンポーネント設計

### HeroSlider (Organism)

**配置:** `src/components/organisms/HeroSlider/index.jsx`

**用途:** TOPページメインビジュアルスライダー

**構成要素:**
- Swiper コンテナ
- SwiperSlide (7枚の画像スライド)
- Navigation (前へ/次へボタン)
- Pagination (ドット)
- Autoplayトグルボタン

---

## 💻 実装コード

### HeroSlider コンポーネント（3枚同時表示・中央フォーカス）

```jsx
// src/components/organisms/HeroSlider/index.jsx
import { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

export default function HeroSlider({ slides }) {
  const [isAutoplayRunning, setIsAutoplayRunning] = useState(true);
  const swiperRef = useRef(null);

  // オートプレイトグル
  const toggleAutoplay = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      if (isAutoplayRunning) {
        swiperRef.current.swiper.autoplay.stop();
      } else {
        swiperRef.current.swiper.autoplay.start();
      }
      setIsAutoplayRunning(!isAutoplayRunning);
    }
  };

  return (
    <section className="relative w-full py-8 md:py-12 overflow-hidden bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <Swiper
          ref={swiperRef}
          modules={[Navigation, Pagination, Autoplay]}

          // 3枚同時表示・中央フォーカス設定
          centeredSlides={true}
          slidesPerView="auto"
          spaceBetween={20}

          // レスポンシブ設定
          breakpoints={{
            // モバイル: 1枚表示
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
              centeredSlides: true,
            },
            // タブレット: 2枚表示
            768: {
              slidesPerView: 1.5,
              spaceBetween: 20,
              centeredSlides: true,
            },
            // デスクトップ: 3枚表示（左右半分見切れ）
            1024: {
              slidesPerView: 2.2,
              spaceBetween: 30,
              centeredSlides: true,
            },
          }}

          navigation={{
            prevEl: '.hero-slider-prev',
            nextEl: '.hero-slider-next',
          }}
          pagination={{
            el: '.hero-slider-pagination',
            clickable: true,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          speed={600}
          className="hero-swiper"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index} className="!w-auto">
              <a
                href={slide.link}
                className="block relative overflow-hidden rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="
                  relative
                  w-full
                  h-[250px]        /* モバイル: 250px */
                  sm:h-[300px]     /* タブレット: 300px */
                  md:h-[350px]     /* デスクトップ: 350px */
                  lg:h-[400px]     /* 大画面: 400px */
                ">
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    className="w-full h-full object-cover"
                  />

                  {/* グラデーションオーバーレイ（オプション） */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* 前へボタン */}
        <button
          className="hero-slider-prev absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
          aria-label="前のスライド"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* 次へボタン */}
        <button
          className="hero-slider-next absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
          aria-label="次のスライド"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* ドットページネーション */}
        <div className="hero-slider-pagination !relative mt-6 flex justify-center gap-2"></div>

        {/* オートプレイトグルボタン */}
        <button
          onClick={toggleAutoplay}
          className="absolute bottom-4 right-4 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all"
          aria-label={isAutoplayRunning ? '自動再生を停止' : '自動再生を開始'}
        >
          {isAutoplayRunning ? (
            <svg className="w-5 h-5 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      </div>
    </section>
  );
}
```

### カスタムCSS（必要に応じて）

```css
/* src/components/organisms/HeroSlider/styles.css */

/* スライドの幅設定（3枚同時表示用） */
.hero-swiper .swiper-slide {
  width: 600px !important; /* デスクトップでの1スライド幅 */
  max-width: 90vw; /* モバイルでは画面幅の90% */
}

/* 中央のスライドを強調 */
.hero-swiper .swiper-slide-active {
  transform: scale(1.05);
  transition: transform 0.3s ease;
  z-index: 2;
}

/* 左右のスライドを少し暗く */
.hero-swiper .swiper-slide:not(.swiper-slide-active) {
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

/* ホバー時 */
.hero-swiper .swiper-slide:hover {
  opacity: 1;
}

/* ページネーションドット */
.hero-slider-pagination .swiper-pagination-bullet {
  @apply w-2 h-2 bg-gray-400 opacity-60 transition-all;
}

.hero-slider-pagination .swiper-pagination-bullet-active {
  @apply w-8 bg-blue-600 opacity-100 rounded-full;
}
```

---

## 🎯 Props定義

```typescript
interface Slide {
  image: string;      // 画像パス
  alt: string;        // 代替テキスト
  link: string;       // リンク先URL
}

interface HeroSliderProps {
  slides: Slide[];    // スライド配列（7枚）
}
```

---

## 📋 使用例

### Home ページでの使用

```jsx
// src/pages/Home.jsx
import HeroSlider from '../components/organisms/HeroSlider';

const heroSlides = [
  {
    image: '/img/mainbanner/top_bnr_color_sta01.png',
    alt: 'カラーステーション',
    link: '#',
  },
  {
    image: '/img/mainbanner/top_bnr_color_sta02.png',
    alt: 'スマートオフィス',
    link: '#',
  },
  {
    image: '/img/mainbanner/top_bnr_color_sta03.png',
    alt: 'ecoコレクション',
    link: '#',
  },
  {
    image: '/img/mainbanner/top_bnr_color_sta04.png',
    alt: '家具特集',
    link: '#',
  },
  {
    image: '/img/mainbanner/top_bnr_color_sta05.png',
    alt: 'テレワーク特集',
    link: '#',
  },
  {
    image: '/img/mainbanner/top_bnr_color_sta06.png',
    alt: '新生活応援フェア',
    link: '#',
  },
  {
    image: '/img/mainbanner/top_bnr_color_sta07.png',
    alt: 'セキュリティ対策',
    link: '#',
  },
];

export default function Home() {
  return (
    <div>
      <HeroSlider slides={heroSlides} />
      {/* 他のコンテンツ */}
    </div>
  );
}
```

---

## 🎨 カスタムスタイル（Tailwind）

### ドットスタイルのカスタマイズ

Swiperのデフォルトドットスタイルをオーバーライド:

```css
/* src/components/organisms/HeroSlider/styles.css (必要に応じて) */
.hero-slider-pagination .swiper-pagination-bullet {
  @apply w-3 h-3 bg-white opacity-60 transition-all;
}

.hero-slider-pagination .swiper-pagination-bullet-active {
  @apply w-8 opacity-100 rounded-full;
}
```

または、Tailwindのみで完結する場合は`renderBullet`カスタマイズ:

```jsx
pagination={{
  el: '.hero-slider-pagination',
  clickable: true,
  renderBullet: (index, className) => {
    return `<span class="${className} w-3 h-3 bg-white opacity-60 transition-all"></span>`;
  },
}}
```

---

## ⚙️ 設定オプション

### Swiper設定のカスタマイズ

```jsx
<Swiper
  spaceBetween={0}              // スライド間の余白（0でぴったり）
  slidesPerView={1}              // 表示スライド数（1枚ずつ）
  loop={true}                    // 無限ループ
  speed={600}                    // トランジション速度（ms）
  autoplay={{
    delay: 5000,                 // 5秒ごとに自動再生
    disableOnInteraction: false, // ユーザー操作後も自動再生継続
    pauseOnMouseEnter: true,     // ホバー時一時停止
  }}
  effect="slide"                 // エフェクト（slide, fade, cube, flip, coverflow）
  navigation={true}              // 前へ/次へボタン
  pagination={{ clickable: true }} // クリック可能なドット
  keyboard={true}                // キーボード操作（矢印キー）
  mousewheel={false}             // マウスホイール操作（必要なら有効化）
/>
```

---

## 📱 レスポンシブ設計

### スライダー高さ（細め設定）

```jsx
h-[250px]     // モバイル: 250px
sm:h-[300px]  // タブレット: 300px
md:h-[350px]  // デスクトップ: 350px
lg:h-[400px]  // 大画面: 400px
```

### 同時表示枚数とスライド幅

| デバイス | 画面幅 | slidesPerView | 表示状態 |
|---------|-------|---------------|---------|
| **モバイル** | 320px - 767px | 1 | 1枚のみ表示（フル幅） |
| **タブレット** | 768px - 1023px | 1.5 | 中央フル + 右側半分見切れ |
| **デスクトップ** | 1024px+ | 2.2 | **中央フル + 左右半分見切れ** |

**ポイント:**
- `slidesPerView: 2.2` = 左0.6枚 + 中央1枚 + 右0.6枚 = **3枚表示**
- `centeredSlides: true` で中央にフォーカス
- 左右の画像は約40%が見切れる

### ボタン位置の調整

```jsx
// モバイルでは小さめのボタン
className="w-10 h-10 md:w-12 md:h-12"

// モバイルでは端に近く配置
className="left-2 md:left-4"
className="right-2 md:right-4"
```

---

## ♿ アクセシビリティ

### 実装済み対応

- ✅ `aria-label` でボタンに説明
- ✅ キーボード操作対応（矢印キー）
- ✅ フォーカス可能な要素
- ✅ 画像の `alt` 属性
- ✅ 自動再生の停止ボタン

### 追加推奨事項

```jsx
<Swiper
  a11y={{
    enabled: true,
    prevSlideMessage: '前のスライド',
    nextSlideMessage: '次のスライド',
    firstSlideMessage: '最初のスライド',
    lastSlideMessage: '最後のスライド',
    paginationBulletMessage: 'スライド {{index}} に移動',
  }}
>
```

---

## 🚀 実装手順

### 1. Swiperインストール

```bash
cd react-app
npm install swiper
```

### 2. HeroSliderコンポーネント作成

```bash
mkdir -p src/components/organisms/HeroSlider
touch src/components/organisms/HeroSlider/index.jsx
```

### 3. Homeページに統合

```jsx
// src/pages/Home.jsx
import HeroSlider from '../components/organisms/HeroSlider';

const heroSlides = [...]; // スライドデータ

export default function Home() {
  return (
    <div>
      <HeroSlider slides={heroSlides} />
      {/* 既存コンテンツ */}
    </div>
  );
}
```

### 4. 画像の確認

`public/img/mainbanner/` に7枚の画像が存在することを確認:
- `top_bnr_color_sta01.png`
- `top_bnr_color_sta02.png`
- `top_bnr_color_sta03.png`
- `top_bnr_color_sta04.png`
- `top_bnr_color_sta05.png`
- `top_bnr_color_sta06.png`
- `top_bnr_color_sta07.png`

### 5. 動作確認

```bash
npm run dev
```

ブラウザで確認:
- [ ] **デスクトップ: 3枚同時表示（中央フル + 左右半分見切れ）**
- [ ] **タブレット: 2枚表示（中央フル + 右側半分見切れ）**
- [ ] **モバイル: 1枚表示（フル幅）**
- [ ] スライドが自動再生される（5秒ごと）
- [ ] 前へ/次へボタンが動作する
- [ ] ドットクリックでスライド移動
- [ ] オートプレイトグルボタンが動作
- [ ] ホバー時に自動再生が一時停止
- [ ] 中央のスライドが少し拡大されている
- [ ] 左右のスライドが少し暗くなっている
- [ ] スライダー高さが細め（250px-400px）

---

## 🎨 デザインシステムへの統合

### DESIGN_SYSTEM_PLAN.md への追加

**Organisms セクションに追加:**

```markdown
#### 9. HeroSlider
ヒーローセクションのメインスライダー

**Props:**
- slides: Slide[] - スライド配列
- autoplayDelay?: number - 自動再生間隔（デフォルト: 5000ms）
- loop?: boolean - ループ再生（デフォルト: true）
```

---

## 📊 パフォーマンス最適化

### 画像の最適化

1. **Lazy Loading（遅延読み込み）**
```jsx
<Swiper
  lazy={true}
  preloadImages={false}
>
  <SwiperSlide>
    <img data-src={slide.image} className="swiper-lazy" />
    <div className="swiper-lazy-preloader"></div>
  </SwiperSlide>
</Swiper>
```

2. **画像フォーマット最適化**
- WebP形式への変換推奨
- 適切なサイズにリサイズ（例: 1920x600px）

### バンドルサイズ削減

必要なモジュールのみインポート:
```jsx
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// 不要なモジュール（EffectFade, Thumbs等）はインポートしない
```

---

## 🔧 今後の拡張

### 動画スライド対応

```jsx
<SwiperSlide>
  {slide.type === 'video' ? (
    <video autoPlay muted loop className="w-full h-full object-cover">
      <source src={slide.video} type="video/mp4" />
    </video>
  ) : (
    <img src={slide.image} alt={slide.alt} />
  )}
</SwiperSlide>
```

### テキストオーバーレイ

```jsx
<SwiperSlide className="relative">
  <img src={slide.image} alt={slide.alt} />
  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
    <div className="text-center text-white">
      <h2 className="text-4xl font-bold">{slide.title}</h2>
      <p className="text-lg mt-4">{slide.description}</p>
      <Button variant="primary" className="mt-6">詳しく見る</Button>
    </div>
  </div>
</SwiperSlide>
```

### プログレスバー

```jsx
import { Autoplay, Pagination } from 'swiper/modules';

<Swiper
  modules={[Autoplay, Pagination]}
  pagination={{
    type: 'progressbar',
  }}
>
```

---

## ✅ チェックリスト

実装前の確認事項:

- [ ] Swiperライブラリインストール済み
- [ ] 画像7枚が `public/img/mainbanner/` に存在
- [ ] HeroSliderコンポーネント作成
- [ ] Homeページに統合
- [ ] レスポンシブ動作確認
- [ ] アクセシビリティ確認
- [ ] ブラウザ互換性テスト（Chrome, Safari, Firefox）
- [ ] パフォーマンステスト（Lighthouse）

---

## 📦 依存関係

```json
{
  "dependencies": {
    "swiper": "^11.0.0"
  }
}
```

---

**この計画により、既存HTMLのスライダー機能を完全にReactコンポーネント化し、デザインシステムに統合できます。** 🎉
