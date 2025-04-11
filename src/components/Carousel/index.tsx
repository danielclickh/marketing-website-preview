import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import 'glider-js/glider.min.css'
import { ReactNode, useState } from 'react'
import Glider from 'react-glider'
import styles from './Carousel.module.scss'

const Carousel = ({ children }: { children: ReactNode }) => {
  const [showDiv, setShowDiv] = useState(false)
  return (
    <div className={styles.gliderContainer}>
      <Glider
        hasArrows
        slidesToShow={1}
        onRefresh={(e) => {
          const windowWidth = window.innerWidth
          if (windowWidth < 640 && showDiv) {
            setShowDiv(false)
          } else if (!showDiv) {
            setShowDiv(true)
          }
        }}
        onLoad={() => {
          window.dispatchEvent(new Event('resize'))
          setShowDiv(window.innerWidth > 640)
        }}
        draggable
        slidesToScroll={1}
        itemWidth={320}
        iconLeft={<ChevronLeftIcon className='-ml-5 h-16 w-auto' />}
        iconRight={<ChevronRightIcon className='-ml-5 h-16 w-auto' />}
        rewind
        responsive={[
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3
            }
          },
          {
            breakpoint: 640,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          }
        ]}>
        {children}
        {showDiv && <div />}
      </Glider>
    </div>
  )
}

export default Carousel
