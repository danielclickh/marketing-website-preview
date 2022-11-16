import React from 'react'
import { useTheme } from 'next-themes'

export function IconAuto() {
  const { theme, setTheme } = useTheme()

  return (
    <svg
      width='44'
      height='44'
      viewBox='0 0 44 44'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <g clipPath='url(#clip0_337_3679)'>
        <g filter='url(#filter0_dd_337_3679)'>
          <path
            d='M11.3906 38.0161H32.001C33.9492 38.0161 35.4417 37.4977 36.4785 36.4609C37.5153 35.4355 38.0337 33.9544 38.0337 32.0176V11.3389C38.0337 9.40202 37.5153 7.9209 36.4785 6.89551C35.4417 5.85872 33.9492 5.34033 32.001 5.34033H11.3906C9.44238 5.34033 7.94987 5.85872 6.91309 6.89551C5.8763 7.9209 5.35791 9.40202 5.35791 11.3389V32.0176C5.35791 33.9544 5.8763 35.4355 6.91309 36.4609C7.94987 37.4977 9.44238 38.0161 11.3906 38.0161ZM13.0312 25.9507C12.7008 25.6317 12.5356 25.2272 12.5356 24.7373C12.547 24.2474 12.7293 23.8145 13.0825 23.4385L19.6792 16.3633C20.1007 15.9303 20.5622 15.6398 21.0635 15.4917C21.5762 15.3436 22.0832 15.3436 22.5845 15.4917C23.0972 15.6284 23.5643 15.9189 23.9858 16.3633L30.5825 23.4214C30.9357 23.7974 31.1123 24.236 31.1123 24.7373C31.1237 25.2272 30.9642 25.6317 30.6338 25.9507C30.2578 26.3267 29.8192 26.5146 29.3179 26.5146C28.8166 26.5146 28.395 26.3324 28.0532 25.9678L21.8325 19.3198L15.6118 25.9678C15.27 26.3324 14.8485 26.5146 14.3472 26.5146C13.8459 26.5146 13.4072 26.3267 13.0312 25.9507Z'
            fill={theme === 'dark' ? '#FFF' : '#2F2C3A'}
          />
        </g>
      </g>
      <defs>
        <filter
          id='filter0_dd_337_3679'
          x='-2.71482'
          y='3.99488'
          width='48.8212'
          height='48.8212'
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
            result='effect1_dropShadow_337_3679'
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
            result='effect1_dropShadow_337_3679'
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
            result='effect2_dropShadow_337_3679'
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
            in2='effect1_dropShadow_337_3679'
            result='effect2_dropShadow_337_3679'
          />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect2_dropShadow_337_3679'
            result='shape'
          />
        </filter>
        <clipPath id='clip0_337_3679'>
          <rect width='44' height='44' fill='white' />
        </clipPath>
      </defs>
    </svg>
  )
}
