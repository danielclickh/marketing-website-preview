import { SuiLink, SuiText, SuiTitle } from '../sui'
import Link from 'next/link'
import { StrapiImage } from '../StrapiElements'
import { Hind_Siliguri } from '@next/font/google'
import NewsLetterForm from '../NewsLetter/NewsLetterForm'
import { FooterData } from './types'
import LogoSvg from '../icons/LogoSvg'
const hind = Hind_Siliguri({
  subsets: ['latin'],
  weight: '400',
  adjustFontFallback: false,
  fallback: ['sans-serif']
})

export default function Footer({
  topLevelFooterMenu = [],
  logoSvg,
  licensingText,
  newsletterForm,
  socialLinks,
  bottomLinks = [],
  copyright
}: FooterData) {
  return (
    <div className='flex flex-col bg-noised pb-8 pt-16'>
      <div className='flex py-8 px-4 md:px-0 border-b-primary-500'>
        <div className='container mx-auto md:flex justify-between max-w-7xl px-16 2xl:px-0'>
          <div className='flex flex-col w-full'>
            <div className='sitemap lg:flex pt-4'>
              {topLevelFooterMenu.map((topMenu) => (
                <div
                  key={topMenu.title}
                  className='flex flex-col lg:w-4/12 pb-8 lg:pb-0'>
                  <SuiTitle
                    type='h6'
                    color='white'
                    className='mb-4 lg:!text-sm'>
                    {topMenu.title}
                  </SuiTitle>
                  <div className='flex flex-row flex-wrap lg:flex-col gap-y-2 gap-x-4 lg:gap-x-0'>
                    {topMenu.items.map((footerLink) => (
                      <SuiLink
                        key={footerLink.name}
                        href={footerLink.href}
                        target={footerLink.target}
                        color='white'
                        size='xs'
                        className={`footer w-fit lg:!text-sm`}
                        segmentEvent={{
                          label: footerLink.name,
                          category: 'website-nav'
                        }}
                        weight='normal'>
                        {footerLink.name}
                      </SuiLink>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className='hidden md:flex flex-col md:w-fit pl-12'>
            {logoSvg && (
              <div className='flex md:w-64 mb-4 mr-3 gap-x-3 items-center text-primary'>
                <LogoSvg className='h-6' />
              </div>
            )}
            <SuiText color='white' size='sm' weight='medium' className='mb-4'>
              {newsletterForm?.description}
            </SuiText>
            <NewsLetterForm
              emailLabel={newsletterForm.inputLabel}
              submitButtonLabel={newsletterForm.buttonLabel}
            />
          </div>
        </div>
      </div>
      <div className='flex flex-col pt-2 lg:pt-12 items-start'>
        <div className='pr-4 lg:pl-4 self-end w-full'>
          <div className='copyright_and_bottom_links flex flex-col  gap-3 sm:gap-1 items-center mt-6 sm:mt-3'>
            <SuiText color='white' size='xs' weight='medium'>
              {copyright}
            </SuiText>
            <div className='bottom_links flex divide-x divide-c1-light'>
              {bottomLinks.map((bottomLink, index) => (
                <SuiLink
                  key={bottomLink.text}
                  size='xs'
                  href={bottomLink.href}
                  target={bottomLink.target}
                  segmentEvent={{
                    label: bottomLink.text,
                    category: 'website-nav'
                  }}
                  color='white'
                  weight='normal'
                  className={`px-1 first:pl-0 leading-normal h-4 flex items-center bottom-link-${index}`}>
                  {bottomLink.text}
                </SuiLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
