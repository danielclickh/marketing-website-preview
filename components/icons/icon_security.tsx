'use client'
import React from 'react'
import { useTheme } from 'next-themes'

export function IconSecurity() {
  const { theme, setTheme } = useTheme()

  return (
    <svg
      width='44'
      height='44'
      viewBox='0 0 44 44'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <g clipPath='url(#clip0_337_3680)'>
        <g filter='url(#filter0_dd_337_3680)'>
          <path
            d='M22.0176 37.4678C22.1738 37.4678 22.3447 37.4385 22.5303 37.3799C22.7256 37.3311 22.9209 37.2578 23.1162 37.1602C25.2451 36.0957 27.0371 35.1191 28.4922 34.2305C29.9473 33.3418 31.1143 32.458 31.9932 31.5791C32.8818 30.6904 33.5215 29.7383 33.9121 28.7227C34.3125 27.707 34.5127 26.5449 34.5127 25.2363V14.5869C34.5127 13.5615 34.3223 12.79 33.9414 12.2725C33.5703 11.7549 32.9355 11.3105 32.0371 10.9395C31.7539 10.8125 31.3438 10.6514 30.8066 10.4561C30.2695 10.2607 29.6689 10.0508 29.0049 9.82617C28.3408 9.5918 27.6816 9.3623 27.0273 9.1377C26.373 8.91309 25.7773 8.71289 25.2402 8.53711C24.7129 8.36133 24.3174 8.22949 24.0537 8.1416C23.7412 8.04395 23.3994 7.96582 23.0283 7.90723C22.667 7.84863 22.3301 7.81934 22.0176 7.81934C21.7051 7.81934 21.3682 7.84863 21.0068 7.90723C20.6553 7.96582 20.3184 8.04395 19.9961 8.1416C19.7324 8.22949 19.332 8.36133 18.7949 8.53711C18.2676 8.71289 17.6719 8.91309 17.0078 9.1377C16.3535 9.3623 15.6943 9.5918 15.0303 9.82617C14.376 10.0508 13.7803 10.2656 13.2432 10.4707C12.7061 10.666 12.2959 10.8223 12.0127 10.9395C11.1143 11.3105 10.4746 11.7549 10.0938 12.2725C9.71289 12.79 9.52246 13.5615 9.52246 14.5869V25.2363C9.52246 26.5449 9.72266 27.7021 10.123 28.708C10.5332 29.7139 11.1826 30.6514 12.0713 31.5205C12.96 32.3896 14.1318 33.2686 15.5869 34.1572C17.0518 35.0557 18.834 36.0566 20.9336 37.1602C21.1289 37.2578 21.3193 37.3311 21.5049 37.3799C21.7002 37.4385 21.8711 37.4678 22.0176 37.4678ZM16.583 27.6826V21.9111C16.583 20.9053 16.9834 20.334 17.7842 20.1973V18.6299C17.7842 17.2041 18.1748 16.0566 18.9561 15.1875C19.7373 14.3184 20.7627 13.8838 22.0322 13.8838C23.3018 13.8838 24.3271 14.3184 25.1084 15.1875C25.8994 16.0566 26.2949 17.2041 26.2949 18.6299V20.2119C27.0859 20.3389 27.4814 20.9053 27.4814 21.9111V27.6826C27.4814 28.8643 26.9297 29.4551 25.8262 29.4551H18.2529C17.1396 29.4551 16.583 28.8643 16.583 27.6826ZM19.9375 20.1387H24.127V18.498C24.127 17.7363 23.9365 17.1309 23.5557 16.6816C23.1748 16.2227 22.6621 15.9932 22.0176 15.9932C21.3926 15.9932 20.8896 16.2227 20.5088 16.6816C20.1279 17.1309 19.9375 17.7363 19.9375 18.498V20.1387Z'
            fill={theme === 'dark' ? '#FFF' : '#2F2C3A'}
          />
        </g>
      </g>
      <defs>
        <filter
          id='filter0_dd_337_3680'
          x='-2.58663'
          y='5.80115'
          width='49.2084'
          height='53.8666'
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
            radius='4.03636'
            operator='erode'
            in='SourceAlpha'
            result='effect1_dropShadow_337_3680'
          />
          <feOffset dy='6.05455' />
          <feGaussianBlur stdDeviation='2.01818' />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0'
          />
          <feBlend
            mode='normal'
            in2='BackgroundImageFix'
            result='effect1_dropShadow_337_3680'
          />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feMorphology
            radius='3.02727'
            operator='erode'
            in='SourceAlpha'
            result='effect2_dropShadow_337_3680'
          />
          <feOffset dy='10.0909' />
          <feGaussianBlur stdDeviation='7.56818' />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0'
          />
          <feBlend
            mode='normal'
            in2='effect1_dropShadow_337_3680'
            result='effect2_dropShadow_337_3680'
          />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect2_dropShadow_337_3680'
            result='shape'
          />
        </filter>
        <clipPath id='clip0_337_3680'>
          <rect width='44' height='44' fill='white' />
        </clipPath>
      </defs>
    </svg>
  )
}
