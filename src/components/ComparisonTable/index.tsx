import Markdown from '../Markdown'
import React, { createRef, useEffect, useRef, useState } from 'react'

type Column = {
  heading: string | React.ReactNode
  width?: string | number
  highlight?: boolean
}

type Row = {
  heading: string | React.ReactNode
  values: Array<{ value: boolean; label: string | React.ReactNode }>
}

export interface ComparisonTableProps {
  columns: Array<Column>
  rows: Array<Row>
}

export default function ComparisonTable({
  columns,
  rows
}: ComparisonTableProps) {
  // Validate the lengths of rows' values against the columns length
  if (!rows.every((row) => row.values.length === columns.length)) {
    throw new Error('Row values should be equal to the number of columns.')
  }

  const columnRefs = useRef(
    columns.map(() => createRef<HTMLTableHeaderCellElement>())
  )

  const [highlightCoords, setHighlightCoords] = useState<
    Array<null | React.HTMLProps<HTMLTableHeaderCellElement>['style']>
  >([])

  useEffect(() => {
    const calculateCoords = () => {
      if (columnRefs.current) {
        setHighlightCoords(
          columnRefs.current.map((ref) => {
            if (ref.current) {
              let left = ref.current.offsetLeft
              let width = ref.current.offsetWidth
              return { left, width }
            }
            return null
          })
        )
      }
    }

    calculateCoords()
    window.addEventListener('resize', calculateCoords)
    return () => window.removeEventListener('resize', calculateCoords)
  }, [columnRefs])

  return (
    <>
      {/* Mobile table */}
      <div className='space-y-16 md:hidden'>
        {columns.map((column, columnIndex) => {
          return (
            <div
              key={columnIndex}
              className={
                column.highlight
                  ? 'rounded-lg border-2 border-primary-300 p-6 shadow-noOffset-sm shadow-primary-300/40'
                  : ''
              }>
              <h3 className='mb-6 text-xl font-semibold'>{column.heading}</h3>
              <ul>
                {rows.map(({ heading, values }, rowIndex) => {
                  return (
                    <li
                      key={rowIndex}
                      className='mt-4 border-t border-neutral-700 pt-4'>
                      <RowItem
                        heading={heading}
                        yesNo={values[columnIndex].value ? 'yes' : 'no'}
                        label={values[columnIndex].label}
                      />
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </div>

      {/* Desktop table */}
      <div className='relative hidden pb-3 md:block'>
        {columns.map((column, columnIndex) => {
          return (
            <div
              key={columnIndex}
              style={highlightCoords[columnIndex] || {}}
              className={`pointer-events-none absolute bottom-0 top-0 rounded-lg border-2 border-primary-300 shadow-noOffset-sm shadow-primary-300/40 ${
                column.highlight && highlightCoords[columnIndex]
                  ? 'opacity-100'
                  : 'opacity-0'
              } transition-opacity`}></div>
          )
        })}
        <table className='w-full text-left'>
          <thead>
            <tr>
              <th className='hidden border-b border-neutral-700 py-6 pr-8 text-xl font-semibold lg:table-cell xl:pr-16'></th>
              {columns.map((column, columnIndex) => {
                return (
                  <th
                    key={columnIndex}
                    ref={columnRefs.current[columnIndex]}
                    style={{ width: column.width }}
                    className='border-b border-neutral-700 px-6 py-6 text-xl font-semibold lg:px-8'>
                    {column.heading}
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map(({ heading, values }, rowIndex) => {
              return (
                <tr className='min-h-12' key={rowIndex}>
                  <th className='hidden border-b border-neutral-700 py-4 pr-8 lg:table-cell xl:pr-16'>
                    <span className='text-sm font-bold uppercase text-[#B3B6BD]'>
                      {heading}
                    </span>
                  </th>
                  {values.map((value, columnIndex) => {
                    return (
                      <td
                        key={columnIndex}
                        valign='middle'
                        className='border-b border-neutral-700 px-6 py-4 lg:px-8'>
                        <RowItem
                          heading={heading}
                          yesNo={value.value ? 'yes' : 'no'}
                          label={value.label}
                        />
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

interface RowItemProps {
  heading: string | React.ReactNode
  label: string | React.ReactNode
  yesNo?: 'yes' | 'no'
}

function RowItem({ heading, yesNo, label }: RowItemProps) {
  const labelIsString = typeof label === 'string'
  return (
    <div className='flex items-center gap-4'>
      {typeof yesNo !== 'undefined' && (
        <div className='w-4 flex-shrink-0 flex-grow-0'>
          {yesNo === 'yes' ? <YesIcon /> : <NoIcon />}
        </div>
      )}
      <div className='flex-1'>
        <div className='text-sm font-bold uppercase text-[#B3B6BD] lg:hidden'>
          {heading}
        </div>
        <div className='grid grid-cols-1 gap-3 text-base font-medium text-neutral-200'>
          {labelIsString && <Markdown encloseByDiv={false}>{label}</Markdown>}
          {!labelIsString && label}
        </div>
      </div>
    </div>
  )
}

function YesIcon() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='text-primary'
      width='16'
      height='16'
      fill='none'
      viewBox='0 0 16 16'>
      <path
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        d='M13.3337 4.33331 6.00033 11.6666 2.66699 8.33331'
      />
    </svg>
  )
}

function NoIcon() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='text-[#FFBABA]'
      width='24'
      height='24'
      fill='none'
      viewBox='0 0 24 24'>
      <path
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1.5'
        d='m8 8 8 8m0-8-8 8'
      />
    </svg>
  )
}
