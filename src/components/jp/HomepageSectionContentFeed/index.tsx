import { CUIButton } from '../../ClickUI'
import Markdown from '../../Markdown'
import ResponsiveEmbed from '../../ResponsiveEmbed'
import { SuiText, SuiTitle } from '../../sui'
import { EntryCategory, EntryStat, getCategories, getContent } from './content'
import React, { useEffect, useRef, useState } from 'react'

function StatBox(props: EntryStat) {
  return (
    <div className='flex flex-col items-center justify-center gap-1 rounded bg-neutral-750 px-2 py-4 text-center text-white'>
      <div className='flex aspect-square w-10 items-center justify-center'>
        <props.icon />
      </div>
      <span className='text-4xl font-bold'>{props.stat}</span>
      <SuiText size='sm'>{props.label}</SuiText>
    </div>
  )
}

export default function HomepageSectionContentFeed({
  className = '',
  ...props
}: React.HTMLProps<HTMLDivElement>) {
  const allContent = getContent()
  const allCategories = getCategories()
  const container = useRef<HTMLDivElement>(null)
  const [hasChanged, setHasChanged] = useState(false)

  const [activeCategory, setActiveCategory] = useState<EntryCategory | null>(
    null
  )

  useEffect(() => {
    if (container.current && hasChanged) {
      container.current.scrollIntoView()
    }
  }, [activeCategory])

  return (
    <div
      className={`section-container my-16 flex flex-row flex-wrap gap-12 md:my-32 lg:flex-nowrap ${className}`}
      {...props}
      ref={container}>
      {/* Text & filters column */}
      <div className='relative w-full flex-shrink-0 flex-grow-0 lg:w-2/5'>
        <div className='sticky top-20'>
          <SuiTitle type='h2' className='mb-4 text-balance xl:pr-12'>
            拡張性の高いリアルタイムデータ製品を構築
          </SuiTitle>
          <SuiText
            size='lg'
            className='text-balance opacity-70 xl:text-[1.25rem]'>
            Sony、Lyft、Cisco、GitLab
            など多くの企業が、拡張性に優れ、効率的で使いやすいClickHouse
            Cloudを選んでいます。
          </SuiText>
          {allCategories.length && (
            <>
              <SuiText
                weight='bold'
                size='sm'
                className='mb-4 mt-12 uppercase tracking-[0.0875rem] text-primary-300'>
                フィルター条件
              </SuiText>
              <ul className='flex flex-wrap gap-4'>
                {allCategories.map((category, index) => {
                  const isActive = category === activeCategory
                  let classes =
                    'text-white border-primary-600 hover:border-primary-300'
                  if (isActive)
                    classes =
                      'border-primary-300 bg-primary-300 text-primary-800'
                  return (
                    <li key={index}>
                      <button
                        onClick={() => {
                          setHasChanged(true)
                          setActiveCategory(isActive ? null : category)
                        }}
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
      <div className='-mb-11 w-full flex-1 lg:w-auto'>
        {allContent.map((entry, index) => {
          const isActive =
            (!activeCategory && entry.featured) ||
            (activeCategory && entry.categories.includes(activeCategory))
          const statsCount = entry.stats?.length
          let statsColumnClasses = ''
          switch (statsCount) {
            case 1:
              statsColumnClasses = 'md:grid-cols-1'
              break
            case 2:
              statsColumnClasses = 'md:grid-cols-2'
              break
            default:
              statsColumnClasses = 'md:grid-cols-3'
              break
          }
          return (
            isActive && (
              <div
                key={index}
                className='flip-selection mb-11 space-y-8 rounded-lg bg-primary-300 p-6 text-lg text-primary-800 transition-all md:p-8 lg:p-10'>
                {entry.embed && <ResponsiveEmbed html={entry.embed} />}
                <div className='text-center text-inherit'>
                  <Markdown
                    encloseByDiv={false}
                    components={{
                      a: ({ children, ...props }) => (
                        <a {...props} className='font-bold underline'>
                          {children}
                        </a>
                      )
                    }}>
                    {entry.body}
                  </Markdown>
                </div>
                <div className='flex justify-center'>
                  <entry.logo />
                </div>
                {entry.stats && entry.stats.length && (
                  <div
                    className={`grid grid-cols-1 gap-2 ${statsColumnClasses}`}>
                    {entry.stats.map((stat, index) => {
                      return (
                        <StatBox
                          key={index}
                          stat={stat.stat}
                          label={stat.label}
                          icon={stat.icon}
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
            href='/jp/use-cases'>
            すべてのユースケース
          </CUIButton>
        </div>
      </div>
    </div>
  )
}
