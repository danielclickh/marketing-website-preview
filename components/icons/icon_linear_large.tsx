'use client'
import React from 'react'
import { useTheme } from 'next-themes'

export function IconLinearLarge() {
  const { theme, setTheme } = useTheme()

  return (
    <svg
      width='250'
      height='250'
      viewBox='0 0 250 250'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <g clipPath='url(#clip0_360_3621)'>
        <g filter='url(#filter0_dd_360_3621)'>
          <path
            d='M26.2439 125.616L54.3553 150.05C57.0992 152.385 59.7849 153.494 62.4121 153.377C65.0393 153.202 67.1995 152.151 68.8926 150.225C70.6441 148.24 71.5198 145.729 71.5198 142.693V128.681H114.782V172.031H100.507C97.5294 172.031 95.0773 172.877 93.1507 174.57C91.2241 176.263 90.1732 178.394 89.998 180.963C89.8229 183.591 90.8738 186.218 93.1507 188.845L117.584 216.956C120.036 219.934 123.014 221.452 126.517 221.51C130.019 221.627 133.055 220.167 135.624 217.132L159.97 189.108C162.305 186.364 163.415 183.678 163.298 181.051C163.181 178.424 162.13 176.263 160.145 174.57C158.218 172.877 155.737 172.031 152.701 172.031H138.689V128.681H181.864V142.693C181.864 145.729 182.71 148.24 184.403 150.225C186.096 152.151 188.256 153.202 190.884 153.377C193.511 153.494 196.197 152.385 198.94 150.05L227.052 125.616C230.029 123.106 231.46 120.099 231.343 116.596C231.285 113.035 229.796 110.028 226.877 107.576L198.765 83.1428C196.08 80.9242 193.423 79.9025 190.796 80.0777C188.227 80.2528 186.096 81.3037 184.403 83.2303C182.71 85.157 181.864 87.6091 181.864 90.5866V104.774H138.689V61.4243H152.701C155.737 61.4243 158.218 60.5778 160.145 58.8847C162.13 57.1332 163.181 54.9438 163.298 52.3166C163.415 49.6894 162.305 47.0038 159.97 44.2598L135.537 16.236C132.968 13.1417 129.932 11.6821 126.429 11.8573C122.926 12.0324 119.948 13.5795 117.496 16.4987L93.1507 44.5225C90.8738 47.1497 89.8229 49.7769 89.998 52.4042C90.1732 54.973 91.2241 57.1332 93.1507 58.8847C95.0773 60.5778 97.5294 61.4243 100.507 61.4243H114.782V104.774H71.5198V90.5866C71.5198 87.6091 70.6441 85.157 68.8926 83.2303C67.1995 81.3037 65.0393 80.2528 62.4121 80.0777C59.8432 79.9025 57.2452 80.9242 54.618 83.1428L26.5066 107.576C23.6458 109.97 22.1279 112.947 21.9527 116.509C21.7776 120.012 23.208 123.047 26.2439 125.616Z'
            fill={theme === 'dark' ? '#FFF' : '#443F51'}
          />
        </g>
      </g>
      <defs>
        <filter
          id='filter0_dd_360_3621'
          x='-24.3495'
          y='3.9213'
          width='301.907'
          height='302.17'
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
            radius='15.3465'
            operator='erode'
            in='SourceAlpha'
            result='effect1_dropShadow_360_3621'
          />
          <feOffset dy='23.0197' />
          <feGaussianBlur stdDeviation='7.67325' />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0'
          />
          <feBlend
            mode='normal'
            in2='BackgroundImageFix'
            result='effect1_dropShadow_360_3621'
          />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feMorphology
            radius='11.5099'
            operator='erode'
            in='SourceAlpha'
            result='effect2_dropShadow_360_3621'
          />
          <feOffset dy='38.3662' />
          <feGaussianBlur stdDeviation='28.7747' />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0'
          />
          <feBlend
            mode='normal'
            in2='effect1_dropShadow_360_3621'
            result='effect2_dropShadow_360_3621'
          />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect2_dropShadow_360_3621'
            result='shape'
          />
        </filter>
        <clipPath id='clip0_360_3621'>
          <rect width='250' height='250' fill='white' />
        </clipPath>
      </defs>
    </svg>
  )
}
