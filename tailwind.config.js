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
        sans: ['Inter var', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        primary: '#FFB200',
        gradientTop: '#FFC700',
        gradientBottom: '#FF7A00',
        primary_muted: '#E5A100',
        greyGradientLeft: '#FFFFFF',
        greyGradientRight: '#E9E9E9',
        primary_gradient_end: '#EE9E02',
        web: {
          light: {
            c1: '#FFFFFF',
            c2: '#F6F7FA',
            c3: '#443F51',
            c4: '#6D7386',
            c5: '#2F2C3A',
            c6: '#FFB200'
          },
          dark: {
            c1: '#2F2C3A',
            c2: '#373343',
            c3: '#443F51',
            c4: '#B0B4BC',
            c5: '#FFFFFF',
            c6: '#FFB200'
          },
          slate: '#F6F7FA'
        },
        light: {
          grey1: '#FFFFFF',
          grey2: '#F8F8F8',
          grey3: '#F2F2F2',
          grey4: '#E9E9E9',
          grey5: '#E6E6E6',
          grey1a: '#FCFCFC',
          purple1: '#373343',
          purple2: '#403B4D',
          purple3: '#443F51',
          purple4: '#F3F3F5'
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
          neutral: '#969696',
          light: '#E9E9E9',
          lightest: '#FFFFFF',
          success: '#407B24',
          warning: '#C78F0F',
          danger: '#C70F0F',
          purple: '#443F51',
          light_purple: '#B0B4BC'
        },
        alerts: {
          danger: {
            text: '#C70F0F',
            background: '#FFCACA'
          },
          success: {
            text: '#407B24',
            background: '#CBEABC'
          },
          warning: {
            text: '#C78F0F',
            background: '#FFEFCA'
          }
        }
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
        mountain_background: "url('/homepage/image_mountain.svg')",
        dark_mountain_background: "url('/homepage/dark_image_mountain.svg')",
        cloud_hero_background: "url('/cloud/cloud_bg.svg')",
        dark_cloud_hero_background: "url('/cloud/dark_cloud_bg.svg')",
        field_focus:
          'linear-gradient(to top, #FFB200, #FFB200 2px, transparent 2px, transparent 100%)',
        grid_background: "url('/homepage/background.svg')",
        stars_background: "url('/homepage/stars.svg')",
        cube_background: "url('/homepage/bg_cube.svg')",
        map_background: "url('/our-story/map-bg.png')",
        careers_background: "url('/career/camera_roll.png')",
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
