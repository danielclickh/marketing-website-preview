import {
  SuiButton,
  SuiPanel,
  SuiSpacer,
  SuiText,
  SuiTitle
} from '../../components/sui'
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
            <SuiTitle size='web'>
              <h1>{title}</h1>
            </SuiTitle>
            <SuiSpacer size='sm' />
            <div className='max-w-2xl'>
              <SuiText size='lg' color='dark' weight='normal'>
                <p>{description}</p>
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
                        src={testimonial.avatar.data}
                        alt={testimonial.author}
                        width='64'
                        height='64'
                        className='h-16 w-16 mx-auto'
                      />
                    </div>
                    <SuiText size='lg'>
                      <p>"{testimonial.review}"</p>
                    </SuiText>
                    <SuiText>
                      <p>
                        {' '}
                        {testimonial.author}
                        <br />
                        {testimonial.role && (
                          <span className='text-web-light-c4 dark:text-web-dark-c4'>
                            {testimonial.role}
                          </span>
                        )}
                      </p>
                    </SuiText>
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

      <div className='section-light-color w-full pt-16 pb-24'>
        <div className='flex container mx-auto flex-col max-w-7xl px-6 2xl:px-0'>
          <SuiTitle size='lg'>
            <h2>{useCases.title}</h2>
          </SuiTitle>
          <SuiText size='lg' color='dark'>
            <p>{useCases.description}</p>
          </SuiText>
        </div>
        {spotlight && (
          <div className='flex max-w-7xl mx-auto mt-6 space-x-12 px-6 2xl:px-0 relative'>
            <SuiPanel color='bg-white dark:bg-gunmetal' shadow padding='xl'>
              <div className='flex flex-row drop-shadow-2xl'>
                <div className='flex flex-col  w-1/2'>
                  <SuiTitle
                    size='xxs'
                    uppercase
                    color='primary'
                    dark_color='primary'>
                    {useCases.spotlightTitle}
                  </SuiTitle>
                  <SuiSpacer size='xs' />
                  <SuiTitle>{spotlight.companyName}</SuiTitle>
                  <SuiText>{spotlight.description}</SuiText>
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
                      light={spotlight.lightLogoPng.data}
                      dark={spotlight.darkLogoPng.data}
                      size='small'
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
              lightLogo={useCase.lightLogoPng.data}
              darkLogo={useCase.darkLogoPng.data}
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
