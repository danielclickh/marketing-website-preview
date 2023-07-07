import React, { useEffect, useRef } from 'react'
import SvgSection1 from './SvgSection1'
import SvgSection2 from './SvgSection2'
import SvgSection3 from './SvgSection3'

interface DiagramProps {
  className?: string
  sectionId?: number
}

const Diagram: React.FC<DiagramProps> = ({ className, sectionId }) => {
  const diagramContainerRef = useRef<HTMLDivElement>(null)
  const sections = [
    { id: 10, component: SvgSection1 },
    { id: 20, component: SvgSection2 },
    { id: 30, component: SvgSection3 }
  ]

  useEffect(() => {
    if (
      sectionId !== undefined &&
      !isNaN(sectionId) &&
      diagramContainerRef.current
    ) {
      const sectionElement = document.getElementById(`section-${sectionId}`)
      if (sectionElement) {
        const containerRect =
          diagramContainerRef.current.getBoundingClientRect()
        const sectionRect = sectionElement.getBoundingClientRect()
        const scrollTop =
          sectionRect.top -
          containerRect.top +
          diagramContainerRef.current.scrollTop
        diagramContainerRef.current.scrollTo({
          top: scrollTop,
          behavior: 'smooth'
        })
      }
    }
  }, [sectionId])

  return (
    <div className={className}>
      <div
        ref={diagramContainerRef}
        id='diagramContainer'
        className='hide-scrollbar h-[723px] overflow-hidden'>
        {sections.map(({ id, component: SvgSection }, index) => (
          <div
            key={id}
            className={`mx-auto w-full transition-opacity duration-500 ${
              sectionId === id ? 'opacity-100' : 'opacity-30'
            }`}
            id={`section-${id}`}>
            <SvgSection className='mx-auto' />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Diagram
