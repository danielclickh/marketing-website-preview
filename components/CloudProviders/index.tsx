import React from 'react'
import { findOne } from '../../lib/api/strapi'
import { StrapiPicture } from '../StrapiElements'
import { SuiText, SuiTitle } from '../sui'

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
      {cloudProviders.map((cloudProvider, parentIndex: number) => (
        <div className='pt-8 flex flex-col space-y-2' key={cloudProvider.title}>
          <div className='flex flex-row items-start gap-2 h-10'>
            {cloudProvider.lightProviderPngs.map((lightIconPng, index) => (
              <StrapiPicture
                key={`${cloudProvider.title}-${index}`}
                dark={cloudProvider.darkProviderPngs[index]}
                light={lightIconPng}
                className={`h-8 w-auto ${
                  parentIndex !== 0 ? 'opacity-25' : ''
                }`}
              />
            ))}
          </div>
          {parentIndex !== 0 && (
            <SuiText
              size='xs'
              weight='medium'
              color='secondary'
              className='mb-5'>
              {cloudProvider.title}
            </SuiText>
          )}
        </div>
      ))}
    </div>
  )
}

export default CloudProviders
