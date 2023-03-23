import React, { HtmlHTMLAttributes } from 'react'
import Paths from './Paths'

function SpeedAnimation(props: HtmlHTMLAttributes<HTMLOrSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1182'
      height='753'
      fill='none'
      viewBox='0 0 1182 753'
      {...props}>
      <Paths />
      <rect
        xmlns='http://www.w3.org/2000/svg'
        width='119.984'
        height='119.938'
        x='539.15'
        y='282.068'
        fill='#FBFF46'
        className='clickhouse-logo-container'
        rx='4'></rect>
      <image
        xmlns='http://www.w3.org/2000/svg'
        width='79'
        height='80'
        x='559.642'
        y='302.037'
        href='/logos/black-logo.svg'></image>
      <text
        xmlns='http://www.w3.org/2000/svg'
        x='15.1426'
        y='12'
        fill='#FFFFE8'
        fontSize='14'>
        DATABASES AND DATA WAREHOUSES
      </text>
      {/* postgres */}
      <rect
        xmlns='http://www.w3.org/2000/svg'
        x='15.1426'
        y='31.0679'
        width='72'
        height='72'
        fill='#1A1918'
        stroke='rgba(52, 52, 52, 0.9)'
        rx='4'>
        <animate
          dur='3s'
          attributeName='stroke'
          begin='postgresLineAnimate.begin'
          values='#FBFF46; #FBFF46; 0'
          keyTimes='0; 0.99; 1'
        />
      </rect>
      <image
        xmlns='http://www.w3.org/2000/svg'
        width='48'
        height='48'
        x='27.1426'
        y='43.0679'
        href='/logos/postgres.svg'></image>
      {/* bigquery */}
      <rect
        xmlns='http://www.w3.org/2000/svg'
        x='103.143'
        y='31.0679'
        width='72'
        height='72'
        fill='#1A1918'
        stroke='rgba(52, 52, 52, 0.9)'
        rx='4'>
        <animate
          attributeName='stroke'
          begin='bigQueryLineAnimate.begin'
          dur='3s'
          values='#FBFF46; #FBFF46; 0'
          keyTimes='0; 0.99; 1'
        />
      </rect>
      <image
        xmlns='http://www.w3.org/2000/svg'
        width='48'
        height='48'
        x='115.143'
        y='43.0679'
        href='/logos/bigquery.svg'></image>
      {/* aws redshift */}
      <rect
        xmlns='http://www.w3.org/2000/svg'
        x='191.143'
        y='31.0679'
        width='72'
        height='72'
        fill='#1A1918'
        stroke='rgba(52, 52, 52, 0.9)'
        rx='4'>
        <animate
          dur='3s'
          attributeName='stroke'
          begin='redshiftLineAnimate.begin'
          values='#FBFF46; #FBFF46; 0'
          keyTimes='0; 0.99; 1'
        />
      </rect>
      <image
        xmlns='http://www.w3.org/2000/svg'
        width='48'
        height='48'
        x='203.143'
        y='47'
        href='/logos/redshift.svg'></image>
      {/* snowflake */}
      <rect
        xmlns='http://www.w3.org/2000/svg'
        x='15.1426'
        y='119.068'
        width='72'
        height='72'
        fill='#1A1918'
        stroke='rgba(52, 52, 52, 0.9)'
        rx='4'>
        <animate
          dur='3s'
          attributeName='stroke'
          begin='snowflakeLineAnimate.begin'
          values='#FBFF46; #FBFF46; 0'
          keyTimes='0; 0.99; 1'
        />
      </rect>
      <image
        xmlns='http://www.w3.org/2000/svg'
        width='48'
        height='48'
        x='27.1426'
        y='131.068'
        href='/logos/snowflake.svg'></image>
      {/* mongodb */}
      <rect
        xmlns='http://www.w3.org/2000/svg'
        x='103.143'
        y='119.068'
        width='72'
        height='72'
        fill='#1A1918'
        stroke='rgba(52, 52, 52, 0.9)'
        rx='4'>
        <animate
          dur='3s'
          attributeName='stroke'
          begin='mongoLineAnimate.begin'
          values='#FBFF46; #FBFF46; 0'
          keyTimes='0; 0.99; 1'
        />
      </rect>
      <image
        xmlns='http://www.w3.org/2000/svg'
        width='48'
        height='48'
        x='115.143'
        y='131.068'
        href='/logos/mongodb.svg'></image>
      {/* mysql */}
      <rect
        xmlns='http://www.w3.org/2000/svg'
        x='191.143'
        y='119.068'
        width='72'
        height='72'
        fill='#1A1918'
        stroke='rgba(52, 52, 52, 0.9)'
        rx='4'>
        <animate
          dur='3s'
          attributeName='stroke'
          begin='mysqlLineAnimate.begin'
          values='#FBFF46; #FBFF46; 0'
          keyTimes='0; 0.99; 1'
        />
      </rect>
      <image
        xmlns='http://www.w3.org/2000/svg'
        width='48'
        height='32'
        x='203.143'
        y='140.068'
        href='/logos/mysql.svg'></image>
      <text
        xmlns='http://www.w3.org/2000/svg'
        x='15.1426'
        y='267.068'
        fill='#FFFFE8'
        fontSize='14'>
        LOG AND ANALYTICS EVENTS
      </text>
      {/* kafka */}
      <rect
        xmlns='http://www.w3.org/2000/svg'
        x='15.1426'
        y='286.068'
        width='72'
        height='72'
        fill='#1A1918'
        stroke='rgba(52, 52, 52, 0.9)'
        rx='4'>
        <animate
          dur='3s'
          attributeName='stroke'
          begin='kafkaLineAnimate.begin'
          values='#FBFF46; #FBFF46; 0'
          keyTimes='0; 0.99; 1'
        />
      </rect>
      <image
        xmlns='http://www.w3.org/2000/svg'
        width='48'
        height='48'
        x='27.1426'
        y='298.068'
        href='/logos/kafka.svg'
      />
      {/* vector  */}
      <rect
        xmlns='http://www.w3.org/2000/svg'
        x='103.143'
        y='286.068'
        width='72'
        height='72'
        fill='#1A1918'
        stroke='rgba(52, 52, 52, 0.9)'
        rx='4'>
        <animate
          dur='3s'
          attributeName='stroke'
          begin='vectorLineAnimate.begin'
          values='#FBFF46; #FBFF46; 0'
          keyTimes='0; 0.99; 1'
        />
      </rect>
      <image
        xmlns='http://www.w3.org/2000/svg'
        width='48'
        height='48'
        x='115.143'
        y='298.068'
        href='/logos/vector.svg'
      />
      {/*  dbt */}
      <rect
        xmlns='http://www.w3.org/2000/svg'
        x='191.143'
        y='286.068'
        width='72'
        height='72'
        fill='#1A1918'
        stroke='rgba(52, 52, 52, 0.9)'
        rx='4'>
        <animate
          dur='3s'
          attributeName='stroke'
          begin='dbtLineAnimate.begin'
          values='#FBFF46; #FBFF46; 0'
          keyTimes='0; 0.99; 1'
        />
      </rect>
      <image
        xmlns='http://www.w3.org/2000/svg'
        width='48'
        height='48'
        x='203.143'
        y='298.068'
        href='/logos/dbt.svg'
      />
      <text
        xmlns='http://www.w3.org/2000/svg'
        x='15.1426'
        y='434.068'
        fill='#FFFFE8'
        fontSize='14'>
        DATA LAKES
      </text>
      {/* iceberg */}
      <rect
        xmlns='http://www.w3.org/2000/svg'
        x='15.1426'
        y='453.068'
        width='72'
        height='72'
        fill='#1A1918'
        stroke='rgba(52, 52, 52, 0.9)'
        rx='4'>
        <animate
          dur='3s'
          attributeName='stroke'
          begin='icebergLineAnimate.begin'
          values='#FBFF46; #FBFF46; 0'
          keyTimes='0; 0.99; 1'
        />
      </rect>
      <image
        xmlns='http://www.w3.org/2000/svg'
        width='40'
        height='40'
        x='31.1426'
        y='469.068'
        href='/logos/iceberg.svg'
      />
      {/* hudi  */}
      <rect
        xmlns='http://www.w3.org/2000/svg'
        x='103.143'
        y='453.068'
        width='72'
        height='72'
        fill='#1A1918'
        stroke='rgba(52, 52, 52, 0.9)'
        rx='4'>
        <animate
          dur='3s'
          attributeName='stroke'
          begin='hudiLineAnimate.begin'
          values='#FBFF46; #FBFF46; 0'
          keyTimes='0; 0.99; 1'
        />
      </rect>
      <image
        xmlns='http://www.w3.org/2000/svg'
        width='58.4795'
        height='40'
        x='109.902'
        y='469.068'
        href='/logos/hudi.svg'
      />
      {/*  delta lake */}
      <rect
        xmlns='http://www.w3.org/2000/svg'
        x='191.143'
        y='453.068'
        width='72'
        height='72'
        fill='#1A1918'
        stroke='rgba(52, 52, 52, 0.9)'
        rx='4'>
        <animate
          dur='3s'
          attributeName='stroke'
          begin='deltaLakeLineAnimate.begin'
          values='#FBFF46; #FBFF46; 0'
          keyTimes='0; 0.99; 1'
        />
      </rect>
      <image
        xmlns='http://www.w3.org/2000/svg'
        width='41.2371'
        height='40'
        x='206.523'
        y='469.068'
        href='/logos/deltaLake.svg'
      />
      <text
        xmlns='http://www.w3.org/2000/svg'
        x='15.1426'
        y='601.068'
        fill='#FFFFE8'
        fontSize='14'>
        LOCAL FILES
      </text>
      {/* local files */}
      <rect
        xmlns='http://www.w3.org/2000/svg'
        x='15.1426'
        y='620.068'
        width='248'
        height='102'
        fill='#1A1918'
        stroke='rgba(52, 52, 52, 0.9)'
        rx='4'>
        <animate
          dur='3s'
          attributeName='stroke'
          begin='0s'
          values='#FBFF46; #FBFF46; 0'
          keyTimes='0; 0.99; 1'
          repeatDur='indefinite'
        />
      </rect>
      <image
        xmlns='http://www.w3.org/2000/svg'
        width='43'
        height='48'
        x='45.3262'
        y='645.068'
        href='/logos/file-icon.svg'></image>
      <image
        xmlns='http://www.w3.org/2000/svg'
        width='124'
        height='54'
        x='110.643'
        y='644.068'
        href='/logos/local-files-text.svg'
      />
      <text x='994.166' y='12.209' fill='#FFFFE8' fontSize='12'>
        DATA VISUALIZATION TOOLS
      </text>
      {/* Superset */}
      <rect
        xmlns='http://www.w3.org/2000/svg'
        x='994.166'
        y='31.209'
        width='72'
        height='72'
        fill='#1A1918'
        stroke='rgba(52, 52, 52, 0.9)'
        rx='4'>
        <animate
          dur='3s'
          attributeName='stroke'
          begin='supersetLineAnimate.begin'
          values='#FBFF46; #FBFF46; 0'
          keyTimes='0; 0.99; 1'
        />
      </rect>
      <image
        xmlns='http://www.w3.org/2000/svg'
        width='48'
        height='48'
        x='1006.166'
        y='43.209'
        href='/logos/superset.svg'
      />
      {/* Deepnote */}
      <rect
        xmlns='http://www.w3.org/2000/svg'
        x='1082.17'
        y='31.209'
        width='72'
        height='72'
        fill='#1A1918'
        stroke='rgba(52, 52, 52, 0.9)'
        rx='4'>
        <animate
          dur='3s'
          attributeName='stroke'
          begin='deepNoteLineAnimate.begin'
          values='#FBFF46; #FBFF46; 0'
          keyTimes='0; 0.99; 1'
        />
      </rect>
      <image
        xmlns='http://www.w3.org/2000/svg'
        width='48'
        height='48'
        x='1096.17'
        y='43.209'
        href='/logos/deepnote.svg'
      />
      {/* graphana */}
      <rect
        xmlns='http://www.w3.org/2000/svg'
        x='994.166'
        y='119.209'
        width='72'
        height='72'
        fill='#1A1918'
        stroke='rgba(52, 52, 52, 0.9)'
        rx='4'>
        <animate
          dur='3s'
          attributeName='stroke'
          begin='graphanaLineAnimate.begin'
          values='#FBFF46; #FBFF46; 0'
          keyTimes='0; 0.99; 1'
        />
      </rect>
      <image
        xmlns='http://www.w3.org/2000/svg'
        width='48'
        height='48'
        x='1006.166'
        y='131.209'
        href='/logos/graphana.svg'
      />
      {/* metabase*/}
      <rect
        xmlns='http://www.w3.org/2000/svg'
        x='1082.02'
        y='119.209'
        width='72'
        height='72'
        fill='#1A1918'
        stroke='rgba(52, 52, 52, 0.9)'
        rx='4'>
        <animate
          dur='3s'
          attributeName='stroke'
          begin='metabaseLineAnimate.begin'
          values='#FBFF46; #FBFF46; 0'
          keyTimes='0; 0.99; 1'
        />
      </rect>
      <image
        xmlns='http://www.w3.org/2000/svg'
        width='48'
        height='48'
        x='1096.02'
        y='131.209'
        href='/logos/metabase.svg'
      />
      {/* tableau */}
      <rect
        xmlns='http://www.w3.org/2000/svg'
        x='994.166'
        y='207.209'
        width='72'
        height='72'
        fill='#1A1918'
        stroke='rgba(52, 52, 52, 0.9)'
        rx='4'>
        <animate
          dur='3s'
          attributeName='stroke'
          begin='tableauLineAnimate.begin'
          values='#FBFF46; #FBFF46; 0'
          keyTimes='0; 0.99; 1'
        />
      </rect>
      <image
        xmlns='http://www.w3.org/2000/svg'
        width='48'
        height='48'
        x='1006.023'
        y='219.209'
        href='/logos/tableau.svg'
      />
      {/* hex */}
      <rect
        xmlns='http://www.w3.org/2000/svg'
        x='1082.17'
        y='207.209'
        width='72'
        height='72'
        fill='#1A1918'
        stroke='rgba(52, 52, 52, 0.9)'
        rx='4'>
        <animate
          dur='3s'
          attributeName='stroke'
          begin='hexLineAnimate.begin'
          values='#FBFF46; #FBFF46; 0'
          keyTimes='0; 0.99; 1'
        />
      </rect>
      <image
        xmlns='http://www.w3.org/2000/svg'
        width='48'
        height='48'
        x='1094.17'
        y='219.209'
        href='/logos/hex.svg'
      />
      <text x='1007.14' y='438.386' fill='#FFFFE8' fontSize='12'>
        LANGUAGES
      </text>
      {/* Python */}
      <rect
        xmlns='http://www.w3.org/2000/svg'
        x='1007.14'
        y='457.386'
        width='72'
        height='72'
        fill='#1A1918'
        stroke='rgba(52, 52, 52, 0.9)'
        rx='4'>
        <animate
          dur='3s'
          attributeName='stroke'
          begin='pythonLineAnimate.begin'
          values='#FBFF46; #FBFF46; 0'
          keyTimes='0; 0.99; 1'
        />
      </rect>
      <image
        xmlns='http://www.w3.org/2000/svg'
        width='48'
        height='48'
        x='1019.14'
        y='469.386'
        href='/logos/python.svg'
      />
      {/* NodeJS */}
      <rect
        xmlns='http://www.w3.org/2000/svg'
        x='1095.14'
        y='457.386'
        width='72'
        height='72'
        fill='#1A1918'
        stroke='rgba(52, 52, 52, 0.9)'
        rx='4'>
        <animate
          dur='3s'
          attributeName='stroke'
          begin='nodejsLineAnimate.begin'
          values='#FBFF46; #FBFF46; 0'
          keyTimes='0; 0.99; 1'
        />
      </rect>
      <image
        xmlns='http://www.w3.org/2000/svg'
        width='48'
        height='48'
        x='1107.14'
        y='469.386'
        href='/logos/nodejs.svg'
      />
      {/* Java */}
      <rect
        xmlns='http://www.w3.org/2000/svg'
        x='1007.14'
        y='545.386'
        width='72'
        height='72'
        fill='#1A1918'
        stroke='rgba(52, 52, 52, 0.9)'
        rx='4'>
        <animate
          dur='3s'
          attributeName='stroke'
          begin='javaLineAnimate.begin'
          values='#FBFF46; #FBFF46; 0'
          keyTimes='0; 0.99; 1'
        />
      </rect>
      <image
        xmlns='http://www.w3.org/2000/svg'
        width='48'
        height='48'
        x='1019.14'
        y='557.386'
        href='/logos/java.svg'
      />
      {/* C# */}
      <rect
        xmlns='http://www.w3.org/2000/svg'
        x='1095.14'
        y='545.386'
        width='72'
        height='72'
        fill='#1A1918'
        stroke='rgba(52, 52, 52, 0.9)'
        rx='4'>
        <animate
          dur='3s'
          attributeName='stroke'
          begin='cHashLineAnimate.begin'
          values='#FBFF46; #FBFF46; 0'
          keyTimes='0; 0.99; 1'
        />
      </rect>
      <image
        xmlns='http://www.w3.org/2000/svg'
        width='35.55'
        height='40'
        x='1113.39'
        y='559.386'
        href='/logos/chash.svg'
      />
      {/* Go */}
      <rect
        xmlns='http://www.w3.org/2000/svg'
        x='1007.14'
        y='633.387'
        width='72'
        height='72'
        fill='#1A1918'
        stroke='rgba(52, 52, 52, 0.9)'
        rx='4'>
        <animate
          dur='3s'
          attributeName='stroke'
          begin='goLineAnimate.begin'
          values='#FBFF46; #FBFF46; 0'
          keyTimes='0; 0.99; 1'
        />
      </rect>
      <image
        xmlns='http://www.w3.org/2000/svg'
        width='40'
        height='40'
        x='1019.14'
        y='645.387'
        href='/logos/go.svg'
      />
      {/* Rust */}
      <rect
        xmlns='http://www.w3.org/2000/svg'
        x='1095.14'
        y='633.387'
        width='72'
        height='72'
        fill='#1A1918'
        stroke='rgba(52, 52, 52, 0.9)'
        rx='4'>
        <animate
          dur='3s'
          attributeName='stroke'
          begin='rustLineAnimate.begin'
          values='#FBFF46; #FBFF46; 0'
          keyTimes='0; 0.99; 1'
        />
      </rect>
      <image
        xmlns='http://www.w3.org/2000/svg'
        width='40'
        height='40'
        x='1109.14'
        y='647.387'
        href='/logos/rust.svg'
      />
    </svg>
  )
}

export default SpeedAnimation
