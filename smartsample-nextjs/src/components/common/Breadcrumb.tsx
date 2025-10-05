'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { sampleProducts } from '@/data/sampleProducts';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
}

// パスに対応するラベルのマッピング
const pathLabels: Record<string, string> = {
  '/': 'ホーム',
  '/cart': 'カート',
  '/checkout': 'ご注文手続き',
  '/order-complete': 'ご注文完了',
  '/products': '商品一覧',
  '/mypage': 'マイページ',
  '/favorites': 'お気に入り',
};

// パスから自動的にBreadcrumbアイテムを生成
const generateBreadcrumbItems = (pathname: string): BreadcrumbItem[] => {
  const paths = pathname.split('/').filter(Boolean);
  const items: BreadcrumbItem[] = [{ label: 'ホーム', href: '/' }];

  // チェックアウトページの場合は、カートを中間に入れる
  if (pathname === '/checkout') {
    items.push({ label: 'カート', href: '/cart' });
    items.push({ label: 'ご注文手続き' });
    return items;
  }

  // 商品詳細ページの場合 (/products/[id])
  if (pathname.startsWith('/products/') && paths.length === 2) {
    const productId = paths[1];
    const product = sampleProducts.find(p => p.id === productId);

    items.push({ label: '商品一覧', href: '/products' });
    items.push({ label: product?.name || productId });
    return items;
  }

  let currentPath = '';
  paths.forEach((path, index) => {
    currentPath += `/${path}`;
    const isLast = index === paths.length - 1;
    const label = pathLabels[currentPath] || path;

    items.push({
      label,
      href: isLast ? undefined : currentPath,
    });
  });

  return items;
};

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const pathname = usePathname();
  const breadcrumbItems = items || generateBreadcrumbItems(pathname);

  return (
    <section className="ec-breadcrumb">
      <div className="ec-breadcrumb__container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="ec-breadcrumb__nav flex items-center space-x-2 text-sm text-gray-600">
          {breadcrumbItems.map((item, index) => (
            <div key={index} className="ec-breadcrumb__item flex items-center space-x-2">
              {index > 0 && <span className="ec-breadcrumb__separator text-gray-400">{'>'}</span>}
              {item.href ? (
                <Link href={item.href} className="ec-breadcrumb__link text-blue-600 hover:text-blue-800 transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="ec-breadcrumb__current text-gray-900 font-medium">{item.label}</span>
              )}
            </div>
          ))}
        </nav>
      </div>
    </section>
  );
}
