import logoFull from '../../../public/logo-full.svg'
import { CUIButton } from '../ClickUI'
import NewsLetterForm from '../NewsLetter/NewsLetterForm'
import GitHub from '../icons/GitHub'
import topLevelFooterMenu from './footer.json'
import FooterLink from './footerLink'
import { FooterData } from './types'
import { FullyQualifiedEvent } from '@/lib/galaxy/client'
import { useGalaxyOnClick } from '@/lib/galaxy/galaxy'
import Image from 'next/image'

export default function Footer({
  newsletterForm,
  bottomLinks = []
}: FooterData) {
  const year = new Date()
  return (
    <footer className='flex flex-col bg-neutral-900 pb-8 pt-16'>
      <div className='section-container mx-auto w-full justify-between gap-8 pb-11 md:flex lg:gap-10'>
        <div className='flex w-full flex-col'>
          <div className='sitemap flex flex-col gap-y-8 lg:flex-row lg:gap-x-3'>
            {topLevelFooterMenu.map((topMenu) => {
              if (topMenu.title === 'Partners') {
                return null // Skip rendering Partners separately
              }

              return (
                <div key={topMenu.title} className='flex flex-col lg:w-4/12'>
                  <h3 className='mb-3 font-inter text-sm font-semibold text-neutral-100'>
                    {topMenu.title}
                  </h3>
                  <ul className='flex flex-col'>
                    {topMenu.items.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        <FooterLink
                          {...item}
                          text={item.name}
                          galaxyEvent={
                            `footer.nav.${item.name.toLowerCase()}` as FullyQualifiedEvent
                          }
                        />
                      </li>
                    ))}
                    {topMenu.title === 'Comparisons' && (
                      <>
                        <h3 className='mb-4 mt-8 font-inter text-sm font-bold text-neutral-100'>
                          Partners
                        </h3>
                        {topLevelFooterMenu
                          .find((m) => m.title === 'Partners')
                          ?.items.map((item, itemIndex) => (
                            <li key={itemIndex}>
                              <FooterLink
                                {...item}
                                text={item.name}
                                galaxyEvent={
                                  `footer.nav.${item.name.toLowerCase()}` as FullyQualifiedEvent
                                }
                              />
                            </li>
                          ))}
                      </>
                    )}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
        <div className='flex flex-col pt-12 md:w-fit md:pt-0'>
          <Image
            src={logoFull}
            width='135'
            height='40'
            alt='ClickHouse logo'
            className='mb-4 mr-3'
          />
          <div className='mb-4 text-sm text-neutral-400'>
            {newsletterForm?.description}
          </div>
          <NewsLetterForm />
          <CUIButton
            type='secondary'
            weight='semibold'
            href='https://github.com/ClickHouse/ClickHouse'
            target='_blank'
            iconLeft={<GitHub />}
            linkClass='flex justify-end w-full'
            className='mt-6 w-full bg-neutral-0 text-neutral-900 md:w-fit'>
            Star us on Github
          </CUIButton>
        </div>
      </div>
      <div className='section-container w-full border-t border-neutral-400 opacity-10 shadow-footer-line' />
      <div className='flex flex-col items-start pt-2 lg:pt-8'>
        <div className='section-container flex w-full flex-col items-center gap-3 pt-4 text-center text-sm text-neutral-400 sm:gap-1 md:flex-row md:justify-between md:pt-0 md:text-left'>
          <div>
            &copy; {year.getFullYear()} ClickHouse, Inc. HQ in the Bay Area, CA
            and Amsterdam, NL.
          </div>
          <div className='bottom_links flex flex-wrap items-center justify-center gap-4'>
            {bottomLinks.map((bottomLink, index) => (
              <a
                key={bottomLink.text}
                href={bottomLink.href}
                target={bottomLink.target}
                className={`first:pl-0 bottom-link-${index} whitespace-nowrap hover:text-neutral-0`}
                onClick={() => {
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  useGalaxyOnClick(
                    `footerNav.privacyItems.${bottomLink.text
                      .replace(/\s+/g, '')
                      .toLowerCase()}Select`
                  )
                }}>
                {bottomLink.text}
              </a>
            ))}
            <button
              id='cookie-settings-button'
              className={
                'cmp-revoke-consent hidden whitespace-nowrap bg-transparent hover:text-neutral-0'
              }>
              Cookie settings
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
