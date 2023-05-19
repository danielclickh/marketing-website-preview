import CarouselItem from './CarouselItem'

interface Customer {
  darkLogoPng: any // Replace 'any' with the type of your darkLogoPng prop
  href?: string
}

interface Props {
  logos: Customer[]
  speedClass1: string
  speedClass2: string
}

const PauseHoverComponent: React.FC<Props> = ({
  logos,
  speedClass1,
  speedClass2
}) => {
  return (
    <div className='pause-hover hide-scrollbar relative flex overflow-x-scroll md:overflow-x-hidden'>
      <div
        className={`flex content-center items-center whitespace-nowrap py-3 ${speedClass1}`}>
        {logos.map((customer, index) => (
          <CarouselItem key={index} index={index} customer={customer} />
        ))}
      </div>
      <div
        className={`absolute top-0 flex items-center whitespace-nowrap py-3 ${speedClass2}`}>
        {logos.map((customer, index) => (
          <CarouselItem key={index} index={index} customer={customer} />
        ))}
      </div>
    </div>
  )
}

export default PauseHoverComponent
