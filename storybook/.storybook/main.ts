import type { StorybookConfig } from '@storybook/react-webpack5';
import path from 'path';

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@storybook/addon-viewport',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  staticDirs: ['../../smartsample-nextjs/public'],
  webpackFinal: async (config) => {
    // Next.jsプロジェクトへのエイリアス設定
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': path.resolve(__dirname, '../../smartsample-nextjs/src'),
        // Next.js静的モック
        'next/link': require.resolve('./mocks/NextLink.js'),
        'next/image': require.resolve('./mocks/NextImage.js'),
        'next/navigation': require.resolve('./mocks/NextNavigation.js'),
      };
    }

    // JSX/TSXのトランスパイル設定を追加（先頭に追加してStorybookのローダーより先に実行）
    if (config.module && config.module.rules) {
      config.module.rules.unshift({
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              ['@babel/preset-react', { runtime: 'automatic' }],
              '@babel/preset-typescript',
            ],
          },
        },
      });

      // CSSルールを見つけて、PostCSSローダーを追加
      const cssRule = config.module.rules.find(
        (rule) => rule && typeof rule === 'object' && rule.test && rule.test.toString().includes('css')
      );

      if (cssRule && typeof cssRule === 'object' && Array.isArray(cssRule.use)) {
        // PostCSSローダーを追加
        cssRule.use.push({
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: {
                tailwindcss: {},
                autoprefixer: {},
              },
            },
          },
        });
      }
    }

    return config;
  },
};

export default config;
