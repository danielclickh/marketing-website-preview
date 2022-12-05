'use client'
import React from 'react'
import { useTheme } from 'next-themes'

export function IconHeart() {
  const { theme, setTheme } = useTheme()

  return (
    <svg
      width='44'
      height='44'
      viewBox='0 0 44 44'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <g clipPath='url(#clip0_356_3620)'>
        <g filter='url(#filter0_dd_356_3620)'>
          <path
            d='M21.5503 36.8257C21.7585 36.8257 21.9927 36.7633 22.253 36.6383C22.5236 36.5134 22.7787 36.3729 23.0181 36.2167C25.9329 34.3429 28.4574 32.3754 30.5915 30.3142C32.736 28.253 34.3964 26.1293 35.5728 23.9432C36.7491 21.757 37.3373 19.5553 37.3373 17.3379C37.3373 15.9013 37.103 14.5896 36.6346 13.4029C36.1765 12.2057 35.5415 11.1751 34.7295 10.3111C33.9175 9.44702 32.9702 8.78077 31.8876 8.31231C30.8049 7.83345 29.639 7.59401 28.3897 7.59401C26.8386 7.59401 25.4853 7.9896 24.3298 8.78077C23.1847 9.56153 22.2582 10.5921 21.5503 11.8726C20.8632 10.6025 19.9419 9.57194 18.7864 8.78077C17.6308 7.9896 16.2775 7.59401 14.7264 7.59401C13.4772 7.59401 12.3113 7.83345 11.2286 8.31231C10.1564 8.78077 9.20903 9.44702 8.38663 10.3111C7.57464 11.1751 6.93441 12.2057 6.46596 13.4029C6.00791 14.5896 5.77889 15.9013 5.77889 17.3379C5.77889 19.5553 6.36186 21.757 7.52779 23.9432C8.70414 26.1293 10.3646 28.253 12.5091 30.3142C14.664 32.3754 17.1988 34.3429 20.1137 36.2167C20.3427 36.3729 20.5925 36.5134 20.8632 36.6383C21.1339 36.7633 21.3629 36.8257 21.5503 36.8257Z'
            fill={theme === 'dark' ? '#FFF' : '#2F2C3A'}
          />
        </g>
      </g>
      <defs>
        <filter
          id='filter0_dd_356_3620'
          x='-2.29383'
          y='6.24854'
          width='47.7038'
          height='45.3772'
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
            result='effect1_dropShadow_356_3620'
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
            result='effect1_dropShadow_356_3620'
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
            result='effect2_dropShadow_356_3620'
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
            in2='effect1_dropShadow_356_3620'
            result='effect2_dropShadow_356_3620'
          />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect2_dropShadow_356_3620'
            result='shape'
          />
        </filter>
        <clipPath id='clip0_356_3620'>
          <rect width='44' height='44' fill='white' />
        </clipPath>
      </defs>
    </svg>
  )
}
