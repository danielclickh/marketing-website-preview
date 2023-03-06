import React, { HTMLAttributes } from 'react'

interface OptionType extends HTMLAttributes<HTMLLIElement> {
  text: string
  selected: boolean
}

interface Props extends HTMLAttributes<HTMLUListElement> {
  options: OptionType[]
}

function CategorySelector({ options, ...props }: Props) {
  return (
    <ul className='mt-4' {...props}>
      {options.map((option) => (
        <li
          key={option.text}
          onClick={option.onClick}
          className={`text-sm px-4 py-2 mb-1 font-semibold rounded-md cursor-pointer transition-all duration-500 ease-in-out transform ${
            option.selected
              ? 'bg-c6 text-neutral-0'
              : 'hover:bg-c2 text-c4 hover:text-neutral-0'
          }`}>
          {option.text}
        </li>
      ))}
    </ul>
  )
}

export default CategorySelector
