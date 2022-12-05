'use client'
import React from 'react'
import { useTheme } from 'next-themes'

export function IconReliable() {
  const { theme, setTheme } = useTheme()

  return (
    <svg
      width='44'
      height='44'
      viewBox='0 0 44 44'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <g clipPath='url(#clip0_304_297)'>
        <g filter='url(#filter0_dd_304_297)'>
          <path
            d='M21.8874 37.6835C22.0512 37.6835 22.2303 37.6527 22.4248 37.5913C22.6296 37.5401 22.8343 37.4634 23.0391 37.361C25.2707 36.2452 27.1492 35.2214 28.6746 34.2899C30.1999 33.3583 31.4232 32.4318 32.3446 31.5105C33.2761 30.5789 33.9467 29.5808 34.3561 28.5162C34.7759 27.4515 34.9857 26.2333 34.9857 24.8615V13.698C34.9857 12.6231 34.7861 11.8144 34.3869 11.2718C33.9978 10.7293 33.3324 10.2635 32.3906 9.87446C32.0938 9.74138 31.6638 9.57247 31.1008 9.36773C30.5377 9.16298 29.9081 8.94289 29.212 8.70743C28.5159 8.46175 27.8249 8.22117 27.139 7.98572C26.4531 7.75027 25.8287 7.54041 25.2656 7.35614C24.7128 7.17187 24.2982 7.03367 24.0218 6.94154C23.6942 6.83917 23.3359 6.75727 22.9469 6.69585C22.5682 6.63443 22.215 6.60372 21.8874 6.60372C21.5598 6.60372 21.2066 6.63443 20.8279 6.69585C20.4593 6.75727 20.1061 6.83917 19.7683 6.94154C19.4919 7.03367 19.0722 7.17187 18.5092 7.35614C17.9564 7.54041 17.3319 7.75027 16.6358 7.98572C15.9499 8.22117 15.2589 8.46175 14.5628 8.70743C13.8769 8.94289 13.2524 9.1681 12.6894 9.38308C12.1263 9.58782 11.6964 9.75162 11.3995 9.87446C10.4577 10.2635 9.78718 10.7293 9.38793 11.2718C8.98869 11.8144 8.78906 12.6231 8.78906 13.698V24.8615C8.78906 26.2333 8.99892 27.4464 9.41864 28.5008C9.8486 29.5552 10.5294 30.538 11.4609 31.4491C12.3925 32.3602 13.621 33.2815 15.1463 34.2131C16.6818 35.1549 18.5501 36.2042 20.7511 37.361C20.9558 37.4634 21.1554 37.5401 21.3499 37.5913C21.5547 37.6527 21.7338 37.6835 21.8874 37.6835Z'
            fill={theme === 'dark' ? '#FFF' : '#2F2C3A'}
          />
        </g>
      </g>
      <defs>
        <filter
          id='filter0_dd_304_297'
          x='0.716335'
          y='5.25831'
          width='42.3422'
          height='47.2252'
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
            result='effect1_dropShadow_304_297'
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
            result='effect1_dropShadow_304_297'
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
            result='effect2_dropShadow_304_297'
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
            in2='effect1_dropShadow_304_297'
            result='effect2_dropShadow_304_297'
          />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect2_dropShadow_304_297'
            result='shape'
          />
        </filter>
        <clipPath id='clip0_304_297'>
          <rect width='44' height='44' fill='white' />
        </clipPath>
      </defs>
    </svg>
  )
}
