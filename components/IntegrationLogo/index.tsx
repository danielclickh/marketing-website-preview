import React from 'react'
import { StrapiImageType } from '../../lib/api/strapi/types'
import { StrapiImage } from '../StrapiElements'

export default function IntegrationLogo({
  image,
  alt = '',
  className = ''
}: {
  image: StrapiImageType
  alt?: string
  className?: string
}) {
  const isDatagrip = image.name === 'DataGrip.svg'

  return (
    <>
      {isDatagrip && <DataGripLogo className={className} />}
      {!isDatagrip && (
        <StrapiImage
          {...image}
          sizes='medium'
          alt={alt}
          className={className}
        />
      )}
    </>
  )
}

function DataGripLogo(props: React.SVGProps<any>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='70'
      height='70'
      version='1'
      viewBox='0 0 70 70'
      {...props}>
      <path fill='#9775F8' d='M65.5 10.9L70 39.5l-17 9.9-3.2-16.2z'></path>
      <linearGradient
        id='data-grip-logo-a'
        x1='41.069'
        x2='46.521'
        y1='54.357'
        y2='67.944'
        gradientTransform='matrix(1 0 0 -1 0 72)'
        gradientUnits='userSpaceOnUse'>
        <stop offset='0' stopColor='#9775f8'></stop>
        <stop offset='0.952' stopColor='#22d88f'></stop>
      </linearGradient>
      <path
        fill='url(#data-grip-logo-a)'
        d='M65.5 10.9L40.5 0 19.4 17.5l30.4 15.7z'></path>
      <linearGradient
        id='data-grip-logo-b'
        x1='17.067'
        x2='24.146'
        y1='35.739'
        y2='4.895'
        gradientTransform='matrix(1 0 0 -1 0 72)'
        gradientUnits='userSpaceOnUse'>
        <stop offset='0' stopColor='#9775f8'></stop>
        <stop offset='0.214' stopColor='#689cce'></stop>
        <stop offset='0.423' stopColor='#42bdac'></stop>
        <stop offset='0.59' stopColor='#2bd197'></stop>
        <stop offset='0.694' stopColor='#22d88f'></stop>
      </linearGradient>
      <path
        fill='url(#data-grip-logo-b)'
        d='M47.3 70L18 30.6l-8.7 5.8L.6 62.5z'></path>
      <linearGradient
        id='data-grip-logo-c'
        x1='4.9'
        x2='66.239'
        y1='37.969'
        y2='4.102'
        gradientTransform='matrix(1 0 0 -1 0 72)'
        gradientUnits='userSpaceOnUse'>
        <stop offset='0.075' stopColor='#22d88f'></stop>
        <stop offset='0.72' stopColor='#9775f8'></stop>
      </linearGradient>
      <path
        fill='url(#data-grip-logo-c)'
        d='M52.8 50.1L32.3 36.6 0 32.3 47.3 70z'></path>
      <linearGradient
        id='data-grip-logo-d'
        x1='0'
        x2='61.646'
        y1='45.15'
        y2='45.15'
        gradientTransform='matrix(1 0 0 -1 0 72)'
        gradientUnits='userSpaceOnUse'>
        <stop offset='0.075' stopColor='#22d88f'></stop>
        <stop offset='0.266' stopColor='#5ab0b4'></stop>
        <stop offset='0.565' stopColor='#b86cf2'></stop>
        <stop offset='1' stopColor='#ff59e6'></stop>
      </linearGradient>
      <path
        fill='url(#data-grip-logo-d)'
        d='M0 .5v31.8l60.8 20.9 4.7-42.3z'></path>
      <path d='M13.4 13.4h43.2v43.2H13.4z'></path>
      <path
        fill='#FFF'
        d='M17.8 19h7c5.6 0 9.5 3.9 9.5 8.9v.1c0 5-3.9 8.9-9.5 8.9h-7V19zm3.9 3.6v10.8h3c3.2 0 5.4-2.2 5.4-5.3V28c0-3.2-2.2-5.4-5.4-5.4h-3zM35 28c0-5.1 4-9.3 9.4-9.3 3.2 0 5.2.9 7 2.5l-2.5 3c-1.4-1.2-2.6-1.8-4.7-1.8-2.9 0-5.1 2.5-5.1 5.6 0 3.3 2.2 5.7 5.4 5.7 1.4 0 2.7-.4 3.7-1.1V30h-4v-3.4H52v7.8c-1.8 1.6-4.4 2.8-7.6 2.8-5.6 0-9.4-3.9-9.4-9.2zM17.4 48.5h16.2v2.7H17.4z'></path>
    </svg>
  )
}
