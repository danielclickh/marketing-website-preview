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
    <ul className={`mt-4 ${className}`} {...props}>
      {options.map((option) => (
        <li
          key={option.text}
          onClick={option.onClick}
          className={`text-sm px-4 py-2 mb-1 rounded-md cursor-pointer transition-colors duration-500 ease-in-out transform ${
            option.selected
              ? 'bg-primary text-neutral-800 font-semibold'
              : 'hover:bg-primary-300 text-neutral-300 hover:text-neutral-800 font-medium'
          }`}>
          {option.text}
        </li>
      ))}
    </ul>
  )
}

export default CategorySelector
