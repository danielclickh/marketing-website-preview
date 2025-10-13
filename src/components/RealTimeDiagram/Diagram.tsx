import RealTimeDiagram from '@/components/RealTimeDiagram/RealTimeDiagram'

interface DiagramProps {
  className?: string
  sectionId?: number
}

const Diagram: React.FC<DiagramProps> = ({ className, sectionId }) => {
  const sections = [{ id: 10, component: RealTimeDiagram }]

  return (
    <div className={className}>
      <div id='diagramContainer' className='rtDiagramContainer'>
        {sections.map(({ id, component: SvgSection }) => (
          <div
            key={id}
            className={`transition-opacity duration-500 ${
              sectionId === id || !sectionId
                ? 'show-svg-background opacity-100'
                : 'lg:opacity-100'
            }`}
            id={`section-${id}`}>
            <SvgSection
              className='rtDiagram relative w-full'
              sectionId={sectionId}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Diagram
