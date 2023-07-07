import React, { useRef } from 'react'
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
      <div id='diagramContainer' className='hide-scrollbar overflow-hidden'>
        {sections.map(({ id, component: SvgSection }) => (
          <div
            key={id}
            className={`mx-auto w-full transition-opacity duration-500 ${
              sectionId === id
                ? 'show-svg-background opacity-100'
                : 'lg:opacity-20'
            }`}
            id={`section-${id}`}>
            <SvgSection className='mx-auto flex items-center justify-center' />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Diagram
