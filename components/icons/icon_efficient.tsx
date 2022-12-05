'use client'
import React from 'react'
import { useTheme } from 'next-themes'

export function IconEfficient() {
  const { theme, setTheme } = useTheme()

  return (
    <svg
      width='44'
      height='44'
      viewBox='0 0 44 44'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <g clipPath='url(#clip0_304_298)'>
        <g filter='url(#filter0_dd_304_298)'>
          <path
            d='M21.9642 38.1441C24.1959 38.1441 26.2893 37.7193 28.2446 36.8696C30.1999 36.0302 31.9197 34.8631 33.4041 33.3685C34.8987 31.8842 36.0709 30.1643 36.9205 28.2091C37.7702 26.2538 38.195 24.1603 38.195 21.9286C38.195 19.7072 37.7702 17.6188 36.9205 15.6635C36.0709 13.7082 34.8987 11.9833 33.4041 10.4887C31.9197 8.99407 30.1948 7.82705 28.2293 6.98761C26.274 6.13793 24.1856 5.71309 21.9642 5.71309C19.7427 5.71309 17.6492 6.13793 15.6837 6.98761C13.7284 7.82705 12.0035 8.99407 10.5089 10.4887C9.02452 11.9833 7.85749 13.7082 7.00781 15.6635C6.16837 17.6188 5.74865 19.7072 5.74865 21.9286C5.74865 24.1603 6.16837 26.2538 7.00781 28.2091C7.85749 30.1643 9.02963 31.8842 10.5242 33.3685C12.0189 34.8631 13.7438 36.0302 15.6991 36.8696C17.6544 37.7193 19.7427 38.1441 21.9642 38.1441ZM13.4725 27.5948V15.4793C13.4725 15.1517 13.5851 14.8753 13.8103 14.6501C14.0356 14.4248 14.312 14.3122 14.6395 14.3122C14.9569 14.3122 15.2231 14.4248 15.438 14.6501C15.6633 14.8753 15.7759 15.1517 15.7759 15.4793V21.0073L17.3575 19.3949C17.767 18.9855 18.1918 18.7807 18.632 18.7807C19.1131 18.7807 19.5533 18.9855 19.9526 19.3949L22.3941 21.9593C22.4453 22.0207 22.4914 22.0156 22.5323 21.944L25.1121 19.3028L24.2368 18.4122C23.9809 18.1665 23.9041 17.8901 24.0065 17.583C24.1191 17.2656 24.3545 17.0558 24.7128 16.9534L29.0277 15.8324C29.3553 15.7505 29.642 15.8324 29.8877 16.0781C30.1436 16.3136 30.2255 16.5951 30.1334 16.9227L28.997 21.253C28.9049 21.6113 28.7002 21.8467 28.3828 21.9593C28.0655 22.0617 27.7839 21.9849 27.5383 21.729L26.6169 20.7923L23.7761 23.7252C23.3564 24.1245 22.9162 24.3241 22.4555 24.3241C21.9846 24.3241 21.5445 24.1245 21.135 23.7252L18.7241 21.1608C18.673 21.0994 18.6218 21.0994 18.5706 21.1608L15.7759 24.017V26.6735C15.7759 26.7759 15.8219 26.827 15.9141 26.827H29.1813C29.5089 26.827 29.7802 26.9397 29.9952 27.1649C30.2204 27.3901 30.333 27.6665 30.333 27.9941C30.333 28.3114 30.2204 28.5827 29.9952 28.8079C29.7802 29.0229 29.5089 29.1304 29.1813 29.1304H15.0081C14.5474 29.1304 14.1738 28.9922 13.8871 28.7158C13.6107 28.4291 13.4725 28.0555 13.4725 27.5948Z'
            fill={theme === 'dark' ? '#FFF' : '#2F2C3A'}
          />
        </g>
      </g>
      <defs>
        <filter
          id='filter0_dd_304_298'
          x='-2.32419'
          y='4.36768'
          width='48.592'
          height='48.5765'
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
            result='effect1_dropShadow_304_298'
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
            result='effect1_dropShadow_304_298'
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
            result='effect2_dropShadow_304_298'
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
            in2='effect1_dropShadow_304_298'
            result='effect2_dropShadow_304_298'
          />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect2_dropShadow_304_298'
            result='shape'
          />
        </filter>
        <clipPath id='clip0_304_298'>
          <rect width='44' height='44' fill='white' />
        </clipPath>
      </defs>
    </svg>
  )
}
