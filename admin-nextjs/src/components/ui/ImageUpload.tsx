'use client';

import React, { useState, useRef, ChangeEvent } from 'react';
import Icon from './Icon';
import Button from './Button';

interface ImageUploadProps {
  label?: string;
  value?: string | string[];
  onChange: (urls: string | string[]) => void;
  multiple?: boolean;
  maxFiles?: number;
  accept?: string;
  error?: string;
  helperText?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  label,
  value,
  onChange,
  multiple = false,
  maxFiles = 5,
  accept = 'image/*',
  error,
  helperText,
}) => {
  const [previews, setPreviews] = useState<string[]>(
    Array.isArray(value) ? value : value ? [value] : []
  );
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // ファイル数チェック
    if (multiple && previews.length + files.length > maxFiles) {
      alert(`最大${maxFiles}枚まで選択できます`);
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append('files', file);
      });

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        const newUrls = data.urls;
        const updatedPreviews = multiple
          ? [...previews, ...newUrls]
          : newUrls;

        setPreviews(updatedPreviews);
        onChange(multiple ? updatedPreviews : updatedPreviews[0]);
      } else {
        alert(data.message || 'アップロードに失敗しました');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('アップロードエラーが発生しました');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemove = (index: number) => {
    const updatedPreviews = previews.filter((_, i) => i !== index);
    setPreviews(updatedPreviews);
    onChange(multiple ? updatedPreviews : updatedPreviews[0] || '');
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}

      <div className="space-y-4">
        {/* プレビュー */}
        {previews.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {previews.map((preview, index) => (
              <div
                key={index}
                className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200"
              >
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  aria-label="削除"
                >
                  <Icon name="close" size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* アップロードボタン */}
        {(!multiple || previews.length < maxFiles) && (
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept={accept}
              multiple={multiple}
              onChange={handleFileSelect}
              className="hidden"
            />
            <button
              type="button"
              onClick={handleClick}
              disabled={uploading}
              className={`
                w-full px-4 py-8 border-2 border-dashed border-gray-200 rounded-lg
                hover:border-blue-500 hover:bg-blue-50 transition-all
                ${uploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              <div className="flex flex-col items-center gap-2">
                {uploading ? (
                  <>
                    <div className="animate-spin">
                      <Icon name="loader" size={32} className="text-blue-500" />
                    </div>
                    <p className="text-sm text-gray-600">アップロード中...</p>
                  </>
                ) : (
                  <>
                    <Icon name="image" size={32} className="text-gray-400" />
                    <p className="text-sm font-medium text-gray-700">
                      クリックして画像を選択
                    </p>
                    <p className="text-xs text-gray-500">
                      {multiple
                        ? `最大${maxFiles}枚まで（${previews.length}/${maxFiles}）`
                        : 'PNG, JPG, GIF'}
                    </p>
                  </>
                )}
              </div>
            </button>
          </div>
        )}
      </div>

      {/* エラーメッセージ */}
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

      {/* ヘルパーテキスト */}
      {helperText && !error && (
        <p className="mt-2 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

export default ImageUpload;
