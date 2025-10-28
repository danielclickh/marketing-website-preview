import CodeInterpreter from './CodeInterpreter'
import { DefaultView } from './CodeResults'
import { ChartConfig, ChartType } from './types'
import { base64Decode } from './utils'
import { CodeBlock } from '@clickhouse/click-ui'

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
  clickhouse_settings = '{}',
  show_statistics = false,
  raw_code = '',
  children,
  ...props
}: any) {
  const isTrue = (value: any) =>
    ['true', '1'].includes(String(value).toLowerCase())
  const showLineNumbers = isTrue(show_line_numbers)
  const runBoolean = isTrue(run)
  const runnableBoolean = isTrue(runnable)
  if (type === 'click-ui') {
    let codeContent = ''
    if (raw_code !== '') {
      codeContent = raw_code
    } else {
      codeContent = (
        Array.isArray(children)
          ? children
              .map((child) =>
                typeof child === 'object' ? child.props?.children || '' : child
              )
              .join('')
          : children.toString()
      ).trim()
    }

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
      <div className='mb-9 bg-[#282828]'>
        <CodeBlock
          style={{ wordBreak: 'break-word' }}
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
          view={chart ? view : DefaultView.Table}
          chart={chart}
          settings={clickhouse_settings}
          show_statistics={show_statistics}
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
