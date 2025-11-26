import SvgSection1 from './SvgSection1'
import styles from '@/components/MLDiagram/styles.module.scss'

interface DiagramProps {
  className?: string
  sectionId?: number
}

const Diagram: React.FC<DiagramProps> = ({ className, sectionId }) => {
  const sections = [{ id: 10, component: SvgSection1 }]

  return (
    <div className={className}>
      <div id='diagramContainer' className={styles.diagramContainer}>
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
              className='mlDiagram relative w-full'
              sectionId={sectionId}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Diagram
