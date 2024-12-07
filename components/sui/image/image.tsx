import Image from 'next/image'

export type ImageProps = {
  path: string
  alt: string
  width: number
  height: number
}

export function SuiImage(props: ImageProps) {
  const { path, alt, width, height } = props
  return (
    <>
      <Image
        src={path}
        alt={alt}
        width={width}
        height={height}
        className='max-w-xl rounded-lg shadow-lg'
      />
    </>
  )
}
