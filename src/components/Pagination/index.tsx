import React from 'react'

const generatePaginationNumbers = (
  page: number,
  totalPages: number,
  display: number = 5,
  ellipsis: string = '…'
): Array<string | number> => {
  const { floor, min, max } = Math
  const range = (lo: number, hi: number) =>
    Array.from({ length: hi - lo }, (_, i) => i + lo)
  const start = max(
    1,
    min(page - floor((display - 3) / 2), totalPages - display + 2)
  )
  const end = min(totalPages, max(page + floor((display - 2) / 2), display - 1))
  return [
    ...(start > 2 ? [1, ellipsis] : start > 1 ? [1] : []),
    ...range(start, end + 1),
    ...(end < totalPages - 1
      ? [ellipsis, totalPages]
      : end < totalPages
        ? [totalPages]
        : [])
  ]
}

export default function Pagination({
  onClick,
  current,
  totalPages
}: {
  onClick: (page: number) => void
  current: number
  totalPages: number
}) {
  const hasPrev = current - 1 > 0
  const hasNext = current + 1 <= totalPages

  return (
    <>
      {(hasNext || hasPrev) && (
        <div className='my-8 flex items-center justify-center gap-2'>
          <PaginationButton
            disabled={!hasPrev}
            onClick={() => {
              if (hasPrev) {
                onClick(current - 1)
              }
            }}>
            <span className='tanslate-x-0 mr-2 inline-block transition-transform group-hover:-translate-x-1'>
              &lt;-
            </span>
            Prev
          </PaginationButton>
          {generatePaginationNumbers(current, totalPages).map((item, index) => {
            const isEllipsis = typeof item === 'string'
            const isActive = current === item
            return (
              <div key={index} className='!hidden md:!inline-block'>
                {isEllipsis && <span className='text-neutral-300'>{item}</span>}
                {!isEllipsis && (
                  <PaginationButton
                    active={isActive}
                    onClick={() => {
                      onClick(item)
                    }}>
                    {item}
                  </PaginationButton>
                )}
              </div>
            )
          })}
          <PaginationButton
            disabled={!hasNext}
            onClick={() => {
              if (hasNext) {
                onClick(current + 1)
              }
            }}>
            Next{' '}
            <span className='tanslate-x-0 ml-2 inline-block transition-transform group-hover:translate-x-1'>
              -&gt;
            </span>
          </PaginationButton>
        </div>
      )}
    </>
  )
}

interface PaginationButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean
  disabled?: boolean
}

export function PaginationButton({
  active = false,
  disabled = false,
  children,
  className = '',
  ...props
}: PaginationButtonProps) {
  return (
    <button
      className={`group rounded border border-transparent px-3 py-1 text-sm transition-colors ${
        disabled
          ? 'pointer-events-none opacity-40'
          : 'hover:border-primary-300/50 hover:text-neutral-100'
      } ${active ? '!border-primary-300 text-white' : 'text-neutral-200'}`}
      {...props}>
      {children}
    </button>
  )
}
