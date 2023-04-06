import NewsLetterForm from '../NewsLetter/NewsLetterForm'
import { FooterData } from './types'
import { CUILink } from '../ClickUI'
import Image from 'next/image'
import logoFull from '../../public/logo-full.svg'
import topLevelFooterMenu from './footer.json'
function openCookie() {
  const element = document.querySelector<HTMLElement>(
    '#ot-sdk-btn-floating .ot-floating-button__open'
  )
  if (element) {
    element.click()
  } else {
    setTimeout(openCookie, 100)
  }
}
export default function Footer({
  newsletterForm,
  bottomLinks = []
}: FooterData) {
  return (
    <div className='flex flex-col bg-neutral-900 pb-8 pt-16'>
      <div className='w-full section-container mx-auto md:flex justify-between pb-11 gap-8 lg:gap-10'>
        <div className='flex flex-col w-full'>
          <div className='sitemap flex flex-col lg:flex-row gap-y-8'>
            {topLevelFooterMenu.map((topMenu) => (
              <div key={topMenu.title} className='flex flex-col lg:w-4/12'>
                <div className='mb-3 text-sm text-neutral-0 font-semibold'>
                  {topMenu.title}
                </div>
                <div className='flex flex-row flex-wrap lg:flex-col gap-y-2 gap-x-4 lg:gap-x-0 text-neutral-400'>
                  {topMenu.items.map((footerLink) => (
                    <CUILink
                      key={footerLink.name}
                      href={footerLink.href}
                      target={footerLink.target}
                      className='footer w-fit text-sm hover:text-neutral-0 transition-all'
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
        <div className='flex flex-col md:w-fit pt-12 md:pt-0'>
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
      <div className='section-container shadow-footer-line border-t border-neutral-400 opacity-10 w-full' />
      <div className='flex flex-col pt-2 lg:pt-8 items-start'>
        <div className='section-container flex flex-col w-full gap-3 sm:gap-1 items-center md:flex-row md:justify-between text-sm text-neutral-400 text-center md:text-left pt-4 md:pt-0'>
          <div>
            &copy; 2023 ClickHouse, Inc. HQ in the Bay Area, CA and Amsterdam,
            NL.
          </div>
          <div className='bottom_links flex gap-4 items-center justify-center flex-wrap'>
            {bottomLinks.map((bottomLink, index) => (
              <CUILink
                key={bottomLink.text}
                href={bottomLink.href}
                target={bottomLink.target}
                segmentEvent={{
                  label: bottomLink.text,
                  category: 'website-nav'
                }}
                className={`first:pl-0 bottom-link-${index} whitespace-nowrap hover:text-neutral-0`}>
                {bottomLink.text}
              </CUILink>
            ))}
            <button
              onClick={openCookie}
              className={`bg-transparent first:pl-0 bottom-link-${bottomLinks.length} hover:text-neutral-0 whitespace-nowrap`}>
              Cookie Policy
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
