'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Checkbox from '@/components/ui/Checkbox';
import Banner from '@/components/ui/Banner';
import ImageUpload from '@/components/ui/ImageUpload';
import type { BannerVariant } from '@/components/ui/Banner';
import toast from 'react-hot-toast';

interface BannerConfig {
  enabled: boolean;
  message: string;
  variant: BannerVariant;
  dismissible: boolean;
  actionLabel?: string;
  actionUrl?: string;
  imageUrl?: string;
  showImage?: boolean;
}

export default function BannerSettingsPage() {
  const [config, setConfig] = useState<BannerConfig>({
    enabled: false,
    message: '',
    variant: 'info',
    dismissible: true,
    actionLabel: '',
    actionUrl: '',
    imageUrl: '',
    showImage: false,
  });

  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // 設定を読み込む
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch('/api/settings/banner');
        const data = await response.json();
        if (data.success) {
          setConfig(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch banner config:', error);
      }
    };
    fetchConfig();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/settings/banner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('バナー設定を保存しました');
      } else {
        toast.error(data.message || '保存に失敗しました');
      }
    } catch (error) {
      console.error('Save error:', error);
      toast.error('保存エラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-container py-6">
      {/* ヘッダー */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">バナー設定</h1>
        <p className="text-sm text-gray-500 mt-1">
          サイト全体に表示するバナーを設定します
        </p>
      </div>

      {/* プレビュー */}
      {showPreview && config.message && (
        <div className="mb-6">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <h3 className="text-sm font-semibold text-gray-700">プレビュー</h3>
            </div>
            <Banner
              variant={config.variant}
              message={config.message}
              dismissible={config.dismissible}
              imageUrl={config.imageUrl}
              showImage={config.showImage}
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
          {/* 有効/無効 */}
          <div>
            <Checkbox
              id="enabled"
              label="バナーを有効にする"
              checked={config.enabled}
              onChange={(e) =>
                setConfig({ ...config, enabled: e.target.checked })
              }
            />
          </div>

          {/* バナータイプ */}
          <div>
            <Select
              label="バナータイプ"
              value={config.variant}
              onChange={(e) =>
                setConfig({
                  ...config,
                  variant: e.target.value as BannerVariant,
                })
              }
              fullWidth
            >
              <option value="info">情報（青）</option>
              <option value="success">成功（緑）</option>
              <option value="warning">警告（黄）</option>
              <option value="error">エラー（赤）</option>
            </Select>
          </div>

          {/* メッセージ */}
          <div>
            <Input
              type="text"
              label="メッセージ"
              placeholder="例: メンテナンスのお知らせ：本日23:00〜24:00はシステムメンテナンスを実施します"
              value={config.message}
              onChange={(e) =>
                setConfig({ ...config, message: e.target.value })
              }
              fullWidth
            />
          </div>

          {/* 閉じるボタン */}
          <div>
            <Checkbox
              id="dismissible"
              label="閉じるボタンを表示する"
              checked={config.dismissible}
              onChange={(e) =>
                setConfig({ ...config, dismissible: e.target.checked })
              }
            />
          </div>

          {/* 画像（オプション） */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              バナー画像（オプション）
            </h3>
            <div className="space-y-4">
              <Checkbox
                id="showImage"
                label="画像を表示する"
                checked={config.showImage}
                onChange={(e) =>
                  setConfig({ ...config, showImage: e.target.checked })
                }
              />
              {config.showImage && (
                <ImageUpload
                  label="バナー画像"
                  value={config.imageUrl}
                  onChange={(url) =>
                    setConfig({ ...config, imageUrl: url as string })
                  }
                  helperText="バナーに表示する画像を選択してください（推奨サイズ: 1200x200px）"
                />
              )}
            </div>
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
        </div>

        {/* ボタン */}
        <div className="flex gap-3 mt-8">
          <Button
            variant="primary"
            onClick={handleSave}
            disabled={loading || !config.message}
          >
            保存
          </Button>
          <Button
            variant="secondary"
            onClick={() => setShowPreview(!showPreview)}
            disabled={!config.message}
          >
            {showPreview ? 'プレビューを閉じる' : 'プレビュー'}
          </Button>
        </div>
      </div>
    </div>
  );
}
