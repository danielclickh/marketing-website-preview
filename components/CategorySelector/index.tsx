import React, { HTMLAttributes } from 'react'

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
      className={`md:flex flex-nowrap overflow-auto md:flex-wrap justify-center gap-2.5 ${className}`}
      {...props}>
      {options.map((option) => (
        <li
          key={option.text}
          onClick={option.onClick}
          className={`flex items-center text-sm font-medium px-4 h-[36px] whitespace-nowrap rounded-full cursor-pointer transition-colors duration-500 ease-in-out transform border border-neutral-725 ${
            option.selected
              ? 'bg-primary-300 text-neutral-800'
              : 'hover:bg-primary-300 text-neutral-0 hover:text-neutral-900'
          }`}>
          {option.text}
        </li>
      ))}
    </ul>
  )
}

export default CategorySelector
