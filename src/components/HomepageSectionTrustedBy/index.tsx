import LogoCarousel from '../LogoCarousel'
import { HomepageCustomerStories } from '@/types/homepage'
import { ChevronRightIcon } from '@heroicons/react/solid'
import Link from 'next/link'

interface Props extends React.HTMLProps<HTMLDivElement> {
  customerStories: HomepageCustomerStories
  invertLogos?: boolean
}

export default function HomepageSectionTrustedBy({
  customerStories,
  invertLogos = false,
  ...props
}: Props) {
  // Split the customerStories.logos array into two separate arrays
  const logos1 = customerStories.logos.slice(
    0,
    Math.ceil(customerStories.logos.length / 2)
  )
  const logos2 = customerStories.logos.slice(
    Math.ceil(customerStories.logos.length / 2)
  )
  return (
    <div {...props}>
      <div className='section-container space-y-14'>
        <div className='text-center text-xl font-semibold leading-normal'>
          Trusted by developers that work with data at{' '}
          <span className='tilted tilted-black'>
            <span className='tilted-content leading-8'>scale</span>
          </span>
        </div>
        <div
          className={`mask-logos-carousel mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-6 ${
            invertLogos ? 'grayscale invert' : ''
          }`}>
          <LogoCarousel
            logos={logos1}
            speedClass1='animate-marqueeLeft'
            speedClass2='animate-marqueeLeft2'
          />
          <LogoCarousel
            logos={logos2}
            speedClass1='animate-marqueeLeft3'
            speedClass2='animate-marqueeLeft4'
          />
        </div>
        <div className='text-center text-base leading-normal'>
          Don't take our word for it.{' '}
          <Link href='/user-stories' className='font-bold hover:underline'>
            Read our user stories{' '}
            <ChevronRightIcon
              height='20'
              className='-mt-0.5 inline-block transition group-hover:translate-x-1/2'
            />
          </Link>
        </div>
      </div>
    </div>
  )
}
