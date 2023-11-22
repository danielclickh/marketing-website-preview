import Image from 'next/image'
import { SuiText } from '../sui'

export default function Feature({
  feature
}: {
  feature: { id: number; content: string }
}) {
  return (
    <div
      className={`item-center flex space-x-4 pb-2 last:pb-0`}
      key={feature.id}>
      <Image src='/images/cloud/check.svg' width={32} height={33} alt='Icon' />
      <SuiText
        size='sm'
        weight='normal'
        color='white'
        className='flex items-center'>
        <p>{feature.content}</p>
      </SuiText>
    </div>
  )
}
