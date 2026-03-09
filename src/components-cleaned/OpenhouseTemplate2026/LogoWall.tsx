import StrapiImage from '@/components-cleaned/StrapiImage'
import { EntryImage } from '@/types/strapi'

type Widths = 'Small (1/4)' | 'Medium (1/3)' | 'Large (1/2)' | 'Full (1/1)'

export interface OpenhouseLogoWallProps {
  logos: Array<{
    logo: EntryImage
    width: Widths
  }>
}

const logoColSpanToTailwind: Record<number, string> = {
  1: 'md:col-span-1',
  2: 'md:col-span-2',
  3: 'md:col-span-3',
  4: 'md:col-span-4',
  5: 'md:col-span-5',
  6: 'md:col-span-6',
  7: 'md:col-span-7',
  8: 'md:col-span-8',
  9: 'md:col-span-9',
  10: 'md:col-span-10',
  11: 'md:col-span-11',
  12: 'md:col-span-12'
}

const logoWidthToColSpan: Record<Widths, number> = {
  'Small (1/4)': 3,
  'Medium (1/3)': 4,
  'Large (1/2)': 6,
  'Full (1/1)': 12
}

export default function OpenhouseLogoWall({ logos }: OpenhouseLogoWallProps) {
  const logoSpans = logos.map((logo) => logoWidthToColSpan[logo.width])
  const totalLogoSpans = logoSpans.reduce((a, b) => a + b, 0)
  const logoFillerSpan = Math.ceil(totalLogoSpans / 12) * 12 - totalLogoSpans

  return (
    <div className='grid grid-cols-1 md:grid-cols-12'>
      {logos.map((logo, logoIndex) => {
        return (
          <div
            key={logoIndex}
            className={`flex items-center justify-center bg-white px-2 py-6 ring-1 ring-gray-200 ${logoColSpanToTailwind[logoWidthToColSpan[logo.width]]}`}>
            <StrapiImage
              entry={logo.logo}
              className='h-12 w-full max-w-48 object-scale-down object-center'
            />
          </div>
        )
      })}
      {logoFillerSpan > 0 && (
        <div
          className={`hidden bg-white ring-1 ring-gray-200 md:block ${logoColSpanToTailwind[logoFillerSpan]}`}
        />
      )}
    </div>
  )
}
