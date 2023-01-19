import { SuiLink, SuiText, SuiTitle } from '../sui'
import Link from 'next/link'
import { findOne } from '../../lib/api/strapi'
import { StrapiImage } from '../StrapiElements'
import { Hind_Siliguri } from '@next/font/google'
import NewsLetterForm from '../NewsLetter/NewsLetterForm'
import { FooterData } from './types'
const hind = Hind_Siliguri({
  subsets: ['latin'],
  weight: '400'
})

export default async function Footer() {
  const {
    topLevelFooterMenu,
    logoSvg,
    licensingText,
    newsletterForm,
    socialLinks,
    bottomLinks,
    copyright
  }: FooterData = await findOne('footer', {
    populate: [
      'logoSvg',
      'topLevelFooterMenu',
      'topLevelFooterMenu.items',
      'newsletterForm',
      'socialLinks',
      'socialLinks.socialLinkItems',
      'socialLinks.socialLinkItems.iconSvg',
      'bottomLinks'
    ]
  })
  return (
    <div className='flex bg-c2-dark py-8 px-4 md:px-0'>
      <div className='container mx-auto md:flex justify-between max-w-7xl px-4 2xl:px-0 '>
        <div className='flex flex-col md:border-r border-c3'>
          <div className='sitemap lg:flex pt-4'>
            {topLevelFooterMenu.map((topMenu) => (
              <div
                key={topMenu.title}
                className='flex flex-col lg:w-4/12 pb-8 lg:pb-0'>
                <SuiTitle type='h6' color='white' className='mb-4 lg:!text-sm'>
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
                      className='w-fit lg:!text-sm'
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
          <div className='flex flex-col pt-2 lg:pt-12 items-start lg:flex-row'>
            {logoSvg && (
              <div className='flex md:w-64 mb-4 mr-3 gap-x-3 items-center'>
                <StrapiImage {...logoSvg} width={25} height={25} />
                <span className={`text-2xl text-c1-light ${hind.className}`}>
                  ClickHouse
                </span>
              </div>
            )}
            <div className='pr-4 lg:pl-4 self-end'>
              <SuiText color='white' size='xs' weight='medium'>
                {licensingText}
              </SuiText>
              <div className='copyright_and_bottom_links flex flex-col sm:flex-row gap-3 sm:gap-1 items-center mt-6 sm:mt-3'>
                <SuiText color='white' size='xs' weight='medium'>
                  {copyright}
                </SuiText>
                <div className='bottom_links flex divide-x divide-c1-light'>
                  {bottomLinks.map((bottomLink) => (
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
                      className='px-1 first:pl-0 leading-normal h-4 flex items-center'>
                      {bottomLink.text}
                    </SuiLink>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='hidden md:flex flex-col md:w-fit pl-12'>
          <SuiTitle
            weight='bold'
            type='h4'
            color='white'
            className='!text-xl mb-3'>
            {newsletterForm.title}
          </SuiTitle>
          <SuiText color='white' size='sm' weight='medium' className='mb-4'>
            {newsletterForm.description}
          </SuiText>
          <NewsLetterForm
            emailLabel={newsletterForm.inputLabel}
            submitButtonLabel={newsletterForm.buttonLabel}
          />

          <div className='flex flex-col pt-2'>
            <SuiText color='white' size='sm' weight='medium' className='mb-4'>
              {socialLinks.title}
            </SuiText>
            <div className='flex space-x-4'>
              {socialLinks.socialLinkItems.map((socialLink) => (
                <Link
                  href={socialLink.href}
                  target={socialLink.target}
                  key={socialLink.href}>
                  <div className='bg-c3 border border-c2-dark p-3 rounded hover:bg-c3/10'>
                    <StrapiImage
                      {...socialLink.iconSvg}
                      width={21}
                      height={20}
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
