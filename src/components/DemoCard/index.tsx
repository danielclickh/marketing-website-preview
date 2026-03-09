import { CUICard } from '../ClickUI'
import Markdown from '../Markdown'
import { StrapiImageUrl } from '../StrapiElements'
import { SuiTitle } from '../sui'
import { useGalaxyOnClick } from '@/lib/galaxy/galaxy'
import { Demo } from '@/types/demos'
import * as Tooltip from '@radix-ui/react-tooltip'
import Link from 'next/link'

export default function DemoCard(demo: Demo) {
  const isValidGithubUrl = (url: string) => {
    try {
      const urlObj = new URL(url)
      return urlObj.hostname === 'github.com'
    } catch (e) {}
    return false
  }

  const handleImageClick = useGalaxyOnClick(
    `demoPage.demo.demoId${demo.id}OpenDemoSelect`
  )

  const handleGitHubClick = useGalaxyOnClick(
    `demoPage.demo.demoId${demo.id}GitHubSelect`
  )

  return (
    <CUICard>
      <CUICard.Body className='min-h-full'>
        <div className='flex min-h-full flex-col gap-4 p-4 md:p-6'>
          {demo.Image && (
            <Link
              href={demo.External ? demo.Link : `/demos/${demo.Link}`}
              target={demo.LinkType}
              className='mb-6 md:mb-12'
              onClick={handleImageClick}>
              <StrapiImageUrl
                {...demo.Image}
                sizes='medium'
                alt={demo.Title}
                width={774}
                height={420}
                className='flex items-center justify-center bg-primary-300 text-lg font-black text-primary-900'
              />
            </Link>
          )}
          <SuiTitle type='h3'>{demo.Title}</SuiTitle>
          <Markdown className='opacity-80'>{demo.Description}</Markdown>
          <div className='mt-auto flex items-center justify-end gap-4'>
            {!!demo.GitHubLink && isValidGithubUrl(demo.GitHubLink) && (
              <>
                <Tooltip.Provider
                  delayDuration={0}
                  disableHoverableContent={false}>
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <Link
                        href={demo.GitHubLink}
                        target='_blank'
                        className='inline-flex items-center gap-3 text-sm font-medium text-white transition-opacity hover:opacity-50'
                        onClick={handleGitHubClick}>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width={24}
                          viewBox='0 0 98 96'>
                          <path
                            fill='currentColor'
                            fillRule='evenodd'
                            d='M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z'
                            clipRule='evenodd'
                          />
                        </svg>
                      </Link>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content
                        side='top'
                        align='center'
                        className='max-w-[300px] whitespace-pre-wrap rounded-[4px] bg-neutral-725 px-[15px] py-[10px] text-sm leading-normal will-change-[transform,opacity]'
                        sideOffset={5}>
                        View in GitHub
                        <Tooltip.Arrow className='fill-neutral-725' />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                </Tooltip.Provider>
              </>
            )}
            <Link
              href={demo.External ? demo.Link : `/demos/${demo.Link}`}
              target={demo.LinkType}
              onClick={handleImageClick}
              className='inline-block rounded border border-primary-300/50 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-primary-300'>
              <span className='inline-flex items-center gap-4'>
                <span className='flex-shrink-0 flex-grow-0'>
                  {demo.LinkText || 'Open demo'}
                </span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='18'
                  height='18'
                  fill='none'
                  viewBox='0 0 18 18'>
                  <path
                    fill='#FFFFE8'
                    d='M17.813 6.75a.563.563 0 0 1-1.125 0V2.108l-6.54 6.54a.562.562 0 0 1-.795-.795l6.539-6.54H11.25a.562.562 0 1 1 0-1.125h6a.562.562 0 0 1 .563.562v6ZM14.25 9.188a.562.562 0 0 0-.563.562v6.75a.188.188 0 0 1-.187.188h-12a.188.188 0 0 1-.188-.188v-12a.187.187 0 0 1 .188-.188h6.75a.563.563 0 1 0 0-1.125H1.5A1.312 1.312 0 0 0 .187 4.5v12A1.313 1.313 0 0 0 1.5 17.813h12a1.313 1.313 0 0 0 1.313-1.313V9.75a.563.563 0 0 0-.563-.563Z'
                  />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </CUICard.Body>
    </CUICard>
  )
}
