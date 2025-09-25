import { Table } from './index'

export default {
  name: 'Interoperability',
  description: ``,
  rows: [
    {
      heading: 'Heading',
      clickhouse: {
        icon: 'yes',
        label: ''
      },
      elastic: {
        icon: 'no',
        label: ''
      }
    }
  ]
} satisfies Table
