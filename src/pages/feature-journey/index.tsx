import { FEATURE_EVENTS, EventCategory, FeatureEvent } from './data'
import { DATA_LAKES_RELEASES } from './data-lakes'
import { DATA_TYPES_MONTHLY } from './data-types'
import { INDEXES_TREE, IndexTreeNode } from './indexes-tree'
import {
  JOINS_BENCHMARK_DATA,
  JOINS_TEST_LABELS,
  JOINS_Y_MAX,
  getJoinsBenchmark
} from './joins'
import Layout from '@/components/Layout'
import { SuiText, SuiTitle } from '@/components/sui'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CommonProps } from '@/types/homepage'
import { AnimatePresence, motion } from 'framer-motion'
import { GetStaticProps } from 'next'
import dynamic from 'next/dynamic'
import { useEffect, useMemo, useState } from 'react'
import {
  VerticalTimeline,
  VerticalTimelineElement
} from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'

const ReactEcharts = dynamic(() => import('echarts-for-react'), { ssr: false })

export const getStaticProps: GetStaticProps<CommonProps> =
  async function getStaticProps() {
    const commonProps = await getCommonProps()
    return {
      props: {
        seo: {
          title: 'ClickHouse Feature Journey',
          description:
            "Explore the milestones that transformed ClickHouse into the world's fastest analytical database.",
          path: '/feature-journey'
        },
        ...commonProps
      }
    }
  }

// ─── Color tokens ─────────────────────────────────────────────────────────────

const CH_YELLOW = '#FAFF69'
const YEAR_COLOR = '#e2e8f0'
const CARD_BG = '#1d1d1d'
const CARD_BORDER = '#414141'
const PAGE_BG = '#151515'

// ─── Category config ─────────────────────────────────────────────────────────

const CATEGORY_META: Record<
  EventCategory,
  { label: string; badgeClass: string; iconColor: string }
> = {
  joins: {
    label: 'Joins',
    badgeClass: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
    iconColor: '#c084fc'
  },
  'data-types-formats': {
    label: 'Data Types & Formats',
    badgeClass: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
    iconColor: '#60a5fa'
  },
  'data-lifecycle': {
    label: 'Data Lifecycle Operations',
    badgeClass: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
    iconColor: '#fb923c'
  },
  indexes: {
    label: 'Indexes',
    badgeClass: 'text-green-400 bg-green-400/10 border-green-400/20',
    iconColor: '#4ade80'
  },
  'data-lakes': {
    label: 'Data Lakes',
    badgeClass: 'text-teal-400 bg-teal-400/10 border-teal-400/20',
    iconColor: '#2dd4bf'
  }
}

const CATEGORIES: EventCategory[] = [
  'joins',
  'data-types-formats',
  'data-lakes',
  'indexes',
  'data-lifecycle',
]

const MONTH_NAMES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]

// ─── Icon elements ────────────────────────────────────────────────────────────

function EventIcon({ category }: { category: EventCategory }) {
  return (
    <div
      style={{
        width: 14,
        height: 14,
        borderRadius: '50%',
        background: CATEGORY_META[category].iconColor,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}
    />
  )
}

function YearIcon({ year }: { year: number }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        fontFamily: 'monospace',
        fontWeight: 700,
        fontSize: 12,
        color: '#1e293b'
      }}>
      {String(year).slice(2)}
    </div>
  )
}

// ─── EventCard content ────────────────────────────────────────────────────────

function EventCardContent({ event }: { event: FeatureEvent }) {
  const [expanded, setExpanded] = useState(false)
  const meta = CATEGORY_META[event.category]

  return (
    <div className='w-full text-left'>
      <span
        className={`mb-2 inline-flex items-center rounded border px-2 py-0.5 text-xs font-medium ${meta.badgeClass}`}>
        {meta.label}
      </span>

      <h3 className='mb-1 text-sm font-semibold leading-snug text-white'>
        {event.title}
      </h3>

      <p className='text-xs leading-relaxed text-neutral-400'>
        {event.summary}
      </p>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', bounce: 0, duration: 0.5 }}
            className='overflow-hidden'>
            <p className='mt-3 border-t border-neutral-700 pt-3 text-xs leading-relaxed text-neutral-300'>
              {event.details}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className='mt-2 flex items-center justify-between'>
        <button
          onClick={() => setExpanded((v) => !v)}
          className='cursor-pointer text-xs text-neutral-600 hover:text-neutral-400'>
          {expanded ? '↑ Show less' : '↓ Read more'}
        </button>

        {event.url && (
          <a
            href={event.url}
            target='_blank'
            rel='noopener noreferrer'
            className='text-xs text-primary-300 hover:underline'>
            Learn more →
          </a>
        )}
      </div>
    </div>
  )
}

