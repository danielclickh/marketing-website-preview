import { SuiButton, SuiLink, SuiText, SuiTextField, SuiTitle } from '../sui'
import Link from 'next/link'
import { findOne } from '../../lib/api/strapi'
import { StrapiImage } from '../StrapiElements'
import { Hind_Siliguri } from '@next/font/google'
const hind = Hind_Siliguri({
  subsets: ['latin'],
  weight: '400'
})

export async function Footer() {
  const {
    topLevelFooterMenu,
    logoSvg,
    licensingText,
    newsletterForm,
    socialLinks,
    bottomLinks,
    copyright
  } = await findOne('footer', {
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
    <div className='flex bg-onyx py-8 px-4 md:px-0'>
      <div className='container mx-auto md:flex justify-between max-w-7xl px-8 2xl:px-0 '>
        <div className='flex flex-col md:border-r border-arsenic'>
          <div className='sitemap lg:flex pt-4'>
            {topLevelFooterMenu.map((topMenu) => (
              <div
                key={topMenu.title}
                className='flex flex-col lg:w-4/12 pb-6 lg:pb-0'>
                <SuiTitle type='h5' color='white' className='mb-4'>
                  {topMenu.title}
                </SuiTitle>
                <div className='flex flex-row flex-wrap lg:flex-col gap-x-4 lg:gap-x-0'>
                  {topMenu.items.map((footerLink) => (
                    <SuiLink
                      key={footerLink.name}
                      href={footerLink.href}
                      target={footerLink.target}
                      color='white'
                      className='w-fit'
                      weight='normal'>
                      {footerLink.name}
                    </SuiLink>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className='flex flex-col lg:pt-12 items-start lg:flex-row'>
            {logoSvg && (
              <div className='flex md:w-64 mr-3 gap-x-3 items-center'>
                <StrapiImage {...logoSvg} width='25' height='25' />
                <span className={`text-2xl text-white ${hind.className}`}>
                  ClickHouse
                </span>
              </div>
            )}
            <div className='pr-4 lg:pl-4 self-end'>
              <SuiText color='white' size='xs' weight='medium'>
                {licensingText}
              </SuiText>
              <div className='copyright_and_bottom_links flex flex-col lg:flex-row gap-1 lg:items-center'>
                <SuiText color='white' size='xs' weight='medium'>
                  {copyright}
                </SuiText>
                <div className='bottom_links flex divide-x divide-white'>
                  {bottomLinks.map((bottomLink) => (
                    <SuiLink
                      key={bottomLink.text}
                      size='xs'
                      href={bottomLink.href}
                      target={bottomLink.target}
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
          <h4 className='text-xl font-bold text-white'>
            {newsletterForm.title}
          </h4>
          <SuiText color='white' size='sm' weight='medium' className='mb-4'>
            {newsletterForm.description}
          </SuiText>
          <div className='flex align-middle items-center space-x-2'>
            <SuiTextField htmlFor='email' placeholder='Email address' />
            <div className='mt-1'>
              <SuiButton type='primary' title='Sign up' />
            </div>
          </div>

          <div className='flex flex-col pt-2'>
            <SuiText color='white' size='sm' weight='medium'>
              {socialLinks.title}
            </SuiText>
            <div className='flex space-x-4 pt-2'>
              {socialLinks.socialLinkItems.map((socialLink) => (
                <Link
                  href={socialLink.href}
                  target={socialLink.target}
                  key={socialLink.href}>
                  <div className='bg-light-purple2 border border-arsenic px-3 pt-3 pb-2 rounded hover:bg-onyx'>
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
