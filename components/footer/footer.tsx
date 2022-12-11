import {
  SuiButton,
  SuiLink,
  SuiSpacer,
  SuiText,
  SuiTextField,
  SuiTitle
} from '../sui'
import Link from 'next/link'
import { findOne } from '../../lib/api/strapi'
import { StrapiSvg } from '../StrapiElements'
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
        <div className='flex flex-col md:w-8/12 md:border-r border-arsenic'>
          <div className='sitemap md:flex pt-4'>
            {topLevelFooterMenu.map((topMenu) => (
              <div
                key={topMenu.title}
                className='flex flex-col md:w-4/12 pb-6 md:pb-0'>
                <SuiTitle size='xxs' uppercase color='white'>
                  <h5>{topMenu.title}</h5>
                </SuiTitle>
                <SuiSpacer />
                <div className='flex flex-row md:flex-col space-x-4 md:space-x-0'>
                  {topMenu.items.map((footerLink) => (
                    <SuiLink
                      key={footerLink.name}
                      href={footerLink.href}
                      target={footerLink.target}
                      color='white'
                      weight='normal'>
                      {footerLink.name}
                    </SuiLink>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className='flex pt-12'>
            {logoSvg && (
              <div className='flex md:w-64 mr-4 gap-x-3 items-center'>
                <StrapiSvg src={logoSvg} {...logoSvg} />
                <span className=''>ClickHouse</span>
              </div>
            )}
            <div className='px-4 self-end'>
              <SuiText size='sm' color='white' padding_0>
                <p>{licensingText}</p>
              </SuiText>
              <div className='copyright_and_bottom_links'>
                <SuiTitle color='white' size='xxs'>
                  {copyright}
                </SuiTitle>
                <div className='bottom_links flex flex-wrap gap-4 divide-x divide-white'>
                  {bottomLinks.map((bottomLink) => (
                    <SuiLink
                      key={bottomLink.text}
                      href={bottomLink.href}
                      target={bottomLink.target}
                      color='white'
                      weight='normal'>
                      {bottomLink.text}
                    </SuiLink>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='hidden md:flex flex-col md:w-4/12 pl-12'>
          <SuiTitle size='xxs' color='white'>
            <h4>{newsletterForm.title}</h4>
          </SuiTitle>
          <SuiText color='white'>
            <p>{newsletterForm.description}</p>
          </SuiText>
          <div className='flex align-middle items-center space-x-2'>
            <SuiTextField htmlFor='email' placeholder='Email address' />
            <div className='mt-1'>
              <SuiButton title='Sign up' />
            </div>
          </div>

          <div className='flex flex-col pt-2'>
            <SuiText color='white' size='xxs'>
              <p>{socialLinks.title}</p>
            </SuiText>
            <div className='flex space-x-4 pt-2'>
              {socialLinks.socialLinkItems.map((socialLink) => (
                <Link
                  href={socialLink.href}
                  target={socialLink.target}
                  key={socialLink.href}>
                  <div className='bg-light-purple2 border border-arsenic px-3 pt-3 pb-2 rounded hover:bg-onyx'>
                    <StrapiSvg
                      src={socialLink.iconSvg}
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
