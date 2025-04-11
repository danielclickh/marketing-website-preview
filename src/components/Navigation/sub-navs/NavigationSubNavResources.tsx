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
          href='/user-stories'
          onClick={useGalaxyOnClick('topNav.resourcesMenu.userStoriesSelect')}
          className='block w-full'>
          User stories
        </NavigationLink>
      </li>
      <li>
        <NavigationLink
          href='/blog'
          onClick={useGalaxyOnClick('topNav.resourcesMenu.blogSelect')}
          className='block w-full'>
          Blog
        </NavigationLink>
      </li>
      <li>
        <NavigationLink
          href='/company/news-events'
          onClick={useGalaxyOnClick('topNav.resourcesMenu.eventsSelect')}
          className='block w-full'>
          Events
        </NavigationLink>
      </li>
      <li
        onMouseEnter={() => {
          setActiveSubNav('learning')
        }}
        onMouseLeave={() => {
          setActiveSubNav(null)
        }}>
        <NavigationLink
          onClick={() => {
            setActiveSubNav(isSubNavActive('learning') ? null : 'learning')
          }}
          className={`w-full items-center justify-between ${
            isSubNavActive('learning') ? 'text-primary-300' : ''
          }`}>
          <span>Learning and certification</span>
          <NavigationChevron
            className={
              isSubNavActive('learning')
                ? 'rotate-90 text-primary-300 md-mid:rotate-0'
                : 'text-neutral-500'
            }
          />
        </NavigationLink>
        <NavigationSubNav isOpen={isSubNavActive('learning')}>
          <li>
            <NavigationLink
              href='/learn'
              onClick={useGalaxyOnClick('topNav.learnMenu.academySelect')}
              className='block w-full'>
              ClickHouse Academy
            </NavigationLink>
          </li>
          <li>
            <NavigationLink
              href='/company/news-events?category=Free+Training#upcoming-events'
              onClick={useGalaxyOnClick('topNav.learnMenu.freeTrainingSelect')}
              className='block w-full'>
              Free live training
            </NavigationLink>
          </li>
          <li>
            <NavigationLink
              href='/learn/certification'
              onClick={useGalaxyOnClick('topNav.learnMenu.certificationSelect')}
              className='block w-full'>
              ClickHouse Certification
            </NavigationLink>
          </li>
        </NavigationSubNav>
      </li>
      <li
        onMouseEnter={() => {
          setActiveSubNav('comparisons')
        }}
        onMouseLeave={() => {
          setActiveSubNav(null)
        }}>
        <NavigationLink
          onClick={() => {
            setActiveSubNav(
              isSubNavActive('comparisons') ? null : 'comparisons'
            )
          }}
          className={`w-full items-center justify-between ${
            isSubNavActive('comparisons') ? 'text-primary-300' : ''
          }`}>
          <span>Comparisons</span>
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
              href='/comparison/bigquery'
              onClick={useGalaxyOnClick(
                'topNav.comparisonsMenu.bigQuerySelect'
              )}
              className='block w-full'>
              BigQuery
            </NavigationLink>
          </li>
          <li>
            <NavigationLink
              href='/comparison/postgresql'
              onClick={useGalaxyOnClick(
                'topNav.comparisonsMenu.postgreSqlSelect'
              )}
              className='block w-full'>
              PostgreSQL
            </NavigationLink>
          </li>
          <li>
            <NavigationLink
              href='/comparison/redshift'
              onClick={useGalaxyOnClick(
                'topNav.comparisonsMenu.redshiftSelect'
              )}
              className='block w-full'>
              Redshift
            </NavigationLink>
          </li>
          <li>
            <NavigationLink
              href='/comparison/snowflake'
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
          href='/videos'
          onClick={useGalaxyOnClick('topNav.resourcesMenu.videosSelect')}
          className='block w-full'>
          Videos
        </NavigationLink>
      </li>
      <li>
        <NavigationLink
          href='/demos'
          onClick={useGalaxyOnClick('topNav.resourcesMenu.demosSelect')}
          className='block w-full'>
          Demos
        </NavigationLink>
      </li>
    </ul>
  )
}
