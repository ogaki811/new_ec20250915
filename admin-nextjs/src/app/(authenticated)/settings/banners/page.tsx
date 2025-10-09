'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Banner from '@/components/ui/Banner';
import ConfirmDialog from '@/components/ui/ConfirmDialog';
import type { BannerConfig, BannerVariant, BannerStatus } from '@/types/banner';
import toast from 'react-hot-toast';

const variantLabels: Record<BannerVariant, string> = {
  info: '情報',
  success: '成功',
  warning: '警告',
  error: 'エラー',
};

const variantColors: Record<BannerVariant, 'primary' | 'success' | 'warning' | 'error'> = {
  info: 'primary',
  success: 'success',
  warning: 'warning',
  error: 'error',
};

export default function BannersListPage() {
  const router = useRouter();
  const [banners, setBanners] = useState<BannerConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [previewBanner, setPreviewBanner] = useState<BannerConfig | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; message: string } | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/settings/banners');
      const data = await response.json();
      if (data.success) {
        setBanners(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch banners:', error);
      toast.error('バナー一覧の取得に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  // バナーのステータスを取得する関数
  const getBannerStatus = (banner: BannerConfig): BannerStatus => {
    const now = new Date();

    if (banner.publishStartDate) {
      const startDate = new Date(banner.publishStartDate);
      if (now < startDate) {
        return 'scheduled'; // 予約中
      }
    }

    if (banner.publishEndDate) {
      const endDate = new Date(banner.publishEndDate);
      if (now > endDate) {
        return 'expired'; // 期限切れ
      }
    }

    return 'active'; // 公開中
  };

  const getStatusBadge = (status: BannerStatus) => {
    switch (status) {
      case 'scheduled':
        return { variant: 'warning' as const, label: '予約中' };
      case 'active':
        return { variant: 'success' as const, label: '公開中' };
      case 'expired':
        return { variant: 'default' as const, label: '期限切れ' };
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;

    setDeleteLoading(true);
    try {
      const response = await fetch(`/api/settings/banners/${deleteTarget.id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        toast.success('バナーを削除しました');
        setDeleteTarget(null);
        fetchBanners();
      } else {
        toast.error(data.message || '削除に失敗しました');
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('エラーが発生しました');
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="admin-container py-6">
      {/* ヘッダー */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">バナー管理</h1>
          <p className="text-sm text-gray-500 mt-1">
            サイト全体に表示するバナーを管理します
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => router.push('/settings/banners/new')}
        >
          + 新規作成
        </Button>
      </div>

      {/* プレビュー */}
      {previewBanner && (
        <div className="mb-6">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
              <h3 className="text-sm font-semibold text-gray-700">プレビュー</h3>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setPreviewBanner(null)}
              >
                閉じる
              </Button>
            </div>
            <Banner
              variant={previewBanner.variant}
              message={previewBanner.message}
              imageUrl={previewBanner.imageUrl}
              action={
                previewBanner.actionLabel && previewBanner.actionUrl
                  ? {
                      label: previewBanner.actionLabel,
                      onClick: () => window.open(previewBanner.actionUrl, '_blank'),
                    }
                  : undefined
              }
            />
          </div>
        </div>
      )}

      {/* バナー一覧 */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  ステータス
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  タイプ
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  メッセージ
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  画像
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  作成日
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  アクション
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-gray-500">
                    読み込み中...
                  </td>
                </tr>
              ) : banners.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-gray-500">
                    バナーが登録されていません
                  </td>
                </tr>
              ) : (
                banners.map((banner) => {
                  const status = getBannerStatus(banner);
                  const statusBadge = getStatusBadge(status);
                  return (
                    <tr key={banner.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="space-y-1">
                          <Badge variant={statusBadge.variant}>
                            {statusBadge.label}
                          </Badge>
                          {banner.publishStartDate && (
                            <div className="text-xs text-gray-500">
                              開始: {new Date(banner.publishStartDate).toLocaleString('ja-JP')}
                            </div>
                          )}
                          {banner.publishEndDate && (
                            <div className="text-xs text-gray-500">
                              終了: {new Date(banner.publishEndDate).toLocaleString('ja-JP')}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <Badge variant={variantColors[banner.variant]}>
                          {variantLabels[banner.variant]}
                        </Badge>
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm text-gray-900 max-w-md truncate">
                          {banner.message}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        {banner.imageUrl ? (
                          <img
                            src={banner.imageUrl}
                            alt="Banner preview"
                            className="h-8 w-auto object-cover rounded"
                          />
                        ) : (
                          <span className="text-sm text-gray-400">なし</span>
                        )}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(banner.createdAt).toLocaleDateString('ja-JP')}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex gap-2 justify-end">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => setPreviewBanner(banner)}
                          >
                            プレビュー
                          </Button>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() =>
                              router.push(`/settings/banners/${banner.id}/edit`)
                            }
                          >
                            編集
                          </Button>
                          <Button
                            variant="error"
                            size="sm"
                            onClick={() => setDeleteTarget({ id: banner.id, message: banner.message })}
                          >
                            削除
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 削除確認モーダル */}
      <ConfirmDialog
        isOpen={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="バナーの削除"
        message={`「${deleteTarget?.message}」を削除してもよろしいですか？この操作は取り消せません。`}
        confirmLabel="削除"
        cancelLabel="キャンセル"
        variant="error"
        isLoading={deleteLoading}
      />
    </div>
  );
}
