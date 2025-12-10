'use client'

import styles from './styles.module.scss'
import AnimatedDataLine from '@/components-cleaned/AnimatedDataLine'
import iconVs from '@/components-cleaned/ClickHouseVersusAnimation/assets/icon-vs.png'
import CounterAnimation from '@/components-cleaned/CounterAnimation'
import ScaleToContainer from '@/components/ScaleToContainer'
import { motion } from 'motion/react'
import Image, { ImageProps } from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'

function useLoopKey(stage: number) {
  const prev = useRef<number | null>(null)
  const [key, setKey] = useState(0)

  useEffect(() => {
    if (prev.current !== null && stage < prev.current) {
      setKey((k) => 1 - k) // toggle between 0 and 1
    }
    prev.current = stage
  }, [stage])

  return key
}

export interface AnimatedClickHouseScaleVsCompetitorProps {
  name: ImageProps['alt']
  logo: ImageProps['src']
  tileColor?: React.CSSProperties['backgroundColor']
  lineColor?: React.CSSProperties['backgroundColor']
}

export default function AnimatedClickHouseScaleVsCompetitor({
  logo,
  name,
  tileColor = '#fff',
  lineColor
}: AnimatedClickHouseScaleVsCompetitorProps) {
  const [activeClickhouseStep, setActiveClickhouseStep] = useState(0)
  const [activeElasticStep, setActiveElasticStep] = useState(0)
  const clickhouseSteps = [
    {
      rows: 1,
      cols: 1,
      cellWidth: 80,
      cellHeight: 80,
      gutter: 10,
      duration: 600,
      delay: 400
    },
    {
      rows: 1,
      cols: 1,
      cellWidth: 80,
      cellHeight: 170,
      gutter: 10,
      duration: 600,
      delay: 400
    },
    {
      rows: 1,
      cols: 1,
      cellWidth: 80,
      cellHeight: 260,
      gutter: 10,
      duration: 600,
      delay: 400
    },
    {
      rows: 1,
      cols: 2,
      cellWidth: 80,
      cellHeight: 260,
      gutter: 10,
      duration: 600,
      delay: 400
    },

    // Long delay
    {
      rows: 1,
      cols: 2,
      cellWidth: 80,
      cellHeight: 260,
      gutter: 10,
      duration: 0,
      delay: 10000
    }
  ]

  const elasticSteps = [
    {
      cols: 1,
      rows: 1,
      cellWidth: 80,
      cellHeight: 80,
      gutter: 10,
      duration: 1000,
      delay: 800
    },
    {
      cols: 1,
      rows: 2,
      cellWidth: 80,
      cellHeight: 80,
      gutter: 10,
      duration: 1000,
      delay: 800
    },
    {
      cols: 1,
      rows: 3,
      cellWidth: 80,
      cellHeight: 80,
      gutter: 10,
      duration: 1000,
      delay: 800
    },
    {
      cols: 2,
      rows: 3,
      cellWidth: 80,
      cellHeight: 80,
      gutter: 10,
      duration: 1000,
      delay: 800
    },
    {
      cols: 4,
      rows: 6,
      cellWidth: 38.75,
      cellHeight: 38.75,
      gutter: 5,
      duration: 1000,
      delay: 800
    },
    {
      cols: 8,
      rows: 12,
      cellWidth: 16.875,
      cellHeight: 16.875,
      gutter: 5,
      duration: 1000,
      delay: 800
    },

    // Long pause at end of animation
    {
      cols: 8,
      rows: 12,
      cellWidth: 16.875,
      cellHeight: 16.875,
      gutter: 5,
      duration: 0,
      delay: 3000
    }
  ]

  const loopKey = useLoopKey(activeElasticStep)

  const glowClickhouse = activeClickhouseStep >= clickhouseSteps.length - 2

  const clickhouseCounterInterval = [150, 100, 50, 25, 5][activeClickhouseStep]
  const clickhouseCounterIncrement = [1, 2, 3, 4, 4][activeClickhouseStep]

  const elasticCounterInterval = [300, 250, 200, 150, 100, 50, 50][
    activeElasticStep
  ]

  const clickhouseLines = useMemo(() => {
    return [
      [
        { startSize: 0.5, endSize: 1.5, duration: 1.3 },
        { startSize: 1, endSize: 2, duration: 1.25 },
        { startSize: 1.1, endSize: 1, duration: 0.9 },
        { startSize: 2, endSize: 1.5, duration: 0.8 }
      ],
      [
        { startSize: 0.8, endSize: 1.2, duration: 1.3 },
        { startSize: 0.5, endSize: 1.5, duration: 1.5 },
        { startSize: 0.25, endSize: 1, duration: 1 },
        { startSize: 1, endSize: 0.8, duration: 0.7 }
      ],
      [
        { startSize: 1.1, endSize: 1, duration: 1.5 },
        { startSize: 1, endSize: 2, duration: 1.25 },
        { startSize: 0.5, endSize: 1.5, duration: 1.5 }
      ]
    ]
  }, [])

  const elasticLines = useMemo(() => {
    return [
      [
        { startSize: 0.5, endSize: 1.5, duration: 4.8 },
        { startSize: 1, endSize: 2, duration: 4.75 },
        { startSize: 1.1, endSize: 1, duration: 4.4 },
        { startSize: 2, endSize: 1.5, duration: 5.3 }
      ]
    ]
  }, [])

  return (
    <ScaleToContainer scaleUp={false} className='mx-auto'>
      <div className='relative flex w-max flex-row flex-nowrap gap-x-12 lg:gap-x-16'>
        {/* ClickHouse */}
        <div className='w-max'>
          <GridAnimation
            onStepChange={setActiveClickhouseStep}
            steps={clickhouseSteps}
            cell={
              <>
                <div
                  className={`absolute inset-0 transition-opacity duration-500 ${glowClickhouse ? '' : 'opacity-0'}`}>
                  <div className='absolute inset-0 animate-fadeInOut rounded-sm bg-primary-300 blur-lg' />
                </div>
                <div className='absolute inset-0 rounded-sm bg-primary-300'>
                  <div className='absolute inset-[10%]'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='55'
                      height='56'
                      fill='none'
                      viewBox='0 0 55 56'
                      className='absolute h-full w-full'>
                      <path
                        fill='#000'
                        d='M4.87 5.37c0-.27.23-.55.55-.55h4c.28 0 .56.23.56.55V49.9c0 .28-.23.55-.55.55H5.42a.55.55 0 0 1-.55-.55V5.37Zm10.12 0c0-.27.23-.55.55-.55h4c.28 0 .56.23.56.55V49.9c0 .28-.23.55-.55.55h-4.01a.55.55 0 0 1-.55-.55V5.37Zm10.11 0c0-.27.24-.55.56-.55h4c.28 0 .55.23.55.55V49.9c0 .28-.22.55-.54.55h-4.01a.55.55 0 0 1-.55-.55V5.37Zm10.13 0c0-.27.23-.55.55-.55h4c.28 0 .55.23.55.55V49.9c0 .28-.22.55-.54.55h-4.01a.55.55 0 0 1-.55-.55V5.37ZM45.4 23.1c0-.27.22-.54.54-.54h4.01c.28 0 .55.22.55.54v9.07c0 .28-.23.55-.55.55h-4.01a.55.55 0 0 1-.55-.55V23.1Z'
                      />
                    </svg>
                  </div>
                </div>
              </>
            }
          />
          <div
            className={`mx-auto flex w-max gap-3.5 ${styles.animationLineMask}`}
            style={{ marginTop: -130 }}>
            {clickhouseLines.map((keyframes, lineIndex) => {
              return (
                <AnimatedDataLine
                  key={lineIndex}
                  size={210}
                  direction='down'
                  trackColor='rgba(255,255,255,0.2)'
                  keyframes={keyframes}
                />
              )
            })}
          </div>
          <div className='mx-auto inline-flex flex-col rounded border border-neutral-700 bg-neutral-750 px-4 py-2 text-center font-mono text-sm shadow-lg'>
            <CounterAnimation
              fixedWidth={false}
              key={loopKey}
              increment={clickhouseCounterIncrement}
              max={99999}
              interval={clickhouseCounterInterval}
            />{' '}
            <small className='uppercase text-neutral-300'>
              Queries executed
            </small>
          </div>
        </div>

        {/* VS icon */}
        <Image
          src={iconVs}
          width={60}
          height={60}
          alt='VS'
          className='-mt-28 self-center rounded-full shadow-xl'
        />

        {/* Elastic */}
        <div className='w-max'>
          <GridAnimation
            onStepChange={setActiveElasticStep}
            steps={elasticSteps}
            cell={
              <div
                className='absolute inset-0 rounded-sm'
                style={{ backgroundColor: tileColor }}>
                <div className='absolute inset-[10%]'>
                  <Image
                    src={logo}
                    width={56}
                    height={56}
                    alt={name}
                    className='absolute h-full w-full object-contain'
                  />
                </div>
              </div>
            }
          />
          <div
            className={`mx-auto flex w-max gap-3.5 ${styles.animationLineMask}`}
            style={{ marginTop: -130 }}>
            {elasticLines.map((keyframes, lineIndex) => {
              return (
                <AnimatedDataLine
                  key={lineIndex}
                  size={210}
                  direction='down'
                  strokeWidth={8}
                  trackColor='rgba(255,255,255,0.2)'
                  lineColor={lineColor}
                  lineProps={{
                    strokeDasharray: '6 8'
                  }}
                  keyframes={keyframes}
                />
              )
            })}
          </div>
          <div className='mx-auto inline-flex flex-col rounded border border-neutral-700 bg-neutral-750 px-4 py-2 text-center font-mono text-sm shadow-lg'>
            <CounterAnimation
              fixedWidth={false}
              key={loopKey}
              max={99999}
              interval={elasticCounterInterval}
            />{' '}
            <small className='uppercase text-neutral-300'>
              Queries executed
            </small>
          </div>
        </div>
      </div>
    </ScaleToContainer>
  )
}

