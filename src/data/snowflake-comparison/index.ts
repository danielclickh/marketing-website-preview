import architecture from './architecture'
import interoperability from './interoperability'
import performance from './performance'
import scalability from './scalability'
import useCases from './use-cases'
import { CellIcons } from '@/components/ComparisonTable'

export type Table = {
  name: string
  description?: string
  rows: Array<{
    heading: string
    subHeading?: null | string
    clickhouse: {
      icon: CellIcons
      label: string
    }
    snowflake: {
      icon: CellIcons
      label: string
    }
  }>
}

// The order of items here defines the tab sequence in the UI
export default [
  architecture,
  scalability,
  performance,
  useCases,
  interoperability
] satisfies Array<Table>
