import { SuiButton, SuiPanel, SuiText, SuiTitle } from '../../components/sui'
import { UseCase } from '../../components/use_case'
import { findOne } from '../../lib/api/strapi'
import GetStarted from '../../components/GetStarted'
import { StrapiImage, StrapiPicture } from '../../components/StrapiElements'
import { StarIcon } from '@heroicons/react/solid'
import Carousel from './Carousel'

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
  } = await getData()

  return (
    <>
      <div className='bg-white dark:bg-dark_hero_background pt-10'>
        <div className='flex container mx-auto flex-col px-6 2xl:px-0'>
          <div
            className='flex flex-col text-center mx-auto pt-6'
            data-aos='fade-up'>
            <SuiTitle type='h1' className='mb-2'>
              {title}
            </SuiTitle>
            <div className='max-w-2xl'>
              <SuiText type='p1' color='dark' weight='medium'>
                {description}
              </SuiText>
            </div>
          </div>

          <div className='flex flex-col md:flex-row mt-20 md:justify-evenly pb-16 2xl:container 2xl:mx-auto 2xl:px-0 py-3 px-10'>
            <Carousel>
              {testimonials.map((testimonial) => (
                <div
                  className='flex w-full max-w-xs flex-col text-center px-4'
                  key={testimonial.author}
                  data-aos='fade-up'
                  data-aos-delay={200}>
                  <div className='w-60 md:w-80 h-full flex flex-col justify-between'>
                    <div>
                      <StrapiImage
                        {...testimonial.avatar}
                        alt={testimonial.author}
                        width='64'
                        height='64'
                        className='h-16 w-16 mx-auto'
                      />
                    </div>
                    <SuiText type='p2' weight='medium'>
                      &ldquo;{testimonial.review}&ldquo;
                    </SuiText>
                    <SuiText type='p3' weight='medium'>
                      {testimonial.author}
                    </SuiText>
                    {testimonial.role && (
                      <SuiText type='p3' weight='medium' color='dark'>
                        {testimonial.role}
                      </SuiText>
                    )}
                    <div
                      className='flex justify-center mx-4 mt-2 relative whitespace-nowrap text-primary'
                      data-rating={testimonial.rating}>
                      <StarIcon className='w-4' />
                      <StarIcon className='w-4' />
                      <StarIcon className='w-4' />
                      <StarIcon className='w-4' />
                      <StarIcon className='w-4' />
                      <div
                        className='mix-blend-color top-0 right-0 absolute overflow-hidden h-full bg-white'
                        style={{
                          width: `${(5 - testimonial.rating) * 20}%`
                        }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>

      <div className='container-light-color w-full pt-16 pb-24'>
        <div className='flex container mx-auto flex-col max-w-7xl px-6 2xl:px-0'>
          <SuiTitle type='h2' className='mb-4'>
            {useCases.title}
          </SuiTitle>
          <SuiText type='p1' weight='medium' color='dark'>
            {useCases.description}
          </SuiText>
        </div>
        {spotlight && (
          <div className='flex max-w-7xl mx-auto mt-6 space-x-12 px-6 2xl:px-0 relative'>
            <SuiPanel color='bg-white dark:bg-gunmetal' shadow padding='xl'>
              <div className='flex flex-row drop-shadow-2xl'>
                <div className='flex flex-col  w-1/2'>
                  <SuiTitle
                    type='h5'
                    color='primary'
                    className='mb-1 uppercase'>
                    {useCases.spotlightTitle}
                  </SuiTitle>
                  <SuiTitle type='h3'>{spotlight.companyName}</SuiTitle>
                  <SuiText type='p3' weight='medium'>
                    {spotlight.description}
                  </SuiText>
                  {spotlight.ctaButton && (
                    <div className='flex mt-8'>
                      <SuiButton
                        title={spotlight.ctaButton.text}
                        path={spotlight.ctaButton.href}
                        target={spotlight.ctaButton.target}
                        color='dark'
                      />
                    </div>
                  )}
                </div>

                <div className='-mt-8 -mb-14 overflow-hidden mx-auto w-full max-w-xs'>
                  <div className='hexagon'>
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
      <GetStarted />
    </>
  )
}

export default CustomerStoriesPage
