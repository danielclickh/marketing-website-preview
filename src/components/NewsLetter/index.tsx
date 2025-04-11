import { NewsLetterData } from '@/types/homepage'
import { SuiPanel, SuiText, SuiTitle } from '../sui'
import NewsLetterForm from './NewsLetterForm'

function NewsLetter({
  title,
  description,
  emailLabel,
  submitButtonLabel
}: NewsLetterData) {
  return (
    <SuiPanel color='bg-c4/10' padding='lg' isRounded>
      <div className='flex flex-col justify-between py-2 md:flex-row md:items-start'>
        <div className='flex w-full flex-col md:w-1/2'>
          <SuiTitle type='h3' className='mb-2.5'>
            {title}
          </SuiTitle>
          <SuiText size='sm' weight='medium' color='secondary'>
            {description}
          </SuiText>
        </div>
        <NewsLetterForm />
      </div>
    </SuiPanel>
  )
}

export default NewsLetter
