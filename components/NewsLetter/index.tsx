import React from 'react'
import { findOne } from '../../lib/api/strapi'
import { SuiPanel, SuiText, SuiTitle } from '../sui'
import NewsLetterForm from './NewsLetterForm'

async function NewsLetter() {
  const { title, description, emailLabel, submitButtonLabel } = await findOne(
    'newsletter-form',
    {
      populate: ['*']
    }
  )
  return (
    <SuiPanel color='container-light-color' padding='lg' isRounded>
      <div className='flex flex-col md:flex-row justify-between md:items-start'>
        <div className='flex flex-col w-full md:w-1/2'>
          <SuiTitle type='h3' className='mb-2.5'>
            {title}
          </SuiTitle>
          <SuiText size='sm' weight='medium' color='secondary'>
            {description}
          </SuiText>
        </div>
        <NewsLetterForm
          emailLabel={emailLabel}
          submitButtonLabel={submitButtonLabel}
        />
      </div>
    </SuiPanel>
  )
}

export default NewsLetter
