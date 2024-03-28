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
                  <Link href='/partners/aws'>
                    <StrapiImage
                      key={`${cloudProvider.title}-${index}`}
                      {...darkIconPng}
                      className={`h-10 w-auto ${
                        parentIndex !== 0 ? 'opacity-25' : ''
                      }`}
                    />
                  </Link>
                ) : darkIconPng.name === 'google_cloud_dark.svg' ? (
                  <>
                    <StrapiImage
                      key={`${cloudProvider.title}-${index}`}
                      {...darkIconPng}
                      className={`h-10 w-auto ${parentIndex !== 0 ? '' : ''}`}
                    />
                  </>
                ) : (
                  <>
                    <StrapiImage
                      key={`${cloudProvider.title}-${index}`}
                      {...darkIconPng}
                      className={`h-10 w-auto ${
                        parentIndex !== 0 ? 'opacity-25' : ''
                      }`}
                    />
                    <SuiText
                      size='xs'
                      weight='medium'
                      color='secondary'
                      className='absolute -right-20 -top-1 w-[110px] rounded-lg bg-neutral-300 px-2.5 text-sm text-neutral-900'>
                      Private Preview
                    </SuiText>
                  </>
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
