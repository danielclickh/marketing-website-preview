interface DiagramProps {
  className?: string
  sectionId?: number
}

const SvgSection3: React.FC<DiagramProps> = ({ className }) => {
  return (
    <div className='relative mx-auto flex items-center justify-center'>
      <svg
        className={`${className}`}
        width='418'
        height='108'
        viewBox='0 0 418 108'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'>
        <g clipPath='url(#clip0_802_6790)'>
          <g filter='url(#filter0_d_802_6790)'>
            <rect
              x='31'
              y='40'
              width='356'
              height='40'
              rx='4'
              fill='#4D4D4D'
              shapeRendering='crispEdges'
            />
            <path
              d='M207.953 54.625L207.969 62.2422C207.964 62.8255 207.87 63.3594 207.688 63.8438C207.505 64.3229 207.25 64.7344 206.922 65.0781C206.594 65.4219 206.195 65.6875 205.727 65.875C205.263 66.0625 204.742 66.1562 204.164 66.1562C203.602 66.1562 203.091 66.0625 202.633 65.875C202.174 65.6875 201.781 65.4245 201.453 65.0859C201.125 64.7422 200.87 64.3307 200.688 63.8516C200.505 63.3672 200.411 62.8307 200.406 62.2422L200.422 54.625H202.266L202.281 62.2422C202.286 62.5911 202.331 62.9115 202.414 63.2031C202.497 63.4948 202.617 63.7474 202.773 63.9609C202.93 64.1693 203.122 64.3333 203.352 64.4531C203.586 64.5677 203.857 64.625 204.164 64.625C204.477 64.625 204.753 64.5677 204.992 64.4531C205.232 64.3333 205.432 64.1693 205.594 63.9609C205.755 63.7474 205.878 63.4948 205.961 63.2031C206.044 62.9115 206.089 62.5911 206.094 62.2422L206.109 54.625H207.953ZM210.414 54.625H217.18V56.1797H214.719V64.4531H217.18V66H210.414V64.4531H212.82V56.1797H210.414V54.625Z'
              fill='white'
            />
            <rect
              x='31.5'
              y='40.5'
              width='355'
              height='39'
              rx='3.5'
              stroke='url(#paint0_linear_802_6790)'
              strokeOpacity='0.5'
              shapeRendering='crispEdges'
            />
          </g>
          <path
            d='M209.219 16.91L207.719 16.9164L207.719 16.9165L209.219 16.91ZM209.287 32.4105L217.882 17.3729L200.561 17.4485L209.287 32.4105ZM207.646 0.00645997L207.719 16.9164L210.719 16.9035L210.646 -0.00645997L207.646 0.00645997ZM207.719 16.9165L207.728 18.9172L210.728 18.9041L210.719 16.9034L207.719 16.9165Z'
            fill='#8B8B8B'
          />
        </g>
        <defs>
          <filter
            id='filter0_d_802_6790'
            x='7'
            y='16'
            width='404'
            height='88'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'>
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
              result='hardAlpha'
            />
            <feOffset />
            <feGaussianBlur stdDeviation='12' />
            <feComposite in2='hardAlpha' operator='out' />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.75 0'
            />
            <feBlend
              mode='normal'
              in2='BackgroundImageFix'
              result='effect1_dropShadow_802_6790'
            />
            <feBlend
              mode='normal'
              in='SourceGraphic'
              in2='effect1_dropShadow_802_6790'
              result='shape'
            />
          </filter>
          <linearGradient
            id='paint0_linear_802_6790'
            x1='209'
            y1='40'
            x2='209'
            y2='80'
            gradientUnits='userSpaceOnUse'>
            <stop stopColor='white' />
            <stop offset='1' stopColor='white' stopOpacity='0' />
          </linearGradient>
          <clipPath id='clip0_802_6790'>
            <rect width='418' height='108' fill='white' />
          </clipPath>
        </defs>
      </svg>
    </div>
  )
}
export default SvgSection3
