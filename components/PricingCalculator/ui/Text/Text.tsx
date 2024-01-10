import { useRouter } from 'next/router'

interface TextInputProps {
  value: string
  onChange: (value: string) => void
  // You can add other props specific to text input here
}

export const Text: React.FC<TextInputProps> = ({ value, onChange }) => {
  const router = useRouter()

  return (
    <input
      className='relative w-full cursor-text rounded-[4px] border border-neutral-700 bg-neutral-750 py-2 pl-3 pr-10 text-left shadow-input focus:outline-none disabled:cursor-auto data-[headlessui-state=open]:rounded-b-none data-[headlessui-state=open]:border-primary-300 sm:text-sm'
      type='number'
      min={0}
      value={value}
      onChange={(e) => {
        router.push(
          {
            query: {
              ...router.query,
              storageSize: e.target.value
            }
          },
          undefined,
          { shallow: true }
        )
        return e.target.value
      }}
      // You can add other input-specific props here
    />
  )
}
