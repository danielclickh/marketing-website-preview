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
    <SuiPanel color='container-light-color' className='mt-8' padding='lg'>
      <div className='flex justify-between'>
        <div className='flex flex-col w-1/2'>
          <SuiTitle type='h4'>{title}</SuiTitle>
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
