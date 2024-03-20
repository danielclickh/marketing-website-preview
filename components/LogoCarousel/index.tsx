import CarouselItem from './CarouselItem'

interface Customer {
  darkLogoPng?: any // Replace 'any' with the type of your darkLogoPng prop
  href?: string
  Logo?: any
}

interface Props {
  logos: Customer[]
  speedClass1: string
  speedClass2: string
  fixShape?: boolean
  logoColor?: string | ''
}

const PauseHoverComponent: React.FC<Props> = ({
  logos,
  speedClass1,
  speedClass2,
  fixShape,
  logoColor = 'current'
}) => {
  // Update the Logo key to darkLogoPng
  let updatedData = logos
  if (fixShape) {
    updatedData = logos.map((item) => {
      const { Logo, ...rest } = item
      return {
        ...rest,
        darkLogoPng: Logo
      }
    })
  }

  return (
    <div className='pause-hover hide-scrollbar relative flex overflow-x-scroll text-black md:overflow-x-hidden'>
      <div
        className={`flex content-center items-center gap-12 whitespace-nowrap py-3 ${speedClass1}`}>
        {updatedData.map((customer, index) => (
          <CarouselItem
            key={index}
            index={index}
            customer={customer}
            logoColor={logoColor}
          />
        ))}
      </div>
      <div
        className={`absolute top-0 flex items-center gap-12 whitespace-nowrap py-3 ${speedClass2}`}>
        {updatedData.map((customer, index) => (
          <CarouselItem
            key={index}
            index={index}
            customer={customer}
            logoColor={logoColor}
          />
        ))}
      </div>
    </div>
  )
}

export default PauseHoverComponent
