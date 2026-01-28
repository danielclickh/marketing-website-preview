import { CircleXIcon } from 'lucide-react'

type ClearFiltersButtonProps = Omit<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >,
  'children'
>

export default function ClearFiltersButton({
  className = '',
  type = 'button',
  ...props
}: ClearFiltersButtonProps) {
  return (
    <button
      type={type}
      className={`flex transform items-center gap-x-2 rounded-full py-2.5 text-sm font-semibold text-white transition-colors duration-500 ease-in-out disabled:text-neutral-500 ${className}`}
      {...props}>
      Clear filters
      <CircleXIcon strokeWidth={1.25} />
    </button>
  )
}
