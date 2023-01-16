import { SuiButton, SuiPanel, SuiText, SuiTitle } from '../../components/sui'
import { UseCase } from '../../components/use_case'
import { findOne } from '../../lib/api/strapi'
import GetStarted from '../../components/GetStarted'
import { StrapiImage, StrapiPicture } from '../../components/StrapiElements'
import { ChevronRightIcon, StarIcon } from '@heroicons/react/solid'
import Carousel from './Carousel'
import { CustomerStoriesData } from './types'
import styles from './CustomerStories.module.scss'

async function getData() {
  const result = await findOne('use-case', {
    populate: [
      'hero',
      'hero.testimonials',
      'hero.testimonials.avatar',
      'useCases',
      'useCaseItems',
      'useCaseItems.darkLogoPng',
      'useCaseItems.lightLogoPng',
      'useCaseItems.bullets',
      'useCaseItems.ctaButton'
    ]
  })
  result.spotlight = (result.useCaseItems ?? []).shift()

  return result
}

async function CustomerStoriesPage() {
  const {
    hero: { title, description, testimonials },
    spotlight,
    useCases,
    useCaseItems
  }: CustomerStoriesData = await getData()

  return (
    <>
      <div className='bg-hero pt-10'>
        <div className='flex container mx-auto flex-col px-6 2xl:px-0'>
          <div
            className='flex flex-col text-center mx-auto pt-6 max-w-screen-sm'
            data-aos='fade-up'>
            <SuiTitle type='h1' className='mb-5'>
              {title}
            </SuiTitle>
            <SuiText size='lg' color='secondary' weight='medium'>
              {description}
            </SuiText>
          </div>

          <div
            className='flex flex-col md:flex-row mt-20 md:justify-evenly pb-16 2xl:container 2xl:mx-auto 2xl:px-0 py-3 px-10'
            data-aos='fade-up'>
            <Carousel>
              {testimonials.map((testimonial) => (
                <div
                  className='flex w-full flex-col text-center px-8'
                  key={testimonial.author}>
                  <div className='w-full h-full flex flex-col justify-between'>
                    <div>
                      <StrapiImage
                        {...testimonial.avatar}
                        alt={testimonial.author}
                        width={64}
                        height={64}
                        className='h-16 w-16 mx-auto mb-8'
                      />
                      <SuiText size='base' weight='medium' className='mb-6'>
                        &ldquo;{testimonial.review}&ldquo;
                      </SuiText>
                    </div>
                    <div className='flex flex-col items-center gap-y-3'>
                      <SuiText size='sm' weight='medium'>
                        {testimonial.author}
                      </SuiText>
                      {testimonial.role && (
                        <SuiText size='sm' weight='medium' color='secondary'>
                          {testimonial.role}
                        </SuiText>
                      )}
                      <div
                        className='flex justify-center mx-4 relative w-fit text-c6'
                        data-rating={testimonial.rating}>
                        <StarIcon className='w-4' />
                        <StarIcon className='w-4' />
                        <StarIcon className='w-4' />
                        <StarIcon className='w-4' />
                        <StarIcon className='w-4' />
                        <div
                          className='mix-blend-color top-0 right-0 absolute overflow-hidden h-full bg-c2-light dark:bg-c3'
                          style={{
                            width: `${(5 - testimonial.rating) * 20}%`
                          }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>

      <div className='bg-c2 text-c5 w-full pt-16 pb-24'>
        <div className=' max-w-7xl mx-auto'>
          <div className='flex container mr-auto flex-col max-w-screen-md px-6 2xl:px-0'>
            <SuiTitle type='h2' className='mb-4'>
              {useCases.title}
            </SuiTitle>
            <SuiText size='lg' weight='medium' color='secondary'>
              {useCases.description}
            </SuiText>
          </div>
          {spotlight && (
            <div className='flex mt-10 space-x-12 px-6 2xl:px-0 relative md:min-h-fit'>
              <SuiPanel isRounded color='bg-c1' shadow padding='xl'>
                <div className='flex flex-row drop-shadow-2xl'>
                  <div className='flex flex-col w-full md:w-1/2'>
                    <SuiTitle type='h5' color='c6' className='mb-3 uppercase'>
                      {useCases.spotlightTitle}
                    </SuiTitle>
                    <SuiTitle
                      type='h3'
                      weight='bold'
                      className='mb-2.5 !text-2xl'>
                      {spotlight.companyName}
                    </SuiTitle>
                    <SuiText size='sm' weight='medium'>
                      {spotlight.description}
                    </SuiText>
                    {spotlight.ctaButton && (
                      <div className='flex mt-8'>
                        <SuiButton
                          type='custom'
                          className='bg-c4/10 text-c5'
                          path={spotlight.ctaButton.href}
                          target={spotlight.ctaButton.target}>
                          {spotlight.ctaButton.text}
                          <ChevronRightIcon className='w-5 h-5' />
                        </SuiButton>
                      </div>
                    )}
                  </div>

                  <div className='hidden md:block -mt-8 -mb-14 overflow-hidden ml-auto w-full max-w-xs'>
                    <div
                      className={`bg-c1-light dark:bg-c2-dark ${styles.hexagon}`}>
                      <StrapiPicture
                        light={spotlight.lightLogoPng}
                        dark={spotlight.darkLogoPng}
                        sizes='small'
                      />
                    </div>
                  </div>
                </div>
              </SuiPanel>
            </div>
          )}
          <div className='grid grid-cols-1 md:grid-cols-2 max-w-7xl mx-auto mt-12 gap-10 px-6 2xl:px-0'>
            {useCaseItems.map((useCase, index) => (
              <UseCase
                key={`usecase-${index}`}
                lightLogo={useCase.lightLogoPng}
                darkLogo={useCase.darkLogoPng}
                description={useCase.description}
                bullets={useCase.bullets}
                path={useCase?.ctaButton?.href}
                btnText={useCase?.ctaButton?.text}
                target={useCase?.ctaButton?.target}
              />
            ))}
          </div>
        </div>
      </div>
      <GetStarted />
    </>
  )
}

export default CustomerStoriesPage
