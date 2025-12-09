import logoFull from '../../../../public/logo-full.svg'
import NewsLetterForm from '../../NewsLetter/NewsLetterForm'
import topLevelFooterMenu from './footer.json'
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
    <div className='flex flex-col bg-neutral-900 pb-8 pt-16'>
      <div className='section-container mx-auto w-full justify-between gap-8 pb-11 md:flex lg:gap-10'>
        <div className='flex w-full flex-col'>
          <div className='sitemap flex flex-col gap-y-8 lg:flex-row lg:gap-x-3'>
            {topLevelFooterMenu.map((topMenu) => (
              <div key={topMenu.title} className='flex flex-col lg:w-4/12'>
                <div className='mb-3 text-sm font-semibold text-neutral-0'>
                  {topMenu.title}
                </div>
                <div className='flex flex-row flex-wrap gap-x-4 gap-y-2 text-neutral-400 lg:flex-col lg:gap-x-0'>
                  <ul>
                    {topMenu.items.map((footerLink) => (
                      <li key={footerLink.name}>
                        <a
                          href={footerLink.href}
                          target={footerLink.target}
                          className='footer w-fit text-sm transition-all hover:text-neutral-0'
                          onClick={
                            footerLink.galaxyEvent
                              ? // eslint-disable-next-line react-hooks/rules-of-hooks
                                useGalaxyOnClick(
                                  footerLink.galaxyEvent as FullyQualifiedEvent
                                )
                              : undefined
                          }>
                          {topMenu.title === 'Products' ? (
                            <span>{footerLink.name}</span>
                          ) : (
                            <>{footerLink.name}</>
                          )}
                        </a>
                      </li>
                    ))}
                  </ul>
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
            className='mb-4 mr-3'
          />
          <div className='mb-4 text-sm text-neutral-400'>
            {newsletterForm?.description}
          </div>
          <NewsLetterForm />
        </div>
      </div>
      <div className='section-container w-full border-t border-neutral-400 opacity-10' />
      <div className='flex flex-col items-start pt-2 lg:pt-8'>
        <div className='section-container flex w-full flex-col items-center gap-3 pt-4 text-center text-sm text-neutral-400 sm:gap-1 md:flex-row md:justify-between md:pt-0 md:text-left'>
          <div>
            &copy; {year.getFullYear()} ClickHouse, Inc.
            本社はカリフォルニア州ベイエリアとオランダ領アムステルダムにあります。
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
    </div>
  )
}
