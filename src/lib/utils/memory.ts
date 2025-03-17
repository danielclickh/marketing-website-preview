const BYTE_UNITS = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

const BIBYTE_UNITS = [
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

const BIT_UNITS = [
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

const BIBIT_UNITS = [
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

const COMBINED_UNITS = [
  ...BYTE_UNITS,
  ...BIBYTE_UNITS,
  ...BIT_UNITS,
  ...BIBIT_UNITS
]

type BytesToHumanReadableOptions = {
  bits?: boolean
  binary?: boolean
  seperator?: string
  locale?: Intl.LocalesArgument
  minimumFractionDigits?: number
  maximumFractionDigits?: number
}

export function bytesToHumanReadable(
  number: number,
  options: BytesToHumanReadableOptions = {}
) {
  if (!Number.isFinite(number)) {
    throw new TypeError(
      `Expected a finite number, got ${typeof number}: ${number}`
    )
  }

  const {
    bits = false,
    binary = false,
    seperator = ' ',
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

export function humanReadableToBytes(
  humanReadable: string,
  defaultValue: any = null
) {
  // Match positive and negative numbers including decimals with preceeding unit
  const pattern = new RegExp(
    `^([\-\+]?(?:\\d+(?:\\.\\d+)?))(${COMBINED_UNITS.join('|')})$`
  )

  // If is a match, return example: [ "-2.75GB", "-2.75", "GB" ]
  const matches = humanReadable.trim().match(pattern)

  if (matches) {
    const value = Number(matches[1])
    const unit = matches[2]
    const binary = [...BIBIT_UNITS, ...BIBYTE_UNITS].includes(unit)
    const bits = [...BIT_UNITS, ...BIBIT_UNITS].includes(unit)

    const UNITS = bits
      ? binary
        ? BIBIT_UNITS
        : BIT_UNITS
      : binary
        ? BIBYTE_UNITS
        : BYTE_UNITS

    const unitIndex = UNITS.indexOf(unit)

    if (unitIndex === -1) {
      throw new Error(
        `Invalid unit: ${unit}. Expected one of: ${COMBINED_UNITS.join(', ')}`
      )
    }

    const factor = binary ? 1024 : 1000
    return value * Math.pow(factor, unitIndex)
  }

  return defaultValue
}
