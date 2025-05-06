import { useRouter } from 'next/router'

interface TextInputProps {
  value: number
  id?: string
}

export const Text: React.FC<TextInputProps> = ({ value, id }) => {
  const router = useRouter()

  return (
    <>
      <input
        className='relative w-full cursor-text rounded-[4px] border border-neutral-700 bg-neutral-750 py-2 pl-3 pr-10 text-left shadow-input focus:outline-none disabled:cursor-auto data-[headlessui-state=open]:rounded-b-none data-[headlessui-state=open]:border-primary-300 sm:text-sm md:max-w-[112px]'
        type='number'
        id={id}
        min={0}
        maxLength={4}
        value={value} // Render an empty string if value is 0
        onChange={(e) => {
          const inputValue = e.target.value || '0'
          const truncatedValue = inputValue.slice(0, 4) // Truncate to 4 characters
          router.push(
            {
              query: {
                ...router.query,
                storageSize: truncatedValue
              }
            },
            undefined,
            { shallow: true }
          )
        }}
      />
    </>
  )
}
