export const BYTE_UNITS = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

export const BIBYTE_UNITS = [
  'B',
  'KiB',
  'MiB',
  'GiB',
  'TiB',
  'PiB',
  'EiB',
  'ZiB',
  'YiB'
]

export const BIT_UNITS = [
  'b',
  'kbit',
  'Mbit',
  'Gbit',
  'Tbit',
  'Pbit',
  'Ebit',
  'Zbit',
  'Ybit'
]

export const BIBIT_UNITS = [
  'b',
  'kibit',
  'Mibit',
  'Gibit',
  'Tibit',
  'Pibit',
  'Eibit',
  'Zibit',
  'Yibit'
]

export const COMBINED_UNITS = [
  ...BYTE_UNITS,
  ...BIBYTE_UNITS,
  ...BIT_UNITS,
  ...BIBIT_UNITS
]

const combinedUnitsType = [...COMBINED_UNITS] as const

type BytesToHumanReadableOptions = {
  bits?: boolean
  binary?: boolean
  seperator?: string
  locale?: Intl.LocalesArgument
  minimumFractionDigits?: number
  maximumFractionDigits?: number
}

// Convert bytes to a specific unit
export function bytesTo(
  bytes: number,
  unit: (typeof combinedUnitsType)[number]
) {
  const binary = [...BIBIT_UNITS, ...BIBYTE_UNITS].includes(unit)
  const bits = [...BIT_UNITS, ...BIBIT_UNITS].includes(unit)

  const UNITS = bits
    ? binary
      ? BIBIT_UNITS
      : BIT_UNITS
    : binary
      ? BIBYTE_UNITS
      : BYTE_UNITS

  const exponent = UNITS.indexOf(unit)

  bytes /= (binary ? 1024 : 1000) ** exponent

  return bytes
}

// Convert bytes to a human-readable string
export function bytesToHumanReadable(
  number: number,
  options: BytesToHumanReadableOptions = {}
) {
  const {
    bits = false,
    binary = false,
    seperator = '',
    locale,
    ...localeOptions
  } = options

  const UNITS = bits
    ? binary
      ? BIBIT_UNITS
      : BIT_UNITS
    : binary
      ? BIBYTE_UNITS
      : BYTE_UNITS

  // Handle zero values
  if (number === 0) {
    return (
      number.toLocaleString(locale, localeOptions) +
      (seperator || '') +
      UNITS[0]
    )
  }

  const exponent = Math.min(
    Math.floor(
      binary ? Math.log(number) / Math.log(1024) : Math.log10(number) / 3
    ),
    UNITS.length - 1
  )
  number /= (binary ? 1024 : 1000) ** exponent

  return (
    number.toLocaleString(locale, localeOptions) +
    (seperator || '') +
    UNITS[exponent]
  )
}

// Convert a human-readable string to bytes
export function humanReadableToBytes(
  humanReadable: string,
  defaultValue: any = null
) {
  // Match positive and negative numbers including decimals with preceeding unit
  const pattern = new RegExp(
    `^([\-\+]?(?:\\d+(?:\\.\\d+)?))(${COMBINED_UNITS.join('|')})$`,
    'i'
  )

  // If is a match, return example: [ "-2.75GB", "-2.75", "GB" ]
  const matches = String(humanReadable).trim().match(pattern)

  if (matches) {
    const value = Number(matches[1])
    const unit = matches[2]
    const binary = !![...BIBIT_UNITS, ...BIBYTE_UNITS].find((item) => {
      return item.toLowerCase() === unit.toLowerCase()
    })?.length
    const bits = !![...BIT_UNITS, ...BIBIT_UNITS].find((item) => {
      return item.toLowerCase() === unit.toLowerCase()
    })?.length

    const UNITS = bits
      ? binary
        ? BIBIT_UNITS
        : BIT_UNITS
      : binary
        ? BIBYTE_UNITS
        : BYTE_UNITS

    const unitIndex = UNITS.findIndex((item) => {
      return item.toLowerCase() === unit.toLowerCase()
    })

    if (unitIndex !== -1) {
      return value * Math.pow(binary ? 1024 : 1000, unitIndex)
    }
  }

  return defaultValue
}

// Convert a human-readable string to a specific unit
export function humanReadableTo(
  humanReadable: string,
  unit: (typeof combinedUnitsType)[number],
  defaultValue: any = null
) {
  const bytes = humanReadableToBytes(humanReadable, defaultValue)
  return typeof bytes === 'number' ? bytesTo(bytes, unit) : bytes
}

type HumanReadablePartsReturnType<T> = T extends null
  ? null
  : { value: number; unit: string }

export function humanReadableParts<
  T extends { value: number | null; unit: string | null } | null
>(
  humanReadable: string,
  defaultValue: T = null as T
): HumanReadablePartsReturnType<T> {
  const pattern = new RegExp(
    `^([\-\+]?(?:\\d+(?:\\.\\d+)?))(${BYTE_UNITS.join('|')})$`,
    'i'
  )

  // If is a match, return example: [ "-2.75GB", "-2.75", "GB" ]
  const matches = humanReadable.trim().match(pattern)

  if (!matches) return defaultValue as HumanReadablePartsReturnType<T>

  const value = Number(matches[1])
  const unit = matches[2]

  return {
    value,
    unit
  } as HumanReadablePartsReturnType<T>
}
