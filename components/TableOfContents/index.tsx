import React, { useEffect, useRef, useState } from 'react'

interface HeadingData {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  contentRef: React.RefObject<HTMLDivElement>
  footerRef: React.RefObject<HTMLElement>
  headersSelector: string
}

export default function TableOfContents({
  contentRef,
  footerRef,
  headersSelector
}: TableOfContentsProps) {
  const [headings, setHeadings] = useState<HeadingData[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const [isVisible, setIsVisible] = useState(true)
  const [headers, setHeaders] = useState(
    headersSelector ? headersSelector : 'h1, h2'
  )
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!footerRef.current) return

    // Create an Intersection Observer for the footer
    const footerObserver = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting)
      },
      { threshold: 0 }
    )

    footerObserver.observe(footerRef.current)

    return () => footerObserver.disconnect()
  }, [footerRef])

  useEffect(() => {
    if (!contentRef.current) return

    // Get all headings from the blog content
    const elements = contentRef.current.querySelectorAll(headers)
    const headingElements = Array.from(elements).map((element) => ({
      id: element.id,
      text: element.textContent || '',
      level: Number(element.tagName.charAt(1))
    }))

    setHeadings(headingElements)

    // Create an Intersection Observer to track active heading
    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(callback, {
      rootMargin: '-100px 0px -60% 0px'
    })

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [contentRef])

  // Add this effect to scroll the nav when activeId changes
  useEffect(() => {
    if (activeId && navRef.current) {
      const activeElement = navRef.current.querySelector(
        `a[href="#${activeId}"]`
      )
      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        })
      }
    }
  }, [activeId])

  return headings.length === 0 ? null : (
    <nav
      ref={navRef}
      className={`sticky top-30 mt-20 max-h-[calc(100vh-160px)] max-w-[280px] overflow-y-auto rounded-lg bg-white/5 p-4 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}>
      <ul className='space-y-2 text-base'>
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ paddingLeft: `${(heading.level - 1) * 16}px` }}>
            <a
              href={`#${heading.id}`}
              className={`block break-words py-1 transition-colors hover:text-primary-300 ${
                activeId === heading.id
                  ? 'font-medium text-primary-300'
                  : 'text-neutral-400'
              }`}
              title={heading.text}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById(heading.id)?.scrollIntoView({
                  behavior: 'smooth'
                })
              }}>
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
