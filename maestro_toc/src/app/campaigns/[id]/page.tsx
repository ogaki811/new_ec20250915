'use client';

import { useParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumb from '@/components/common/Breadcrumb';
import ProductCard from '@/components/product/ProductCard';
import Link from 'next/link';
import { getCampaignById } from '@/data/campaigns';
import { sampleProducts } from '@/data/sampleProducts';

export default function CampaignDetailPage() {
  const params = useParams();
  const campaignId = params.id as string;
  const campaign = getCampaignById(campaignId);

  if (!campaign) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              キャンペーンが見つかりません
            </h1>
            <Link
              href="/campaigns"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              キャンペーン一覧に戻る
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // カテゴリーに基づいて関連商品を取得
  const relatedProducts = campaign.category
    ? sampleProducts.filter((product) => product.category === campaign.category).slice(0, 18)
    : sampleProducts.slice(0, 18);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="ec-campaign-detail">
        <Breadcrumb
          items={[
            { label: 'ホーム', href: '/' },
            { label: 'キャンペーン一覧', href: '/campaigns' },
            { label: campaign.title },
          ]}
        />

        <section className="ec-campaign-detail__section py-12 bg-gray-50">
          <div className="ec-campaign-detail__container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* キャンペーンヘッダー */}
            <div className="ec-campaign-detail__header bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="ec-campaign-detail__image-wrapper relative aspect-[21/9] bg-gray-200">
                <img
                  src={campaign.image}
                  alt={campaign.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="ec-campaign-detail__content p-8">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="ec-campaign-detail__title text-3xl font-bold text-gray-900">
                    {campaign.title}
                  </h1>
                  {campaign.featured && (
                    <span className="ec-campaign-detail__badge bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                      注目のキャンペーン
                    </span>
                  )}
                </div>
                <p className="ec-campaign-detail__description text-gray-700 text-lg mb-6 leading-relaxed">
                  {campaign.description}
                </p>
                <div className="ec-campaign-detail__meta flex items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    <span>
                      期間: {new Date(campaign.startDate).toLocaleDateString('ja-JP')} 〜{' '}
                      {new Date(campaign.endDate).toLocaleDateString('ja-JP')}
                    </span>
                  </div>
                  {campaign.category && (
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                        <line x1="7" y1="7" x2="7.01" y2="7"></line>
                      </svg>
                      <span>カテゴリー: {campaign.category}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 関連商品 */}
            <div className="ec-campaign-detail__products">
              {relatedProducts.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
                  {relatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} size="compact" />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                  <p className="text-gray-600">関連商品がありません</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
