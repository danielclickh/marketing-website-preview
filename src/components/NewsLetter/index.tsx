import { SuiText, SuiTitle } from '../sui'
import NewsLetterForm from './NewsLetterForm'
import { NewsLetterData } from '@/types/homepage'

function NewsLetter({ title, description }: NewsLetterData) {
  return (
    <div className='rounded bg-white/5 p-6'>
      <div className='flex flex-col justify-between gap-6 md:flex-row md:items-center'>
        <div className='flex w-full flex-col md:w-1/2'>
          <SuiTitle type='h3' className='mb-2.5'>
            {title}
          </SuiTitle>
          <SuiText size='sm' weight='medium' color='secondary'>
            {description}
          </SuiText>
        </div>
        <div className='flex-1'>
          <NewsLetterForm />
        </div>
      </div>
    </div>
  )
}

export default NewsLetter
