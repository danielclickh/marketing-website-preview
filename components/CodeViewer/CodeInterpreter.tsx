

import { useState, useEffect } from "react";
import { parse } from 'json5';
import CodeResults from "./CodeResults";
import { createClient as createWebClient } from '@clickhouse/client-web';
import short from 'short-uuid';
import { QueryParameter, QueryResponse, QueryResults } from "./types";
import { Button, CodeBlock, Icon, Tooltip } from '@clickhouse/click-ui'



interface Props {
  queryString: string
  clickhouseUrl: string
  clickhouseUser: string
  runnable: boolean
  play_link: string
  run: boolean
}

function CodeInterpreter({ queryString, clickhouseUrl, clickhouseUser, runnable, play_link, run }: Props) {

  const [results, setResults] = useState<any>(null);
  const [showResultPanel, setShowResultPanel] = useState<boolean>(false);
  const [queryRunning, setQueryRunning] = useState<boolean>(false)

  const clickhouse_web = createWebClient({
    url: clickhouseUrl || process.env.NEXT_PUBLIC_CLICKHOUSE_HOST,
    username: clickhouseUser || process.env.NEXT_PUBLIC_CLICKHOUSE_QUERY_USERNAME,
    password: process.env.NEXT_PUBLIC_CLICKHOUSE_QUERY_PASSWORD || '',
    clickhouse_settings: {
      allow_experimental_analyzer: 1,
      result_overflow_mode: 'break',
      read_overflow_mode: 'break',
    }
  });

  function generateId(): string {
    return short.generate().toUpperCase().slice(0, 27);
  }

  async function query(query: string, query_id: string, params: Array<QueryParameter>): Promise<QueryResponse> {
    if (!query) {
      return { error: 'Query not provided', status: 400, query_id: query_id };
    }
    query = query.replace(/;$/, '').trim();

    const query_params: { [key: string]: string } = {};
    params.forEach((param) => {
      if (param.type && /^(Array|Map|Tuple|Nested)/.test(param.type)) {
        try {
          query_params[param.name] = parse(param.value);
        } catch (e) {
          // just send and let clickhouse error
          query_params[param.name] = param.value;
        }
      } else {
        query_params[param.name] = param.value;
      }
    });

    try {
      const res = await clickhouse_web.query({
        query: query,
        query_id: query_id,
        query_params: query_params
      });
      const json = await res.json() as QueryResults;
      if (json.exception) {
        console.error("Error while running query", json.exception);
        return { query: query, status: 500, response: json, query_id: query_id, error: json.exception }
      }
      return { query: query, status: 200, response: json, query_id: query_id };
    } catch (error) {
      console.error("Error while running query", error);
      return { error: error, status: 500, query_id: query_id };
    }
  }

  useEffect(() => {
    if (run) {
      handleRunQuery()
    }
  }, [run])

  const handleRunQuery = async () => {
    const query_run_id = generateId();
    setResults({})
    setQueryRunning(true);
    setShowResultPanel(true)
    const res = await query(queryString, query_run_id, []);
    setQueryRunning(false);
    setResults({ response: res.response, query_id: res.query_id, error: res.error });
  }

  const closeResultPanel = (event: any) => {
    event.preventDefault()
    setShowResultPanel(false)
  }

  const openResultPanel = (event: any) => {
    event.preventDefault()
    setShowResultPanel(true)
  }

  const hideResultButton = () => {
    if (results) {
      return (showResultPanel?
        <Tooltip>
          <Tooltip.Trigger>
            <Button iconLeft="chevron-down" onClick={closeResultPanel} type='empty'></Button>
          </Tooltip.Trigger>
          <Tooltip.Content side="bottom">
            Close the results
          </Tooltip.Content>
        </Tooltip>:<Tooltip>
          <Tooltip.Trigger>
            <Button iconLeft="chevron-up" onClick={openResultPanel} type='empty'></Button>
          </Tooltip.Trigger>
          <Tooltip.Content side="bottom">
            Close the results
          </Tooltip.Content>
        </Tooltip>)
    }
  }

    const runButton = () => {
      if (runnable) {
        return (
          <div className="flex justify-between h-[40px]">
            <div className='flex items-center'>
              {hideResultButton()}
            </div>
            <div className='flex items-center'>
              <div className='m-1'>
                <Tooltip>
                  <Tooltip.Trigger>
                    <Button iconLeft="play" onClick={handleRunQuery} type='primary' loading={queryRunning}></Button>
                  </Tooltip.Trigger>
                  <Tooltip.Content side="bottom">
                    Run the query
                  </Tooltip.Content>
                </Tooltip>
              </div>
              {play_link &&
                <Tooltip>
                  <Tooltip.Trigger>
                    <a href={play_link} target='_blank' rel='noreferrer'>
                      <Icon height=""
                        className="flex items-center p-[0.365rem]"
                        name="popout"
                        size="md"
                        // state="neutral"
                        color="white"
                      />
                    </a>
                  </Tooltip.Trigger>
                  <Tooltip.Content side="bottom">
                    Open in Play
                  </Tooltip.Content>
                </Tooltip>
              }
            </div>
          </div>
        )
      }

    }

    return (
      <>
        {runButton()}
        <div className="flex flex-col-reverse divide-y-4 divide-y-reverse divide-gray-200 border-t-1">
          {showResultPanel && <CodeResults results={results} queryRunning={queryRunning} />}
        </div>
      </>
    )
  }

  export default CodeInterpreter
