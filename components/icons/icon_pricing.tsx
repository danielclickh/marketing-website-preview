'use client'
import React from 'react'
import { useTheme } from 'next-themes'

export function IconPricing() {
  const { theme, setTheme } = useTheme()

  return (
    <svg
      width='50'
      height='49'
      viewBox='0 0 50 49'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <g clipPath='url(#clip0_302_286)' filter='url(#filter0_dd_302_286)'>
        <g filter='url(#filter1_dd_302_286)'>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M13 10C11.9391 10 10.9217 10.4214 10.1716 11.1716C9.42143 11.9217 9 12.9391 9 14V22C9 23.0609 9.42143 24.0783 10.1716 24.8284C10.9217 25.5786 11.9391 26 13 26V14H33C33 12.9391 32.5786 11.9217 31.8284 11.1716C31.0783 10.4214 30.0609 10 29 10H13ZM17 22C17 20.9391 17.4214 19.9217 18.1716 19.1716C18.9217 18.4214 19.9391 18 21 18H37C38.0609 18 39.0783 18.4214 39.8284 19.1716C40.5786 19.9217 41 20.9391 41 22V30C41 31.0609 40.5786 32.0783 39.8284 32.8284C39.0783 33.5786 38.0609 34 37 34H21C19.9391 34 18.9217 33.5786 18.1716 32.8284C17.4214 32.0783 17 31.0609 17 30V22ZM29 30C30.0609 30 31.0783 29.5786 31.8284 28.8284C32.5786 28.0783 33 27.0609 33 26C33 24.9391 32.5786 23.9217 31.8284 23.1716C31.0783 22.4214 30.0609 22 29 22C27.9391 22 26.9217 22.4214 26.1716 23.1716C25.4214 23.9217 25 24.9391 25 26C25 27.0609 25.4214 28.0783 26.1716 28.8284C26.9217 29.5786 27.9391 30 29 30Z'
            fill={theme === 'dark' ? '#FFF' : '#2F2C3A'}
          />
        </g>
      </g>
      <defs>
        <filter
          id='filter0_dd_302_286'
          x='-5.07273'
          y='-1.34545'
          width='60.1455'
          height='60.1455'
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
            result='effect1_dropShadow_302_286'
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
            result='effect1_dropShadow_302_286'
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
            result='effect2_dropShadow_302_286'
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
            in2='effect1_dropShadow_302_286'
            result='effect2_dropShadow_302_286'
          />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect2_dropShadow_302_286'
            result='shape'
          />
        </filter>
        <filter
          id='filter1_dd_302_286'
          x='0.927273'
          y='8.65455'
          width='48.1455'
          height='40.1455'
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
            result='effect1_dropShadow_302_286'
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
            result='effect1_dropShadow_302_286'
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
            result='effect2_dropShadow_302_286'
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
            in2='effect1_dropShadow_302_286'
            result='effect2_dropShadow_302_286'
          />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect2_dropShadow_302_286'
            result='shape'
          />
        </filter>
        <clipPath id='clip0_302_286'>
          <rect width='44' height='44' fill='white' transform='translate(3)' />
        </clipPath>
      </defs>
    </svg>
  )
}
