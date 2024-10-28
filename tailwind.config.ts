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
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'custom-bg': "url('/haikei_scene.svg')",
      },
      typography: (theme: (arg0: string) => any) => ({
        DEFAULT: {
          css: {
            h1: {
              color: theme('colors.indigo.700'),
              fontWeight: 'bold',
              textDecoration: 'underline',
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
