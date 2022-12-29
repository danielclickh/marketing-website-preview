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
        primary: {
          DEFAULT: '#FFB200',
          text: '#4B2A04'
        },
        c_yellow: '#FFB200',
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
        web: {
          light: {
            c4: '#6D7386',
          },
          dark: {
            c4: '#B0B4BC',
          },
        },
        light: {
          grey2: '#F8F8F8',
          grey3: '#F2F2F2',
          grey4: '#E9E9E9',
          grey5: '#E6E6E6',
          grey1a: '#FCFCFC',
          purple2: '#403B4D'
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
      },
      width: {
        128: '30rem'
      },
      fontSize: {
        'ch-max': [
          '68px',
          {
            letterSpacing: '-0.01em',
            lineHeight: '78px'
          }
        ],
        'ch-5xl': [
          '64px',
          {
            letterSpacing: '-0.01em',
            lineHeight: '94px'
          }
        ],
        'ch-webtitle': [
          '48px',
          {
            letterSpacing: '-0.01em',
            lineHeight: '58px'
          }
        ],
        'ch-4xl': [
          '38px',
          {
            letterSpacing: '-0.01em',
            lineHeight: '44px'
          }
        ],
        'ch-3xl': [
          '32px',
          {
            letterSpacing: '-0.01em',
            lineHeight: '44px'
          }
        ],
        'ch-2xl': [
          '28px',
          {
            letterSpacing: '-0.01em',
            lineHeight: '34px'
          }
        ],
        'ch-lg': [
          '20px',
          {
            letterSpacing: '-0.01em',
            lineHeight: '26px'
          }
        ]
      },
      backgroundSize: {
        default_size: '0%, 100%',
        focus_size: '100%, 100%'
      },
      backgroundImage: {
        hero_background:
          'linear-gradient(180deg, rgba(246, 247, 250, 0) 0%, #F6F7FA 100%);',
        dark_hero_background:
          'linear-gradient(180deg, #312E3C 0%, #3B3647 100%);',
        cloud_hero_background: "url('/cloud/cloud_bg.svg')",
        dark_cloud_hero_background: "url('/cloud/dark_cloud_bg.svg')",
        field_focus:
          'linear-gradient(to top, #FFB200, #FFB200 2px, transparent 2px, transparent 100%)',
        strain_background: "url('/homepage/new/image_strain.svg')"
      },
      backgroundPosition: {
        minus_left: '-2rem'
      },
      transitionProperty: {
        field_props: 'background-image, background-size, background-color'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
}