type GridAnimationStep = {
  rows: number
  cols: number
  cellWidth: number
  cellHeight: number
  gutter: number
  duration: number
  delay?: number
}

export function GridAnimation({
  cell,
  steps,
  onStepChange // called when internal step changes (uncontrolled mode)
}: {
  cell: React.ReactNode
  steps: Array<GridAnimationStep>
  onStepChange?: (next: number) => void
}) {
  type CellStep = {
    id: string
    x: number
    y: number
    width: number
    height: number
  }
  type StableCell = {
    id: string
    bornAt: number
    birthRows: number
    birthCols: number
    birthRow: number
    birthCol: number
  }

  const clamp = (n: number, min: number, max: number) => {
    return Math.min(Math.max(n, min), max)
  }

  const scaleIndex = (i: number, fromN: number, toN: number) => {
    if (toN <= 1 || fromN <= 1) return 0
    return Math.round((i * (toN - 1)) / (fromN - 1))
  }

  // the effective step we render
  const [currentIndex, setCurrentIndex] = useState(0)
  const current = useMemo(() => {
    return steps[currentIndex]
  }, [steps.length, currentIndex])

  // canvas size
  const canvasWidth = useMemo(
    () =>
      Math.max(
        ...steps.map((s) => s.cols * s.cellWidth + (s.cols - 1) * s.gutter)
      ),
    [steps]
  )
  const canvasHeight = useMemo(
    () =>
      Math.max(
        ...steps.map((s) => s.rows * s.cellHeight + (s.rows - 1) * s.gutter)
      ),
    [steps]
  )

  const gridMetrics = (s: GridAnimationStep) => {
    const gridWidth = s.cols * s.cellWidth + (s.cols - 1) * s.gutter
    const gridHeight = s.rows * s.cellHeight + (s.rows - 1) * s.gutter
    const startX = Math.round((canvasWidth - gridWidth) / 2)
    const startY = Math.round((canvasHeight - gridHeight) / 2)
    return { startX, startY }
  }

  // build stable cells with “birth slots”
  const stableCells = useMemo<StableCell[]>(() => {
    const out: StableCell[] = []
    for (let sIdx = 0; sIdx < steps.length; sIdx++) {
      const s = steps[sIdx]
      const targetCount = s.rows * s.cols
      const prevCount =
        sIdx === 0 ? 0 : steps[sIdx - 1].rows * steps[sIdx - 1].cols
      const toCreate = Math.max(0, targetCount - prevCount)
      if (toCreate === 0) continue

      // mark occupied when scaling existing cells into this step
      const occupied = new Set<string>()
      for (const c of out) {
        if (c.bornAt >= sIdx) continue
        const rr = scaleIndex(c.birthRow, c.birthRows, s.rows)
        const cc = scaleIndex(c.birthCol, c.birthCols, s.cols)
        occupied.add(`${rr}:${cc}`)
      }

      // row-major fill for new births
      let created = 0
      outer: for (let r = 0; r < s.rows; r++) {
        for (let c = 0; c < s.cols; c++) {
          const key = `${r}:${c}`
          if (!occupied.has(key)) {
            out.push({
              id: String(out.length),
              bornAt: sIdx,
              birthRows: s.rows,
              birthCols: s.cols,
              birthRow: r,
              birthCol: c
            })
            created++
            if (created >= toCreate) break outer
          }
        }
      }
    }
    return out
  }, [steps])

  const positionAtStep = (cell: StableCell, s: GridAnimationStep): CellStep => {
    const { startX, startY } = gridMetrics(s)
    const r = scaleIndex(cell.birthRow, cell.birthRows, s.rows)
    const c = scaleIndex(cell.birthCol, cell.birthCols, s.cols)
    return {
      id: cell.id,
      x: startX + c * (s.cellWidth + s.gutter),
      y: startY + r * (s.cellHeight + s.gutter),
      width: s.cellWidth,
      height: s.cellHeight
    }
  }

  const birthPositions = useMemo(() => {
    const m = new Map<string, CellStep>()
    for (const c of stableCells) m.set(c.id, positionAtStep(c, steps[c.bornAt]))
    return m
  }, [stableCells, steps])

  const currentLayout = useMemo(() => {
    return stableCells
      .filter((c) => c.bornAt <= currentIndex)
      .map((c) => positionAtStep(c, current))
  }, [stableCells, currentIndex, current])

  // auto-advance (uncontrolled only)
  useEffect(() => {
    onStepChange?.(currentIndex)

    const next = steps[(currentIndex + 1) % steps.length]
    const delay = current.duration + (next.delay || 0)

    const timer = window.setTimeout(() => {
      setCurrentIndex((i) => (i + 1) % steps.length)
    }, delay)

    return () => window.clearTimeout(timer)
  }, [currentIndex, current, steps.length, onStepChange])

  return (
    <div
      className='relative'
      style={{ width: canvasWidth, height: canvasHeight }}>
      {stableCells.map((c) => {
        const birth = birthPositions.get(c.id)!
        const target = currentLayout.find((p) => p.id === c.id)
        const isActive = !!target
        const to = target ?? birth
        return (
          <motion.div
            key={c.id}
            layout={false}
            initial={{
              opacity: 0,
              scale: 0.4,
              x: birth.x,
              y: birth.y,
              width: birth.width,
              height: birth.height,
              originX: 0.5,
              originY: 0.5
            }}
            animate={{
              opacity: isActive ? 1 : 0,
              scale: isActive ? 1 : 0.4,
              x: to.x,
              y: to.y,
              width: to.width,
              height: to.height
            }}
            transition={{
              type: 'tween',
              ease: 'easeInOut',
              duration: current.duration / 1000
            }}
            className='absolute left-0 top-0'>
            {cell}
          </motion.div>
        )
      })}
    </div>
  )
}
