module.exports = {
  darkMode: 'class',
  content: [
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontSize: {
        '5.5xl': '3.5rem'
      },
      fontFamily: {
        inter: 'var(--font-inter), sans-serif',
        inconsolata: 'var(--font-inconsolata)',
      },
      colors: {
        "base-color": '#FBFF46',
        primary: {
          DEFAULT: '#FBFF46',
          50: '#FFFFE8',
          100: '#FEFFBA',
          200: '#FDFFA3',
          300: '#FCFF74',
          400: '#EEF400',
          500: '#9FA300',
          600: '#4F5100',
          700: '#282900',
          800: '#161600',
        },
        neutral: {
          DEFAULT: '#212121',
          0: '#FFFFFF',
          100: '#F9F9F9',
          200: '#dfdfdf',
          300: '#c0c0c0',
          400: '#a0a0a0',
          500: '#808080',
          600: '#606060',
          700: '#414141',
          800: '#1d1d1d',
          900: '#151515'
        },
        slate: {
          DEFAULT: '#373439',
          50: '#F6F7FA',
          100: '#e6e7e9',
          200: '#cccfd3',
          300: '#b3b6bd',
          400: '#9a9ea7',
          500: '#808691',
          600: '#696e79',
          700: '#53575f',
          800: '#302e32',
          900: '#161517'
        },
        indigo: {
          DEFAULT: '#2F2C3A',
          50: '#F4F1FC',
          100: '#e4e2e9',
          200: '#c8c5d3',
          300: '#ada8bd',
          400: '#918ba7',
          500: '#766e91',
          600: '#5e5874',
          700: '#474257',
          800: '#23212c',
          900: '#18161d',
        },
        info: {
          DEFAULT: '#2F2C3A',
          50: '#dae6fc',
          100: '#b5cdf9',
          200: '#91b3f6',
          300: '#6c9af3',
          400: '#135be6',
          500: '#0e44ad',
          600: '#092e73',
          700: '#061d48',
          800: '#05173a',
          900: '#041330'
        },
        success: {
          DEFAULT: '#62DE85',
          50: '#e0f8e7',
          100: '#c0f2ce',
          200: '#a1ebb6',
          300: '#81e59d',
          400: '#41d76b',
          500: '#2ac656',
          600: '#1c8439',
          700: '#15632b',
          800: '#0e421d',
          900: '#07210e'
        },
        warning: {
          DEFAULT: '#FFA63D',
          50: '#ffedd8',
          100: '#ffdbb1',
          200: '#ffca8b',
          300: '#ffb864',
          400: '#ff9416',
          500: '#ed8000',
          600: '#c66b00',
          700: '#9e5600',
          800: '#4f2b00',
          900: '#271500'
        },
        danger: {
          DEFAULT: '#FF5353',
          50: '#ffdddd',
          100: '#ffbaba',
          200: '#ff9898',
          300: '#ff7575',
          400: '#ff2323',
          500: '#f10000',
          600: '#c10000',
          700: '#910000',
          800: '#610000',
          900: '#300000'
        },
        c1: {
          light: '#FFFFFF',
          DEFAULT: 'rgba(var(--clickhouse-color-1), <alpha-value>)',
          dark: '#2F2C3A'
        },
        c2: {
          light: '#F6F7FA',
          DEFAULT: 'rgba(var(--clickhouse-color-2), <alpha-value>)',
          dark: '#373343'
        },
        c3: '#443F51',
        c4: {
          light: '#6D7386',
          DEFAULT: 'rgba(var(--clickhouse-color-4), <alpha-value>)',
          dark: '#B0B4BC'
        },
        c5: {
          light: '#2F2C3A',
          DEFAULT: 'rgba(var(--clickhouse-color-5), <alpha-value>)',
          dark: '#FFFFFF'
        },
        c6: {
          DEFAULT: '#FFB200',
          text: '#4B2A04',
          link: '#C78F0F'
        },
        c7: {
          light: '#A6770D',
          DEFAULT: 'rgba(var(--clickhouse-color-7), <alpha-value>)',
          dark: '#FFC133'
        },
        gradientTop: '#FFC700',
        gradientBottom: '#FF7A00',
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
        },
      },
      boxShadow: {
        card: '0px 4px 14px rgba(0, 0, 0, 0.13)',
        'card-xl': '0px 4px 14px 4px rgba(0, 0, 0, 0.13)',
        input: '0px 1px 2px rgba(0, 0, 0, 0.05)',
        click: {
          card: '0px 4px 44px rgba(22, 22, 0, 0.4), inset 0px 1px 3px rgba(25, 26, 6, 0.9)',
          pill: '0px -1px 5px rgba(16, 24, 40, 0.07)',
          'twitter-card-active': '0px 4px 48px rgba(250, 255, 72, 0.2)'
        }
      },
      backgroundSize: {
        default_size: '0%, 100%',
        focus_size: '100%, 100%'
      },
      backgroundImage: {
        field_focus:
          'linear-gradient(0deg, #ffb200, #ffb200 2px, transparent 0, transparent)',
        grid: 'url("/bg-grid.png")',
        'home-grid': 'url("/bg-grid.png"), linear-gradient(117.08deg, rgba(0, 0, 0, 0) 14.55%, rgba(22, 22, 0, 0.167461) 34.15%, rgba(47, 47, 47, 0.22751) 40.54%, rgba(22, 22, 0, 0.611327) 46.65%, #161600 95.98%);',
      },
      spacing: {
        '30': '7.5rem'
      }
    }
  }
}
