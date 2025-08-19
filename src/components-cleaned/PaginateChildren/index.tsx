import { PolymorphicComponentProps } from '@/types/global'
import React, {
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect
} from 'react'

type Modes = 'paged' | 'loadMore' // paged = windowed pages; loadMore = cumulative reveal
type NextPrevProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'>
type ItemsOwnProps = { children: ReactNode }

// Overloads give us: (1) no `as` → only children; (2) with `as` → polymorphic props.
type ItemsComponent = {
  (props: ItemsOwnProps): React.ReactElement | null
  <T extends React.ElementType>(
    props: PolymorphicComponentProps<T, ItemsOwnProps>
  ): React.ReactElement | null
}

function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max)
}

interface Ctx {
  page: number
  perPage: number
  totalItems: number
  setTotalItems: (n: number) => void
  setPage: (n: number) => void
  mode: Modes
}

const PaginateCtx = createContext<Ctx | null>(null)
const usePaginateCtx = () => {
  const ctx = useContext(PaginateCtx)
  if (!ctx)
    throw new Error('PaginateChildren.* must be used within <PaginateChildren>')
  return ctx
}

export interface PaginateChildrenProps {
  children: React.ReactNode
  perPage: number
  page?: number
  defaultPage?: number
  onPageChange?: (page: number) => void
  mode?: Modes
}

function PaginateChildren({
  children,
  perPage,
  page: controlled,
  defaultPage = 1,
  onPageChange,
  mode = 'paged'
}: PaginateChildrenProps) {
  const safePerPage = Math.max(1, perPage)
  const isControlled = controlled != null
  const [uncontrolled, setUncontrolled] = useState(defaultPage)
  const [totalItems, setTotalItems] = useState(0)

  const totalPages = Math.max(1, Math.ceil(totalItems / safePerPage))
  const page = clamp(
    isControlled ? (controlled as number) : uncontrolled,
    1,
    totalPages
  )

  useEffect(() => {
    const next = clamp(page, 1, totalPages)
    if (!isControlled && next !== page) setUncontrolled(next)
  }, [totalItems, totalPages, page, isControlled])

  const setPage = (next: number) => {
    const c = clamp(next, 1, totalPages)
    if (!isControlled) setUncontrolled(c)
    onPageChange?.(c)
  }

  const ctx = useMemo(
    () => ({
      page,
      perPage: safePerPage,
      totalItems,
      setTotalItems,
      setPage,
      mode
    }),
    [page, safePerPage, totalItems, mode]
  )
  return <PaginateCtx.Provider value={ctx}>{children}</PaginateCtx.Provider>
}

/** Slot: items to paginate. */
const Items: ItemsComponent = (props: any) => {
  const { page, perPage, setTotalItems, mode } = usePaginateCtx()
  const { as, children, ...rest } = props as {
    as?: React.ElementType
    children: React.ReactNode
  }
  const arr = useMemo(() => React.Children.toArray(children), [children])

  React.useEffect(() => setTotalItems(arr.length), [arr.length, setTotalItems])

  const start = (page - 1) * perPage
  const end = start + perPage
  const visible =
    mode === 'loadMore' ? arr.slice(0, end) : arr.slice(start, end)

  if (!as)
    return (
      <>
        {visible.map((c, i) => (
          <React.Fragment key={i}>{c}</React.Fragment>
        ))}
      </>
    )
  return React.createElement(
    as,
    rest,
    visible.map((c, i) => <React.Fragment key={i}>{c}</React.Fragment>)
  )
}

PaginateChildren.Items = Items

type LoadMoreBtnProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'type'
>

PaginateChildren.PrevButton = function PrevButton({
  children,
  onClick,
  disabled: disabledProp,
  ...props
}: NextPrevProps) {
  const { page, setPage } = usePaginateCtx()
  const disabled = page <= 1
  return (
    <button
      type='button'
      disabled={disabledProp ?? disabled}
      onClick={(e) => {
        e.preventDefault()
        if (!disabled) setPage(page - 1)
        onClick?.(e)
      }}
      {...props}>
      {children}
    </button>
  )
}

PaginateChildren.NextButton = function NextButton({
  children,
  onClick,
  disabled: disabledProp,
  ...props
}: NextPrevProps) {
  const { page, perPage, totalItems, setPage } = usePaginateCtx()
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage))
  const disabled = page >= totalPages
  return (
    <button
      type='button'
      disabled={disabledProp ?? disabled}
      onClick={(e) => {
        e.preventDefault()
        if (!disabled) setPage(page + 1)
        onClick?.(e)
      }}
      {...props}>
      {children}
    </button>
  )
}

export default PaginateChildren
