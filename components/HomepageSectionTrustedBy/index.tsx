import { HomepageCustomerStories } from '../../types/homepage'
import LogoCarousel from '../LogoCarousel'
import { SuiText } from '../sui'

export default function HomepageSectionTrustedBy({
  customerStories
}: {
  customerStories: HomepageCustomerStories
}) {
  const logoSizeModifier = 0.875

  // Hacky way of resizing the logos
  // First we clone the array so not to modify else where
  // Then we alter the strapi data which gets used by the LogoCarousel component
  const logos = structuredClone(customerStories.logos).map((logo) => {
    if (logo.darkLogoPng?.width && logo.darkLogoPng?.height) {
      logo.darkLogoPng.width = logo.darkLogoPng.width * logoSizeModifier
      logo.darkLogoPng.height = logo.darkLogoPng.height * logoSizeModifier
    }
    if (logo.lightLogoPng?.width && logo.lightLogoPng?.height) {
      logo.lightLogoPng.width = logo.lightLogoPng.width * logoSizeModifier
      logo.lightLogoPng.height = logo.lightLogoPng.height * logoSizeModifier
    }
    return logo
  })

  // Split the customerStories.logos array into two separate arrays
  const logos1 = logos.slice(0, Math.ceil(logos.length / 2))
  const logos2 = logos.slice(Math.ceil(logos.length / 2))

  return (
    <div className='my-16'>
      <SuiText
        weight='bold'
        size='sm'
        className='mb-4 text-center uppercase tracking-wide text-primary-300'>
        Trusted by
      </SuiText>
      <div className='relative z-10 flex flex-wrap place-items-center items-center justify-center gap-6 self-center opacity-90 grayscale invert md:gap-x-14'>
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
