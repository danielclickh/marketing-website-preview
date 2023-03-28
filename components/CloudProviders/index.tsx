import React from 'react'
import { CloudProviderType } from '../../types/pricing'
import { StrapiImage, StrapiPicture } from '../StrapiElements'
import { SuiText } from '../sui'

function CloudProviders({
  cloudProviders
}: {
  cloudProviders: Array<CloudProviderType>
}) {
  return (
    <div className='flex space-x-6 justify-center md:justify-start'>
      {cloudProviders.map((cloudProvider, parentIndex: number) => (
        <div className='pt-8 flex flex-col space-y-2' key={cloudProvider.title}>
          <div className='flex flex-row items-start gap-2 h-10'>
            {cloudProvider.darkProviderPngs.map((darkIconPng, index) => (
              <div className='relative w-auto px-10 py- h-16 bg-neutral-900 hover:bg-neutral-800 rounded grid place-items-center border border-neutral-700/80'>
                <StrapiImage
                  key={`${cloudProvider.title}-${index}`}
                  {...darkIconPng}
                  className={`h-10 w-auto ${
                    parentIndex !== 0 ? 'opacity-25' : ''
                  }`}
                />
              </div>
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
