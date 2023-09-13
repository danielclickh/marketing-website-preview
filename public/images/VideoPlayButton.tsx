interface Props {
  className?: string
}

const VideoPlayButton = (props: Props) => {
  return (
    <svg
      height='45'
      width='45'
      fill='none'
      viewBox='0 0 45 45'
      xmlns='http://www.w3.org/2000/svg'
      className={props.className}>
      <circle cx='22.3379' cy='22.3379' fill='#FCFF74' r='22.3379' />
      <circle
        cx='22.3379'
        cy='22.3379'
        r='21.8726'
        stroke='white'
        strokeOpacity='0.2'
        strokeWidth='0.930748'
      />
      <path
        d='M17.8394 15.2174L30.4045 22.4719L17.8394 29.7263L17.8394 15.2174Z'
        fill='#201F1D'
      />
    </svg>
  )
}

export default VideoPlayButton
