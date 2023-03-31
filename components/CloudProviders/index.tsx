import React from 'react'
import { CloudProviderType } from '../../types/pricing'
import { StrapiImage } from '../StrapiElements'
import { SuiText } from '../sui'
import Link from 'next/link'

function CloudProviders({
  cloudProviders
}: {
  cloudProviders: Array<CloudProviderType>
}) {
  return (
    <div className='flex space-x-6 justify-center md:justify-start pt-8 pb-6'>
      {cloudProviders.map((cloudProvider, parentIndex: number) => (
        <div className='flex flex-col space-y-2' key={cloudProvider.title}>
          <div className='flex flex-row items-start gap-6'>
            {cloudProvider.darkProviderPngs.map((darkIconPng, index) => (
              <div
                className={`relative w-auto px-4 h-16 bg-neutral-900 ${
                  parentIndex === 0 ? 'hover:bg-neutral-800' : ''
                } rounded grid place-items-center border border-neutral-700/80`}>
                {darkIconPng.name === 'logo_aws_dark.svg' ? (
                  <Link href='/partners/aws'>
                    <StrapiImage
                      key={`${cloudProvider.title}-${index}`}
                      {...darkIconPng}
                      className={`h-10 w-auto ${
                        parentIndex !== 0 ? 'opacity-25' : ''
                      }`}
                    />
                  </Link>
                ) : (
                  <StrapiImage
                    key={`${cloudProvider.title}-${index}`}
                    {...darkIconPng}
                    className={`h-10 w-auto ${
                      parentIndex !== 0 ? 'opacity-25' : ''
                    }`}
                  />
                )}

                {parentIndex !== 0 && (
                  <SuiText
                    size='xs'
                    weight='medium'
                    color='secondary'
                    className='absolute -top-2 -right-2 bg-neutral-300 px-2.5 rounded-lg text-sm text-neutral-900'>
                    soon
                  </SuiText>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default CloudProviders
