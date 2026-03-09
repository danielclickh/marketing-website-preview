import { SuiText } from '../../sui'
import { motion } from 'framer-motion'
import Image, { ImageProps } from 'next/image'
import Link from 'next/link'

const getRandomDelay = (min: number, max: number) =>
  Math.random() * (max - min) + min

export default function AnimatedIntegrationLogos({ play }: { play: boolean }) {
  return (
    <div className='flex flex-wrap justify-center gap-6'>
      {/* Row 1 */}
      <ExpandingTile
        logo={{
          src: '/images/cloud/integrations/postgres.svg',
          alt: 'Postgres'
        }}
        origin='top-left'
        expand={play}>
        <div className='absolute inset-0 flex flex-col justify-between p-4'>
          <Image
            src='/images/cloud/integrations/postgres-peerdb.svg'
            width={132}
            height={44}
            alt='Postgres + PeerDB'
          />
          <SuiText size='xs'>
            PeerDB を使用した、高速、シンプル、コスト効率の高い Postgres
            レプリケ3ーション。{' '}
            <Link
              href='/blog/clickhouse-welcomes-peerdb-adding-the-fastest-postgres-cdc-to-the-fastest-olap-database'
              target='_blank'
              className='text-primary-300 hover:underline'>
              <div className='absolute inset-0 transition-colors hover:bg-white/5' />
              詳しく見る
            </Link>
          </SuiText>
        </div>
      </ExpandingTile>
      <Tile
        logo={{
          src: '/images/cloud/integrations/vector.svg',
          alt: 'Vector'
        }}
        fade={play}
      />
      <Tile
        logo={{
          src: '/images/cloud/integrations/kafka.svg',
          alt: 'Kafka'
        }}
        fade={false}
      />
      <Tile
        logo={{
          src: '/images/cloud/integrations/airbyte.svg',
          alt: 'Airbyte'
        }}
        fade={play}
      />
      <Tile
        logo={{
          src: '/images/cloud/integrations/superset.svg',
          alt: 'Superset'
        }}
        fade={play}
      />
      <Tile
        logo={{
          src: '/images/cloud/integrations/amazon_s3.svg',
          alt: 'Amazon S3'
        }}
        fade={false}
      />

      {/* Row 2 */}
      <Tile
        logo={{
          src: '/images/cloud/integrations/grafana.svg',
          alt: 'Grafana'
        }}
        fade={play}
      />
      <Tile
        logo={{
          src: '/images/cloud/integrations/tableau.svg',
          alt: 'Tableau'
        }}
        fade={play}
      />
      <Tile
        logo={{
          src: '/images/cloud/integrations/diagram/google-cloud-pubsub-logo-1.svg',
          alt: 'Google Cloud PubSub'
        }}
        fade={play}
      />
      <Tile
        logo={{
          src: '/images/cloud/integrations/deepnote.svg',
          alt: 'Deep Note'
        }}
        fade={play}
      />
      <Tile
        logo={{
          src: '/images/cloud/integrations/diagram/azure-event-hub.svg',
          alt: 'Azure Event Hub'
        }}
        fade={false}
      />
      <Tile
        logo={{
          src: '/images/cloud/integrations/mysql.svg',
          alt: 'MySQL'
        }}
        fade={play}
      />

      {/* Row 3 */}
      <Tile
        logo={{
          src: '/images/cloud/integrations/dbt.svg',
          alt: 'dbt'
        }}
        fade={play}
      />
      <Tile
        logo={{
          src: '/images/cloud/integrations/diagram/aws-msk.svg',
          alt: 'AWS MSK'
        }}
        fade={false}
      />
      <Tile
        logo={{
          src: '/images/cloud/integrations/python.svg',
          alt: 'Python'
        }}
        fade={play}
      />
      <Tile
        logo={{
          src: '/images/cloud/integrations/diagram/aws-kinesis.svg',
          alt: 'AWS Kinesis'
        }}
        fade={false}
      />
      <Tile
        logo={{
          src: '/images/cloud/integrations/metabase.svg',
          alt: 'Metabase'
        }}
        fade={play}
      />
      <Tile
        logo={{
          src: '/images/cloud/integrations/java.svg',
          alt: 'Java'
        }}
        fade={play}
      />

      {/* Row 4 */}
      <Tile
        logo={{
          src: '/images/cloud/integrations/go.svg',
          alt: 'Go Lang'
        }}
        fade={play}
      />
      <Tile
        logo={{
          src: '/images/cloud/integrations/diagram/Logos-6.svg',
          alt: 'DG'
        }}
        fade={play}
      />
      <Tile
        logo={{
          src: '/images/cloud/integrations/c++.svg',
          alt: 'C++'
        }}
        fade={play}
      />
      <Tile
        logo={{
          src: '/images/cloud/integrations/nodejs.svg',
          alt: 'NodeJS'
        }}
        fade={play}
      />
      <Tile
        logo={{
          src: '/images/cloud/integrations/diagram/confluent-logos-idXfleyO4U-1.svg',
          alt: 'Confluent'
        }}
        fade={false}
      />
      <Tile
        logo={{
          src: '/images/cloud/integrations/hex.svg',
          alt: 'Hex'
        }}
        fade={play}
      />
    </div>
  )
}

