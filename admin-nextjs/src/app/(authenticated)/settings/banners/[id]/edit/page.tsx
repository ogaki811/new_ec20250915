'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Banner from '@/components/ui/Banner';
import ImageUpload from '@/components/ui/ImageUpload';
import type { BannerVariant } from '@/types/banner';
import toast from 'react-hot-toast';

export default function BannerEditPage() {
  const router = useRouter();
  const params = useParams();
  const bannerId = params.id as string;

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [showPreview, setShowPreview] = useState(false);

  const [config, setConfig] = useState({
    actionLabel: '',
    actionUrl: '',
    imageUrl: '',
    publishStartDate: '',
    publishEndDate: '',
  });

  useEffect(() => {
    fetchBanner();
  }, [bannerId]);

  const fetchBanner = async () => {
    setFetchLoading(true);
    try {
      const response = await fetch(`/api/settings/banners/${bannerId}`);
      const data = await response.json();

      if (data.success) {
        const banner = data.data;
        setConfig({
          actionLabel: banner.actionLabel || '',
          actionUrl: banner.actionUrl || '',
          imageUrl: banner.imageUrl || '',
          publishStartDate: banner.publishStartDate
            ? new Date(banner.publishStartDate).toISOString().slice(0, 16)
            : '',
          publishEndDate: banner.publishEndDate
            ? new Date(banner.publishEndDate).toISOString().slice(0, 16)
            : '',
        });
      } else {
        toast.error(data.message || 'バナーの取得に失敗しました');
        router.push('/settings/banners');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error('バナーの取得に失敗しました');
      router.push('/settings/banners');
    } finally {
      setFetchLoading(false);
    }
  };

  const handleSave = async () => {
    if (!config.imageUrl) {
      toast.error('画像をアップロードしてください');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/settings/banners/${bannerId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...config,
          message: '',
          variant: 'info',
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('バナーを更新しました');
        router.push('/settings/banners');
      } else {
        toast.error(data.message || '更新に失敗しました');
      }
    } catch (error) {
      console.error('Save error:', error);
      toast.error('保存エラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="admin-container py-6">
        <div className="flex justify-center items-center min-h-[400px]">
          <p className="text-gray-500">読み込み中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container py-6">
      {/* ヘッダー */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">バナー編集</h1>
        <p className="text-sm text-gray-500 mt-1">
          バナー情報を編集します
        </p>
      </div>

      {/* プレビュー */}
      {showPreview && config.imageUrl && (
        <div className="mb-6">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <h3 className="text-sm font-semibold text-gray-700">プレビュー</h3>
            </div>
            <Banner
              variant="info"
              message=""
              imageUrl={config.imageUrl}
              action={
                config.actionLabel && config.actionUrl
                  ? {
                      label: config.actionLabel,
                      onClick: () => window.open(config.actionUrl, '_blank'),
                    }
                  : undefined
              }
            />
          </div>
        </div>
      )}

      {/* 設定フォーム */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="space-y-6">
          {/* 画像（必須） */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              バナー画像（必須）
            </h3>
            <ImageUpload
              label="バナー画像"
              value={config.imageUrl}
              onChange={(url) =>
                setConfig({ ...config, imageUrl: url as string })
              }
              helperText="バナーに表示する画像を選択してください（推奨サイズ: 1200x200px）"
            />
          </div>

          {/* アクションボタン（オプション） */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              アクションボタン（オプション）
            </h3>
            <div className="space-y-4">
              <Input
                type="text"
                label="ボタンラベル"
                placeholder="例: 詳細を見る"
                value={config.actionLabel}
                onChange={(e) =>
                  setConfig({ ...config, actionLabel: e.target.value })
                }
                fullWidth
              />
              <Input
                type="url"
                label="リンク先URL"
                placeholder="https://example.com"
                value={config.actionUrl}
                onChange={(e) =>
                  setConfig({ ...config, actionUrl: e.target.value })
                }
                fullWidth
              />
            </div>
          </div>

          {/* 予約公開設定 */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              予約公開設定
            </h3>
            <div className="space-y-4">
              <Input
                type="datetime-local"
                label="公開開始日時"
                value={config.publishStartDate}
                onChange={(e) =>
                  setConfig({ ...config, publishStartDate: e.target.value })
                }
                fullWidth
              />
              <Input
                type="datetime-local"
                label="公開終了日時"
                value={config.publishEndDate}
                onChange={(e) =>
                  setConfig({ ...config, publishEndDate: e.target.value })
                }
                fullWidth
              />
            </div>
          </div>
        </div>

        {/* ボタン */}
        <div className="flex gap-3 mt-8">
          <Button
            variant="secondary"
            onClick={() => router.push('/settings/banners')}
            disabled={loading}
          >
            キャンセル
          </Button>
          <Button
            variant="secondary"
            onClick={() => setShowPreview(!showPreview)}
            disabled={!config.imageUrl}
          >
            {showPreview ? 'プレビューを閉じる' : 'プレビュー'}
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            disabled={loading || !config.imageUrl}
          >
            更新
          </Button>
        </div>
      </div>
    </div>
  );
}
