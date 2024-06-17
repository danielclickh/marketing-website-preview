import Link from 'next/link'
import { CUICard } from '../ClickUI'
import Markdown from '../Markdown'
import { StrapiImage } from '../StrapiElements'
import { SuiTitle } from '../sui'
import { Demo } from '../../types/demos'

export default function DemoCard(demo: Demo) {
  const isValidGithubUrl = (url: string) => {
    try {
      const urlObj = new URL(url)
      return urlObj.hostname === 'github.com'
    } catch (e) {}
    return false
  }

  return (
    <CUICard>
      <CUICard.Body className='min-h-full'>
        <div className='flex min-h-full flex-col gap-4 p-6'>
          {demo.Image && (
            <StrapiImage
              {...demo.Image}
              sizes='medium'
              alt={demo.Title}
              width={774}
              height={420}
              className='mb-12 flex items-center justify-center bg-primary-300 text-lg font-black text-primary-900'
            />
          )}
          <SuiTitle type='h3'>{demo.Title}</SuiTitle>
          <Markdown className='opacity-80'>{demo.Description}</Markdown>
          <div className='mt-auto flex items-center justify-end gap-6'>
            {!!demo.GitHubLink && isValidGithubUrl(demo.GitHubLink) && (
              <Link
                href={demo.GitHubLink}
                target='_blank'
                className='hover:underline'>
                View GitHub
              </Link>
            )}
            <Link
              href={demo.Link}
              target={demo.LinkType}
              className='inline-block rounded border border-primary-300/50 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-primary-300'>
              <span className='inline-flex items-center gap-4'>
                <span className='flex-shrink-0 flex-grow-0'>Open demo</span>
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
