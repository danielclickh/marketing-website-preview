import { CodeBlock } from '@clickhouse/click-ui'
import CodeInterpreter from './CodeInterpreter'
import { ChartConfig, ChartType } from './types'
import { base64Decode } from './utils'

function CodeViewer({
  node,
  inline,
  className,
  type,
  language,
  show_line_numbers = 'true',
  runnable = false,
  run = false,
  clickhouse_url,
  clickhouse_user,
  play_link,
  view = 'table',
  chart_config = '',
  children,
  ...props
}: any) {
  const showLineNumbers = show_line_numbers === 'true'
  const runBoolean = run === 'true'
  const runnableBoolean = runnable === 'true'
  if (type === 'click-ui') {
    const codeContent = (
      Array.isArray(children)
        ? children
            .map((child) =>
              typeof child === 'object' ? child.props?.children || '' : child
            )
            .join('')
        : children.toString()
    ).trim()

    let chart: { type: ChartType; config?: ChartConfig } | undefined
    try {
      const parsedChart = JSON.parse(base64Decode(chart_config))
      if (parsedChart && parsedChart.type && parsedChart.config) {
        chart = {
          type: parsedChart.type as ChartType,
          config: parsedChart.config
        }
      }
    } catch {
      console.log('chart config is not valid')
    }

    return (
      <div className='bg-[#282828] mb-9'>
        <CodeBlock
          language={language}
          onCopy={function Da() {}}
          onCopyError={function Da() {}}
          showLineNumbers={showLineNumbers}
          wrapLines>
          {codeContent}
        </CodeBlock>
        <CodeInterpreter
          play_link={play_link}
          run={runBoolean}
          runnable={runnableBoolean}
          queryString={codeContent}
          clickhouseUrl={clickhouse_url}
          clickhouseUser={clickhouse_user}
          view={view}
          chart={chart}
        />
      </div>
    )
  }
  return (
    <code
      className={`${className} mb-9 border border-solid border-c3`}
      style={{ wordBreak: 'break-word' }}
      {...props}>
      {children}
    </code>
  )
}

export default CodeViewer
