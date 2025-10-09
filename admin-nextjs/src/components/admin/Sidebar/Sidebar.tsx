'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/ui/Icon';

interface NavItem {
  name: string;
  href: string;
  icon: string;
}

const navItems: NavItem[] = [
  { name: 'ダッシュボード', href: '/dashboard', icon: 'home' },
  { name: '商品管理', href: '/products', icon: 'package' },
  { name: '注文管理', href: '/orders', icon: 'cart' },
  { name: '顧客管理', href: '/customers', icon: 'user' },
  { name: 'クーポン管理', href: '/coupons', icon: 'creditCard' },
  { name: 'バナー管理', href: '/settings/banners', icon: 'alert' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen fixed left-0 top-0">
      {/* ロゴ */}
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-xl font-bold">Maestro Admin</h1>
        <p className="text-xs text-gray-400 mt-1">管理画面</p>
      </div>

      {/* ナビゲーション */}
      <nav className="p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`
                    flex items-center px-4 py-3 rounded-lg transition-colors
                    ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }
                  `}
                >
                  <Icon name={item.icon} size={20} className="mr-3" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
