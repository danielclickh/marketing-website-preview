import React from 'react'
import { useTheme } from 'next-themes'

export function IconRich() {
  const { theme, setTheme } = useTheme()

  return (
    <svg
      width='44'
      height='44'
      viewBox='0 0 44 44'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <g clipPath='url(#clip0_304_296)'>
        <g filter='url(#filter0_dd_304_296)'>
          <path
            d='M19.1681 4.61623C19.87 2.46126 22.9188 2.46126 23.6184 4.61623L26.122 12.3189C26.275 12.788 26.5723 13.1968 26.9716 13.4868C27.3708 13.7767 27.8514 13.9331 28.3449 13.9334H36.4453C38.7126 13.9334 39.6532 16.8348 37.8212 18.1685L31.2696 22.9277C30.8696 23.2179 30.5717 23.6273 30.4187 24.0973C30.2657 24.5672 30.2655 25.0735 30.418 25.5436L32.9216 33.2463C33.6235 35.4013 31.155 37.196 29.3182 35.8623L22.7667 31.1031C22.3671 30.8129 21.8859 30.6567 21.3921 30.6567C20.8982 30.6567 20.4171 30.8129 20.0174 31.1031L13.4659 35.8623C11.6315 37.196 9.16532 35.4013 9.86493 33.2463L12.3685 25.5436C12.521 25.0735 12.5208 24.5672 12.3678 24.0973C12.2148 23.6273 11.9169 23.2179 11.5168 22.9277L4.96768 18.1708C3.13559 16.8371 4.07854 13.9358 6.34349 13.9358H14.4416C14.9354 13.9359 15.4166 13.7798 15.8163 13.4898C16.216 13.1998 16.5137 12.7908 16.6668 12.3213L19.1704 4.61857L19.1681 4.61623Z'
            fill={theme === 'dark' ? '#FFF' : '#2F2C3A'}
          />
        </g>
      </g>
      <defs>
        <filter
          id='filter0_dd_304_296'
          x='-7.80548'
          y='1.03242'
          width='58.4003'
          height='56.9311'
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
            radius='3.93516'
            operator='erode'
            in='SourceAlpha'
            result='effect1_dropShadow_304_296'
          />
          <feOffset dy='5.90274' />
          <feGaussianBlur stdDeviation='1.96758' />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0'
          />
          <feBlend
            mode='normal'
            in2='BackgroundImageFix'
            result='effect1_dropShadow_304_296'
          />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feMorphology
            radius='2.95137'
            operator='erode'
            in='SourceAlpha'
            result='effect2_dropShadow_304_296'
          />
          <feOffset dy='9.8379' />
          <feGaussianBlur stdDeviation='7.37842' />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0'
          />
          <feBlend
            mode='normal'
            in2='effect1_dropShadow_304_296'
            result='effect2_dropShadow_304_296'
          />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect2_dropShadow_304_296'
            result='shape'
          />
        </filter>
        <clipPath id='clip0_304_296'>
          <rect width='44' height='44' fill='white' />
        </clipPath>
      </defs>
    </svg>
  )
}
