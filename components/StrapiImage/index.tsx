import { useState, useEffect } from 'react'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

export default function StrapiImage({ src, width, height, alt, ...props }: any) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    isClient &&
    <>
      <Zoom classDialog="custom-zoom">
        <img
          alt={alt ?? 'Markdown Image'}
          src={src}
          width={width}
        />
      </Zoom>
      <style jsx global>{`
      .custom-zoom [data-rmiz-modal-overlay],
      .custom-zoom [data-rmiz-modal-img] {
        transition-duration: 0.2s;
        transition-timing-function: linear;
      }
      .custom-zoom [data-rmiz-modal-overlay="hidden"] {
        background-color: rgb(0, 0, 0);
      }
      .custom-zoom [data-rmiz-modal-overlay="visible"] {
        background-color: rgb(0, 0, 0);
      }
      .custom-zoom [data-rmiz-btn-unzoom] {
        display: none
      }
    `}</style>
    </>
  );
}
