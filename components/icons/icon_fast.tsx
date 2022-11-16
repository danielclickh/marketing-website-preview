import React from 'react'
import { useTheme } from 'next-themes'

export function IconFast() {
  const { theme, setTheme } = useTheme()

  return (
    <svg
      width='44'
      height='44'
      viewBox='0 0 44 44'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <g clipPath='url(#clip0_302_293)'>
        <g filter='url(#filter0_dd_302_293)'>
          <path
            d='M33.0419 21.4158C33.2659 20.9914 33.2511 20.2935 33.0024 19.8827C32.7538 19.4709 32.3058 19.033 31.8257 19.033H24.9197L28.7 4.90659C28.8076 4.4958 28.7197 3.96313 28.4588 3.62769C28.1989 3.29226 27.7967 3 27.371 3H17.8377C17.2128 3 16.6671 3.60674 16.5087 4.2086L11.0457 24.9954C10.9368 25.4072 11.0247 25.7033 11.2859 26.0413C11.5458 26.3754 11.948 26.4334 12.3747 26.4334H22.1363V39.0674C22.1363 39.4966 22.2255 39.8703 22.6436 39.9728C23.0619 40.0753 23.3936 39.8816 23.594 39.5017L33.0419 21.4158Z'
            fill={theme === 'dark' ? '#FFF' : '#2F2C3A'}
          />
        </g>
      </g>
      <defs>
        <filter
          id='filter0_dd_302_293'
          x='2.92727'
          y='1.65455'
          width='38.3454'
          height='53.1455'
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
            result='effect1_dropShadow_302_293'
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
            result='effect1_dropShadow_302_293'
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
            result='effect2_dropShadow_302_293'
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
            in2='effect1_dropShadow_302_293'
            result='effect2_dropShadow_302_293'
          />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect2_dropShadow_302_293'
            result='shape'
          />
        </filter>
        <clipPath id='clip0_302_293'>
          <rect width='44' height='44' fill='white' />
        </clipPath>
      </defs>
    </svg>
  )
}
