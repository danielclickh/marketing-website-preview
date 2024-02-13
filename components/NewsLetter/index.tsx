import React from 'react'
import { NewsLetterData } from '../../types/homepage'
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
      <div className='flex flex-col md:flex-row justify-between md:items-start py-2'>
        <div className='flex flex-col w-full md:w-1/2'>
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
