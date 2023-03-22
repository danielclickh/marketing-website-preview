import React from 'react'
import { SuiButton } from '../sui/client'

interface Props {
  type: string
  title: string
}

function SocialButton({ type, title }: Props) {
  const onClick = () => {
    const escapedUrl = encodeURIComponent(window.location.href)
    let shareUrl = ''
    switch (type) {
      case 'y_combinator':
        shareUrl = `https://news.ycombinator.com/submitlink?t=${title}&u=${escapedUrl}`
        break

      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${escapedUrl}`
        break

      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${escapedUrl}`
        break

      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${escapedUrl}`
        break

      default:
        break
    }
    window.open(shareUrl, '_blank')
  }

  return (
    <SuiButton
      type='custom'
      className='border border-c2 hover:bg-c2 hover:text-neutral-800 shadow'
      onClick={onClick}>
      {type === 'y_combinator' && (
        <svg
          width='20'
          height='20'
          viewBox='0 0 20 20'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <g clipPath='url(#clip0_2004_30310)'>
            <path
              d='M8.69336 17V11.5771L3.97363 4.11523H7.02344L10.0557 9.21289L13.0264 4.11523H16.0234L11.2861 11.5947V17H8.69336Z'
              fill='currentColor'
            />
          </g>
          <defs>
            <clipPath id='clip0_2004_30310'>
              <rect width='20' height='20' fill='white' />
            </clipPath>
          </defs>
        </svg>
      )}
      {type === 'twitter' && (
        <svg
          fill='none'
          height='18'
          viewBox='0 0 20 18'
          width='20'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M6.2918 17.1246C13.8371 17.1246 17.9652 10.8719 17.9652 5.45118C17.9652 5.2754 17.9613 5.09572 17.9535 4.91993C18.7566 4.33918 19.4496 3.61985 20 2.79572C19.2521 3.12847 18.458 3.34579 17.6449 3.44025C18.5011 2.92706 19.1421 2.12086 19.4492 1.17111C18.6438 1.64843 17.763 1.98514 16.8445 2.16681C16.2257 1.50927 15.4075 1.0739 14.5164 0.92801C13.6253 0.782122 12.711 0.933842 11.9148 1.35971C11.1186 1.78559 10.4848 2.46189 10.1115 3.28406C9.73825 4.10623 9.64619 5.02848 9.84961 5.90822C8.21874 5.82638 6.62328 5.40272 5.16665 4.66472C3.71002 3.92671 2.42474 2.89083 1.39414 1.62423C0.870333 2.52734 0.710047 3.596 0.945859 4.61304C1.18167 5.63008 1.79589 6.51917 2.66367 7.09962C2.01219 7.07894 1.37498 6.90353 0.804688 6.5879V6.63868C0.804104 7.58643 1.13175 8.50512 1.73192 9.23861C2.3321 9.97209 3.16777 10.4751 4.09687 10.6621C3.49338 10.8272 2.85999 10.8513 2.2457 10.7324C2.50788 11.5475 3.01798 12.2604 3.70481 12.7716C4.39164 13.2828 5.22093 13.5668 6.07695 13.584C4.62369 14.7256 2.82848 15.3447 0.980469 15.3418C0.652739 15.3413 0.325333 15.3212 0 15.2817C1.87738 16.4861 4.06128 17.1258 6.2918 17.1246Z'
            fill='currentColor'
          />
        </svg>
      )}
      {type === 'facebook' && (
        <svg
          fill='none'
          height='20'
          viewBox='0 0 20 20'
          width='20'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M20 10C20 4.47715 15.5229 0 10 0C4.47715 0 0 4.47715 0 10C0 14.9912 3.65684 19.1283 8.4375 19.8785V12.8906H5.89844V10H8.4375V7.79688C8.4375 5.29063 9.93047 3.90625 12.2146 3.90625C13.3084 3.90625 14.4531 4.10156 14.4531 4.10156V6.5625H13.1922C11.95 6.5625 11.5625 7.3334 11.5625 8.125V10H14.3359L13.8926 12.8906H11.5625V19.8785C16.3432 19.1283 20 14.9912 20 10Z'
            fill='currentColor'
          />
        </svg>
      )}
      {type === 'linkedin' && (
        <svg
          fill='none'
          height='20'
          viewBox='0 0 20 20'
          width='20'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M18.5195 0H1.47656C0.660156 0 0 0.644531 0 1.44141V18.5547C0 19.3516 0.660156 20 1.47656 20H18.5195C19.3359 20 20 19.3516 20 18.5586V1.44141C20 0.644531 19.3359 0 18.5195 0ZM5.93359 17.043H2.96484V7.49609H5.93359V17.043ZM4.44922 6.19531C3.49609 6.19531 2.72656 5.42578 2.72656 4.47656C2.72656 3.52734 3.49609 2.75781 4.44922 2.75781C5.39844 2.75781 6.16797 3.52734 6.16797 4.47656C6.16797 5.42188 5.39844 6.19531 4.44922 6.19531ZM17.043 17.043H14.0781V12.4023C14.0781 11.2969 14.0586 9.87109 12.5352 9.87109C10.9922 9.87109 10.7578 11.0781 10.7578 12.3242V17.043H7.79688V7.49609H10.6406V8.80078H10.6797C11.0742 8.05078 12.043 7.25781 13.4844 7.25781C16.4883 7.25781 17.043 9.23438 17.043 11.8047V17.043Z'
            fill='currentColor'
          />
        </svg>
      )}
    </SuiButton>
  )
}

export default SocialButton
