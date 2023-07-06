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
      <div id='section1'>
        {sections.map(({ id, component: SvgSection }) => (
          <SvgSection
            key={id}
            className={`mx-auto w-full transition-opacity duration-500 ${
              sectionId === id ? 'opacity-100' : 'opacity-30'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default Diagram
