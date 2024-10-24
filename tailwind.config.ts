/* eslint-disable @typescript-eslint/no-require-imports */
import flowbite from 'flowbite-react/tailwind';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    flowbite.content()
  ],
  theme: {
    extend: {
      backgroundColor: {
        tr: {
          red: {
            10: 'rgba(255,0,0,0.1)',
            20: 'rgba(255,0,0,0.2)',
            30: 'rgba(255,0,0,0.3)',
            40: 'rgba(255,0,0,0.4)',
            50: 'rgba(255,0,0,0.5)',
            60: 'rgba(255,0,0,0.6)',
            70: 'rgba(255,0,0,0.7)',
            80: 'rgba(255,0,0,0.8)',
            90: 'rgba(255,0,0,0.9)'
          }
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    flowbite.plugin()
  ]
};

export default config;
