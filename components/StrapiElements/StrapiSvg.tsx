import React, { HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {
  url: string
}
async function StrapiSvg({ url, ...props }: Props) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`)
  const svgText = await response.text()
  // const { data: svgText } = useSWR(url, async () => {
  // return svgText
  // })

  return (
    <div
      dangerouslySetInnerHTML={{ __html: svgText }}
      className='strapi-svg-container'
      {...props}
    />
  )
}

export default StrapiSvg
