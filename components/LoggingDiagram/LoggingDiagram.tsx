import SvgSection1 from './SvgSection1'
import SvgSection2 from './SvgSection2'
import SvgSection3 from './SvgSection3'

interface DiagramProps {
  className?: string
  sectionId?: number
}

const Diagram: React.FC<DiagramProps> = ({ className, sectionId }) => {
  const sections = [
    { id: 10, component: SvgSection1 },
    { id: 20, component: SvgSection2 },
    { id: 30, component: SvgSection3 }
  ]

  return (
    <div className={className}>
      <div
        id='diagramContainer'
        className='h-[500px] overflow-hidden overflow-y-scroll'>
        {sections.map(({ id, component: SvgSection }) => (
          <div
            key={id}
            className={`mx-auto w-full transition-opacity duration-500 ${
              sectionId === id ? 'opacity-100' : 'opacity-30'
            }`}
            id={`section-${id}`}>
            <SvgSection />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Diagram
