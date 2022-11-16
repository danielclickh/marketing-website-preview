import { GetStarted } from '../../components/get_started_area'
import { BaseLayout } from '../../components/layout'
import {
  SuiButton,
  SuiLink,
  SuiSpacer,
  SuiText,
  SuiTextField,
  SuiTitle
} from '../../components/sui'

import { SocialButton } from '../../components/social_button'

export default function Contact() {
  return (
    <BaseLayout title='Contact • ClickHouse'>
      <div className='bg-web-light-c1 dark:bg-web-dark-c1 bg-cover pt-10'>
        <div className='flex container mx-auto flex-col px-8 2xl:px-0'>
          <div
            className='flex flex-col text-center mx-auto pt-6'
            data-aos='fade-up'>
            <SuiTitle size='web'>
              <h1>Contact us</h1>
            </SuiTitle>
            <SuiSpacer size='sm' />
            <div className='max-w-2xl'>
              <SuiText size='lg' color='dark' weight='normal'>
                <p>Our friendly team would love to hear from you.</p>
              </SuiText>
            </div>
          </div>
          <div>
            <div className='flex container mx-auto flex-col max-w-7xl md:bg-no-repeat bg-opacity-10 pt-2 pb-8 text-center px-8 2xl:px-0'>
              <SuiSpacer size='xl' />
              <div className='w-full md:w-128 self-center text-left space-y-8'>
                <div className='flex space-x-8'>
                  <SuiTextField
                    htmlFor='firstName'
                    label='First name'
                    className='w-full'
                  />
                  <SuiTextField
                    htmlFor='lastName'
                    label='Last name'
                    className='w-full'
                  />
                </div>
                <div className='flex w-full'>
                  <SuiTextField
                    htmlFor='email'
                    label='Email'
                    className='w-full'
                  />
                </div>
                <div className='flex'>
                  <SuiTextField
                    htmlFor='company'
                    label='Company (Optional)'
                    className='w-full'
                  />
                </div>
                <div className='flex'>
                  <SuiTextField
                    htmlFor='useCase'
                    label='Tell us your use case (Optional)'
                    className='w-full'
                  />
                </div>

                <div className='flex w-64 mx-auto'>
                  <SuiButton title='Submit' />
                </div>

                <div className='flex text-center'>
                  <SuiText color='dark' size='sm'>
                    If you have any more thoughts or questions, feel free to
                    contact the ClickHouse team directly at{' '}
                    <SuiLink
                      size='sm'
                      href='#'
                      weight='normal'
                      className='pl-2'>
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

      <div className='w-full bg-web-light-c2 dark:bg-web-dark-c2 pt-16 pb-12'>
        <div className='flex flex-col container mx-auto max-w-7xl px-8 2xl:px-0 mb-12'>
          <SuiTitle size='lg'>
            <h2>Join our growing community</h2>
          </SuiTitle>
          <div className='flex flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-6 pt-8'>
            <SocialButton name='github' path='http://github.com' />
            <SocialButton name='slack' path='http://slack.com' />
            <SocialButton name='twitter' path='http://twitter.com' />
            <SocialButton name='telegram' path='http://telegram.com' />
            <SocialButton name='facebook' path='http://facebook.com' />
          </div>
          <div className='flex flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-6 pt-2 md:pt-8'>
            <SocialButton name='linkedin' path='http://linkedin.com' />
            <SocialButton name='google' path='http://google.com' />
            <SocialButton name='youtube' path='http://youtube.com' />
            <SocialButton
              name='stackoverflow'
              path='http://stackoverflow.com'
            />
          </div>
        </div>
      </div>
      <GetStarted />
    </BaseLayout>
  )
}
