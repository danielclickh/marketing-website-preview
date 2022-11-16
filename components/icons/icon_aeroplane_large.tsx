import React from 'react'
import { useTheme } from 'next-themes'

export function IconAeroplaneLarge() {
  const { theme, setTheme } = useTheme()

  return (
    <svg
      width='212'
      height='212'
      viewBox='0 0 212 212'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <g filter='url(#filter0_dd_422_21415)'>
        <g filter='url(#filter1_dd_422_21415)'>
          <path
            d='M189.493 31.1444C189.493 38.006 183.617 47.3125 171.866 59.064L143.473 87.4569L160.39 175.711L160.508 176.421C160.508 177.525 160.153 178.432 159.444 179.142L151.872 186.714C151.162 187.423 150.255 187.778 149.151 187.778C147.495 187.778 146.351 187.068 145.72 185.649L113.305 117.624L84.3209 146.609C89.684 165.38 92.3655 175.317 92.3655 176.421C92.3655 177.525 92.0106 178.432 91.3008 179.142L83.7294 186.714C83.0195 187.423 82.1125 187.778 81.0084 187.778C79.5887 187.778 78.4846 187.147 77.6959 185.885L59.3588 152.76L26.2338 134.423C24.893 133.714 24.2227 132.609 24.2227 131.111C24.2227 130.007 24.5776 129.1 25.2874 128.39L32.8588 120.7C33.5686 119.99 34.4756 119.635 35.5798 119.635C36.684 119.635 46.6215 122.317 65.3923 127.68L94.3767 98.6957L26.3521 66.2805C24.9325 65.6496 24.2227 64.506 24.2227 62.8497C24.2227 61.7456 24.5776 60.8386 25.2874 60.1287L32.8588 52.5573C33.5686 51.8475 34.4756 51.4926 35.5798 51.4926C35.8953 51.4926 36.1319 51.532 36.2896 51.6109L124.544 68.5283L152.937 40.1354C164.688 28.384 173.995 22.5082 180.857 22.5082C183.38 22.5082 185.451 23.3166 187.068 24.9334C188.684 26.5502 189.493 28.6206 189.493 31.1444Z'
            fill={theme === 'dark' ? '#FFF' : '#443F51'}
          />
        </g>
      </g>
      <defs>
        <filter
          id='filter0_dd_422_21415'
          x='-12'
          y='-1.99902'
          width='236'
          height='236'
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
            radius='4'
            operator='erode'
            in='SourceAlpha'
            result='effect1_dropShadow_422_21415'
          />
          <feOffset dy='6' />
          <feGaussianBlur stdDeviation='2' />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0'
          />
          <feBlend
            mode='normal'
            in2='BackgroundImageFix'
            result='effect1_dropShadow_422_21415'
          />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feMorphology
            radius='3'
            operator='erode'
            in='SourceAlpha'
            result='effect2_dropShadow_422_21415'
          />
          <feOffset dy='10' />
          <feGaussianBlur stdDeviation='7.5' />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0'
          />
          <feBlend
            mode='normal'
            in2='effect1_dropShadow_422_21415'
            result='effect2_dropShadow_422_21415'
          />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect2_dropShadow_422_21415'
            result='shape'
          />
        </filter>
        <filter
          id='filter1_dd_422_21415'
          x='12.2227'
          y='20.5083'
          width='189.27'
          height='189.27'
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
            radius='4'
            operator='erode'
            in='SourceAlpha'
            result='effect1_dropShadow_422_21415'
          />
          <feOffset dy='6' />
          <feGaussianBlur stdDeviation='2' />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0'
          />
          <feBlend
            mode='normal'
            in2='BackgroundImageFix'
            result='effect1_dropShadow_422_21415'
          />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feMorphology
            radius='3'
            operator='erode'
            in='SourceAlpha'
            result='effect2_dropShadow_422_21415'
          />
          <feOffset dy='10' />
          <feGaussianBlur stdDeviation='7.5' />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0'
          />
          <feBlend
            mode='normal'
            in2='effect1_dropShadow_422_21415'
            result='effect2_dropShadow_422_21415'
          />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect2_dropShadow_422_21415'
            result='shape'
          />
        </filter>
      </defs>
    </svg>
  )
}
