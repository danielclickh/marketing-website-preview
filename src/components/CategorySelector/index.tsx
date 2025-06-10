import { HTMLAttributes } from 'react'

interface OptionType extends HTMLAttributes<HTMLLIElement> {
  text: string
  selected: boolean
}

interface Props extends HTMLAttributes<HTMLUListElement> {
  options: OptionType[]
  activeClassName?: string
  inactiveClassName?: string
}

function CategorySelector({
  options,
  className = '',
  activeClassName = 'bg-primary-300 border-primary-600/60 text-neutral-800',
  inactiveClassName = 'border-primary-600/60 text-neutral-0 hover:border-primary-300',
  ...props
}: Props) {
  return (
    <ul
      className={`flex-nowrap justify-center gap-2.5 overflow-auto md:flex md:flex-wrap ${className}`}
      {...props}>
      {options.map((option, index) => (
        <li
          key={index}
          onClick={option.onClick}
          className={`mb-2 flex h-9 transform cursor-pointer items-center whitespace-nowrap rounded-full border px-4 text-sm font-medium transition-colors duration-500 ease-in-out lg:mb-0 ${
            option.selected ? activeClassName : inactiveClassName
          }`}>
          {option.text}
        </li>
      ))}
    </ul>
  )
}

export default CategorySelector
