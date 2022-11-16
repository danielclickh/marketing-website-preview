import React from 'react'
import { useTheme } from 'next-themes'

export function IconGraduation() {
  const { theme, setTheme } = useTheme()

  return (
    <svg
      width='192'
      height='95'
      viewBox='0 0 192 95'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <g clipPath='url(#clip0_771_27627)'>
        <g filter='url(#filter0_dd_771_27627)'>
          <path
            d='M96 59.4736C94.0029 59.4736 92.16 59.1661 90.1629 58.7054L53.6061 49.0283V75.2945C53.6061 77.1373 54.6819 78.9811 56.3704 79.7483C61.5925 82.2062 74.4946 87.275 95.9992 87.275C117.503 87.275 130.406 82.3592 135.628 79.7483C137.318 78.8269 138.392 77.1373 138.392 75.2945L138.393 49.0294L101.837 58.7065C99.8405 59.1672 97.9976 59.4736 96.0005 59.4736L96 59.4736Z'
            fill={theme === 'dark' ? '#FFF' : '#2F2C3A'}
          />
          <path
            d='M166.963 26.7568L99.3792 8.78558C97.0756 8.17165 94.7709 8.17165 92.4675 8.78558L24.8835 26.7568C22.2724 27.3707 22.2724 31.0576 24.8835 31.8256L92.4675 49.7968C94.771 50.4107 97.0757 50.4107 99.3792 49.7968L150.528 36.2797V54.8659C147.764 55.9416 145.612 58.5525 145.612 61.7776C145.612 65.9251 148.991 69.1501 152.985 69.1501C157.132 69.1501 160.357 65.7709 160.357 61.7776C160.357 58.5514 158.36 55.9405 155.442 54.8659V34.8976L166.808 31.8259C169.574 31.0576 169.574 27.3709 166.963 26.7571L166.963 26.7568Z'
            fill={theme === 'dark' ? '#FFF' : '#2F2C3A'}
          />
        </g>
      </g>
      <defs>
        <filter
          id='filter0_dd_771_27627'
          x='14.8524'
          y='6.97968'
          width='162.122'
          height='95.0953'
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
            result='effect1_dropShadow_771_27627'
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
            result='effect1_dropShadow_771_27627'
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
            result='effect2_dropShadow_771_27627'
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
            in2='effect1_dropShadow_771_27627'
            result='effect2_dropShadow_771_27627'
          />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect2_dropShadow_771_27627'
            result='shape'
          />
        </filter>
        <clipPath id='clip0_771_27627'>
          <rect width='192' height='95' fill='white' />
        </clipPath>
      </defs>
    </svg>
  )
}
