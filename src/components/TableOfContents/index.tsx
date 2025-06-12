import React, { useCallback, useEffect, useRef, useState } from 'react'

interface TableOfContentsProps {
  contentRef: React.RefObject<HTMLDivElement>
  headersSelector: string
}

export default function TableOfContents({
  contentRef,
  headersSelector
}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')
  const navRef = useRef<null | HTMLElement>(null)
  const [headingElements, setHeadingElements] = useState<Array<HTMLElement>>([])

  useEffect(() => {
    const contentEl = contentRef.current
    if (!contentEl) return

    const observer = new MutationObserver(() => {
      const headings = Array.from(
        contentEl.querySelectorAll(headersSelector || 'h1, h2')
      ).filter((el): el is HTMLElement => el instanceof HTMLElement)

      setHeadingElements(headings)
    })

    observer.observe(contentEl, {
      childList: true,
      subtree: true
    })

    // Run once initially in case content is already rendered
    const initialHeadings = Array.from(
      contentEl.querySelectorAll(headersSelector || 'h1, h2')
    ).filter((el): el is HTMLElement => el instanceof HTMLElement)

    setHeadingElements(initialHeadings)

    return () => observer.disconnect()
  }, [contentRef, headersSelector])

  // Set active heading
  const scrollHanlder = useCallback(() => {
    const scrollPosition = window.scrollY
    const windowHeight = window.innerHeight

    // Map headings to how much of their "section" is visible
    const visibilityMap = headingElements.map((heading, index) => {
      const nextHeading = headingElements[index + 1]
      const start = heading.offsetTop
      const end = nextHeading
        ? nextHeading.offsetTop
        : document.body.scrollHeight
      const visibleStart = Math.max(start, scrollPosition)
      const visibleEnd = Math.min(end, scrollPosition + windowHeight)
      const visibleHeight = Math.max(0, visibleEnd - visibleStart)
      const sectionHeight = end - start
      const ratio = visibleHeight / sectionHeight
      return {
        id: heading.id,
        ratio
      }
    })

    const mostVisible = visibilityMap.sort((a, b) => b.ratio - a.ratio)[0]

    if (mostVisible) {
      setActiveId(mostVisible.id)
    }
  }, [setActiveId, headingElements])

  // Update active heading on scroll and resize
  useEffect(() => {
    const content = contentRef.current
    if (!content) return

    scrollHanlder()
    window.addEventListener('scroll', scrollHanlder)
    window.addEventListener('resize', scrollHanlder)

    const resizeObserver = new ResizeObserver(scrollHanlder)
    resizeObserver.observe(contentRef.current)

    return () => {
      window.removeEventListener('scroll', scrollHanlder)
      window.removeEventListener('resize', scrollHanlder)

      resizeObserver.disconnect()
    }
  }, [contentRef.current, scrollHanlder])

  return (
    <>
      {headingElements.length > 0 && (
        <nav
          ref={navRef}
          className='sticky top-30 max-h-[calc(100vh_-_8rem)] overflow-y-auto rounded-lg bg-white/5 p-4 pl-2'>
          <ul className='space-y-2'>
            {headingElements.map((heading) => (
              <li
                key={heading.id}
                style={{
                  paddingLeft: `${Number(heading.tagName.charAt(1)) - 1}rem`
                }}>
                <a
                  href={`#${heading.id}`}
                  className={`block break-words py-1 transition-colors hover:text-primary-300 ${
                    activeId === heading.id
                      ? 'font-medium text-primary-300'
                      : 'text-neutral-400'
                  }`}
                  title={heading.textContent || ''}
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById(heading.id)?.scrollIntoView({
                      behavior: 'smooth'
                    })
                  }}>
                  {heading.textContent}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  )
}
