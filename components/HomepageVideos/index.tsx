import Image from 'next/image'
import { useEffect, useState } from 'react'
import VideoPlayButton from '../../public/images/VideoPlayButton'

interface HomepageCustomerVideosProps {
  videos: {
    videoId: string
    vimeoCode?: string
    type: 'youtube' | 'vimeo'
    quote?: string
    personName?: string
    personTitleAndCompany?: string
    image?: string
  }[]
}

export default function HomepageCustomerVideos({
  videos
}: HomepageCustomerVideosProps) {
  const [clickedVideo, setClickedVideo] = useState<string | null>(null)
  const [vimeoCode, setVimeoCode] = useState<string | null>(null)
  const [fullscreen, setFullscreen] = useState(false)

  const onVideoClicked = (video: any) => {
    setFullscreen(true)
    setClickedVideo(video.videoId)
    setVimeoCode(video.vimeoCode)
  }

  const closeFullscreen = () => {
    setFullscreen(false)
  }

  useEffect(() => {
    // Function to handle scrolling
    const handleScrolling = () => {
      if (fullscreen) {
        document.body.classList.add('disable-scroll')
      } else {
        document.body.classList.remove('disable-scroll')
      }
    }

    // Add or remove the class based on the fullscreen state
    handleScrolling()

    // Attach event listener for changes to the fullscreen state
    window.addEventListener('resize', handleScrolling)

    // Add event listener for the Escape key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeFullscreen()
      }
    })

    // Cleanup: Remove event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleScrolling)
      document.removeEventListener('keydown', closeFullscreen)
    }
  }, [fullscreen])

  return (
    <>
      <div className='flex flex-col gap-6 md:flex-row xl:gap-10'>
        {videos.map((video) => {
          return (
            <div key={video.videoId} className='xl:w-1/3'>
              <div
                onClick={(e) => onVideoClicked(video)}
                className='group relative flex items-center rounded-lg hover:cursor-pointer hover:shadow-md'>
                <Image
                  src={video.image as string}
                  alt={video.quote as string}
                  width={774}
                  height={420}
                />
                <div className='absolute flex h-full w-full items-center justify-center'>
                  <VideoPlayButton className='transition-all group-hover:scale-110' />
                </div>
              </div>
              {video.quote && (
                <p className='pt-4 text-base font-medium'>"{video.quote}"</p>
              )}
              {video.personName && (
                <p className='pt-4 text-sm text-neutral-900/80'>
                  {video.personName}
                  <br />
                  {video.personTitleAndCompany && (
                    <>{video.personTitleAndCompany}</>
                  )}
                </p>
              )}
            </div>
          )
        })}
      </div>
      {fullscreen && (
        <div
          id='videoOverlayFullscreen'
          className='fixed top-0 left-0 z-[60] min-h-screen w-full overflow-hidden bg-neutral-725/90 backdrop-blur-[10px]'>
          <div className='relative z-[60] mx-auto min-h-screen max-w-7xl px-4 pt-40 md:pt-10'>
            <div
              className='cursor-pointer'
              onClick={(e) => setFullscreen(false)}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='z-[70] mx-auto mb-10 h-12 w-12 fill-white stroke-white xl:right-0 xl:mx-0 xl:ml-auto'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </div>
            <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
              <iframe
                src={`https://player.vimeo.com/video/${clickedVideo}?h=${vimeoCode}&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&autoplay=1`}
                frameBorder='0'
                allow='autoplay; fullscreen; picture-in-picture'
                style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  width: '100%',
                  height: '100%'
                }}
                title='ClickHouse Customers'></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
