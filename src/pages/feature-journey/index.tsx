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

// ─── Category filter ──────────────────────────────────────────────────────────

function CategoryFilter({
  active,
  onChange
}: {
  active: EventCategory | 'all'
  onChange: (v: EventCategory | 'all') => void
}) {
  return (
    <div className='mb-2 flex flex-wrap justify-center gap-1.5 pt-2'>
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`rounded-full border px-2.5 py-0.5 text-sm font-medium transition-colors ${
            active === cat
              ? 'border-[#FAFF69] bg-[#FAFF69] text-black'
              : 'border-neutral-700 text-neutral-400 hover:border-neutral-500 hover:text-neutral-200'
          }`}>
          {CATEGORY_META[cat].label}
        </button>
      ))}
    </div>
  )
}

// ─── Joins panel ──────────────────────────────────────────────────────────────

const FAIL_STUB = Math.ceil(JOINS_Y_MAX * 0.04)

function JoinsPanel({ year, month }: { year: number; month: number }) {
  const benchmark = getJoinsBenchmark(year, month)
  const values = benchmark?.values ?? getJoinsBenchmark(2025, 12)?.values ?? []

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
    <div className='h-full p-4'>
      <ReactEcharts
        option={option}
        style={{ height: '100%', width: '100%' }}
        opts={{ renderer: 'canvas' }}
      />
    </div>
  )
}

// ─── Data Types panel ─────────────────────────────────────────────────────────

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
      color: DATA_TYPES_LABELS[i] === activeLabel ? CH_YELLOW : '#3a3a3a',
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
    <div className='h-full p-4'>
      <ReactEcharts
        option={option}
        style={{ height: '100%', width: '100%' }}
        opts={{ renderer: 'canvas' }}
      />
    </div>
  )
}

// ─── Data Lakes panel ─────────────────────────────────────────────────────────

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

  return (
    <div className='h-full'>
      <div className='flex h-full flex-wrap content-center justify-center gap-x-5 gap-y-1 overflow-hidden p-6'>
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
      <div className='min-h-0 flex-[7] p-4'>
        <ReactEcharts
          option={option}
          style={{ height: '100%', width: '100%' }}
          opts={{ renderer: 'canvas' }}
        />
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
      max: total,
    },
    series: activeLayers.map((layer) => {
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
    <div className='h-full p-4'>
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
  )
}

// ─── Category panel ───────────────────────────────────────────────────────────

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
    <div className='h-full overflow-hidden'>
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

// ─── Timeline items builder ───────────────────────────────────────────────────

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

// ─── Vertical Timeline ────────────────────────────────────────────────────────

