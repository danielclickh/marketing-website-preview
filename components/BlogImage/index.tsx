import { useState, useEffect } from 'react'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'


export default function BlogImage({ src, size, width, height, alt, ...props }: any) {
  const [isClient, setIsClient] = useState(false)
  const [smallSrc, setSmallSrc] = useState<string>()

  function getPath(src: string) {
    try {
      return new URL(src).pathname; // If src is a full URL, extract the pathname
    } catch {
      return src.startsWith("/") ? src : `/${src}`; // If it's already a path, ensure it starts with "/"
    }
  }

  const fetchImageDetails = async () => {
    try {
      const cleanSrc = getPath(src)
      if (size) {
        const response = await fetch(`/api/image?url=${encodeURIComponent(cleanSrc)}`);
        const data = await response.json();
        if (data.formats[size]) {
          setSmallSrc(data.formats[size].url)
        } else {
          setSmallSrc(data.url)
        }
      } else {
        setSmallSrc(cleanSrc)
      }
    } catch (error) {
      console.error("Error fetching image details:", error);
    }
  };

  useEffect(() => {
    setIsClient(true)
    fetchImageDetails();
  }, [])

  return (
    isClient ?
      <div className="w-full flex justify-center mb-9">
        <Zoom
          zoomImg={{
            src: src
          }}
          classDialog="custom-zoom"
        >
          <img
            alt={alt ?? 'Markdown Image'}
            src={smallSrc}
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
      </div> : null
  )
}
