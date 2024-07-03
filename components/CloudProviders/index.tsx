import React from 'react'
import { CloudProviderType } from '../../types/pricing'
import { StrapiImage } from '../StrapiElements'
import { SuiText } from '../sui'
import Link from 'next/link'
import { useRouter } from 'next/router'

function CloudProviders({
  cloudProviders
}: {
  cloudProviders: Array<CloudProviderType>
}) {
  const router = useRouter()
  const path = router.asPath

  return (
    <div className='flex justify-center space-x-6 pt-8 pb-6 md:justify-start'>
      {cloudProviders.map((cloudProvider, parentIndex: number) => (
        <div className='flex flex-col space-y-2' key={parentIndex}>
          <div className='flex flex-row items-start gap-6'>
            {cloudProvider.darkProviderPngs.map((darkIconPng, index) => (
              <div
                key={index}
                className={`relative w-auto px-4 ${
                  (parentIndex === 0 && path !== '/cloud') ||
                  (index === 0 && path !== '/cloud')
                    ? 'hover:bg-neutral-800'
                    : ''
                }  ${
                  path === '/cloud'
                    ? ''
                    : 'grid h-16 place-items-center rounded border border-neutral-700/80  bg-neutral-900 '
                }  `}>
                {darkIconPng.name === 'logo_aws_dark.svg' ? (
                  <Link href='/pricing?provider=aws'>
                    <StrapiImage
                      key={`${cloudProvider.title}-${index}`}
                      {...darkIconPng}
                      className={`h-10 w-auto ${
                        parentIndex !== 0 ? 'opacity-25' : ''
                      }`}
                    />
                  </Link>
                ) : darkIconPng.name === 'google_cloud_dark.svg' ? (
                  <Link href='/pricing?provider=gcp'>
                    <StrapiImage
                      key={`${cloudProvider.title}-${index}`}
                      {...darkIconPng}
                      className={`h-10 w-auto ${parentIndex !== 0 ? '' : ''}`}
                    />
                  </Link>
                ) : (
                  <Link href='/pricing?provider=azure'>
                    <StrapiImage
                      key={`${cloudProvider.title}-${index}`}
                      {...darkIconPng}
                      className={`h-10 w-auto `}
                    />
                  </Link>
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
