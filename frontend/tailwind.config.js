const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
const TailwindForms = require('@tailwindcss/forms');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  safelist: ['_prompt-box-outer'],
  theme: {
    configViewer: {
      baseFontSize: 15,
    },
    fontFamily: {
      sans: ['IBM Plex Sans', 'sans-serif'],
    },
    boxShadow: {
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      DEFAULT: '0px 2px 10px rgba(51, 62, 73, 0.05);', // '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      popup: '0px 4px 12px rgba(21, 26, 33, 0.16)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
      inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
      none: 'none',
    },
    spacing: {
      // Base 15px
      px: '1px',
      0: '0px',
      0.5: '0.133rem', // 2px
      1: '0.266rem', // 4px
      1.5: '0.4rem', // 6px
      2: '0.533rem', // 8px
      2.5: '0.666rem', // 10px
      3: '0.8rem', // 12px
      3.5: '0.933rem', // 14px
      4: '1.066rem', // 16px
      4.5: '1.2rem', // 18px
      5: '1.333rem', // 20px
      5.5: '1.4666rem', // 22px
      6: '1.6rem', // 24px
      6.5: '1.73rem', // 26px
      7: '1.866rem', // 28px
      7.5: '2rem', // 30px
      8: '2.133rem', // 32px
      8.5: '2.266rem', // 34px
      9: '2.4rem', // 36px
      9.5: '2.533rem', // 38px
      10: '2.666rem', // 40px
      11: '2.9333rem', // 44px
      12: '3.2rem', // 48px
      14: '3.733rem', // 56px
      16: '4.266rem', // 64px
      20: '5.333rem', // 80px
      24: '6.4rem', // 96px
      28: '7.466rem', // 112px
      32: '8.533rem', // 128px
      36: '9.6rem', // 144px
      40: '10.666rem', // 160px
      44: '11.733rem', // 176px
      48: '12.8rem', // 192px
      52: '13.866rem', // 208px
      56: '14.933rem', // 224px
      60: '16rem', // 240px
      64: '17.066rem', // 256px
      72: '19.2rem', // 288px
      80: '21.333rem', // 320px
      96: '25.6rem', // 384px
    },
    borderRadius: {
      // Base 15px
      none: '0px',
      sm: '0.133rem',
      DEFAULT: '0.266rem',
      md: '0.4rem',
      lg: '0.533rem',
      xl: '0.8rem',
      '2xl': '1.066rem',
      '3xl': '1.6rem',
      full: '9999px',
    },
    extend: {
      animation: {
        'spin-slow': 'spin 2s linear infinite',
      },
      fontSize: {
        xs: '0.8rem',
      },
      colors: {
        money: {
          lighter: '#E9EAF1',
          light: '#9A9EC5',
          DEFAULT: '#3330A8',
          dark: '#2B2A70',
          darker: '#041C3A',
        },
        fingerprint: {
          lighter: '#57616A',
          light: '#333E49',
          DEFAULT: '#041C3A',
          dark: '#000E20',
        },
        bone: {
          lighter: '#F7F9FB',
          light: '#EFF3F8',
          DEFAULT: '#DEE5EF',
          dark: '#CCD0DD',
          darker: '#737B8A',
        },
        golden: {
          light: '#EFB420',
          DEFAULT: '#D89713',
          dark: '#C08611',
        },
        state: {
          green: '#358C62',
          yellow: '#D89713',
          red: '#F23456',
        },
      },
    },
  },
  plugins: [TailwindForms],
};
