import LinkWithArrow from '../../LinkWithArrow'
import { NavigationLink } from '../parts'
import { useGalaxyOnClick } from '@/lib/galaxy/galaxy'
import { ExternalLink } from 'lucide-react'
import Image from 'next/image'

export default function NavigationSubNavProducts() {
  return (
    <>
      <div className='grid grid-cols-1 md-mid:grid-cols-2'>
        {/* Column 1 */}
        <div className='flex flex-col'>
          <div className='px-4 md-mid:grid-cols-5 md-mid:grid-rows-1 md-mid:gap-x-4 md-mid:py-2'>
            <p className='col-span-full px-2 py-2 text-sm'>
              <strong>Products</strong>
            </p>
            <ul className='col-span-2'>
              <li className='flex items-center'>
                <NavigationLink
                  href='/cloud'
                  onClick={useGalaxyOnClick('topNav.productMenu.cloudSelect')}
                  className='group/nav-with-icon !flex w-full !flex-nowrap items-center gap-3'>
                  <Image
                    src='/images/nav/icon-clickhouse-cloud.svg'
                    alt='ClickHouse Cloud'
                    width={24}
                    height={24}
                    className='flex-grow-1 size-6 flex-shrink-0 object-scale-down'
                  />
                  <span>
                    ClickHouse Cloud
                    <div className='text-xs text-slate-300 transition-colors group-hover/nav-with-icon:text-white'>
                      The best way to use ClickHouse.
                      <br />
                      Available on AWS, GCP, and Azure.
                    </div>
                  </span>
                </NavigationLink>
              </li>
              <li className='flex items-center'>
                <NavigationLink
                  href='/cloud/bring-your-own-cloud'
                  onClick={useGalaxyOnClick('topNav.productMenu.byocSelect')}
                  className='group/nav-with-icon !flex w-full !flex-nowrap items-center gap-3'>
                  <Image
                    src='/images/nav/icon-byoc.svg'
                    alt='ClickHouse BYOC'
                    width={24}
                    height={24}
                    className='flex-grow-1 size-6 flex-shrink-0 object-scale-down'
                  />
                  <span>
                    Bring Your Own Cloud
                    <div className='text-xs text-slate-300 transition-colors group-hover/nav-with-icon:text-white'>
                      A fully managed ClickHouse service,
                      <br /> deployed in your own AWS and GCP account.
                    </div>
                  </span>
                </NavigationLink>
              </li>
              
              {/*<li className='flex items-center'>
                <NavigationLink
                  href='#'
                  onClick={useGalaxyOnClick(
                    'topNav.productMenu.clickstackCloudSelect'
                  )}
                  className='group/nav-with-icon !flex w-full !flex-nowrap items-center gap-3'>
                  <Image
                    src='/images/nav/icon-clickstack-cloud.svg'
                    alt='ClickStack Cloud'
                    width={24}
                    height={24}
                    className='flex-grow-1 size-6 flex-shrink-0 object-scale-down'
                  />
                  <span>
                    ClickStack Cloud
                    <div className='text-xs text-slate-300 transition-colors group-hover/nav-with-icon:text-white'>
                      Unified observability UI for logs,
                      <br /> metrics, and traces
                    </div>
                  </span>
                </NavigationLink>
              </li>*/}
            </ul>
          </div>
        </div>

        {/* Column 2 */}
        <div className='flex flex-col border-t border-neutral-700 md-mid:border-l md-mid:border-t-0'>
          <div className='px-4 md-mid:grid-cols-5 md-mid:grid-rows-1 md-mid:gap-x-4 md-mid:py-2'>
            <p className='col-span-full px-2 py-2 text-sm'>
              <strong>Open source</strong>
            </p>
            <ul className='col-span-2'>
              <li>
                <NavigationLink
                  href='/clickhouse'
                  onClick={useGalaxyOnClick(
                    'topNav.productMenu.openSourceSelect'
                  )}
                  className='group/nav-with-icon !flex w-full !flex-nowrap items-center gap-3'>
                  <Image
                    src='/images/nav/icon-clickhouse.svg'
                    alt='ClickHouse'
                    width={24}
                    height={24}
                    className='flex-grow-1 size-6 flex-shrink-0 object-scale-down'
                  />
                  <span>
                    ClickHouse
                    <div className='text-xs text-slate-300 transition-colors group-hover/nav-with-icon:text-white'>
                      Fast open-source OLAP database for <br />
                      real-time analytics.
                    </div>
                  </span>
                </NavigationLink>
              </li>
              {/*<li>
                <NavigationLink
                  href='/chdb'
                  onClick={useGalaxyOnClick('topNav.productMenu.chdbSelect')}
                  className='group/nav-with-icon !flex w-full !flex-nowrap items-center gap-3'>
                  <Image
                    src='/images/nav/icon-chdb.svg'
                    alt='chDB'
                    width={24}
                    height={24}
                    className='flex-grow-1 size-6 flex-shrink-0 object-scale-down'
                  />
                  <span>
                    chDB
                    <div className='text-xs text-slate-300 transition-colors group-hover/nav-with-icon:text-white'>
                      Embedded ClickHouse for Python and <br />
                      other languages
                    </div>
                  </span>
                </NavigationLink>
              </li>*/}
              {/*<li>
                <NavigationLink
                  href='https://www.peerdb.io/'
                  target='_blank'
                  onClick={useGalaxyOnClick('topNav.productMenu.peerdbSelect')}
                  className='group/nav-with-icon !flex w-full !flex-nowrap items-center gap-3'>
                  <Image
                    src='/images/nav/icon-peerdb.svg'
                    alt='PeerDB'
                    width={24}
                    height={24}
                    className='flex-grow-1 size-6 flex-shrink-0 object-scale-down'
                  />
                  <span>
                    <span className='flex items-center gap-0.5'>
                      <span>PeerDB</span>
                      <ExternalLink height={12} />
                    </span>
                    <div className='text-xs text-slate-300 transition-colors group-hover/nav-with-icon:text-white'>
                      Open-source data replication platform
                    </div>
                  </span>
                </NavigationLink>
              </li>*/}
              <li>
                <NavigationLink
                  href='/use-cases/observability'
                  onClick={useGalaxyOnClick(
                    'topNav.productMenu.clickstackSelect'
                  )}
                  className='group/nav-with-icon !flex w-full !flex-nowrap items-center gap-3'>
                  <Image
                    src='/images/nav/icon-clickstack.svg'
                    alt='ClickStack'
                    width={24}
                    height={24}
                    className='flex-grow-1 size-6 flex-shrink-0 object-scale-down'
                  />
                  <span>
                    ClickStack
                    <div className='text-xs text-slate-300 transition-colors group-hover/nav-with-icon:text-white'>
                      Open-source observability stack for logs,
                      <br />
                      metrics, traces, and session replays.
                    </div>
                  </span>
                </NavigationLink>
              </li>
              {/*<li>
                <NavigationLink
                  href='https://www.librechat.ai/'
                  target='_blank'
                  onClick={useGalaxyOnClick(
                    'topNav.productMenu.librechatSelect'
                  )}
                  className='group/nav-with-icon !flex w-full !flex-nowrap items-center gap-3'>
                  <Image
                    src='/images/nav/icon-librechat.svg'
                    alt='LibreChat'
                    width={24}
                    height={24}
                    className='flex-grow-1 size-6 flex-shrink-0 object-scale-down'
                  />
                  <span>
                    <span className='flex items-center gap-0.5'>
                      <span>LibreChat</span>
                      <ExternalLink height={12} />
                    </span>
                    <div className='text-xs text-slate-300 transition-colors group-hover/nav-with-icon:text-white'>
                      Open-source ChatGPT alternative with <br />
                      multi-provider AI support. Build <br />
                      custom AI assistants with ClickHouse <br />
                      for intelligent data interactions.
                    </div>
                  </span>
                </NavigationLink>
              </li>*/}
              <li className='flex items-center'>
                <NavigationLink
                  href='/ai'
                  onClick={useGalaxyOnClick(
                    'topNav.productMenu.agenticDataStackSelect'
                  )}
                  className='group/nav-with-icon !flex w-full !flex-nowrap items-center gap-3'>
                  <Image
                    src='/images/nav/icon-agentic-data-stack.svg'
                    alt='Agentic Data Stack'
                    width={24}
                    height={24}
                    className='flex-grow-1 size-6 flex-shrink-0 object-scale-down'
                  />
                  <span>
                    Agentic Data Stack
                    <div className='text-xs text-slate-300 transition-colors group-hover/nav-with-icon:text-white'>
                      Build AI-powered applications <br />
                      with ClickHouse.
                    </div>
                  </span>
                </NavigationLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