function VerticalTimeline({
  activeFilter,
  onActiveMonthChange
}: {
  activeFilter: EventCategory | 'all'
  onActiveMonthChange?: (year: number, month: number) => void
}) {
  const [activeMonthKey, setActiveMonthKey] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [hoveredKey, setHoveredKey] = useState<string | null>(null)
  const [halfHeight, setHalfHeight] = useState(240)

  const items = useMemo(() => buildItems(activeFilter), [activeFilter])

  const { earliestMonthKey, latestMonthKey, selectableMonthKeys } =
    useMemo(() => {
      const monthItems = items.filter(
        (i): i is Extract<TimelineItem, { type: 'month' }> => i.type === 'month'
      )
      const first = monthItems[0]
      const last = monthItems[monthItems.length - 1]
      const latestKey = first ? `${first.year}-${first.month}` : null
      const earliestKey = last ? `${last.year}-${last.month}` : null
      const selectable = new Set<string>()
      for (const item of monthItems) {
        const key = `${item.year}-${item.month}`
        if (item.events.length > 0 || key === earliestKey || key === latestKey) {
          selectable.add(key)
        }
      }
      return {
        earliestMonthKey: earliestKey,
        latestMonthKey: latestKey,
        selectableMonthKeys: selectable,
      }
    }, [items])

  // Scroll tracking: find the selectable month closest to the vertical center
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    let rafId: number | null = null
    const handleScroll = () => {
      if (rafId !== null) return
      rafId = requestAnimationFrame(() => {
        rafId = null
        const rect = el.getBoundingClientRect()
        const centerY = rect.top + rect.height / 2
        let closestKey: string | null = null
        let closestDist = Infinity
        for (const key of Array.from(selectableMonthKeys)) {
          const itemEl = document.getElementById(`vtl-${key}`)
          if (!itemEl) continue
          const itemRect = itemEl.getBoundingClientRect()
          const dist = Math.abs(itemRect.top + itemRect.height / 2 - centerY)
          if (dist < closestDist) {
            closestDist = dist
            closestKey = key
          }
        }
        setActiveMonthKey((prev) => (prev === closestKey ? prev : closestKey))
      })
    }

    el.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => {
      el.removeEventListener('scroll', handleScroll)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [selectableMonthKeys])

  // Derive active year/month from key
  const [activeYear, activeMonth] = useMemo(() => {
    if (!activeMonthKey) return [2025, 12]
    const [y, m] = activeMonthKey.split('-').map(Number)
    return [y, m]
  }, [activeMonthKey])

  // Notify parent when active month changes
  useEffect(() => {
    onActiveMonthChange?.(activeYear, activeMonth)
  }, [activeYear, activeMonth, onActiveMonthChange])

  // Track scroll container height for top/bottom padding
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const update = () => setHalfHeight(el.clientHeight / 2)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const handleClick = (key: string) => {
    setActiveMonthKey(key)
  }

  return (
    <div ref={scrollRef} style={{ overflowY: 'auto', height: '100%', scrollSnapType: 'y mandatory' }}>
      <div style={{ position: 'relative', paddingTop: halfHeight, paddingBottom: halfHeight }}>
        {/* Vertical line */}
        <div
          style={{
            position: 'absolute',
            left: 23,
            top: 0,
            bottom: 0,
            width: 2,
            background: `linear-gradient(to bottom, ${CH_YELLOW}, transparent)`,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        {items.map((item) => {
          if (item.type === 'year') {
            return (
              <div
                key={`vy-${item.year}`}
                style={{ display: 'flex', alignItems: 'center', padding: '8px 16px 8px 12px' }}
              >
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    flexShrink: 0,
                    zIndex: 2,
                    position: 'relative',
                    background: '#2a2a2a',
                    border: '1px solid #4b5563',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span style={{ fontSize: 8, fontWeight: 700, color: '#9ca3af' }}>
                    {String(item.year).slice(2)}
                  </span>
                </div>
                <span style={{ marginLeft: 8, fontSize: 16, fontWeight: 700, color: '#6b7280' }}>
                  {item.year}
                </span>
              </div>
            )
          }

          const monthKey = `${item.year}-${item.month}`
          const isActive = activeMonthKey === monthKey
          const hasEvents = item.events.length > 0
          const isSelectable = hasEvents || monthKey === earliestMonthKey || monthKey === latestMonthKey
          const isHovered = hasEvents && hoveredKey === monthKey

          const dotSize = isActive ? 18 : isSelectable ? 14 : 7
          const dotColor = isActive
            ? CH_YELLOW
            : isHovered
            ? '#d1d5db'
            : isSelectable
            ? '#9ca3af'
            : '#4b5563'

          // Events shown inline when this month is active
          const inlineEvents = isActive
            ? FEATURE_EVENTS.filter(
                (e) =>
                  e.year === item.year &&
                  e.month === item.month &&
                  (activeFilter === 'all' || e.category === activeFilter)
              )
            : []

          return (
            <div
              key={`vm-${monthKey}`}
              id={`vtl-${monthKey}`}
              onClick={hasEvents ? () => handleClick(monthKey) : undefined}
              onMouseEnter={hasEvents ? () => setHoveredKey(monthKey) : undefined}
              onMouseLeave={hasEvents ? () => setHoveredKey(null) : undefined}
              style={{
                padding: isSelectable ? '8px 24px 8px 12px' : '3px 24px 3px 12px',
                cursor: hasEvents ? 'pointer' : 'default',
                position: 'relative',
                scrollSnapAlign: isSelectable ? 'center' : undefined,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div
                  style={{
                    width: dotSize,
                    height: dotSize,
                    borderRadius: '50%',
                    flexShrink: 0,
                    zIndex: 2,
                    position: 'relative',
                    marginLeft: (24 - dotSize) / 2,
                    background: dotColor,
                    border: isActive || isHovered
                      ? `2px solid ${CH_YELLOW}`
                      : `1px solid ${CH_YELLOW}44`,
                    boxShadow: isActive
                      ? `0 0 8px ${CH_YELLOW}88`
                      : isHovered
                      ? `0 0 5px ${CH_YELLOW}55`
                      : 'none',
                    transition: 'all 0.15s ease',
                  }}
                />
                {isSelectable && (
                  <span
                    style={{
                      fontSize: isActive ? 17 : 15,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      color: isActive ? CH_YELLOW : isHovered ? '#e5e7eb' : '#6b7280',
                      fontWeight: isActive ? 700 : 400,
                      transition: 'color 0.15s, font-size 0.15s',
                    }}
                  >
                    {item.dateLabel}
                  </span>
                )}
              </div>

              {/* Founded label on the earliest item */}
              {monthKey === earliestMonthKey && (
                <div style={{ marginTop: 8, paddingLeft: 40 }}>
                  <span style={{
                    fontSize: 12,
                    color: '#6b7280',
                    fontStyle: 'italic',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}>
                    <span style={{ color: CH_YELLOW }}>⬡</span>
                    ClickHouse open-sourced — June 2016
                  </span>
                </div>
              )}

              {/* Inline events for the active month */}
              {isActive && inlineEvents.length > 0 && (
                <div style={{ marginTop: 10, paddingLeft: 40, display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {inlineEvents.map((event) => (
                    <div key={event.id}>
                      <p style={{ fontSize: 16, fontWeight: 600, color: '#fff', margin: '0 0 5px', lineHeight: 1.35 }}>
                        {event.title}
                      </p>
                      <p style={{ fontSize: 15, color: '#9ca3af', lineHeight: 1.6, margin: 0 }}>
                        {event.summary}
                      </p>
                      {event.url && (
                        <a
                          href={event.url}
                          target='_blank'
                          rel='noopener noreferrer'
                          style={{ fontSize: 14, color: CH_YELLOW, display: 'inline-block', marginTop: 5 }}
                        >
                          Learn more →
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Main interactive section ──────────────────────────────────────────────────

function FeatureJourneyTimeline() {
  const [activeFilter, setActiveFilter] = useState<EventCategory | 'all'>('joins')
  const [activeYear, setActiveYear] = useState(2025)
  const [activeMonth, setActiveMonth] = useState(12)

  return (
    <div className='section-container'>
      <div className='overflow-hidden rounded-xl border border-neutral-700 bg-neutral-900'>
        {/* Category filter bar */}
        <div className='border-b border-neutral-700 px-4 py-3'>
          <CategoryFilter active={activeFilter} onChange={setActiveFilter} />
        </div>

        {/* Two-column body */}
        <div className='flex h-[280px] flex-col lg:h-[480px] lg:flex-row'>
          {/* Left: vertical scrollable timeline */}
          <div className='h-[300px] w-full shrink-0 border-b border-neutral-700 lg:h-full lg:w-[60%] lg:border-b-0 lg:border-r'>
            <VerticalTimeline
              activeFilter={activeFilter}
              onActiveMonthChange={(y, m) => {
                setActiveYear(y)
                setActiveMonth(m)
              }}
            />
          </div>

          {/* Right: chart panel */}
          <div className='min-w-0 flex-1'>
            <CategoryPanel
              category={activeFilter}
              activeYear={activeYear}
              activeMonth={activeMonth}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FeatureJourneyPage({ seo, headerData }: CommonProps) {
  return (
    <Layout seo={seo} headerData={headerData}>
      {/* Hero */}
      <section className='relative overflow-hidden bg-grid pb-8 pt-16 lg:pt-24'>
        <div className='section-container relative z-10 flex flex-col items-center text-center'>
          <div className='max-w-[900px]'>
            <div className='mb-4 inline-flex items-center rounded-full border border-neutral-700 bg-neutral-800 px-3 py-1 text-xs font-medium text-neutral-400'>
              The ClickHouse Feature Journey
            </div>
            <SuiTitle type='h2' className='mb-4'>
              Explore the milestones that transformed ClickHouse into the world&apos;s fastest analytical database.
            </SuiTitle>
            <p className='text-sm leading-relaxed text-neutral-400'>
              From blazing-fast JOINs to native data lake support — discover the features that shaped ClickHouse, release by release.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className='pb-16 pt-8 lg:pb-24'>
        <FeatureJourneyTimeline />
      </section>
    </Layout>
  )
}
