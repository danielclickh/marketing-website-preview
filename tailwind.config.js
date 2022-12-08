/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
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
    },
  },
  plugins: [],
}