interface TileContainerProps extends React.HTMLProps<HTMLDivElement> {
  children?: React.ReactNode
}

function TileContainer({
  children,
  className = '',
  ...props
}: TileContainerProps) {
  return (
    <div
      className={`rounded-md border border-[#414141]/80 bg-neutral-900 p-4 hover:bg-neutral-800 ${className}`}
      {...props}>
      {children}
    </div>
  )
}

interface TileProps {
  badge?: string | null
  logo: Pick<ImageProps, 'src' | 'alt'>
  fade?: boolean
}

function Tile({ badge, logo, fade = false }: TileProps) {
  return (
    <motion.div
      transition={{
        duration: 1,
        delay: getRandomDelay(0.2, 1),
        ease: [0, 0.71, 0.2, 1.01]
      }}
      animate={fade ? { opacity: 0.1 } : { opacity: 1 }}>
      <TileContainer className={`relative ${fade ? 'z-10' : 'z-20'}`}>
        {badge && (
          <div className='absolute -right-2 -top-2 rounded-full bg-primary-300 px-3 text-xs font-normal text-neutral-725'>
            {badge}
          </div>
        )}
        <Image
          {...logo}
          width={72}
          height={72}
          alt={logo.alt}
          className='max-h-[36px] min-h-[36px] w-[36px] object-scale-down'
        />
      </TileContainer>
    </motion.div>
  )
}

interface ExpandingTileProps extends Omit<TileProps, 'fade'> {
  children: React.ReactNode
  expand: boolean
  origin?:
    | 'center'
    | 'top'
    | 'top-right'
    | 'right'
    | 'bottom-right'
    | 'bottom'
    | 'bottom-left'
    | 'left'
    | 'top-left'
}

function ExpandingTile({
  children,
  expand,
  origin = 'center',
  ...tileProps
}: ExpandingTileProps) {
  let originClass = ''
  switch (origin) {
    case 'center':
      originClass = 'origin-center'
      break
    case 'top':
      originClass = 'origin-top'
      break
    case 'top-right':
      originClass = 'origin-top-right'
      break
    case 'right':
      originClass = 'origin-right'
      break
    case 'bottom-right':
      originClass = 'origin-bottom-right'
      break
    case 'bottom':
      originClass = 'origin-bottom'
      break
    case 'bottom-left':
      originClass = 'origin-bottom-left'
      break
    case 'left':
      originClass = 'origin-left'
      break
    case 'top-left':
      originClass = 'origin-top-left'
      break
  }
  return (
    <div className='relative'>
      <Tile {...tileProps} />
      <div
        className={`absolute left-0 top-0 z-30 aspect-square w-full ${originClass} transition-all duration-1000 ${
          expand
            ? '!w-[calc(200%_+_1.5rem)] delay-1000'
            : 'pointer-events-none opacity-0 delay-[250ms]'
        }`}>
        <TileContainer className='absolute inset-0 border-primary-300' />
      </div>
      <div
        className={`absolute left-0 top-0 z-30 aspect-square !w-[calc(200%_+_1.5rem)] origin-top-left overflow-hidden rounded-md transition-all duration-[750ms] ${
          expand ? 'delay-[1250ms]' : 'pointer-events-none scale-75 opacity-0'
        }`}>
        {children}
      </div>
    </div>
  )
}
