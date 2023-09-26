import Image from 'next/image'

// Define the interface for the integration object
interface Integration {
  logo: string
  imgWidth: number
  imgHeight: number
  name: string
}

// Define the props interface for the ClickPipesIntegrationImage component
interface ClickPipesIntegrationImageProps {
  integration: Integration
}

export default function ClickPipesIntegrationImage({
  integration
}: ClickPipesIntegrationImageProps) {
  return (
    <Image
      src={integration.logo}
      width={integration.imgWidth}
      height={integration.imgHeight}
      alt={integration.name}
      className='max-h-[36px] min-h-[36px] w-[36px]'
    />
  )
}
