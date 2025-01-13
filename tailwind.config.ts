import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/posts/**/*.md', // マークダウンファイルも対象に
    './src/**/*.{js,ts,jsx,tsx,md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#fff9e6', // カスタムクリーム色
      },
      fontSize:
      {
        // ベースフォントサイズを小さくする
        sm: '0.875rem', // 14px
        base: '0.875rem', // 14px
        lg: '1rem', // 16px
      },
        typography: (theme: (arg0: string) => any) => ({
        DEFAULT: {
          css: {
            h1: {
              color: theme('colors.gray.600'),
              fontWeight: 'bold',
              borderBottom: `10px solid ${theme('colors.gray.600')}`,
              borderTop: `10px solid ${theme('colors.gray.600')}`,
              padding: '0.5rem 0'
            },
            h2: {
              color: theme('colors.indigo.600'),
              fontWeight: '600',
            },
            a: {
              color: theme('colors.blue.500'),
              '&:hover': {
                color: theme('colors.blue.700'),
                textDecoration: 'underline',
              },
            },
            code: {
              backgroundColor: theme('colors.gray.100'),
              padding: '2px 4px',
              borderRadius: '4px',
            },
            pre: {
              backgroundColor: theme('colors.gray.900'),
              color: theme('colors.gray.100'),
              padding: '1rem',
              borderRadius: '8px',
            },
            blockquote: {
              borderLeftColor: theme('colors.gray.300'),
              paddingLeft: '1rem',
              fontStyle: 'italic',
              color: theme('colors.gray.600'),
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
