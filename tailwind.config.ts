import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        prim: {
          default: '#633CFF',
          light: '#BEADFF',
        },
        dark: {
          default: '#333333',
          light: '#737373',
        },
        sec: {
          default: '#D9D9D9',
          light: '#EFEBFF',
          lighter: '#FAFAFA',
        },
        danger: {
          default: '#FF3939',
        },
      },
    },
  },
  plugins: [],
};
export default config;
