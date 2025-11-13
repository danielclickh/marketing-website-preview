import { SuiText, SuiTitle } from '../sui'
import NewsLetterForm from './NewsLetterForm'
import { NewsLetterData } from '@/types/homepage'

function NewsLetter({
  title = 'Subscribe to our newsletter',
  description = 'Stay informed on feature releases, product roadmap, support, and cloud offerings!'
}: Partial<Pick<NewsLetterData, 'title' | 'description'>>) {
  return (
    <div className='flex flex-col justify-between gap-6 rounded bg-white/5 p-4 md:flex-row md:items-center md:p-6'>
      <div className='w-full md:w-1/2'>
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
  )
}

export default NewsLetter
