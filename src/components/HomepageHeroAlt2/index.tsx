import { CUIButton } from '../ClickUI'
import LogoAnnouncementLink from '../LogoAnnouncementLink'
import HomepageSectionTrustedByAlt from '../HomepageSectionTrustedByAlt'
import { SuiText, SuiTitle } from '../sui'
import { HomepageCustomerStories } from '@/types/homepage'
import React, { useCallback, useEffect, useRef, useState } from 'react'

const heroEntrance = `
@keyframes heroSlideUp {
  from {
    opacity: 0;
    transform: translateY(32px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.hero-animate {
  opacity: 0;
  animation: heroSlideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
`

interface HomepageHeroAlt2Props extends React.HTMLProps<HTMLDivElement> {
  customerStories: HomepageCustomerStories
}

export default function HomepageHeroAlt2({
  customerStories,
  className = '',
  ...props
}: HomepageHeroAlt2Props) {
  const heroRef = useRef<HTMLDivElement>(null)
  const [flarePos, setFlarePos] = useState({ x: 0, y: 0 })
  const [flareVisible, setFlareVisible] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!heroRef.current) return
      const rect = heroRef.current.getBoundingClientRect()
      setFlarePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      })
    },
    []
  )

  return (
    <div
      ref={heroRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setFlareVisible(true)}
      onMouseLeave={() => setFlareVisible(false)}
      {...props}>
      {/* Grid revealed by lens flare — masked to only show around cursor */}
      <div
        className='pointer-events-none absolute inset-0 z-0 transition-opacity duration-500'
        style={{
          opacity: flareVisible ? 1 : 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: `radial-gradient(circle 300px at ${flarePos.x}px ${flarePos.y}px, black 0%, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(circle 300px at ${flarePos.x}px ${flarePos.y}px, black 0%, transparent 100%)`
        }}
      />

      {/* Lens flare glow that follows the cursor */}
      <div
        className='pointer-events-none absolute z-0 transition-opacity duration-500'
        style={{
          left: flarePos.x,
          top: flarePos.y,
          width: 600,
          height: 600,
          transform: 'translate(-50%, -50%)',
          opacity: flareVisible ? 1 : 0,
          background:
            'radial-gradient(circle, rgba(250,223,80,0.12) 0%, rgba(250,223,80,0.04) 35%, transparent 70%)'
        }}
      />

      {/* Injected keyframes */}
      <style dangerouslySetInnerHTML={{ __html: heroEntrance }} />

      {/* Hero content */}
      <div className='section-container relative z-10 pt-16 text-center lg:pt-24'>
        <h1
          className={`!text-[2.5rem] leading-none md:!text-[4.5rem] xl:!text-[6.5rem] font-black ${mounted ? 'hero-animate' : 'opacity-0'}`}
          style={{ animationDelay: '0ms' }}>
          The leading<br />database for AI
        </h1>

        <SuiText
          className={`mx-auto mt-6 max-w-2xl !text-base text-white/70 lg:!text-lg ${mounted ? 'hero-animate' : 'opacity-0'}`}
          style={{ animationDelay: '120ms' }}>
          Real-time insight without the wait. ClickHouse is the analytical
          database built for engineers who move fast and expect the same from
          their data.
        </SuiText>

        <div
          className={`mx-auto mt-12 flex max-w-md flex-wrap justify-center gap-6 ${mounted ? 'hero-animate' : 'opacity-0'}`}
          style={{ animationDelay: '240ms' }}>
          <CUIButton
            type='primary'
            size='lg'
            weight='semibold'
            href='https://console.clickhouse.cloud/signUp?loc=hero'
            target='_blank'
            linkClass='w-full sm:w-auto'
            className='w-full sm:w-auto sm:!px-8'>
            Start free cloud trial
          </CUIButton>
          <CUIButton
            type='secondary'
            size='lg'
            weight='semibold'
            href='/company/contact?loc=homepage-hero'
            linkClass='w-full sm:w-auto'
            className='w-full sm:w-auto sm:!px-8'>
            Contact sales
          </CUIButton>
        </div>

        {/* Langfuse announcement */}
        <div
          className={`relative z-10 mx-auto mt-24 max-w-2xl -mb-12 ${mounted ? 'hero-animate' : 'opacity-0'}`}
          style={{ animationDelay: '360ms' }}>
          <LogoAnnouncementLink
            href='https://langfuse.com/?utm_source=clickhouse_hero'
            target='_blank'
            className='text-sm border-white/5'
            mode='dark'
            logo={{
              src: '/logos/langfuse.svg',
              alt: 'Langfuse',
              width: 52,
              height: 52
            }}>
            Langfuse is now part of ClickHouse. Discover the leading open-source
            platform for LLM observability, evaluations, and prompt management.
            Ideal for building, monitoring, and optimizing AI applications at
            scale.
          </LogoAnnouncementLink>
        </div>
      </div>

      {/* Trusted By section */}
      <HomepageSectionTrustedByAlt
        customerStories={customerStories}
        className='relative z-0 pb-8 pt-24 bg-neutral-600/20 border-t border-white/5'
      />
    </div>
  )
}
