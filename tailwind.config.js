const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        c1: 'var(--clickhouse-color-1)',
        c2: 'var(--clickhouse-color-2)',
        c3: '#443F51',
        c4: 'rgba(var(--clickhouse-color-4), <alpha-value>)',
        c5: 'var(--clickhouse-color-5)',
        c6: '#FFB200',
        c7: 'var(--clickhouse-color-7)',
        seal_brown: '#4B2A04',
        cultured: '#F6F7FA',
        arsenic: '#443F51',
        gunmetal: '#2F2C3A',
        onyx: '#373343',
        gradientTop: '#FFC700',
        gradientBottom: '#FF7A00',
        primary_muted: '#E5A100',
        greyGradientLeft: '#FFFFFF',
        greyGradientRight: '#E9E9E9',
        primary_gradient_end: '#EE9E02',
        raisin_black: '#222222',
        auro_metal_saurus: '#6D7386',
        philippine_silver: '#B0B4BC',
        gold: '#A6770D',
        sunglow: '#A6770D',
        light: {
          grey2: '#F8F8F8',
          grey4: '#E9E9E9',
          grey5: '#E6E6E6',
          grey1a: '#FCFCFC',
        },
        dark: {
          grey1: '#1C1922',
          grey2: '#1E1B24',
          grey3: '#27242D',
          grey4: '#2F2E36',
          grey5: '#322F39'
        },
        text: {
          darkest: '#27242D',
          dark: '#808080',
          light: '#E9E9E9',
          success: '#407B24',
          warning: '#C78F0F',
          danger: '#C70F0F',
        },
        alerts: {
          danger: {
            text: '#C70F0F',
            background: '#FAE7E7'
          },
          info: {
            text: '#3B73DE',
            background: '#E6F1FA'
          },
          success: {
            text: '#00664B',
            background: '#E6F9F4'
          },
          warning: {
            text: '#805300',
            background: '#FFF8E6'
          }
        }
      },
      boxShadow: {
        card: '0px 4px 14px rgba(0, 0, 0, 0.13)',
        'card-xl': '0px 4px 14px 4px rgba(0, 0, 0, 0.13)',
        input: '0px 1px 2px rgba(0, 0, 0, 0.05)',
        'input-focus': '0px 1px 2px rgba(0, 0, 0, 0.05), inset 0px -2px 0px #FFB200'
      },
      backgroundSize: {
        default_size: '0%, 100%',
        focus_size: '100%, 100%'
      },
      backgroundImage: {
        field_focus:
          'linear-gradient(to top, #FFB200, #FFB200 2px, transparent 2px, transparent 100%)',
        strain_background: "url('/images/homepage/image_strain.svg')"
      }
    }
  }
}
