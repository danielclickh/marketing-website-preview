interface Props extends React.SVGProps<SVGSVGElement> {
  invert?: boolean
  className?: string
}

const VideoPlayButton = ({ invert = false, ...props }: Props) => {
  let circle = 'text-primary-300'
  let triangle = 'text-primary-900'

  if (invert) {
    circle = 'text-primary-900'
    triangle = 'text-primary-300'
  }

  return (
    <svg
      height='45'
      width='45'
      fill='none'
      viewBox='0 0 45 45'
      xmlns='http://www.w3.org/2000/svg'
      {...props}>
      <circle
        cx='22.3379'
        cy='22.3379'
        className={circle}
        fill='currentColor'
        r='22.3379'
      />
      <circle
        cx='22.3379'
        cy='22.3379'
        r='21.8726'
        stroke='white'
        strokeOpacity='0.2'
        strokeWidth='0.930748'
      />
      <path
        className={triangle}
        d='M17.8394 15.2174L30.4045 22.4719L17.8394 29.7263L17.8394 15.2174Z'
        fill='currentColor'
      />
    </svg>
  )
}

export default VideoPlayButton
