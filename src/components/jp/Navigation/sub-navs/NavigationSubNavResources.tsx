import { NavigationLink } from '../parts'
import NavigationChevron from '../parts/NavigationChevron'
import NavigationSubNav from '../parts/NavigationSubNav'
import { useGalaxyOnClick } from '@/lib/galaxy/galaxy'
import { useState } from 'react'

const SUBNAV_CLOSE_DELAY = 250

export default function NavigationSubNavResources() {
  const [activeSubNav, setActiveSubNav] = useState<null | string>(null)

  const isSubNavActive = (name: string) => activeSubNav === name

  return (
    <ul className='relative px-4 md-mid:py-2'>
      <li>
        <NavigationLink
          href='/jp/blog'
          onClick={useGalaxyOnClick('topNav.resourcesMenu.blogSelect')}
          className='block w-full'>
          ブログ
        </NavigationLink>
      </li>
      <li
        onMouseEnter={() => {
          setActiveSubNav('comparisons')
        }}
        onMouseLeave={() => {
          setActiveSubNav(null)
        }}>
        <NavigationLink
          href='#'
          onClick={() => {
            setActiveSubNav(
              isSubNavActive('comparisons') ? null : 'comparisons'
            )
          }}
          className={`w-full items-center justify-between ${
            isSubNavActive('comparisons') ? 'text-primary-300' : ''
          }`}>
          <span>比較情報</span>
          <NavigationChevron
            className={
              isSubNavActive('comparisons')
                ? 'rotate-90 text-primary-300 md-mid:rotate-0'
                : 'text-neutral-500'
            }
          />
        </NavigationLink>
        <NavigationSubNav isOpen={isSubNavActive('comparisons')}>
          <li>
            <NavigationLink
              href='/jp/comparison/bigquery'
              onClick={useGalaxyOnClick(
                'topNav.comparisonsMenu.bigQuerySelect'
              )}
              className='block w-full'>
              BigQuery
            </NavigationLink>
          </li>
          {/* <li>
            <NavigationLink
              href='/jp/comparison/postgresql'
              onClick={useGalaxyOnClick(
                'topNav.comparisonsMenu.postgreSqlSelect'
              )}
              className='block w-full'>
              PostgreSQL
            </NavigationLink>
          </li> */}
          <li>
            <NavigationLink
              href='/jp/comparison/redshift'
              onClick={useGalaxyOnClick(
                'topNav.comparisonsMenu.redshiftSelect'
              )}
              className='block w-full'>
              Redshift
            </NavigationLink>
          </li>
          <li>
            <NavigationLink
              href='/jp/comparison/snowflake'
              onClick={useGalaxyOnClick(
                'topNav.comparisonsMenu.snowflakeSelect'
              )}
              className='block w-full'>
              Snowflake
            </NavigationLink>
          </li>
        </NavigationSubNav>
      </li>
      <li>
        <NavigationLink
          href='/jp/videos'
          onClick={useGalaxyOnClick('topNav.resourcesMenu.videosSelect')}
          className='block w-full'>
          ビデオ
        </NavigationLink>
      </li>
      <li>
        <NavigationLink
          href='/jp/demos'
          onClick={useGalaxyOnClick('topNav.resourcesMenu.demosSelect')}
          className='block w-full'>
          デモ
        </NavigationLink>
      </li>
    </ul>
  )
}
