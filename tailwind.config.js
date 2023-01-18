module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: 'var(--font-inter), sans-serif',
      },
      colors: {
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
          text: '#4B2A04'
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
        }
      },
      boxShadow: {
        card: '0px 4px 14px rgba(0, 0, 0, 0.13)',
        'card-xl': '0px 4px 14px 4px rgba(0, 0, 0, 0.13)',
        input: '0px 1px 2px rgba(0, 0, 0, 0.05)',
      },
      backgroundSize: {
        default_size: '0%, 100%',
        focus_size: '100%, 100%'
      },
      backgroundImage: {
        field_focus:
          'linear-gradient(0deg, #ffb200, #ffb200 2px, transparent 0, transparent)',
      },
      spacing: {
        '30': '7.5rem'
      }
    }
  }
}
