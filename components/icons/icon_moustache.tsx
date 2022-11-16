import React from 'react'
import { useTheme } from 'next-themes'

export function IconMoustache() {
  const { theme, setTheme } = useTheme()

  return (
    <svg
      width='178'
      height='63'
      viewBox='0 0 178 63'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <g filter='url(#filter0_dd_299_4244)'>
        <path
          d='M162.507 0.0686035C167.11 8.6984 161.548 21.1652 151.575 23.6573C144.862 25.767 137 23.0821 130.862 19.0542C124.725 15.41 119.548 10.4244 112.835 7.16416C99.9853 1.02648 92.1223 5.0545 92.1223 5.0545C92.1223 5.0545 90.5879 5.62974 89.0535 6.58891C87.5191 5.62974 85.9847 5.0545 85.9847 5.0545C85.9847 5.0545 78.3141 1.02642 65.2724 7.16416C59.1347 10.8083 53.3823 15.41 47.2446 19.0542C41.1069 22.6984 33.8203 25.1919 26.5323 23.6573C16.5621 21.1651 11.385 8.6984 15.6028 0.0686035C8.88981 5.62956 6.78022 15.4114 9.46515 24.2326C11.9587 32.4785 18.2878 39.5755 25.9583 43.7946C33.6289 47.8227 42.4515 49.9323 51.2741 49.9323C61.0545 50.5075 71.4114 49.3571 80.2326 44.7539C83.3014 43.2195 85.9864 41.1097 88.4785 38.6162C90.9721 41.1098 93.6569 43.2193 96.7244 44.7539C105.547 49.357 115.902 50.3148 125.683 49.9323C134.506 49.3571 143.327 47.8226 150.999 43.7946C158.669 39.7666 164.998 32.4799 167.492 24.2326C171.33 15.4114 169.22 5.63127 162.507 0.0686035H162.507Z'
          fill={theme === 'dark' ? '#FFF' : '#2F2C3A'}
        />
      </g>
      <defs>
        <filter
          id='filter0_dd_299_4244'
          x='0.260525'
          y='-1.27685'
          width='177.209'
          height='66.1458'
          filterUnits='userSpaceOnUse'
          colorInterpolation-filters='sRGB'>
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feMorphology
            radius='2.69091'
            operator='erode'
            in='SourceAlpha'
            result='effect1_dropShadow_299_4244'
          />
          <feOffset dy='4.03636' />
          <feGaussianBlur stdDeviation='1.34545' />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0'
          />
          <feBlend
            mode='normal'
            in2='BackgroundImageFix'
            result='effect1_dropShadow_299_4244'
          />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feMorphology
            radius='2.01818'
            operator='erode'
            in='SourceAlpha'
            result='effect2_dropShadow_299_4244'
          />
          <feOffset dy='6.72727' />
          <feGaussianBlur stdDeviation='5.04545' />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0'
          />
          <feBlend
            mode='normal'
            in2='effect1_dropShadow_299_4244'
            result='effect2_dropShadow_299_4244'
          />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect2_dropShadow_299_4244'
            result='shape'
          />
        </filter>
      </defs>
    </svg>
  )
}
