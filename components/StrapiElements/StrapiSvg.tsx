import { StrapiImageProps } from './types'
import Markdown from '../Markdown'

export default function StrapiSvg({
  url,
  className = '',
  width,
  height,
  svgText = ''
}: StrapiImageProps) {
  try {
    return (
      <Markdown
        encloseByDiv={false}
        components={{
          svg: ({ node, ...params }) => {
            return (
              <svg
                {...params}
                className={`fill-current ${className}`}
                width={width ?? undefined}
                height={height ?? undefined}
              />
            )
          }
        }}>
        {svgText}
      </Markdown>
    )
  } catch (e) {
    console.log('Error fetching svg', `${process.env.STRAPI_API_URL}${url}`)
    console.error(e)
    return null
  }
}
