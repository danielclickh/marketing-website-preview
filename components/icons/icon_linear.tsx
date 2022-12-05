'use client'
import React from 'react'
import { useTheme } from 'next-themes'

export function IconLinear() {
  const { theme, setTheme } = useTheme()

  return (
    <svg
      width='44'
      height='44'
      viewBox='0 0 44 44'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <g clipPath='url(#clip0_304_294)'>
        <g filter='url(#filter0_dd_304_294)'>
          <path
            d='M4.14349 22.2139L9.07264 26.4981C9.55378 26.9076 10.0247 27.1021 10.4854 27.0817C10.946 27.0509 11.3248 26.8667 11.6217 26.5289C11.9288 26.1808 12.0823 25.7406 12.0823 25.2083V22.7514H19.668V30.3524H17.165C16.6429 30.3524 16.213 30.5008 15.8752 30.7977C15.5373 31.0946 15.3531 31.4682 15.3224 31.9187C15.2917 32.3793 15.4759 32.84 15.8752 33.3007L20.1594 38.2298C20.5893 38.7519 21.1114 39.0181 21.7257 39.0283C22.3399 39.0488 22.8722 38.7929 23.3226 38.2605L27.5915 33.3467C28.001 32.8656 28.1955 32.3947 28.175 31.934C28.1545 31.4734 27.9703 31.0946 27.6222 30.7977C27.2844 30.5008 26.8493 30.3524 26.317 30.3524H23.8601V22.7514H31.4304V25.2083C31.4304 25.7406 31.5788 26.1808 31.8757 26.5289C32.1726 26.8667 32.5514 27.0509 33.012 27.0817C33.4727 27.1021 33.9436 26.9076 34.4247 26.4981L39.3539 22.2139C39.876 21.7737 40.1268 21.2465 40.1063 20.6323C40.0961 20.0078 39.835 19.4806 39.3232 19.0507L34.394 14.7665C33.9231 14.3774 33.4573 14.1983 32.9967 14.229C32.5462 14.2597 32.1726 14.444 31.8757 14.7818C31.5788 15.1196 31.4304 15.5496 31.4304 16.0717V18.5593H23.8601V10.9583H26.317C26.8493 10.9583 27.2844 10.8098 27.6222 10.513C27.9703 10.2058 28.1545 9.82195 28.175 9.36129C28.1955 8.90062 28.001 8.42971 27.5915 7.94857L23.3073 3.03478C22.8568 2.49221 22.3245 2.23629 21.7103 2.267C21.0961 2.29771 20.574 2.56899 20.144 3.08084L15.8752 7.99464C15.4759 8.4553 15.2917 8.91597 15.3224 9.37664C15.3531 9.82707 15.5373 10.2058 15.8752 10.513C16.213 10.8098 16.6429 10.9583 17.165 10.9583H19.668V18.5593H12.0823V16.0717C12.0823 15.5496 11.9288 15.1196 11.6217 14.7818C11.3248 14.444 10.946 14.2597 10.4854 14.229C10.0349 14.1983 9.57937 14.3774 9.1187 14.7665L4.18955 19.0507C3.68794 19.4704 3.42177 19.9925 3.39106 20.6169C3.36035 21.2312 3.61116 21.7635 4.14349 22.2139Z'
            fill={theme === 'dark' ? '#FFF' : '#2F2C3A'}
          />
        </g>
      </g>
      <defs>
        <filter
          id='filter0_dd_304_294'
          x='-4.72776'
          y='0.875493'
          width='52.9374'
          height='52.9836'
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
            result='effect1_dropShadow_304_294'
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
            result='effect1_dropShadow_304_294'
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
            result='effect2_dropShadow_304_294'
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
            in2='effect1_dropShadow_304_294'
            result='effect2_dropShadow_304_294'
          />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect2_dropShadow_304_294'
            result='shape'
          />
        </filter>
        <clipPath id='clip0_304_294'>
          <rect width='44' height='44' fill='white' />
        </clipPath>
      </defs>
    </svg>
  )
}
