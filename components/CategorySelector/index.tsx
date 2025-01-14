import { HTMLAttributes } from 'react'

interface OptionType extends HTMLAttributes<HTMLLIElement> {
  text: string
  selected: boolean
}

interface Props extends HTMLAttributes<HTMLUListElement> {
  options: OptionType[]
}

function CategorySelector({ options, className = '', ...props }: Props) {
  return (
    <ul
      className={`flex-nowrap justify-center gap-2.5 overflow-auto md:flex md:flex-wrap ${className}`}
      {...props}>
      {options.map((option, index) => (
        <li
          key={index}
          onClick={option.onClick}
          className={`mb-2 flex h-[36px] transform cursor-pointer items-center whitespace-nowrap rounded-full border border-primary-600/60 px-4 text-sm font-medium transition-colors duration-500 ease-in-out lg:mb-0 ${
            option.selected
              ? 'bg-primary-300 text-neutral-800'
              : 'text-neutral-0  hover:border-primary-300'
          }`}>
          {option.text}
        </li>
      ))}
    </ul>
  )
}

export default CategorySelector
