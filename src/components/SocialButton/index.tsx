import { ButtonProps } from '../sui/SuiButton'
import { SuiButton } from '../sui/client'

type Socials = 'bluesky' | 'linkedin' | 'twitter' | 'facebook' | 'y_combinator'

interface SocialButtonProps {
  type: Socials
  title?: string
  url?: string
  className?: ButtonProps['className']
}

const socialConfig: Record<
  Socials,
  {
    url(url: string, title?: string): string
    icon: React.ReactNode
  }
> = {
  bluesky: {
    url: (url, title = '') => {
      return `https://bsky.app/intent/compose?text=${title ? `${title} ` : ''}${url}`
    },
    icon: (
      <svg
        width='20'
        height='20'
        viewBox='0 0 20 20'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M4.58126 3.13368C6.77426 4.78006 9.1331 8.11825 9.99915 9.90967C10.8653 8.11836 13.224 4.78003 15.4171 3.13368C16.9994 1.94572 19.5633 1.02654 19.5633 3.95141C19.5633 4.53555 19.2284 8.85846 19.0319 9.56025C18.3492 12.0003 15.8612 12.6226 13.648 12.2459C17.5165 12.9043 18.5006 15.0852 16.3753 17.2661C12.3389 21.408 10.5739 16.2269 10.1214 14.8993C10.0385 14.6559 9.99968 14.542 9.9991 14.6388C9.99852 14.542 9.95973 14.6559 9.87684 14.8993C9.42452 16.2269 7.65952 21.4081 3.62289 17.2661C1.49754 15.0852 2.48162 12.9042 6.35021 12.2459C4.13701 12.6226 1.64895 12.0003 0.966271 9.56025C0.769839 8.85841 0.434937 4.53548 0.434937 3.95141C0.434937 1.02654 2.99896 1.94572 4.58126 3.13368Z'
          fill='currentColor'
        />
      </svg>
    )
  },
  linkedin: {
    url: (url, title) => {
      return `https://www.linkedin.com/sharing/share-offsite/?url=${url}${title ? `&text=${title}` : ''}`
    },
    icon: (
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
    )
  },
  twitter: {
    url: (url, title) => {
      return `https://twitter.com/intent/tweet?text=${title ? `${title} ` : ''}${url}`
    },
    icon: (
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
    )
  },
  facebook: {
    url: (url) => `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    icon: (
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
    )
  },
  y_combinator: {
    url: (url, title) =>
      `https://news.ycombinator.com/submitlink?u=${url}&t=${title}`,
    icon: (
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
    )
  }
}

function SocialButton({ type, title, url, className = '' }: SocialButtonProps) {
  const config = socialConfig[type]

  const onClick = () => {
    const escapedUrl = encodeURIComponent(url || window.location.href)
    const escapedTitle = title ? encodeURIComponent(title) : undefined
    window.open(config.url(escapedUrl, escapedTitle), '_blank')
  }

  return (
    <SuiButton
      type='custom'
      className={`border border-neutral-700 bg-neutral-800 shadow hover:bg-primary-300 hover:text-neutral-800 ${className}`}
      onClick={onClick}>
      {config.icon}
    </SuiButton>
  )
}

export default SocialButton
