import CodeResults, { DefaultView } from './CodeResults'
import {
  ChartConfig,
  ChartType,
  QueryParameter,
  QueryResponse,
  QueryResults
} from './types'
import {
  formatBytes,
  formatReadableRows,
  roundToDynamicPrecision
} from './utils'
import { getGoogleAnalyticsUserIdFromBrowserCookie } from '@/lib/utils/google'
import { Button, Icon, RadioGroup, Tooltip } from '@clickhouse/click-ui'
import { createClient as createWebClient } from '@clickhouse/client-web'
import { parse } from 'json5'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import short from 'short-uuid'

interface Props {
  queryString: string
  clickhouseUrl: string
  clickhouseUser: string
  runnable: boolean
  play_link: string
  run: boolean
  view: DefaultView
  chart?: { type: ChartType; config?: ChartConfig }
  settings: string
  show_statistics: boolean
}

function CodeInterpreter({
  queryString,
  clickhouseUrl,
  clickhouseUser,
  runnable,
  play_link,
  run,
  view,
  chart,
  settings,
  show_statistics
}: Props) {
  const [results, setResults] = useState<any>(null)
  const [showResultsPanel, setShowResultsPanel] = useState<boolean>(false)
  const [queryRunning, setQueryRunning] = useState<boolean>(false)
  const [currentView, setCurrentView] = useState<DefaultView>(view)
  const [runByUser, setRunByUser] = useState<boolean>(false)
  const router = useRouter()

  const clickhouse_settings = JSON.parse(settings)
  const clickhouse_web = createWebClient({
    url: clickhouseUrl || process.env.NEXT_PUBLIC_CLICKHOUSE_HOST,
    username:
      clickhouseUser || process.env.NEXT_PUBLIC_CLICKHOUSE_QUERY_USERNAME,
    password: process.env.NEXT_PUBLIC_CLICKHOUSE_QUERY_PASSWORD || '',
    clickhouse_settings: {
      ...clickhouse_settings,
      allow_experimental_analyzer: 1,
      result_overflow_mode: 'break',
      read_overflow_mode: 'break'
    }
  })

  function generateId(): string {
    return short.generate().toUpperCase().slice(0, 27)
  }

  async function query(
    query: string,
    query_id: string,
    params: Array<QueryParameter>,
    runManually: boolean
  ): Promise<QueryResponse> {
    if (!query) {
      return { error: 'Query not provided', status: 400, query_id: query_id }
    }
    query = query.replace(/;$/, '').trim()

    const query_params: { [key: string]: string } = {}
    params.forEach((param) => {
      if (param.type && /^(Array|Map|Tuple|Nested)/.test(param.type)) {
        try {
          query_params[param.name] = parse(param.value)
        } catch (e) {
          // just send and let clickhouse error
          query_params[param.name] = param.value
        }
      } else {
        query_params[param.name] = param.value
      }
    })

    try {
      // Inject metadata as log comment
      const currentPath = router.asPath
      let jsonLogComment: Record<string, any> = {}
      if (typeof window !== 'undefined') {
        let gaId = getGoogleAnalyticsUserIdFromBrowserCookie('_ga')
        if (gaId) {
          jsonLogComment['ga_id'] = gaId
        }
      }
      if (currentPath) {
        jsonLogComment['url_path'] = currentPath
      }
      jsonLogComment['auto_run'] = !runManually

      const res = await clickhouse_web.query({
        query: query,
        query_id: query_id,
        query_params: query_params,
        clickhouse_settings: {
          log_comment: JSON.stringify(jsonLogComment)
        }
      })
      const json = (await res.json()) as QueryResults
      if (json.exception) {
        console.error('Error while running query', json.exception)
        return {
          query: query,
          status: 500,
          response: json,
          query_id: query_id,
          error: json.exception
        }
      }
      return { query: query, status: 200, response: json, query_id: query_id }
    } catch (error) {
      console.error('Error while running query', error)
      return { error: error, status: 500, query_id: query_id }
    }
  }

  useEffect(() => {
    if (run) {
      handleRunQuery(false)
    }
  }, [run])

  const handleRunQuery = async (runManually: boolean) => {
    const query_run_id = generateId()
    setResults({})
    setQueryRunning(true)
    setShowResultsPanel(true)

    const res = await query(queryString, query_run_id, [], runManually)
    setQueryRunning(false)
    setResults({
      response: res.response,
      query_id: res.query_id,
      error: res.error
    })
    setRunByUser(runManually)
  }

  const closeResultPanel = (event: any) => {
    event.preventDefault()
    setShowResultsPanel(false)
  }

  const openTableResultPanel = (event: any) => {
    event.preventDefault()
    setShowResultsPanel(true)
  }

  const runBy = () => {
    if (runByUser) {
      return 'Executed by user.'
    } else {
      if (run) {
        return 'Executed on load.'
      }
    }
  }

  const hideTableResultButton = () => {
    if (results) {
      const show_results = showResultsPanel ? (
        <Tooltip>
          <Tooltip.Trigger>
            <Button
              className='m-auto h-full'
              iconLeft='chevron-down'
              onClick={closeResultPanel}
              type='empty'></Button>
          </Tooltip.Trigger>
          <Tooltip.Content side='bottom'>Close the results</Tooltip.Content>
        </Tooltip>
      ) : (
        <Tooltip>
          <Tooltip.Trigger>
            <Button
              className='m-auto h-full'
              iconLeft='chevron-up'
              onClick={openTableResultPanel}
              type='empty'></Button>
          </Tooltip.Trigger>
          <Tooltip.Content side='bottom'>Open the results</Tooltip.Content>
        </Tooltip>
      )

      return (
        <div className='flex items-end whitespace-pre-wrap'>
          {show_results}
          {chart && (
            <div className='my-auto w-[80px] sm:w-[140px]'>
              <RadioGroup orientation='vertical' value={currentView}>
                <RadioGroup.Item
                  label='Table'
                  onClick={(): void => {
                    setCurrentView(DefaultView.Table)
                  }}
                  value={DefaultView.Table}
                />
                <RadioGroup.Item
                  label='Chart'
                  onClick={(): void => {
                    setCurrentView(DefaultView.Chart)
                  }}
                  value={DefaultView.Chart}
                />
              </RadioGroup>
            </div>
          )}
        </div>
      )
    }
  }

  const runButton = () => {
    if (runnable) {
      return (
        <div className='flex justify-between'>
          <div className='flex items-center'>
            <div className='flex items-center'>{hideTableResultButton()}</div>
            <div className='flex items-center'>
              {show_statistics && results?.response?.statistics && (
                <div
                  className={`mx-auto whitespace-pre-wrap text-xs italic ${chart ? 'ml-[8px]' : ''}`}>
                  {`${runBy()} Read ${formatReadableRows(results.response.statistics.rows_read)} rows and ${formatBytes(results.response.statistics.bytes_read)} in ${roundToDynamicPrecision(results.response.statistics.elapsed)} seconds`}
                </div>
              )}
            </div>
          </div>

          <div className='flex items-center'>
            <div className='m-1'>
              <Tooltip>
                <Tooltip.Trigger>
                  <Button
                    iconLeft='play'
                    onClick={() => {
                      handleRunQuery(true)
                    }}
                    type='primary'
                    loading={queryRunning}></Button>
                </Tooltip.Trigger>
                <Tooltip.Content side='bottom'>Run the query</Tooltip.Content>
              </Tooltip>
            </div>
            {play_link && (
              <Tooltip>
                <Tooltip.Trigger>
                  <a href={play_link} target='_blank' rel='noreferrer'>
                    <Icon
                      height=''
                      className='flex items-center p-[0.365rem]'
                      name='popout'
                      size='md'
                      // state="neutral"
                      color='white'
                    />
                  </a>
                </Tooltip.Trigger>
                <Tooltip.Content side='bottom'>Open in Play</Tooltip.Content>
              </Tooltip>
            )}
          </div>
        </div>
      )
    }
  }

  return (
    <>
      {runButton()}
      <div className='border-t-1 flex flex-col-reverse divide-y-4 divide-y-reverse divide-gray-200'>
        {showResultsPanel && (
          <CodeResults
            results={results}
            queryRunning={queryRunning}
            chart={chart}
            view={currentView}
          />
        )}
      </div>
    </>
  )
}

export default CodeInterpreter
