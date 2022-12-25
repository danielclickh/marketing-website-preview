import { SuiLink, SuiText, SuiTitle } from '../../../components/sui'

import { findOne } from '../../../lib/api/strapi'
import GrowingCommunity from '../../../components/GrowingCommunity'
import ContactForm from '../../../components/ContactForm'
import GetStarted from '../../../components/GetStarted'

async function getData() {
  const data = await findOne('contact-us', {
    populate: ['hero', 'hero.contactForm']
  })

  return data.hero
}

export default async function ContactPage() {
  const { title, description, contactForm } = await getData()
  return (
    <>
      <div className='bg-white dark:bg-gunmetal bg-cover pt-10'>
        <div className='flex container mx-auto flex-col px-8 2xl:px-0'>
          <div
            className='flex flex-col text-center mx-auto pt-6'
            data-aos='fade-up'>
            <SuiTitle type='h1' className='mb-2'>
              {title}
            </SuiTitle>
            <div className='max-w-2xl'>
              <SuiText size='lg' color='dark' weight='normal'>
                {description}
              </SuiText>
            </div>
          </div>
          <div>
            <div className='flex container mx-auto flex-col max-w-7xl md:bg-no-repeat bg-opacity-10 pt-10 pb-8 text-center px-8 2xl:px-0'>
              <div className='w-full md:w-128 self-center text-left space-y-8'>
                <ContactForm {...contactForm} />
                <div className='flex text-center'>
                  <SuiText color='dark'>
                    If you have any more thoughts or questions, feel free to
                    contact the ClickHouse team directly at{' '}
                    <SuiLink href='#' weight='normal' className='pl-2'>
                      feedback@clickhouse.com
                    </SuiLink>
                    .
                  </SuiText>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* @ts-expect-error Server Component */}
      <GrowingCommunity />
      <GetStarted />
    </>
  )
}
