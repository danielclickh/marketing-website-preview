import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { CUIButton } from '../ClickUI'
import { SuiText, SuiTitle } from '../sui'
import { getContent, getCategories, EntryCategory } from './content'

function StatBox({
  stat,
  label,
  icon
}: {
  stat: string | number
  label: string
  icon: JSX.Element
}) {
  return (
    <div className='flex flex-col items-center justify-center gap-2 rounded bg-neutral-750 py-4 px-2 text-center text-white'>
      {icon}
      <span className='text-4xl font-bold'>{stat}</span>
      <SuiText size='sm'>{label}</SuiText>
    </div>
  )
}

export default function HomepageSectionContentFeed() {
  const allContent = getContent()
  const allCategories = getCategories()

  const [activeCategory, setActiveCategory] = useState<EntryCategory | null>(
    null
  )

  return (
    <div className='section-container my-32 flex flex-row flex-wrap gap-16 md:gap-24 lg:flex-nowrap xl:gap-48'>
      {/* Text & filters column */}
      <div className='relative w-full flex-shrink-0 flex-grow-0 lg:w-1/3'>
        <div className='sticky top-20'>
          <SuiTitle type='h2' className='mb-4'>
            Build real-time data products that scale
          </SuiTitle>
          <SuiText size='lg' className='opacity-70'>
            Sony, Lyft, Cisco, GitLab, Twillio and many more choose ClickHouse
            Cloud for it's scale, efficiency, and ease of use.
          </SuiText>
          {allCategories.length && (
            <>
              <SuiText
                weight='bold'
                size='sm'
                className='mt-12 mb-4 uppercase tracking-wide text-primary-300'>
                Filter by
              </SuiText>
              <ul className='flex flex-wrap gap-4'>
                {allCategories.map((category) => {
                  const isActive = category === activeCategory
                  let classes =
                    'text-white border-primary-600 hover:border-primary-300'
                  if (isActive)
                    classes =
                      'border-primary-300 bg-primary-300 text-primary-800'
                  return (
                    <li key={category}>
                      <button
                        onClick={() =>
                          setActiveCategory(isActive ? null : category)
                        }
                        className={`inline-block rounded-full border px-4 py-2 text-sm font-medium transition-colors ${classes}`}>
                        {category}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </>
          )}
        </div>
      </div>

      {/* Feed column */}
      <div className='-mb-11 w-full flex-1 space-y-11 lg:w-auto'>
        {allContent.map((entry, index) => {
          const isActive =
            !activeCategory || entry.categories.includes(activeCategory)
          return (
            isActive && (
              <div
                key={index}
                className='space-y-11 rounded-lg bg-primary-300 p-6 text-lg text-primary-800 transition-all md:p-8'>
                <ReactMarkdown
                  components={{
                    a: ({ children, ...props }) => (
                      <a {...props} className='font-bold underline'>
                        {children}
                      </a>
                    )
                  }}
                  className='text-center text-inherit'>
                  {entry.bodyMarkdown}
                </ReactMarkdown>
                <div className='flex justify-center'>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: entry.logoSvg
                    }}></div>
                </div>
                {entry.stats && entry.stats.length && (
                  <div className='grid grid-cols-1 gap-2 md:grid-cols-3'>
                    {entry.stats.map((stat) => {
                      return (
                        <StatBox
                          stat={stat.stat}
                          label={stat.label}
                          icon={
                            <div
                              dangerouslySetInnerHTML={{
                                __html: stat.iconSvg
                              }}></div>
                          }
                        />
                      )
                    })}
                  </div>
                )}
              </div>
            )
          )
        })}

        <div className='flex justify-center'>
          <CUIButton
            type='secondary'
            weight='semibold'
            size='lg'
            href='/use-cases'>
            View all use cases
          </CUIButton>
        </div>
      </div>
    </div>
  )
}
