import plugin from 'tailwindcss/plugin'
import { CSSRuleObject, KeyValuePair } from 'tailwindcss/types/config'

const BASE_CLASS = 'gradient-mask-to'

const directions = {
  t: 'to top',
  tr: 'to top right',
  r: 'to right',
  br: 'to bottom right',
  b: 'to bottom',
  bl: 'to bottom left',
  l: 'to left',
  tl: 'to top left'
}

function generateBaseUtilities() {
  const utilities: CSSRuleObject = {
    [`.${BASE_CLASS}-none`]: {
      maskImage: 'none'
    }
  }

  Object.entries(directions).forEach(([shorthand, direction]) => {
    utilities[`.${BASE_CLASS}-${shorthand}`] = {
      maskImage: `linear-gradient(${direction}, rgba(0, 0, 0, 1.0) var(--tw-gradient-from-position, 0%), rgba(0, 0, 0, .5) var(--tw-gradient-via-position, calc(var(--tw-gradient-from-position, 0%) + ((var(--tw-gradient-to-position, 100%) - var(--tw-gradient-from-position, 0%)) / 2))), rgba(0, 0, 0, 0) var(--tw-gradient-to-position, 100%))`
    }
  })

  return utilities
}

function generateArbitraryUtilities() {
  const matchingComponents: KeyValuePair<
    string,
    (value: unknown, extra: { modifier: string | null }) => CSSRuleObject | null
  > = {}

  Object.entries(directions).forEach(([shorthand, direction]) => {
    const className = `${BASE_CLASS}-${shorthand}`

    matchingComponents[className] = (value) => ({
      maskImage: `linear-gradient(${direction}, ${value})`
    })
  })

  return matchingComponents
}

const TailwindGradientMasks = plugin(function ({
  addUtilities,
  matchUtilities
}) {
  const baseUtilities = generateBaseUtilities()
  const arbitraryUtilities = generateArbitraryUtilities()

  addUtilities(baseUtilities)
  matchUtilities(arbitraryUtilities)
})

export default TailwindGradientMasks
