export type TableProps = {
  columns: TableColumnProps
  rows: TableRowProps
}

export type TableColumnProps = {
  id: number
  title: string
}

export type TableRowProps = {
  id: number
  col_1: string
  col_2: string
  col_3: string
  col_4?: string
  col_5?: string
  col_6?: string
}

// @ts-ignore
export const SuiTable = ({ ...TableProps }) => {
  const { columns, rows } = TableProps
  return (
    <div className='rounded-lg shadow border border-light-grey4 dark:border-dark-grey4 w-full overflow-scroll'>
      <table className='min-w-full md:min-w-full divide-y divide-light-grey4 dark:divide-dark-grey4 overflow-scroll'>
        <thead className='bg-light-grey2 dark:bg-dark-grey4'>
          <tr>
            {columns.map((column: any) => (
              <th
                key={column.id}
                scope='col'
                className='pl-4 py-3.5 px-3 first:pr-3 text-left text-sm font-semibold text-text-darkest dark:text-text-lightest first:rounded-tl-md last:rounded-tr-md'>
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='divide-y divide-light-grey4 dark:divide-dark-grey4 font-normal'>
          {rows.map((row: any) => (
            <tr
              key={row.id}
              className='hover:bg-light-grey2 dark:hover:bg-dark-grey4 last:rounded-b-lg'>
              <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm text-text-darkest dark:text-text-light'>
                {row.col_1}
              </td>
              <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm text-text-darkest dark:text-text-light'>
                {row.col_2}
              </td>
              <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm text-text-darkest dark:text-text-light'>
                {row.col_3}
              </td>
              {row.col_4 && (
                <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm text-text-darkest dark:text-text-light'>
                  {row.col_4}
                </td>
              )}
              {row.col_5 && (
                <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm text-text-darkest dark:text-text-light'>
                  {row.col_5}
                </td>
              )}
              {row.col_6 && (
                <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm text-text-darkest dark:text-text-light'>
                  {row.col_6}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
