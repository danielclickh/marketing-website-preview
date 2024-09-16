import React from 'react'
import { SuiButton } from '../sui/client'
import { ButtonProps } from '../sui/SuiButton'

interface Props {
  type: string
  title: string
  className?: ButtonProps['className']
  url?: string
}

function SocialButtonWithText({ type, title, className = '', url }: Props) {
  const onClick = () => {
    let escapedUrl
    if (url) {
      escapedUrl = encodeURIComponent(url)
    } else {
      escapedUrl = encodeURIComponent(window.location.href)
    }

    let shareUrl = ''
    switch (type) {
      case 'y_combinator':
        shareUrl = `https://news.ycombinator.com/submitlink?t=${title}&u=${escapedUrl}`
        break

      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${escapedUrl}`
        break

      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${title}%0A%0AThanks%20@ClickHouseDB%0A%0A${escapedUrl}`
        break

      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${escapedUrl}&text=${title}`
        break

      default:
        break
    }
    window.open(shareUrl, '_blank')
  }

  return (
    <SuiButton
      type='custom'
      className={`border border-neutral-700 bg-neutral-800 shadow hover:bg-primary-300 hover:text-neutral-800 ${className}`}
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
          width='20'
          height='20'
          viewBox='0 0 512 512'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            fill='currentColor'
            d='M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8l164.9-188.5L26.8 48h145.6l100.5 132.9L389.2 48zm-24.8 373.8h39.1L151.1 88h-42l255.3 333.8z'
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

export default SocialButtonWithText
