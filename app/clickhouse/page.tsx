import { SuiButton, SuiSpacer, SuiText, SuiTitle } from '../../components/sui'
import { FeatureItem } from '../../components/feature_item'
import { FeatureItemLarge } from '../../components/feature_item_large/feature_item_large'
import { findOne } from '../../lib/api/strapi'
import Markdown from '../../components/Markdown'
import { StrapiImage, StrapiSvg } from '../../components/StrapiElements'
import BulletPoint from '../../components/BulletPoint'
import GetStarted from '../../components/GetStarted'

async function getData() {
  const params = {
    populate: [
      'hero',
      'hero.mainButton',
      'hero.secondaryButton',
      'hero.gitButton',
      'hero.gitButton.darkIconPng',
      'hero.gitButton.lightIconPng',
      'hero.backgroundPng',
      'features1',
      'features1.items',
      'features1.items.iconSvg',
      'features2',
      'features2.items',
      'features2.items.iconSvg',
      'features3',
      'features3.mainItem',
      'features3.iconSvg',
      'features3.items',
      'features4',
      'features4.items',
      'features5',
      'features5.iconSvg',
      'features5.items'
    ]
  }
  const data = await findOne('click-house', params)

  return data
}
export default async function ClickHouseServerPage() {
  const { hero, features1, features2, features3, features4, features5 } =
    await getData()
  const { title, description, backgroundPng, mainButton, secondaryButton } =
    hero
  return (
    <>
      <div className='bg-hero_background dark:bg-dark_hero_background bg-cover pt-10'>
        <div className='flex container mx-auto flex-col max-w-7xl md:bg-no-repeat bg-opacity-10 pb-20 px-4 sm:px-8 2xl:px-0'>
          <div data-aos='fade-up' className='flex'>
            <div className='md:w-6/12 md:mt-16 flex-col text-center md:text-left'>
              <SuiTitle size='web'>
                <h1>
                  <Markdown>{title}</Markdown>
                </h1>
              </SuiTitle>
              <div className='mt-6'>
                <SuiText size='lg' color='dark' weight='normal'>
                  <p className='md:pr-16'>{description}</p>
                </SuiText>
              </div>
              <div className='flex mt-6 justify-center md:justify-start space-x-4'>
                {mainButton && (
                  <SuiButton
                    size='md'
                    path={mainButton.href}
                    target={mainButton.target}
                    title={mainButton.text}
                  />
                )}
                {secondaryButton && (
                  <SuiButton
                    color='warning'
                    size='md'
                    path={secondaryButton.href}
                    target={secondaryButton.target}
                    title={secondaryButton.text}
                  />
                )}
              </div>
            </div>
            <div className='hidden md:flex w-6/12 justify-center'>
              <div>
                <div className='mx-auto flex px-8 mt-12'>
                  <StrapiImage
                    src={backgroundPng.data}
                    alt='ClickHouse is fast'
                    width='471'
                    height='360'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full mx-auto bg-strain_background bg-cover h-24 md:h-40 -mt-12 bg-no-repeat 2xl:h-52' />
      </div>
      <div className='section-dark'>
        <div className='flex container mx-auto flex-col max-w-7xl md:bg-no-repeat bg-opacity-10 pb-24 px-4 sm:px-8 2xl:px-0 pt-16'>
          <SuiTitle size='sm' color='primary' dark_color='primary'>
            {features1.title}
          </SuiTitle>

          <SuiSpacer size='lg' />
          <div className='feature-container'>
            {features1.items.map((feature) => (
              <FeatureItem
                key={feature.iconSvg.hash}
                icon={feature.iconSvg}
                title={feature.title}
                description={feature.description}
                delay={100}
                invert
              />
            ))}
          </div>
        </div>
      </div>
      <div className='flex w-full section-light-color pb-20'>
        <div className='flex container mx-auto flex-col max-w-7xl md:bg-no-repeat bg-opacity-10 pt-20 pb-8 text-center px-8 2xl:px-0'>
          {features2.pretitle && (
            <>
              <SuiTitle size='xs' color='primary' dark_color='primary'>
                <h3>{features2.pretitle}</h3>
              </SuiTitle>
              <SuiSpacer size='sm' />
            </>
          )}
          <SuiTitle size='xl'>
            <h3>{features2.title}</h3>
          </SuiTitle>

          <SuiSpacer size='xl' />

          <div className='large-feature-container '>
            {features2.items.map((item) => (
              <FeatureItemLarge
                key={item.title}
                icon={item.iconSvg}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </div>

      <div className='flex w-full bg-white dark:bg-gunmetal pb-20'>
        <div className='flex container mx-auto flex-col max-w-7xl md:bg-no-repeat bg-opacity-10 pt-20 pb-8 px-8 2xl:px-0'>
          {features3.pretitle && (
            <>
              <SuiTitle size='xs' color='primary' dark_color='primary'>
                <h3>{features3.pretitle}</h3>
              </SuiTitle>
              <SuiSpacer size='sm' />
            </>
          )}
          <SuiSpacer size='sm' />
          <SuiTitle size='xl'>
            <h3>{features3.mainItem.title}</h3>
          </SuiTitle>

          <div className='flex flex-col md:flex-row items-center'>
            <div className='pt-4 md:pt-0 md:w-3/5'>
              <SuiText size='lg'>{features3.mainItem.description}</SuiText>
            </div>
            <div className='pt-4 md:pt-0 w-2/5 justify-center flex'>
              <StrapiSvg src={features3.iconSvg} />
            </div>
          </div>

          <div className='flex flex-col md:flex-row md:space-x-12 pt-16'>
            {features3.items.map((feature) => (
              <div className='md:w-1/3' key={feature.title}>
                <SuiTitle>
                  <h4>{feature.title}</h4>
                </SuiTitle>
                <SuiText color='dark' size='lg'>
                  <p>{feature.description}</p>
                </SuiText>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='flex w-full section-light-color pb-20'>
        <div className='flex container mx-auto flex-col max-w-7xl md:bg-no-repeat bg-opacity-10 pt-20 pb-8 px-8 2xl:px-0'>
          {features4.pretitle && (
            <>
              <SuiTitle size='xs' color='primary' dark_color='primary'>
                <h3>{features4.pretitle}</h3>
              </SuiTitle>
              <SuiSpacer size='sm' />
            </>
          )}
          <SuiTitle size='xl'>
            <h3>{features4.title}</h3>
          </SuiTitle>

          <div className='large-feature-container'>
            {features4.items.map((feature) => (
              <div key={feature.title}>
                <SuiTitle>
                  <h4>{feature.title}</h4>
                </SuiTitle>
                <SuiText color='dark' size='lg'>
                  <p>{feature.description}</p>
                </SuiText>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='flex w-full bg-white dark:bg-gunmetal pb-20'>
        <div className='flex container mx-auto flex-col max-w-7xl md:bg-no-repeat bg-opacity-10 pt-20 pb-8 px-8 2xl:px-0'>
          <div className='flex flex-col md:flex-row items-center'>
            <div className='md:w-2/5 justify-center flex h-64 w-64'>
              <StrapiSvg src={features5.iconSvg} className='h-full w-full' />
            </div>

            <div className='md:w-3/5'>
              {features5.pretitle && (
                <>
                  <SuiTitle size='xs' color='primary' dark_color='primary'>
                    <h3>{features5.pretitle}</h3>
                  </SuiTitle>
                  <SuiSpacer size='sm' />
                </>
              )}
              <SuiSpacer size='sm' />
              <SuiTitle size='xl'>
                <h3>{features5.title}</h3>
              </SuiTitle>
              <SuiText size='lg'>{features5.description}</SuiText>
            </div>
          </div>

          <div className='flex pt-16 flex-col'>
            <SuiTitle size='lg'>
              <h4>{features5.second_title}</h4>
            </SuiTitle>
            <SuiText color='dark' size='lg'>
              <p className='max-w-3xl '>{features5.second_description}</p>
            </SuiText>

            <div className='flex flex-col md:flex-row pt-4 flex-wrap'>
              {features5.items.map((feature) => (
                <BulletPoint
                  key={feature.text}
                  text={feature.text}
                  className='w-full md:w-1/2 lg:w-1/3'
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <GetStarted />
    </>
  )
}