// ─── Category filter ──────────────────────────────────────────────────────────

function CategoryFilter({
  active,
  onChange
}: {
  active: EventCategory | 'all'
  onChange: (v: EventCategory | 'all') => void
}) {
  const base =
    'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors'
  const on = 'border-primary-300 bg-primary-300/10 text-primary-300'
  const off =
    'border-neutral-700 text-neutral-400 hover:border-neutral-500 hover:text-neutral-200'

  return (
    <div className='mb-12 flex flex-wrap gap-2 pt-6'>
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`${base} ${active === cat ? on : off}`}>
          {CATEGORY_META[cat].label}
        </button>
      ))}
    </div>
  )
}

// ─── Category panel ───────────────────────────────────────────────────────────

const FAIL_STUB = Math.ceil(JOINS_Y_MAX * 0.04)

function JoinsPanel({ year, month }: { year: number; month: number }) {
  const benchmark = getJoinsBenchmark(year, month)
  const values = benchmark?.values ?? getJoinsBenchmark(2025, 12)?.values ?? []

  const joinsFeatures = FEATURE_EVENTS.filter(
    (e) => e.year === year && e.month === month && e.category === 'joins'
  )
  const monthName = new Date(year, month - 1, 1).toLocaleString('en-US', { month: 'long' })
  const version = `${year - 2000}.${month}`

  const chartData = values.map((v) =>
    v === -1
      ? {
          value: FAIL_STUB,
          itemStyle: {
            color: '#ef4444',
            opacity: 0.85,
            borderRadius: [2, 2, 0, 0]
          },
          label: {
            show: true,
            formatter: '✗',
            color: '#ef4444',
            position: 'top',
            fontSize: 11,
            fontWeight: 'bold'
          }
        }
      : {
          value: v,
          itemStyle: { color: CH_YELLOW, borderRadius: [2, 2, 0, 0] }
        }
  )

  const option = {
    backgroundColor: 'transparent',
    title: {
      text: 'TPC-H Benchmark',
      left: 'center',
      textStyle: { color: '#ffffff', fontSize: 13, fontWeight: 'bold' }
    },
    grid: { top: 44, right: 16, bottom: 68, left: 68, containLabel: false },
    xAxis: {
      type: 'category',
      data: JOINS_TEST_LABELS,
      name: 'Test run',
      nameLocation: 'middle',
      nameGap: 36,
      nameTextStyle: { color: '#ffffff', fontSize: 12, fontWeight: 'bold' },
      axisLabel: { color: '#ffffff', fontSize: 11, fontWeight: 'bold', rotate: 45 },
      axisLine: { lineStyle: { color: '#404040' } },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      name: 'Execution time (ms)',
      nameLocation: 'middle',
      nameRotate: 90,
      nameGap: 52,
      nameTextStyle: { color: '#ffffff', fontSize: 12, fontWeight: 'bold' },
      axisLabel: { color: '#ffffff', fontSize: 11, fontWeight: 'bold' },
      min: 0,
      max: JOINS_Y_MAX,
      axisLine: { show: false },
      splitLine: { lineStyle: { color: '#2a2a2a' } }
    },
    series: [
      {
        type: 'bar',
        data: chartData,
        barMaxWidth: 28
      }
    ],
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#1d1d1d',
      borderColor: '#414141',
      textStyle: { color: '#e5e5e5', fontSize: 12 },
      formatter: (params: { name: string; dataIndex: number }[]) => {
        const idx = params[0].dataIndex
        const original = values[idx]
        if (original === -1)
          return `${params[0].name}: <span style="color:#ef4444">Test failed</span>`
        return `${params[0].name}: <b>${original} ms</b>`
      }
    }
  }

  return (
    <div className='flex h-full'>
      {/* Chart — 70% */}
      <div className='flex min-w-0 flex-[7] flex-col p-4'>
        <div className='min-h-0 flex-1'>
          <ReactEcharts
            option={option}
            style={{ height: '100%', width: '100%' }}
            opts={{ renderer: 'canvas' }}
          />
        </div>
      </div>

      {/* Text — 30% */}
      <div className='flex min-h-0 flex-[3] flex-col overflow-y-auto border-l border-neutral-800 p-6 pt-5'>
        <h3 className='mb-3 text-base font-semibold leading-snug text-white'>
          {monthName} {year} ({version})
          {joinsFeatures.length > 0 && (
            <span className='ml-1 font-normal text-neutral-400'>
              — {joinsFeatures.length} feature{joinsFeatures.length !== 1 ? 's' : ''} shipped
            </span>
          )}
        </h3>
        {joinsFeatures.length > 0 ? (
          <ul className='flex flex-col gap-4'>
            {joinsFeatures.map((event) => (
              <li key={event.id}>
                <p className='mb-1 text-sm font-medium text-neutral-200'>{event.title}</p>
                <p className='text-sm leading-relaxed text-neutral-400'>{event.summary}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className='text-sm italic text-neutral-500'>No new join improvements this release.</p>
        )}
      </div>
    </div>
  )
}

// Sorted oldest → newest for left-to-right chart display
const DATA_TYPES_CHART_DATA = [...DATA_TYPES_MONTHLY]
  .sort((a, b) => a.year !== b.year ? a.year - b.year : a.month - b.month)

const DATA_TYPES_LABELS = DATA_TYPES_CHART_DATA.map(
  d => `${d.year - 2000}.${d.month}`
)
const DATA_TYPES_VALUES = DATA_TYPES_CHART_DATA.map(d => d.total)
const DATA_TYPES_Y_MAX = Math.ceil(Math.max(...DATA_TYPES_VALUES) * 1.15)

function DataTypesPanel({ activeYear, activeMonth }: { activeYear: number; activeMonth: number }) {
  const activeLabel = `${activeYear - 2000}.${activeMonth}`

  const chartData = DATA_TYPES_VALUES.map((v, i) => ({
    value: v,
    itemStyle: {
      color: DATA_TYPES_LABELS[i] === activeLabel ? '#ef4444' : CH_YELLOW,
      borderRadius: [2, 2, 0, 0]
    }
  }))

  const option = {
    backgroundColor: 'transparent',
    title: {
      text: 'Data Types & Formats Supported',
      left: 'center',
      textStyle: { color: '#ffffff', fontSize: 13, fontWeight: 'bold' }
    },
    grid: { top: 44, right: 16, bottom: 68, left: 68, containLabel: false },
    xAxis: {
      type: 'category',
      data: DATA_TYPES_LABELS,
      name: 'Release',
      nameLocation: 'middle',
      nameGap: 36,
      nameTextStyle: { color: '#ffffff', fontSize: 12, fontWeight: 'bold' },
      axisLabel: { color: '#ffffff', fontSize: 11, fontWeight: 'bold', rotate: 45, interval: 2 },
      axisLine: { lineStyle: { color: '#404040' } },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      name: 'Total supported',
      nameLocation: 'middle',
      nameRotate: 90,
      nameGap: 52,
      nameTextStyle: { color: '#ffffff', fontSize: 12, fontWeight: 'bold' },
      axisLabel: { color: '#ffffff', fontSize: 11, fontWeight: 'bold' },
      min: 0,
      max: DATA_TYPES_Y_MAX,
      axisLine: { show: false },
      splitLine: { lineStyle: { color: '#2a2a2a' } }
    },
    series: [{ type: 'bar', data: chartData, barMaxWidth: 20 }],
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#1d1d1d',
      borderColor: '#414141',
      textStyle: { color: '#e5e5e5', fontSize: 12 },
      formatter: (params: { name: string; value: number }[]) =>
        `${params[0].name}: <b>${params[0].value} types & formats</b>`
    }
  }

  return (
    <div className='flex h-full'>
      {/* Chart — 70% */}
      <div className='min-h-0 flex-[7] p-4'>
        <ReactEcharts
          option={option}
          style={{ height: '100%', width: '100%' }}
          opts={{ renderer: 'canvas' }}
        />
      </div>

      {/* Text — 30% */}
      <div className='flex min-h-0 flex-[3] flex-col overflow-y-auto border-l border-neutral-800 p-6 pt-5'>
        {(() => {
          const features = FEATURE_EVENTS.filter(
            e => e.year === activeYear && e.month === activeMonth && e.category === 'data-types-formats'
          )
          const monthName = new Date(activeYear, activeMonth - 1, 1).toLocaleString('en-US', { month: 'long' })
          const version = `${activeYear - 2000}.${activeMonth}`
          return (
            <>
              <h3 className='mb-3 text-base font-semibold leading-snug text-white'>
                {monthName} {activeYear} ({version})
                {features.length > 0 && (
                  <span className='ml-1 font-normal text-neutral-400'>
                    — {features.length} feature{features.length !== 1 ? 's' : ''} shipped
                  </span>
                )}
              </h3>
              {features.length > 0 ? (
                <ul className='flex flex-col gap-4'>
                  {features.map(event => (
                    <li key={event.id}>
                      <p className='mb-1 text-sm font-medium text-neutral-200'>{event.title}</p>
                      <p className='text-sm leading-relaxed text-neutral-400'>{event.summary}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className='text-sm italic text-neutral-500'>No new types or formats this release.</p>
              )}
            </>
          )
        })()}
      </div>
    </div>
  )
}

// Size 1–10 mapped to Tailwind font-size + weight
const WORD_SIZE_CLASSES: Record<number, string> = {
   1: 'text-xs  font-normal',
   2: 'text-xs  font-medium',
   3: 'text-sm  font-normal',
   4: 'text-sm  font-medium',
   5: 'text-base font-medium',
   6: 'text-lg  font-semibold',
   7: 'text-xl  font-semibold',
   8: 'text-2xl font-bold',
   9: 'text-3xl font-bold',
  10: 'text-4xl font-extrabold',
}

// Yellow-family palette derived from the ClickHouse brand yellow
const WORD_COLORS = [
  '#FAFF69', // brand yellow
  '#FFE55C', // golden yellow
  '#FFF176', // light yellow
  '#FFD740', // amber
  '#FFCA28', // deep golden
  '#FFF59D', // pale yellow
  '#F9A825', // dark amber
  '#FFEE58', // mid yellow
]

// Deterministic pseudo-random number from a string seed + integer slot
function hashRand(seed: string, slot: number): number {
  let h = slot * 2654435761
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 2246822519)
  }
  return ((h >>> 0) % 1000) / 1000
}

function DataLakesPanel({ activeYear, activeMonth }: { activeYear: number; activeMonth: number }) {
  // Collect all terms from releases up to and including the active month
  const activeTerms = DATA_LAKES_RELEASES
    .filter(r => r.year < activeYear || (r.year === activeYear && r.month <= activeMonth))
    .flatMap(r => r.terms)

  const features = FEATURE_EVENTS.filter(
    e => e.year === activeYear && e.month === activeMonth && e.category === 'data-lakes'
  )
  const monthName = new Date(activeYear, activeMonth - 1, 1).toLocaleString('en-US', { month: 'long' })
  const version = `${activeYear - 2000}.${activeMonth}`

  return (
    <div className='flex h-full'>
      {/* Word cloud — 70% */}
      <div className='flex min-h-0 flex-[7] flex-wrap content-center justify-center gap-x-5 gap-y-1 overflow-hidden p-6'>
        <AnimatePresence>
          {activeTerms.map((term, i) => {
            const ty  = (hashRand(term.word, 0) * 28 - 14)  // –14px … +14px
            const rot = (hashRand(term.word, 1) * 10  -  5)  //  –5deg … +5deg
            return (
              <motion.span
                key={term.word}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ type: 'spring', bounce: 0.3, duration: 0.4, delay: i * 0.02 }}
                className={`leading-none ${WORD_SIZE_CLASSES[term.size] ?? 'text-sm font-normal'}`}
                style={{
                  color: WORD_COLORS[i % WORD_COLORS.length],
                  transform: `translateY(${ty}px) rotate(${rot}deg)`,
                  display: 'inline-block',
                }}
              >
                {term.word}
              </motion.span>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Text — 30% */}
      <div className='flex min-h-0 flex-[3] flex-col overflow-y-auto border-l border-neutral-800 p-6 pt-5'>
        <h3 className='mb-3 text-base font-semibold leading-snug text-white'>
          {monthName} {activeYear} ({version})
          {features.length > 0 && (
            <span className='ml-1 font-normal text-neutral-400'>
              — {features.length} feature{features.length !== 1 ? 's' : ''} shipped
            </span>
          )}
        </h3>
        {features.length > 0 ? (
          <ul className='flex flex-col gap-4'>
            {features.map(event => (
              <li key={event.id}>
                <p className='mb-1 text-sm font-medium text-neutral-200'>{event.title}</p>
                <p className='text-sm leading-relaxed text-neutral-400'>{event.summary}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className='text-sm italic text-neutral-500'>No new data lake improvements this release.</p>
        )}
      </div>
    </div>
  )
}

// ─── Indexes panel ────────────────────────────────────────────────────────────

function filterTree(
  node: IndexTreeNode,
  activeYear: number,
  activeMonth: number
): IndexTreeNode | null {
  const released =
    node.year < activeYear ||
    (node.year === activeYear && node.month <= activeMonth)
  if (!released) return null
  return {
    ...node,
    children: node.children
      ?.map((c) => filterTree(c, activeYear, activeMonth))
      .filter(Boolean) as IndexTreeNode[] | undefined
  }
}

function toEChartsNode(
  node: IndexTreeNode,
  activeYear: number,
  activeMonth: number
): object {
  const isNew = node.year === activeYear && node.month === activeMonth
  return {
    name: node.name,
    itemStyle: {
      color: isNew ? CH_YELLOW : '#665e00',
      borderColor: isNew ? CH_YELLOW : '#998f00',
      borderWidth: isNew ? 2 : 1,
      shadowBlur: isNew ? 8 : 0,
      shadowColor: isNew ? CH_YELLOW : 'transparent'
    },
    label: {
      color: isNew ? CH_YELLOW : '#998f00',
      fontWeight: isNew ? 'bold' : 'normal'
    },
    children: node.children?.map((c) => toEChartsNode(c, activeYear, activeMonth))
  }
}

function IndexesPanel({ activeYear, activeMonth }: { activeYear: number; activeMonth: number }) {
  // Always show at least the base tree (22.2); clamp earlier months to 22.2
  const filterYear = activeYear < 2022 || (activeYear === 2022 && activeMonth < 2) ? 2022 : activeYear
  const filterMonth = activeYear < 2022 || (activeYear === 2022 && activeMonth < 2) ? 2 : activeMonth

  const activeTree = filterTree(INDEXES_TREE, filterYear, filterMonth)

  const features = FEATURE_EVENTS.filter(
    (e) => e.year === activeYear && e.month === activeMonth && e.category === 'indexes'
  )
  const monthName = new Date(activeYear, activeMonth - 1, 1).toLocaleString('en-US', { month: 'long' })
  const version = `${activeYear - 2000}.${activeMonth}`

  const option = {
    backgroundColor: 'transparent',
    series: [
      {
        type: 'tree',
        data: [activeTree ? toEChartsNode(activeTree, activeYear, activeMonth) : { name: '' }],
        orient: 'LR',
        top: '5%',
        left: '8%',
        bottom: '5%',
        right: '22%',
        symbolSize: 7,
        roam: false,
        expandAndCollapse: false,
        initialTreeDepth: -1,
        lineStyle: { color: '#444', width: 1.5, curveness: 0.5 },
        label: {
          position: 'left',
          verticalAlign: 'middle',
          align: 'right',
          fontSize: 11,
          color: '#998f00'
        },
        leaves: {
          label: {
            position: 'right',
            verticalAlign: 'middle',
            align: 'left'
          }
        },
        animationDuration: 400,
        animationEasing: 'cubicOut'
      }
    ],
    tooltip: {
      formatter: (p: { data: { name: string } }) => p.data.name,
      backgroundColor: '#1d1d1d',
      borderColor: '#414141',
      textStyle: { color: '#e5e5e5' }
    }
  }

  return (
    <div className='flex h-full'>
      {/* Tree — 70% */}
      <div className='min-h-0 flex-[7] p-4'>
        <ReactEcharts
          option={option}
          style={{ height: '100%', width: '100%' }}
          opts={{ renderer: 'canvas' }}
        />
      </div>

      {/* Text — 30% */}
      <div className='flex min-h-0 flex-[3] flex-col overflow-y-auto border-l border-neutral-800 p-6 pt-5'>
        <h3 className='mb-3 text-base font-semibold leading-snug text-white'>
          {monthName} {activeYear} ({version})
          {features.length > 0 && (
            <span className='ml-1 font-normal text-neutral-400'>
              — {features.length} feature{features.length !== 1 ? 's' : ''} shipped
            </span>
          )}
        </h3>
        {features.length > 0 ? (
          <ul className='flex flex-col gap-4'>
            {features.map((event) => (
              <li key={event.id}>
                <p className='mb-1 text-sm font-medium text-neutral-200'>{event.title}</p>
                <p className='text-sm leading-relaxed text-neutral-400'>{event.summary}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className='text-sm italic text-neutral-500'>No new index improvements this release.</p>
        )}
      </div>
    </div>
  )
}

function CategoryPanel({
  category,
  activeYear,
  activeMonth
}: {
  category: EventCategory | 'all'
  activeYear: number
  activeMonth: number
}) {
  return (
    <div
      className='mb-10 overflow-hidden rounded-lg border border-neutral-700 bg-neutral-900'
      style={{ height: '30vh', minHeight: 220 }}>
      {category === 'joins' ? (
        <JoinsPanel year={activeYear} month={activeMonth} />
      ) : category === 'data-types-formats' ? (
        <DataTypesPanel activeYear={activeYear} activeMonth={activeMonth} />
      ) : category === 'data-lakes' ? (
        <DataLakesPanel activeYear={activeYear} activeMonth={activeMonth} />
      ) : category === 'indexes' ? (
        <IndexesPanel activeYear={activeYear} activeMonth={activeMonth} />
      ) : (
        <div className='flex h-full items-center justify-center'>
          <p className='text-sm italic text-neutral-500'>
            Category content coming soon…
          </p>
        </div>
      )}
    </div>
  )
}

// ─── Timeline ─────────────────────────────────────────────────────────────────

type TimelineItem =
  | { type: 'year'; year: number }
  | {
      type: 'month'
      year: number
      month: number
      events: FeatureEvent[]
      dateLabel: string
    }

function buildItems(activeFilter: EventCategory | 'all'): TimelineItem[] {
  // Cap at the previous completed month
  const prev = new Date()
  prev.setDate(1)
  prev.setMonth(prev.getMonth() - 1)
  const cutoffYear = prev.getFullYear()
  const cutoffMonth = prev.getMonth() + 1 // 1-indexed

  // Earliest event across ALL categories, or the start of benchmark data — whichever is older
  const earliestEvent = [...FEATURE_EVENTS].sort((a, b) =>
    a.year !== b.year ? a.year - b.year : a.month - b.month
  )[0]
  const benchmarkStart = JOINS_BENCHMARK_DATA[JOINS_BENCHMARK_DATA.length - 1]
  const earliest =
    benchmarkStart.year < earliestEvent.year ||
    (benchmarkStart.year === earliestEvent.year &&
      benchmarkStart.month < earliestEvent.month)
      ? benchmarkStart
      : earliestEvent

  // Events matching the active filter, grouped by month
  const filteredEvents = FEATURE_EVENTS.filter(
    (e) =>
      (e.year < cutoffYear ||
        (e.year === cutoffYear && e.month <= cutoffMonth)) &&
      (activeFilter === 'all' || e.category === activeFilter)
  )
  const eventsByMonth = new Map<string, FeatureEvent[]>()
  filteredEvents.forEach((e) => {
    const key = `${e.year}-${e.month}`
    if (!eventsByMonth.has(key)) eventsByMonth.set(key, [])
    eventsByMonth.get(key)!.push(e)
  })

  // Walk every month newest-first, one item per month
  const items: TimelineItem[] = []
  let y = cutoffYear
  let m = cutoffMonth
  let lastYear: number | null = null

  while (y > earliest.year || (y === earliest.year && m >= earliest.month)) {
    if (y !== lastYear) {
      items.push({ type: 'year', year: y })
      lastYear = y
    }

    const events = (eventsByMonth.get(`${y}-${m}`) ?? [])
      .slice()
      .sort((a, b) => a.id.localeCompare(b.id))

    const version = y >= 2018 ? `${y - 2000}.${m}` : null
    const dateLabel = version
      ? `${MONTH_NAMES[m - 1]} · ${version}`
      : `${MONTH_NAMES[m - 1]} ${y}`

    items.push({ type: 'month', year: y, month: m, events, dateLabel })

    m--
    if (m === 0) {
      m = 12
      y--
    }
  }

  return items
}

// Shared element styles
const cardContentStyle = {
  background: CARD_BG,
  border: `1px solid ${CARD_BORDER}`,
  boxShadow: 'none',
  borderRadius: '8px',
  padding: '16px'
} as const

const cardArrowStyle = {
  borderRight: `7px solid ${CARD_BORDER}`
} as const

const eventIconStyle = {
  background: CH_YELLOW,
  boxShadow: 'none',
  width: 36,
  height: 36,
  marginLeft: -18,
  marginTop: -18
} as const

const yearIconStyle = {
  background: YEAR_COLOR,
  boxShadow: `0 0 0 4px ${YEAR_COLOR}33`,
  width: 54,
  height: 54,
  marginLeft: -27,
  marginTop: -27
} as const

const yearContentStyle = {
  background: 'transparent',
  boxShadow: 'none',
  border: 'none',
  padding: '0'
} as const

const emptyMonthIconStyle = {
  background: CH_YELLOW,
  boxShadow: 'none',
  width: 16,
  height: 16,
  marginLeft: -8,
  marginTop: -8
} as const

const emptyMonthContentStyle = {
  background: 'transparent',
  boxShadow: 'none',
  border: 'none',
  padding: '0',
  minHeight: '0'
} as const

function FeatureJourneyTimeline() {
  const [activeFilter, setActiveFilter] = useState<EventCategory | 'all'>(
    'joins'
  )
  const [activeMonthKey, setActiveMonthKey] = useState<string | null>(null)
  const items = useMemo(() => buildItems(activeFilter), [activeFilter])

  // Compute selectable months: feature months + earliest + latest only.
  // These are the only months with large dots and the only ones the scroll tracker watches.
  const { earliestMonthKey, latestMonthKey, selectableMonthKeys } =
    useMemo(() => {
      const monthItems = items.filter(
        (i): i is Extract<TimelineItem, { type: 'month' }> => i.type === 'month'
      )
      const first = monthItems[0]
      const last = monthItems[monthItems.length - 1]
      const earliestKey = last ? `${last.year}-${last.month}` : null
      const latestKey = first ? `${first.year}-${first.month}` : null
      const selectable = new Set<string>()
      for (const item of monthItems) {
        const key = `${item.year}-${item.month}`
        if (
          item.events.length > 0 ||
          key === earliestKey ||
          key === latestKey
        ) {
          selectable.add(key)
        }
      }
      return {
        earliestMonthKey: earliestKey,
        latestMonthKey: latestKey,
        selectableMonthKeys: selectable
      }
    }, [items])

  // Track which selectable month element is closest to the vertical centre of the viewport
  useEffect(() => {
    const monthKeys = Array.from(selectableMonthKeys)

    let rafId: number | null = null

    const handleScroll = () => {
      if (rafId !== null) return
      rafId = requestAnimationFrame(() => {
        rafId = null

        // At the very bottom of the page the earliest element can't reach viewport centre —
        // snap to it directly so it always gets selected when scrolled all the way down.
        const atBottom =
          window.scrollY + window.innerHeight >=
          document.documentElement.scrollHeight - 8
        if (atBottom) {
          setActiveMonthKey((prev) =>
            prev === earliestMonthKey ? prev : earliestMonthKey
          )
          return
        }

        const centerY = window.innerHeight / 2
        let closestKey: string | null = null
        let closestDist = Infinity

        for (const key of monthKeys) {
          const el = document.getElementById(`month-${key}`)
          if (!el) continue
          const rect = el.getBoundingClientRect()
          const dist = Math.abs(rect.top + rect.height / 2 - centerY)
          if (dist < closestDist) {
            closestDist = dist
            closestKey = key
          }
        }

        setActiveMonthKey((prev) => (prev === closestKey ? prev : closestKey))
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [selectableMonthKeys, earliestMonthKey])

  const [activeYear, activeMonth] = useMemo(() => {
    if (!activeMonthKey) return [2025, 12]
    const [y, m] = activeMonthKey.split('-').map(Number)
    return [y, m]
  }, [activeMonthKey])

  return (
    <>
      <div
        className='sticky z-20 pb-6'
        style={{ top: 72, background: PAGE_BG }}
      >
        <CategoryFilter active={activeFilter} onChange={setActiveFilter} />
        <CategoryPanel
          category={activeFilter}
          activeYear={activeYear}
          activeMonth={activeMonth}
        />
      </div>

      <VerticalTimeline lineColor={CH_YELLOW} animate={true}>
        {items.map((item) => {
          if (item.type === 'year') {
            return (
              <VerticalTimelineElement
                key={`year-${item.year}`}
                iconStyle={yearIconStyle}
                contentStyle={yearContentStyle}
                contentArrowStyle={{ display: 'none' }}
                icon={<YearIcon year={item.year} />}>
                <span
                  style={{
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    fontSize: '22px',
                    color: YEAR_COLOR,
                    display: 'block'
                  }}>
                  {item.year}
                </span>
              </VerticalTimelineElement>
            )
          }

          // One element per month — larger dot if it has features, or is the earliest/latest month
          const hasEvents = item.events.length > 0
          const isActive = activeMonthKey === `${item.year}-${item.month}`
          const monthKey = `${item.year}-${item.month}`
          const isEarliest = monthKey === earliestMonthKey
          const isLatest = monthKey === latestMonthKey
          const showLargeDot = hasEvents || isEarliest || isLatest

          return (
            <VerticalTimelineElement
              key={`month-${item.year}-${item.month}`}
              id={`month-${item.year}-${item.month}`}
              date={item.dateLabel}
              iconStyle={showLargeDot ? eventIconStyle : emptyMonthIconStyle}
              contentStyle={
                hasEvents
                  ? cardContentStyle
                  : isEarliest || isLatest
                    ? { ...emptyMonthContentStyle, minHeight: 40 }
                    : emptyMonthContentStyle
              }
              contentArrowStyle={
                hasEvents ? cardArrowStyle : { display: 'none' }
              }
              style={showLargeDot ? undefined : { marginBottom: 0 }}
              icon={
                isActive && showLargeDot ? (
                  hasEvents ? (
                    <EventIcon category={item.events[0].category} />
                  ) : (
                    <div
                      style={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        background: '#1e293b',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)'
                      }}
                    />
                  )
                ) : null
              }>
              {hasEvents && (
                <div className='flex flex-col gap-3'>
                  {item.events.map((event) => (
                    <EventCardContent key={event.id} event={event} />
                  ))}
                </div>
              )}
            </VerticalTimelineElement>
          )
        })}
      </VerticalTimeline>
    </>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

// Override the library's date positioning so labels sit flush with the top of
// the content box (i.e. vertically aligned with the dot on the spine).
const timelineDateStyles = `
  .vertical-timeline-element-content .vertical-timeline-element-date {
    top: 0 !important;
    transform: translateY(-50%) !important;
    padding-top: 0 !important;
    white-space: nowrap;
  }
`

export default function FeatureJourneyPage({ seo, headerData }: CommonProps) {
  return (
    <Layout seo={seo} headerData={headerData}>
      <style>{timelineDateStyles}</style>
      {/* Hero */}
      <section className='relative overflow-hidden bg-grid pb-8 pt-16 lg:pt-24'>
        <div className='section-container relative z-10'>
          <SuiTitle type='h1' className='mb-6'>
            The ClickHouse Feature Journey
          </SuiTitle>
          <SuiText size='lg' className='text-neutral-200'>
            <p>
              Explore the milestones that transformed ClickHouse into the
              world&apos;s fastest analytical database.
            </p>
          </SuiText>
          <p className='mt-4 text-sm leading-relaxed text-neutral-400'>
            Trace the key features that shaped ClickHouse into the world&apos;s
            fastest analytical database. See how JOIN performance advanced, data
            types and formats expanded, data lake support matured, indexing became
            smarter, while data lifecycle operations grew more powerful and
            flexible. Choose a snapshot and scroll to follow the evolution,
            release by release.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className='pb-16 pt-8 lg:pb-24'>
        <div className='section-container'>
          <FeatureJourneyTimeline />
        </div>
      </section>
    </Layout>
  )
}
