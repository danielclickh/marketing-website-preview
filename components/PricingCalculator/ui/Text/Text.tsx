import { useRouter } from 'next/router'
import React from 'react'

interface TextInputProps {
  value: number
  id?: string
}

export const Text: React.FC<TextInputProps> = ({ value, id }) => {
  const router = useRouter()

  return (
    <input
      className='relative w-full cursor-text rounded-[4px] border border-neutral-700 bg-neutral-750 py-2 pl-3 pr-10 text-left shadow-input focus:outline-none disabled:cursor-auto data-[headlessui-state=open]:rounded-b-none data-[headlessui-state=open]:border-primary-300 sm:text-sm'
      type='number'
      id={id}
      min={0}
      value={value} // Render an empty string if value is 0
      onChange={(e) => {
        router.push(
          {
            query: {
              ...router.query,
              storageSize: e.target.value || '0' // Use '0' as a default value
            }
          },
          undefined,
          { shallow: true }
        )
      }}
    />
  )
}
