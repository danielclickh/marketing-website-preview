import * as RadioGroup from '@radix-ui/react-radio-group'
import { useRouter } from 'next/router'
import React from 'react'

type RadioGroupComponentProps = {
  value: string
}

const RadioGroupComponent: React.FC<RadioGroupComponentProps> = ({ value }) => {
  const router = useRouter()

  const onValueChange = (value: string) => {
    router.push(
      {
        query: {
          ...router.query,
          storageCompressed: value
        }
      },
      undefined,
      { shallow: true }
    )
  }

  return (
    <RadioGroup.Root
      className='mt-5 flex flex-row items-center gap-2.5 gap-x-6'
      value={value}
      onValueChange={onValueChange}
      aria-label='Is your data compressed?'>
      <div className='flex items-center'>
        <RadioGroup.Item
          className='h-[16px] w-[16px] cursor-pointer rounded-full border border-neutral-700 bg-neutral-750 outline-none hover:border-primary-500 hover:bg-neutral-725 hover:bg-opacity-80 hover:shadow-xl'
          value='no'
          id='r2'>
          <RadioGroup.Indicator className="relative flex h-full w-full items-center justify-center after:block after:h-[8px] after:w-[8px] after:rounded-[50%] after:bg-primary-300 after:content-['']" />
        </RadioGroup.Item>
        <label
          className='cursor-pointer pl-[8px] text-[15px] leading-none text-white'
          htmlFor='r2'>
          No
        </label>
      </div>{' '}
      <div className='flex items-center'>
        <RadioGroup.Item
          className='h-[16px] w-[16px] cursor-pointer rounded-full border border-neutral-700 bg-neutral-750 outline-none hover:border-primary-500 hover:bg-neutral-725 hover:bg-opacity-80 hover:shadow-xl'
          value='yes'
          id='r1'>
          <RadioGroup.Indicator className="relative flex h-full w-full items-center justify-center after:block after:h-[8px] after:w-[8px] after:rounded-[50%] after:bg-primary-300 after:content-['']" />
        </RadioGroup.Item>
        <label
          className='cursor-pointer pl-[8px] text-[15px] leading-none text-white'
          htmlFor='r1'>
          Yes
        </label>
      </div>
    </RadioGroup.Root>
  )
}

export default RadioGroupComponent
