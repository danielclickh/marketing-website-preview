import { CheckCircleIcon, LockClosedIcon } from '@heroicons/react/solid'
import { useState } from 'react'
import VideoPlayButton from '../../public/images/VideoPlayButton'

interface HomepageCustomerVideosProps {
  videos: {
    videoId: string
    vimeoCode?: string
    type: 'youtube' | 'vimeo'
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

  return (
    <>
      <div className='flex flex-col gap-6 xl:flex-row xl:gap-10'>
        {videos.map((video) => {
          return (
            <div key={video.videoId} className='xl:w-1/3'>
              <div
                onClick={(e) => onVideoClicked(video)}
                className='group flex min-h-[220px] items-center rounded-lg bg-red-900 p-4 hover:cursor-pointer hover:shadow-md
                      '>
                <div className='mx-auto'>
                  <VideoPlayButton className='transition-all group-hover:scale-110' />
                </div>
              </div>
              <p className='pt-4 text-base font-medium'>
                "Moving over to ClickHouse we were basically able to cut that
                (Redshift) bill in half."
              </p>
              <p className='pt-4 text-sm text-neutral-900/80'>
                Brooke McKim
                <br />
                Co-founder and CTO, Vantage
              </p>
            </div>
          )
        })}
      </div>
      {fullscreen && (
        <div
          id='videoOverlayFullscreen'
          className='fixed top-0 left-0 z-[60] min-h-screen w-full overflow-hidden bg-neutral-725/90 backdrop-blur-[10px]'>
          <div className='cursor-pointer' onClick={(e) => setFullscreen(false)}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='absolute right-10 top-10 z-[70] h-12 w-12 fill-white stroke-white'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </div>
          <div className='z-[60] mx-auto min-h-screen max-w-7xl'>
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
