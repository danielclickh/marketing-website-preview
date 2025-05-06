import VideoPlayButton from '../../../public/images/VideoPlayButton'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface Video {
  videoId: string
  vimeoCode?: string
  type: 'youtube' | 'vimeo'
  quote?: string
  personName?: string
  personTitleAndCompany?: string
  image?: string
}

interface VideosProps {
  videos: Video[]
  fullWidth?: boolean
}

export default function VideoPlayerCustom({ videos, fullWidth }: VideosProps) {
  const [clickedVideo, setClickedVideo] = useState<string | null>(null)
  const [vimeoCode, setVimeoCode] = useState<string | null>(null)
  const [fullscreen, setFullscreen] = useState(false)
  const [isShortScreen, setIsShortScreen] = useState(false) // Add state to track tall screens

  const onVideoClicked = (video: Video) => {
    setFullscreen(true)
    setClickedVideo(video.videoId)
    if (video.vimeoCode) {
      setVimeoCode(video.vimeoCode)
    }

    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'videoClick',
        videoId: video.videoId,
        videoQuote: video.quote,
        videoPerson: video.personName,
        videoPersonTitleAndCompany: video.personTitleAndCompany
      })
    }
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

      // Check if the viewport height is greater than a certain threshold
      setIsShortScreen(window.innerHeight <= 995) // Adjust the threshold as needed
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
      <div
        className={`${
          fullWidth
            ? 'mx-auto max-w-4xl'
            : 'grid grid-cols-1 md:grid-cols-2 md:flex-row lg:grid-cols-4'
        } gap-6 px-4 xl:gap-10 2xl:px-0`}>
        {videos.map((video) => {
          return (
            <div
              key={video.videoId}
              className={`w-full video-${video.videoId}`}>
              <div
                onClick={(e) => onVideoClicked(video)}
                className='group relative flex items-center overflow-hidden rounded-lg hover:cursor-pointer hover:shadow-md'>
                <div className='absolute h-full w-full bg-black/[0.65] opacity-0 transition-all group-hover:opacity-90'></div>
                <Image
                  src={video.image as string}
                  alt={video.quote as string}
                  width={774}
                  height={420}
                  className='w-full'
                />
                <div className='absolute flex h-full w-full items-center justify-center'>
                  <VideoPlayButton className='transition-all group-hover:scale-150' />
                </div>
              </div>
              {video.quote && (
                <p className='pt-4 text-base font-bold'>"{video.quote}"</p>
              )}
              {video.personName && (
                <p className='pt-4 text-sm text-neutral-900'>
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
          className='fixed left-0 top-0 z-[60] w-full overflow-hidden bg-neutral-725/90 backdrop-blur-[10px]'>
          <div
            id='videoPlayerContainer'
            className={`relative z-[60] mx-auto min-h-screen px-4 pt-20 md:pt-10 ${
              isShortScreen ? 'max-w-3xl' : 'max-w-3xl 2xl:max-w-7xl'
            }`}>
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
