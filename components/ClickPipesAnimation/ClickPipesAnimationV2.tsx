import Image from 'next/image'

type LogoItemProps = {
  src: string
  alt: string
  active?: boolean
  badge?: string
}

interface Props extends React.HTMLProps<HTMLDivElement> {
  logo1: LogoItemProps
  logo2: LogoItemProps
  logo3: LogoItemProps
  logo4: LogoItemProps
}

function LogoItem({ src, alt, active, badge }: LogoItemProps) {
  return (
    <div
      className={`relative rounded-md bg-neutral-900 p-4 ring-1 ring-inset hover:bg-neutral-800 ${
        active ? 'ring-primary-300' : 'ring-[#414141]/80 grayscale'
      }`}>
      {badge && (
        <div className='absolute -right-2 -top-2 rounded-full bg-primary-300 px-3 text-xs font-normal text-neutral-725'>
          {badge}
        </div>
      )}
      <Image
        src={src}
        width={40}
        height={40}
        alt={alt}
        className='h-10 w-10 object-contain'
      />
    </div>
  )
}

export default function ClickPipesAnimationV2({
  logo1,
  logo2,
  logo3,
  logo4,
  ...props
}: Props) {
  return (
    <div {...props}>
      <div className='relative flex items-center'>
        {/* Logos */}
        <ul className='flex flex-shrink-0 flex-grow-0 flex-col gap-4'>
          <li>
            <LogoItem {...logo1} />
          </li>
          <li>
            <LogoItem {...logo2} />
          </li>
          <li>
            <LogoItem {...logo3} />
          </li>
          <li>
            <LogoItem {...logo4} />
          </li>
        </ul>

        {/* Lines */}
        <div className='flex-shrink-0 flex-grow-0'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='284'
            height='269'
            viewBox='0 0 284 269'>
            <g fill='none' fillRule='evenodd' strokeWidth='3'>
              <g stroke='#524D4D'>
                <path d='M0 267.5h199.5c3.313 0 6-2.686 6-6V138c0-3.314 2.686-6 6-6H284' />
                <path d='M0 178.5h199.5c3.313 0 6-2.686 6-6v-35c0-3.314 2.686-6 6-6H284' />
                <path d='M0 89.5h199.5c3.314 0 6 2.686 6 6v30c0 3.314 2.686 6 6 6H284' />
                <path d='M0 1.5h199.5c3.314 0 6 2.6863 6 6v118c0 3.314 2.686 6 6 6H284' />
              </g>
              <g stroke='#FAFF69'>
                {logo4.active && (
                  <path d='M0 267.5h199.5c3.313 0 6-2.686 6-6V138c0-3.314 2.686-6 6-6H284'>
                    <animate
                      dur='4s'
                      attributeName='stroke-dasharray'
                      repeatCount='indefinite'
                      values='0,0,0,0,0,621; 0,0,0,621,311,0; 0,0,221,311,0,0; 0,621,0,621,0,0;'
                    />
                  </path>
                )}
                {logo3.active && (
                  <path d='M0 178.5h199.5c3.313 0 6-2.686 6-6v-35c0-3.314 2.686-6 6-6H284'>
                    <animate
                      dur='3s'
                      attributeName='stroke-dasharray'
                      repeatCount='indefinite'
                      begin='0.5s;op.end+2.5s'
                      values='0,0,0,0,0,621; 0,0,0,311.25,311.25,0; 0,0,155.625,466.875,0,0; 0,311.25,0,311.25,0,0'
                    />
                  </path>
                )}
                {logo2.active && (
                  <path d='M0 89.5h199.5c3.314 0 6 2.686 6 6v30c0 3.314 2.686 6 6 6H284'>
                    <animate
                      dur='2.5s'
                      attributeName='stroke-dasharray'
                      repeatCount='indefinite'
                      begin='0.5s;op.end+2.5s'
                      values='0,0,0,0,0,621; 0,0,0,311.25,311.25,0; 0,0,155.625,466.875,0,0; 0,311.25,0,311.25,0,0'
                    />
                  </path>
                )}
                {logo1.active && (
                  <path d='M0 1.5h199.5c3.314 0 6 2.6863 6 6v118c0 3.314 2.686 6 6 6H284'>
                    <animate
                      dur='3.5s'
                      attributeName='stroke-dasharray'
                      repeatCount='indefinite'
                      values='0,0,0,0,0,621; 0,0,0,621,311,0; 0,0,221,311,0,0; 0,621,0,621,0,0;'
                    />
                  </path>
                )}
              </g>
            </g>
          </svg>
        </div>

        {/* ClickHouse */}
        <div className='flex-shrink-0 flex-grow-0'>
          <div
            className='flex h-[120px] w-[120px] items-center justify-center rounded-md bg-primary-300'
            style={{
              boxShadow: '0px 8px 30px rgba(252, 255, 116, 0.5)'
            }}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='68'
              height='68'
              viewBox='0 0 68 68'>
              <path
                fill='#282804'
                d='M6.61857.079C7.424591.079 8.078.7324091 8.078 1.53843v64.57884c0 .806021-.653409 1.45943-1.45943 1.45943H2.13143c-.806021 0-1.45943-.653409-1.45943-1.45943V1.53843C.672.7324091 1.325409.079 2.13143.079h4.48714Zm14.812 0c.806021 0 1.45943.6534091 1.45943 1.45943v64.57884c0 .806021-.653409 1.45943-1.45943 1.45943h-4.48714c-.806021 0-1.45943-.653409-1.45943-1.45943V1.53843c0-.8060209.653409-1.45943 1.45943-1.45943h4.48714Zm14.814 0c.806021 0 1.45943.6534091 1.45943 1.45943v64.57884c0 .806021-.653409 1.45943-1.45943 1.45943h-4.48714c-.806021 0-1.45943-.653409-1.45943-1.45943V1.53843c0-.8060209.653409-1.45943 1.45943-1.45943h4.48714Zm14.808 0c.806021 0 1.45943.6534091 1.45943 1.45943v64.57884c0 .806021-.653409 1.45943-1.45943 1.45943h-4.48714c-.806021 0-1.45943-.653409-1.45943-1.45943V1.53843c0-.8060209.653409-1.45943 1.45943-1.45943h4.48714Zm14.817 26.251c.806021 0 1.45943.653409 1.45943 1.45943v12.08064c0 .806021-.653409 1.45943-1.45943 1.45943h-4.48714c-.806021 0-1.45943-.653409-1.45943-1.45943V27.78943c0-.806021.653409-1.45943 1.45943-1.45943h4.48714Z'
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
