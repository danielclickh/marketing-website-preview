import architecture from './architecture'
import interoperability from './interoperability'
import performance from './performance'
import scalability from './scalability'
import useCases from './use-cases'

export type Table = {
  name: string
  rows: Array<{
    heading: string
    subHeading?: null | string
    clickhouse: {
      value: boolean
      label: string
    }
    snowflake: {
      value: boolean
      label: string
    }
  }>
}

export default [
  architecture,
  scalability,
  performance,
  useCases,
  interoperability
] satisfies Array<Table>
