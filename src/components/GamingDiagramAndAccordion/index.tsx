import GamingDiagram from '../GamingDiagram'
import { MinusIcon, PlusIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { useMemo, useState } from 'react'

export default function GamingDiagramAndAccordion() {
  const [dataIngestion, setDataIngestion] = useState(false)
  const [dataTransformations, setDataTransformations] = useState(false)
  const [objectStorage, setObjectStorage] = useState(false)
  const [applications, setApplications] = useState(false)

  const showAll = useMemo(() => {
    return (
      !dataIngestion && !dataTransformations && !objectStorage && !applications
    )
  }, [dataIngestion, dataTransformations, objectStorage, applications])

  return (
    <div
      className='mx-auto flex w-full flex-col justify-between gap-x-5 lg:flex-row'
      id='diagramTop'>
      <div className='lg:w-3/5 xl:mb-0'>
        <GamingDiagram
          className='h-auto w-full'
          applications={showAll || applications}
          objectStorage={showAll || objectStorage}
          mysqlInterface={showAll || applications}
          events={showAll || dataIngestion}
          clickhouse={showAll || dataTransformations}
        />
      </div>
      <div className='w-full space-y-4 pt-4 lg:w-2/5 2xl:pt-2'>
        <AccordionItem
          handle='Data ingestion'
          open={dataIngestion}
          onChange={(open) => {
            setDataIngestion(open)
            if (open) {
              setDataTransformations(false)
              setObjectStorage(false)
              setApplications(false)
            }
          }}>
          <div className='space-y-4 text-sm text-white/80'>
            <p>
              Access to live data is vital for real-time analytics. With{' '}
              <Link
                href='/cloud/clickpipes'
                className='text-primary-300 hover:underline'>
                ClickPipes
              </Link>
              , available exclusively in ClickHouse Cloud, we provide a turn-key
              integration engine that makes ingesting large volumes of data
              effortless. Select an incoming data source and format, tune your
              schema, and let your pipeline run - no complex configurations
              needed.
            </p>
            <p>
              With ClickPipes’ built-in PostgreSQL CDC (Change Data Capture)
              connector, users can seamlessly replicate transactional and
              operational data, including player activity, in-game purchases,
              inventory changes, matchmaking data, and session logs, directly
              from PostgreSQL to ClickHouse Cloud. This enables real-time
              analytics without the need for external ETL tools, which are often
              costly, slow, and not optimized for PostgreSQL. PostgreSQL changes
              are continuously streamed into ClickHouse, ensuring insights
              remain up to date without manual data refreshes or batch
              processing delays.
            </p>
            <p>
              Our extensive library of{' '}
              <Link
                href='/docs/engines/table-engines/mergetree-family'
                className='text-primary-300 hover:underline'>
                table engines
              </Link>{' '}
              supports ingesting data from a wide range of formats and sources.
              From Kafka topics to S3 buckets, OLTP databases, and more - we
              have you covered, no matter where your data lives.
            </p>
            <p>
              ClickHouse eliminates the complexity of data ingestion while
              maintaining high performance. Unlike other OLAP databases that
              require batching inserts for efficiency, ClickHouse optimizes for
              both high-velocity streaming data and smaller real-time payloads.{' '}
              <Link
                href='/docs/optimize/asynchronous-inserts'
                className='text-primary-300 hover:underline'>
                Asynchronous inserts
              </Link>{' '}
              automatically handle batching, allowing game developers and
              analytics teams to focus on insights rather than managing
              ingestion pipelines. Whether analyzing live game events,
              monitoring player engagement, or tracking ad performance,
              ClickHouse ensures immediate access to fresh, actionable data
              without ingestion bottlenecks.
            </p>
          </div>
        </AccordionItem>
        <AccordionItem
          handle='Data transformations and queries'
          open={dataTransformations}
          onChange={(open) => {
            setDataTransformations(open)
            if (open) {
              setDataIngestion(false)
              setObjectStorage(false)
              setApplications(false)
            }
          }}>
          <div className='space-y-4 text-sm text-white/80'>
            <p>
              Data transformations are common pillars in many gaming analytics
              workflows. With ClickHouse,{' '}
              <Link
                href='/docs/guides/developer/cascading-materialized-views'
                className='text-primary-300 hover:underline'>
                Materialized Views
              </Link>{' '}
              make transformations seamless. Automatically triggered when new
              data is inserted into source tables, these SQL-based views are
              used to easily extract, aggregate, and modify data as it arrives -
              eliminating the need to build bespoke data transformation
              pipelines yourself. Chaining Materialized Views together offers
              modularized flexibility, too.
            </p>
            <p>
              Queries on Materialized Views are exceptionally fast, as their
              results are automatically stored in new tables. This ensures that
              applications that rely on these queries are even more responsive,
              no matter how many petabytes of data are being analyzed. Unlike
              other database providers, at ClickHouse, we don't hide valuable
              accelerating features like these behind higher pricing tiers or
              additional charges.
            </p>
            <p>
              The ClickHouse Query Cache is available for further enhanced
              responsiveness and reduced resource consumption, best suited for
              frequently used and expensive queries. Additional tuning through
              indexes and{' '}
              <Link
                href='https://clickhouse.com/blog/clickhouse-faster-queries-with-projections-and-primary-indexes'
                className='text-primary-300 hover:underline'>
                projections
              </Link>{' '}
              provides additional optimizations to ensure ultimate performance,
              every time.
            </p>
          </div>
        </AccordionItem>
        <AccordionItem
          handle='Native support for efficient JSON storage'
          open={objectStorage}
          onChange={(open) => {
            setObjectStorage(open)
            if (open) {
              setDataIngestion(false)
              setDataTransformations(false)
              setApplications(false)
            }
          }}>
          <div className='space-y-4 text-sm text-white/80'>
            <p>
              ClickHouse delivers the most efficient JSON storage for analytical
              workloads, significantly{' '}
              <Link
                href='https://clickhouse.com/blog/json-bench-clickhouse-vs-mongodb-elasticsearch-duckdb-postgresql'
                className='text-primary-300 hover:underline'>
                outperforming other databases in both compression and query
                performance
              </Link>
              . Benchmarks show that ClickHouse requires six times less disk
              space than PostgreSQL and is 9,000 times faster at analytical
              queries, while also easily outpacing MongoDB and Elasticsearch.
            </p>
            <p>
              Unlike traditional row-based databases that store JSON as large
              text blobs, ClickHouse natively organizes JSON paths as compressed
              columns, ensuring that only relevant data is accessed for queries.
              This enables highly efficient storage, minimized I/O overhead, and
              unmatched aggregation speed, making ClickHouse the ideal choice
              for large-scale, event-driven gaming analytics.
            </p>
            <p>
              For game developers, flexibility is critical as new games,
              updates, and features continuously introduce new event types.
              ClickHouse’s native JSON support eliminates the need for rigid
              schemas, allowing developers to ingest and analyze evolving
              in-game event data without performance trade-offs. This makes it
              easy to adapt to new gameplay mechanics, telemetry events, and
              monetization strategies without costly schema modifications or
              preprocessing. By combining best-in-class compression with fully
              parallelized query execution, ClickHouse ensures real-time
              insights at scale, lowering the barrier for developers to send and
              analyze data effortlessly.
            </p>
          </div>
        </AccordionItem>
        <AccordionItem
          handle='Applications, dashboards, and more'
          open={applications}
          onChange={(open) => {
            setApplications(open)
            if (open) {
              setDataIngestion(false)
              setDataTransformations(false)
              setObjectStorage(false)
            }
          }}>
          <div className='space-y-4 text-sm text-white/80'>
            <p>
              ClickHouse is relied on by gaming companies all over the world to
              unlock value from data as soon as it arrives, powering user-facing
              analytics and workflows.
            </p>
            <p>
              Unlike traditional databases, ClickHouse supports a REST and gRPC
              interface, allowing web developers to build lightweight
              applications on ClickHouse without the need to integrate with
              complex binary protocols.
            </p>
            <p>
              Leveraging the tools and frameworks you love with ClickHouse is
              easy through our extensive ecosystem of integrations. These
              include popular utilities for data ingestion and visualization, as
              well as language clients, SQL clients,{' '}
              <Link
                href='/docs/integrations'
                className='text-primary-300 hover:underline'>
                and more
              </Link>
              .
            </p>
          </div>
        </AccordionItem>
      </div>
    </div>
  )
}

function AccordionItem({
  handle,
  children,
  onChange,
  open
}: {
  handle: string | React.ReactNode
  children: React.ReactNode
  onChange: (isOpen: boolean) => void
  open: boolean
}) {
  return (
    <div>
      <button
        onClick={(event) => {
          event.preventDefault()
          onChange(!open)
        }}
        className={`flex w-full cursor-pointer items-center justify-between rounded-sm border border-jet p-4 py-3 text-base font-medium leading-none outline-none hover:bg-neutral-750/40 xl:pr-6 ${open ? 'rounded-b-none border-b-0 bg-neutral-750/40 pb-2' : 'bg-neutral-900/80'}`}>
        <div>{handle}</div>
        <div className='relative aspect-square w-6'>
          <PlusIcon
            className={`absolute inset-0 transition duration-300 ${open ? '-rotate-180 opacity-0' : ''}`}
          />
          <MinusIcon
            className={`absolute inset-0 transition duration-300 ${open ? '' : '-rotate-180 opacity-0'}`}
          />
        </div>
      </button>
      <div
        className={`overflow-y-auto rounded-b-md border border-t-0 border-jet bg-neutral-750 p-4 pt-2 ${open ? '' : 'hidden'}`}>
        {children}
      </div>
    </div>
  )
}
