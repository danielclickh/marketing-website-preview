'use client'
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
          className={` text-sm px-4 py-2 font-medium rounded-md cursor-pointer transition-all duration-500 ease-in-out transform ${
            option.selected
              ? 'bg-c6 text-gunmetal dark:text-white'
              : 'hover:bg-cultured dark:hover:bg-onyx text-web-light-c4 dark: text-web-dark-c4 hover:text-gunmetal dark:hover:text-white'
          }`}>
          {option.text}
        </li>
      ))}
    </ul>
  )
}

export default CategorySelector
