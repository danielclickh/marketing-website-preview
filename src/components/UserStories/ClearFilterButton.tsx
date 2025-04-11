import { CircleXIcon } from 'lucide-react'

interface ClearFilterButtonProps {
  onClick: () => void
  disabled: boolean
  className?: string
}

const ClearFilterButton: React.FC<ClearFilterButtonProps> = ({
  onClick,
  disabled,
  className
}) => {
  return (
    <button
      type='button'
      disabled={disabled}
      className={`${
        disabled ? 'text-neutral-500' : 'text-white'
      } flex transform items-center gap-x-2 rounded-full py-2.5 text-sm font-semibold transition-colors duration-500 ease-in-out ${className}`}
      onClick={onClick}>
      Clear filters
      <CircleXIcon strokeWidth={1.25} />
    </button>
  )
}

export default ClearFilterButton
