import React from 'react'
import { findOne } from '../../lib/api/strapi'
import { StrapiPicture } from '../StrapiElements'
import { SuiTitle } from '../sui'

async function CloudProviders() {
  const {
    hero: { cloudProviders }
  } = await findOne('cloud', {
    populate: [
      'hero.cloudProviders',
      'hero.cloudProviders.darkProviderPngs',
      'hero.cloudProviders.lightProviderPngs'
    ]
  })
  return (
    <div className='flex space-x-6 justify-center md:justify-start'>
      {cloudProviders.map((cloudProvider) => (
        <div className='pt-8 flex flex-col space-y-2' key={cloudProvider.title}>
          <SuiTitle size='xxs' color='dark' className='mb-5'>
            <h5>{cloudProvider.title}</h5>
          </SuiTitle>
          <div className='flex flex-row items-start gap-6 h-10'>
            {cloudProvider.lightProviderPngs.data.map((lightIconPng, index) => (
              <StrapiPicture
                key={`${cloudProvider.title}-${index}`}
                dark={cloudProvider.darkProviderPngs.data[index]}
                light={lightIconPng}
                width='100'
                height='40'
                className='max-h-10 w-auto'
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default CloudProviders
