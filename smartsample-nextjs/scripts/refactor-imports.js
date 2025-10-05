const fs = require('fs');
const path = require('path');
const glob = require('glob');

// import置換マッピング（個別importのみ対応）
const replacements = [
  // Atoms (12)
  { from: '@/components/ui/Badge', to: '@/components/atoms/Badge' },
  { from: '@/components/ui/Button', to: '@/components/atoms/Button' },
  { from: '@/components/ui/Card', to: '@/components/atoms/Card' },
  { from: '@/components/ui/Checkbox', to: '@/components/atoms/Checkbox' },
  { from: '@/components/ui/Divider', to: '@/components/atoms/Divider' },
  { from: '@/components/ui/Icon', to: '@/components/atoms/Icon' },
  { from: '@/components/ui/Input', to: '@/components/atoms/Input' },
  { from: '@/components/ui/Loading', to: '@/components/atoms/Loading' },
  { from: '@/components/ui/Radio', to: '@/components/atoms/Radio' },
  { from: '@/components/ui/Select', to: '@/components/atoms/Select' },
  { from: '@/components/ui/Textarea', to: '@/components/atoms/Textarea' },
  { from: '@/components/search/FilterTag', to: '@/components/atoms/Tag' },

  // Molecules (10)
  { from: '@/components/product/QuantitySelector', to: '@/components/molecules/QuantitySelector' },
  { from: '@/components/product/SearchBar', to: '@/components/molecules/SearchBar' },
  { from: '@/components/product/SortDropdown', to: '@/components/molecules/SortDropdown' },
  { from: '@/components/product/PriceRange', to: '@/components/molecules/PriceRange' },
  { from: '@/components/cart/CouponForm', to: '@/components/molecules/CouponForm' },
  { from: '@/components/checkout/DeliveryDateSelector', to: '@/components/molecules/DeliveryDateSelector' },
  { from: '@/components/checkout/PaymentMethodSelector', to: '@/components/molecules/PaymentMethodSelector' },
  { from: '@/components/common/Breadcrumb', to: '@/components/molecules/Breadcrumb' },
  { from: '@/components/common/Pagination', to: '@/components/molecules/Pagination' },
  { from: '@/components/common/StepIndicator', to: '@/components/molecules/StepIndicator' },

  // Organisms (26)
  { from: '@/components/layout/Header', to: '@/components/organisms/Header' },
  { from: '@/components/layout/Footer', to: '@/components/organisms/Footer' },
  { from: '@/components/layout/SimpleHeader', to: '@/components/organisms/SimpleHeader' },
  { from: '@/components/layout/SimpleFooter', to: '@/components/organisms/SimpleFooter' },
  { from: '@/components/layout/MobileMenu', to: '@/components/organisms/MobileMenu' },
  { from: '@/components/product/ProductCard', to: '@/components/organisms/ProductCard' },
  { from: '@/components/product/HorizontalProductCard', to: '@/components/organisms/HorizontalProductCard' },
  { from: '@/components/product/ProductListItem', to: '@/components/organisms/ProductListItem' },
  { from: '@/components/product/ProductImageGallery', to: '@/components/organisms/ProductImageGallery' },
  { from: '@/components/product/FilterSidebar', to: '@/components/organisms/FilterSidebar' },
  { from: '@/components/product/ProductDetailClient', to: '@/components/organisms/ProductDetail' },
  { from: '@/components/cart/CartItem', to: '@/components/organisms/CartItem' },
  { from: '@/components/cart/CartSummary', to: '@/components/organisms/CartSummary' },
  { from: '@/components/cart/CartHoverCard', to: '@/components/organisms/CartHoverCard' },
  { from: '@/components/cart/CartAddedNotification', to: '@/components/organisms/CartNotification' },
  { from: '@/components/cart/EmptyCart', to: '@/components/organisms/EmptyCart' },
  { from: '@/components/checkout/CheckoutSummary', to: '@/components/organisms/CheckoutSummary' },
  { from: '@/components/checkout/CustomerInfoForm', to: '@/components/organisms/CustomerInfoForm' },
  { from: '@/components/checkout/ShippingInfoForm', to: '@/components/organisms/ShippingInfoForm' },
  { from: '@/components/search/SearchFilters', to: '@/components/organisms/SearchFilters' },
  { from: '@/components/search/SearchSort', to: '@/components/organisms/SearchSort' },
  { from: '@/components/mypage/MyPageSidebar', to: '@/components/organisms/MyPageSidebar' },
  { from: '@/components/order/OrderDetailModal', to: '@/components/organisms/OrderDetailModal' },
  { from: '@/components/favorites/FavoriteItem', to: '@/components/organisms/FavoriteItem' },
  { from: '@/components/product/RecommendedItem', to: '@/components/organisms/RecommendedItem' },
  { from: '@/components/common/Modal', to: '@/components/organisms/Modal' },

  // Templates (4)
  { from: '@/components/product/ProductGrid', to: '@/components/templates/ProductGrid' },
  { from: '@/components/product/ProductSlider', to: '@/components/templates/ProductSlider' },
  { from: '@/components/home/ProductSlider', to: '@/components/templates/HomeProductSlider' },
  { from: '@/components/home/HeroSlider', to: '@/components/templates/HeroSlider' },
];

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  replacements.forEach(({ from, to }) => {
    const regex = new RegExp(from.replace(/\//g, '\\/'), 'g');
    if (regex.test(content)) {
      content = content.replace(regex, to);
      modified = true;
    }
  });

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Updated: ${filePath}`);
  }
}

// src/app/ディレクトリとsrc/components/ディレクトリを対象
const files = [
  ...glob.sync('src/app/**/*.{ts,tsx}'),
  ...glob.sync('src/components/**/*.{ts,tsx}')
];

console.log(`Processing ${files.length} files...`);
files.forEach(replaceInFile);
console.log('✅ Import replacement completed!');
