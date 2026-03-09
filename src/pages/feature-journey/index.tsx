import { FEATURE_EVENTS, EventCategory, FeatureEvent } from '@/lib/feature-journey/data'
import { DATA_LAKES_RELEASES } from '@/lib/feature-journey/data-lakes'
import { DATA_TYPES_MONTHLY } from '@/lib/feature-journey/data-types'
import { INDEXES_TREE, IndexTreeNode } from '@/lib/feature-journey/indexes-tree'
import { DATA_LIFECYCLE_STACK } from '@/lib/feature-journey/data-lifecycle'
import {
  JOINS_BENCHMARK_DATA,
  JOINS_TEST_LABELS,
  JOINS_Y_MAX,
  getJoinsBenchmark
} from '@/lib/feature-journey/joins'
import Layout from '@/components/Layout'
import { SuiText, SuiTitle } from '@/components/sui'
import { getCommonProps } from '@/lib/utils/getCommonProps'
import { CommonProps } from '@/types/homepage'
import { AnimatePresence, motion } from 'framer-motion'
import { GetStaticProps } from 'next'
import dynamic from 'next/dynamic'
import { useEffect, useMemo, useRef, useState } from 'react'

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

// ─── Horizontal timeline layout constants ─────────────────────────────────────
const ABOVE_H = 76   // height above the line (for labels)
const YEAR_W  = 72   // width of a year marker item
const EMPTY_W = 30   // width of an empty-month item
const LARGE_DOT_W = 64  // width of a selectable month without events
const EVENT_W = 220  // width of a month-with-events item
const DOT_LARGE = 28 // diameter of event/endpoint dot
const DOT_SMALL = 11 // diameter of empty-month dot

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
    'rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors'
  const on = 'border-primary-300 bg-primary-300/10 text-primary-300'
  const off =
    'border-neutral-700 text-neutral-400 hover:border-neutral-500 hover:text-neutral-200'

  return (
    <div className='mb-2 flex flex-wrap gap-1.5 pt-2'>
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
            fontWeight: 'bold' as const
          }
        }
      : {
          value: v,
          itemStyle: { color: CH_YELLOW, borderRadius: [2, 2, 0, 0] }
        }
  )

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const option: any = {
    backgroundColor: 'transparent',
    title: {
      text: 'TPC-H Benchmark',
      left: 'center',
      textStyle: { color: '#ffffff', fontSize: 13, fontWeight: 'bold' as const }
    },
    grid: { top: 44, right: 16, bottom: 68, left: 68, containLabel: false },
    xAxis: {
      type: 'category',
      data: JOINS_TEST_LABELS,
      name: 'Test run',
      nameLocation: 'middle',
      nameGap: 36,
      nameTextStyle: { color: '#ffffff', fontSize: 12, fontWeight: 'bold' as const },
      axisLabel: { color: '#ffffff', fontSize: 11, fontWeight: 'bold' as const, rotate: 45 },
      axisLine: { lineStyle: { color: '#404040' } },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      name: 'Execution time (ms)',
      nameLocation: 'middle',
      nameRotate: 90,
      nameGap: 52,
      nameTextStyle: { color: '#ffffff', fontSize: 12, fontWeight: 'bold' as const },
      axisLabel: { color: '#ffffff', fontSize: 11, fontWeight: 'bold' as const },
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const option: any = {
    backgroundColor: 'transparent',
    title: {
      text: 'Data Types & Formats Supported',
      left: 'center',
      textStyle: { color: '#ffffff', fontSize: 13, fontWeight: 'bold' as const }
    },
    grid: { top: 44, right: 16, bottom: 68, left: 68, containLabel: false },
    xAxis: {
      type: 'category',
      data: DATA_TYPES_LABELS,
      name: 'Release',
      nameLocation: 'middle',
      nameGap: 36,
      nameTextStyle: { color: '#ffffff', fontSize: 12, fontWeight: 'bold' as const },
      axisLabel: { color: '#ffffff', fontSize: 11, fontWeight: 'bold' as const, rotate: 45, interval: 2 },
      axisLine: { lineStyle: { color: '#404040' } },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      name: 'Total supported',
      nameLocation: 'middle',
      nameRotate: 90,
      nameGap: 52,
      nameTextStyle: { color: '#ffffff', fontSize: 12, fontWeight: 'bold' as const },
      axisLabel: { color: '#ffffff', fontSize: 11, fontWeight: 'bold' as const },
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const option: any = {
    backgroundColor: 'transparent',
    series: [
      {
        type: 'tree',
        data: [activeTree ? toEChartsNode(activeTree, activeYear, activeMonth) : { name: '' }],
        orient: 'LR',
        top: '5%',
        left: '20%',
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

// ─── Data Lifecycle panel ─────────────────────────────────────────────────────

// Interpolates between a dark muted yellow (#3d3700) and CH_YELLOW (#FAFF69)
// t = 0 → oldest/dullest, t = 1 → newest/brightest
function lerpYellow(t: number): string {
  const r = Math.round(0x3d + (0xfa - 0x3d) * t)
  const g = Math.round(0x37 + (0xff - 0x37) * t)
  const b = Math.round(0x00 + (0x69 - 0x00) * t)
  return `rgb(${r},${g},${b})`
}


function DataLifecyclePanel({ activeYear, activeMonth }: { activeYear: number; activeMonth: number }) {
  const activeLayers = DATA_LIFECYCLE_STACK
    .filter((f) => f.year < activeYear || (f.year === activeYear && f.month <= activeMonth))

  const features = FEATURE_EVENTS.filter(
    (e) => e.year === activeYear && e.month === activeMonth && e.category === 'data-lifecycle'
  )
  const monthName = new Date(activeYear, activeMonth - 1, 1).toLocaleString('en-US', { month: 'long' })
  const version = `${activeYear - 2000}.${activeMonth}`

  const n = activeLayers.length
  const total = DATA_LIFECYCLE_STACK.length

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const option: any = {
    backgroundColor: 'transparent',
    grid: { top: 16, right: 16, bottom: 16, left: 16, containLabel: false },
    xAxis: {
      type: 'category',
      data: [''],
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: { show: false },
    },
    yAxis: {
      type: 'value',
      show: false,
      min: 0,
      max: total, // fixed ceiling = all layers, so each segment is always the same height
    },
    series: activeLayers.map((layer) => {
      // Use the feature's fixed position in the full stack so colors never shift
      const globalIndex = DATA_LIFECYCLE_STACK.findIndex((f) => f.id === layer.id)
      const t = total > 1 ? globalIndex / (total - 1) : 1
      const color = lerpYellow(t)
      return {
        name: layer.name,
        type: 'bar',
        stack: 'total',
        barWidth: '60%',
        data: [layer.value],
        itemStyle: { color },
        label: {
          show: true,
          position: 'inside',
          color: '#000000',
          fontSize: 11,
          overflow: 'truncate',
          formatter: layer.name,
        },
      }
    }),
    tooltip: {
      trigger: 'item',
      backgroundColor: '#1d1d1d',
      borderColor: '#414141',
      textStyle: { color: '#e5e5e5' },
      formatter: (p: { seriesName: string }) => p.seriesName,
    },
  }

  return (
    <div className='flex h-full'>
      {/* Stack chart — 70% */}
      <div className='min-h-0 flex-[7] p-4'>
        {n === 0 ? (
          <div className='flex h-full items-center justify-center'>
            <p className='text-sm italic text-neutral-500'>No lifecycle features before this release.</p>
          </div>
        ) : (
          <ReactEcharts
            option={option}
            notMerge={true}
            style={{ height: '100%', width: '100%' }}
            opts={{ renderer: 'canvas' }}
          />
        )}
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
          <p className='text-sm italic text-neutral-500'>No new lifecycle improvements this release.</p>
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
      className='h-full overflow-hidden rounded-lg border border-neutral-700 bg-neutral-900'>
      {category === 'joins' ? (
        <JoinsPanel year={activeYear} month={activeMonth} />
      ) : category === 'data-types-formats' ? (
        <DataTypesPanel activeYear={activeYear} activeMonth={activeMonth} />
      ) : category === 'data-lakes' ? (
        <DataLakesPanel activeYear={activeYear} activeMonth={activeMonth} />
      ) : category === 'indexes' ? (
        <IndexesPanel activeYear={activeYear} activeMonth={activeMonth} />
      ) : category === 'data-lifecycle' ? (
        <DataLifecyclePanel activeYear={activeYear} activeMonth={activeMonth} />
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


function FeatureJourneyTimeline() {
  const [activeFilter, setActiveFilter] = useState<EventCategory | 'all'>(
    'joins'
  )
  const MIN_W = 600, MAX_W = 1200, MIN_H = 420, MAX_H = 840

  const [activeMonthKey, setActiveMonthKey] = useState<string | null>(null)
  const [panelPos, setPanelPos] = useState({ x: 24, y: 96 })

  // Position panel at bottom-left on mount
  useEffect(() => {
    setPanelPos({ x: 24, y: window.innerHeight - MIN_H - 24 })
  }, [])
  const containerRef = useRef<HTMLDivElement>(null)
  const [panelSize, setPanelSize] = useState({ width: 600, height: 420 })
  const [timelineOffset, setTimelineOffset] = useState(0)
  const dragState = useRef<{ startMouse: { x: number; y: number }; startPos: { x: number; y: number } } | null>(null)

  const handleResizeStart = (e: React.MouseEvent, dir: 'e' | 's' | 'se') => {
    e.preventDefault()
    e.stopPropagation()
    const startMouse = { x: e.clientX, y: e.clientY }
    const startSize = panelSize
    const startPos = panelPos
    const onMove = (ev: MouseEvent) => {
      const dx = ev.clientX - startMouse.x
      const dy = ev.clientY - startMouse.y
      const maxW = Math.min(MAX_W, window.innerWidth - startPos.x)
      const maxH = Math.min(MAX_H, window.innerHeight - startPos.y)
      setPanelSize({
        width: dir === 's' ? startSize.width : Math.min(maxW, Math.max(MIN_W, startSize.width + dx)),
        height: dir === 'e' ? startSize.height : Math.min(maxH, Math.max(MIN_H, startSize.height + dy)),
      })
    }
    const onUp = () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }

  const handleDragStart = (e: React.MouseEvent) => {
    e.preventDefault()
    const capturedSize = panelSize
    dragState.current = { startMouse: { x: e.clientX, y: e.clientY }, startPos: panelPos }
    const onMove = (ev: MouseEvent) => {
      if (!dragState.current) return
      const newX = dragState.current.startPos.x + ev.clientX - dragState.current.startMouse.x
      const newY = dragState.current.startPos.y + ev.clientY - dragState.current.startMouse.y
      setPanelPos({
        x: Math.min(Math.max(0, newX), window.innerWidth - capturedSize.width),
        y: Math.min(Math.max(0, newY), window.innerHeight - capturedSize.height),
      })
    }
    const onUp = () => {
      dragState.current = null
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }
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


  // Center the timeline: first dot appears at horizontal center on load
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    setTimelineOffset(Math.max(0, container.clientWidth / 2 - YEAR_W / 2))
  }, [])

  // Track which selectable month is closest to the horizontal centre of the container
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const monthKeys = Array.from(selectableMonthKeys)
    let rafId: number | null = null

    const handleScroll = () => {
      if (rafId !== null) return
      rafId = requestAnimationFrame(() => {
        rafId = null

        // Snapped all the way right → latest month
        const atRight = container.scrollLeft + container.clientWidth >= container.scrollWidth - 8
        if (atRight) {
          setActiveMonthKey((prev) => (prev === latestMonthKey ? prev : latestMonthKey))
          return
        }
        // Snapped all the way left → earliest month
        if (container.scrollLeft <= 8) {
          setActiveMonthKey((prev) => (prev === earliestMonthKey ? prev : earliestMonthKey))
          return
        }

        const containerRect = container.getBoundingClientRect()
        const centerX = containerRect.left + containerRect.width / 2
        let closestKey: string | null = null
        let closestDist = Infinity

        for (const key of monthKeys) {
          const el = document.getElementById(`month-${key}`)
          if (!el) continue
          const rect = el.getBoundingClientRect()
          const dist = Math.abs(rect.left + rect.width / 2 - centerX)
          if (dist < closestDist) {
            closestDist = dist
            closestKey = key
          }
        }

        setActiveMonthKey((prev) => (prev === closestKey ? prev : closestKey))
      })
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      container.removeEventListener('scroll', handleScroll)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [selectableMonthKeys, latestMonthKey, earliestMonthKey])

  const [activeYear, activeMonth] = useMemo(() => {
    if (!activeMonthKey) return [2025, 12]
    const [y, m] = activeMonthKey.split('-').map(Number)
    return [y, m]
  }, [activeMonthKey])

  // Reverse to oldest-first for left→right display
  const displayItems = useMemo(() => [...items].reverse(), [items])

  return (
    <>
      {/* Floating draggable + resizable panel */}
      <div
        style={{
          position: 'fixed',
          left: panelPos.x,
          top: panelPos.y,
          zIndex: 50,
          width: panelSize.width,
          height: panelSize.height,
          background: '#1a1a1a',
          border: `1px solid ${CARD_BORDER}`,
          borderRadius: 10,
          boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
          userSelect: 'none',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Drag handle */}
        <div
          onMouseDown={handleDragStart}
          style={{
            cursor: 'grab',
            padding: '5px 10px',
            flexShrink: 0,
            borderBottom: `1px solid ${CARD_BORDER}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ color: '#666', fontSize: 11, letterSpacing: 2 }}>⠿⠿</span>
          <span style={{ color: '#888', fontSize: 11 }}>
            {activeMonthKey === latestMonthKey ? (
              <>ClickHouse <span style={{ color: CH_YELLOW }}>today</span></>
            ) : (
              <>
                ClickHouse in{' '}
                <span style={{ color: CH_YELLOW }}>
                  {new Date(activeYear, activeMonth - 1, 1).toLocaleString('en-US', { month: 'long' })}{' '}
                  {activeYear}
                </span>
              </>
            )}
          </span>
          <span style={{ color: '#555', fontSize: 11, letterSpacing: 2 }}>⠿⠿</span>
        </div>

        {/* Content */}
        <div style={{ flex: 1, minHeight: 0, padding: '4px 10px 8px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flexShrink: 0 }}>
            <CategoryFilter active={activeFilter} onChange={setActiveFilter} />
          </div>
          <div style={{ flex: 1, minHeight: 0 }}>
            <CategoryPanel
              category={activeFilter}
              activeYear={activeYear}
              activeMonth={activeMonth}
            />
          </div>
        </div>

        {/* Resize handles */}
        <div
          onMouseDown={e => handleResizeStart(e, 'e')}
          style={{ position: 'absolute', right: 0, top: 12, bottom: 12, width: 5, cursor: 'ew-resize' }}
        />
        <div
          onMouseDown={e => handleResizeStart(e, 's')}
          style={{ position: 'absolute', bottom: 0, left: 12, right: 12, height: 5, cursor: 'ns-resize' }}
        />
        <div
          onMouseDown={e => handleResizeStart(e, 'se')}
          style={{
            position: 'absolute', right: 0, bottom: 0, width: 14, height: 14,
            cursor: 'nwse-resize',
            background: 'linear-gradient(135deg, transparent 50%, #555 50%)',
            borderBottomRightRadius: 10,
          }}
        />
      </div>

      {/* Horizontal Timeline */}
      <div style={{ position: 'relative' }}>
      <div
        ref={containerRef}
        style={{
          overflowX: 'auto',
          overflowY: 'hidden',
          position: 'relative',
          height: 440,
          cursor: 'default',
          scrollSnapType: 'x mandatory',
        }}
      >
        <div style={{
          display: 'flex',
          position: 'relative',
          height: '100%',
          minWidth: 'max-content',
          paddingLeft: timelineOffset,
          paddingRight: 80,
        }}>
          {/* Continuous horizontal line — starts at the first dot, fades out at the right */}
          <div style={{
            position: 'absolute',
            left: timelineOffset + YEAR_W / 2,
            right: 0,
            top: ABOVE_H,
            height: 2,
            background: `linear-gradient(to right, ${CH_YELLOW} 0%, ${CH_YELLOW} calc(100% - 80px), transparent 100%)`,
            zIndex: 0,
            pointerEvents: 'none',
          }} />

          {displayItems.map((item) => {
            if (item.type === 'year') {
              return (
                <div
                  key={`year-${item.year}`}
                  style={{ width: YEAR_W, flexShrink: 0, position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                >
                  <div style={{ height: ABOVE_H, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 18 }}>
                    <span style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: 15, color: '#9ca3af' }}>
                      {item.year}
                    </span>
                  </div>
                  <div style={{
                    position: 'absolute',
                    top: ABOVE_H - 10,
                    width: 20, height: 20,
                    borderRadius: '50%',
                    background: '#6b7280',
                    boxShadow: `0 0 0 3px #6b728033`,
                    zIndex: 2,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span style={{ fontSize: 8, fontWeight: 700, color: '#e5e7eb' }}>
                      {String(item.year).slice(2)}
                    </span>
                  </div>
                </div>
              )
            }

            const hasEvents = item.events.length > 0
            const isActive = activeMonthKey === `${item.year}-${item.month}`
            const monthKey = `${item.year}-${item.month}`
            const isEarliest = monthKey === earliestMonthKey
            const isLatest = monthKey === latestMonthKey
            const showLargeDot = hasEvents || isEarliest || isLatest
            const dotSize = showLargeDot ? DOT_LARGE : DOT_SMALL
            const itemWidth = hasEvents ? EVENT_W : (showLargeDot ? LARGE_DOT_W : EMPTY_W)
            const dotColor = isActive ? CH_YELLOW : (showLargeDot ? '#9ca3af' : '#4b5563')

            return (
              <div
                key={`month-${item.year}-${item.month}`}
                id={`month-${item.year}-${item.month}`}
                style={{ width: itemWidth, flexShrink: 0, position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', ...(showLargeDot ? { scrollSnapAlign: 'center' } : {}) }}
              >
                {/* Date label above the line */}
                <div style={{ height: ABOVE_H, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: dotSize / 2 + 10 }}>
                  {showLargeDot && (
                    <span style={{
                      fontSize: 10,
                      color: isActive ? CH_YELLOW : '#6b7280',
                      whiteSpace: 'nowrap',
                      fontWeight: isActive ? 600 : 400,
                      transition: 'color 0.2s',
                    }}>
                      {item.dateLabel}
                    </span>
                  )}
                </div>

                {/* Active indicator — bouncing arrow above the date label */}
                {isActive && (
                  <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                      position: 'absolute',
                      top: 4,
                      width: 0,
                      height: 0,
                      borderLeft: '6px solid transparent',
                      borderRight: '6px solid transparent',
                      borderTop: `8px solid ${CH_YELLOW}`,
                      zIndex: 3,
                    }}
                  />
                )}

                {/* Dot on the line */}
                <div style={{
                  position: 'absolute',
                  top: ABOVE_H - dotSize / 2,
                  width: dotSize, height: dotSize,
                  borderRadius: '50%',
                  background: dotColor,
                  border: isActive ? `2px solid ${CH_YELLOW}` : `1px solid ${CH_YELLOW}`,
                  boxShadow: isActive ? `0 0 10px ${CH_YELLOW}88` : 'none',
                  zIndex: 2,
                  transition: 'all 0.2s ease',
                }} />

                {/* "ClickHouse was founded" label for earliest item */}
                {isEarliest && !hasEvents && (
                  <div style={{
                    marginTop: DOT_LARGE / 2 + 12,
                    fontSize: 10,
                    color: '#6b7280',
                    whiteSpace: 'nowrap',
                    textAlign: 'center',
                    fontStyle: 'italic',
                  }}>
                    ClickHouse founded
                  </div>
                )}

                {/* Card below the line */}
                {hasEvents && (
                  <div style={{
                    marginTop: DOT_LARGE / 2 + 12,
                    width: EVENT_W - 20,
                    maxHeight: 320,
                    overflowY: 'auto',
                    background: CARD_BG,
                    border: isActive ? `2px solid ${CH_YELLOW}` : `1px solid ${CARD_BORDER}`,
                    borderRadius: 8,
                    padding: '10px 12px',
                    opacity: isActive ? 1 : 0.4,
                    transition: 'border-color 0.2s ease, opacity 0.2s ease',
                  }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {item.events.map(event => {
                        const meta = CATEGORY_META[event.category]
                        return (
                          <div key={event.id}>
                            <span className={`mb-1 inline-flex items-center rounded border px-1.5 py-0.5 text-xs font-medium ${meta.badgeClass}`}>
                              {meta.label}
                            </span>
                            <p style={{ fontSize: 12, fontWeight: 600, color: '#fff', margin: '3px 0 2px', lineHeight: 1.3 }}>{event.title}</p>
                            <p style={{ fontSize: 11, color: '#888', lineHeight: 1.4, margin: 0 }}>{event.summary}</p>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
      </div>
    </>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FeatureJourneyPage({ seo, headerData }: CommonProps) {
  return (
    <Layout seo={seo} headerData={headerData}>
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
            flexible. Choose a snapshot and scroll to travel back in time,
            release by release.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className='pb-16 pt-8 lg:pb-24'>
        <FeatureJourneyTimeline />
      </section>
    </Layout>
  )
}
