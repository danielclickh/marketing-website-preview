import NewsLetterForm from '../NewsLetter/NewsLetterForm'
import { FooterData } from './types'
import { CUILink } from '../ClickUI'
import Image from 'next/image'
import logoFull from '../../public/logo-full.svg'
import topLevelFooterMenu from './footer.json'
export default function Footer({
  newsletterForm,
  bottomLinks = []
}: FooterData) {
  return (
    <div className='flex flex-col bg-neutral-900 pb-8 pt-16'>
      <div className='section-container mx-auto w-full justify-between gap-8 pb-11 md:flex lg:gap-10'>
        <div className='flex w-full flex-col'>
          <div className='sitemap flex flex-col gap-y-8 lg:flex-row'>
            {topLevelFooterMenu.map((topMenu) => (
              <div key={topMenu.title} className='flex flex-col lg:w-4/12'>
                <div className='mb-3 text-sm font-semibold text-neutral-0'>
                  {topMenu.title}
                </div>
                <div className='flex flex-row flex-wrap gap-y-2 gap-x-4 text-neutral-400 lg:flex-col lg:gap-x-0'>
                  {topMenu.items.map((footerLink) => (
                    <CUILink
                      key={footerLink.name}
                      href={footerLink.href}
                      target={footerLink.target}
                      className='footer w-fit text-sm transition-all hover:text-neutral-0'
                      segmentEvent={{
                        label: footerLink.name,
                        category: 'website-nav'
                      }}>
                      {footerLink.name}
                    </CUILink>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='flex flex-col pt-12 md:w-fit md:pt-0'>
          <Image
            src={logoFull}
            width='135'
            height='40'
            alt='ClickHouse logo'
            className=' mb-4 mr-3'
          />
          <div className='mb-4 text-sm text-neutral-400'>
            {newsletterForm?.description}
          </div>
          <NewsLetterForm
            emailLabel={newsletterForm.inputLabel}
            submitButtonLabel={newsletterForm.buttonLabel}
          />
        </div>
      </div>
      <div className='section-container w-full border-t border-neutral-400 opacity-10 shadow-footer-line' />
      <div className='flex flex-col items-start pt-2 lg:pt-8'>
        <div className='section-container flex w-full flex-col items-center gap-3 pt-4 text-center text-sm text-neutral-400 sm:gap-1 md:flex-row md:justify-between md:pt-0 md:text-left'>
          <div>
            &copy; 2023 ClickHouse, Inc. HQ in the Bay Area, CA and Amsterdam,
            NL.
          </div>
          <div className='bottom_links flex flex-wrap items-center justify-center gap-4'>
            {bottomLinks.map((bottomLink, index) => (
              <CUILink
                key={bottomLink.text}
                href={bottomLink.href}
                target={bottomLink.target}
                segmentEvent={{
                  label: bottomLink.text,
                  category: 'website-nav-footer'
                }}
                className={`first:pl-0 bottom-link-${index} whitespace-nowrap hover:text-neutral-0`}>
                {bottomLink.text}
              </CUILink>
            ))}
            <button
              className={`bg-transparent first:pl-0 bottom-link-${bottomLinks.length} cmp-revoke-consent whitespace-nowrap hover:text-neutral-0`}>
              Cookie Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
