import { HomepageCustomerStories } from '../../types/homepage'
import LogoCarousel from '../LogoCarousel'
import { SuiText } from '../sui'

export default function HomepageSectionTrustedBy({
  customerStories
}: {
  customerStories: HomepageCustomerStories
}) {
  // Split the customerStories.logos array into two separate arrays
  const logos1 = customerStories.logos.slice(
    0,
    Math.ceil(customerStories.logos.length / 2)
  )
  const logos2 = customerStories.logos.slice(
    Math.ceil(customerStories.logos.length / 2)
  )

  return (
    <div className='my-16 md:my-32'>
      <SuiText
        weight='bold'
        size='sm'
        className='mb-4 text-center uppercase tracking-wide text-primary-300'>
        Trusted by
      </SuiText>
      <div className='relative z-10 flex flex-wrap place-items-center items-center justify-center gap-6 self-center grayscale invert md:gap-x-14'>
        <LogoCarousel
          logoColor='white'
          logos={logos1}
          speedClass1='animate-marqueeLeft'
          speedClass2='animate-marqueeLeft2'
        />
        <LogoCarousel
          logoColor='white'
          logos={logos2}
          speedClass1='animate-marqueeLeft3'
          speedClass2='animate-marqueeLeft4'
        />
      </div>
    </div>
  )
}
