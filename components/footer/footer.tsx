import {
  SuiButton,
  SuiLink,
  SuiSpacer,
  SuiText,
  SuiTextField,
  SuiTitle
} from '../sui'
import Image from 'next/image'
import Link from 'next/link'
export function Footer() {
  return (
    <div className='flex bg-light-purple1 py-8 px-4 md:px-0'>
      <div className='container mx-auto md:flex justify-between max-w-7xl px-8 2xl:px-0 '>
        <div className='flex flex-col md:w-8/12 md:border-r border-light-purple3'>
          <div className='sitemap md:flex pt-4'>
            <div className='flex flex-col md:w-4/12 pb-6 md:pb-0'>
              <SuiTitle size='xxs' uppercase color='white'>
                <h5>Product</h5>
              </SuiTitle>
              <SuiSpacer />
              <div className='flex flex-row md:flex-col space-x-4 md:space-x-0'>
                <SuiLink href='/clickhouse/' color='white' weight='normal'>
                  ClickHouse
                </SuiLink>
                <SuiLink
                  href='/clickhouse-cloud/'
                  color='white'
                  weight='normal'>
                  ClickHouse Cloud
                </SuiLink>
              </div>
            </div>

            <div className='flex flex-col md:w-4/12 pb-6 md:pb-0'>
              <SuiTitle size='xxs' uppercase color='white'>
                <h5>Resources</h5>
              </SuiTitle>
              <SuiSpacer />
              <div className='flex flex-row md:flex-col space-x-3 md:space-x-0'>
                <SuiLink
                  href='https://clickhouse.com/docs/'
                  color='white'
                  weight='normal'>
                  Documentation
                </SuiLink>
                <SuiLink
                  href='https://clickhouse.com/learn/'
                  color='white'
                  weight='normal'>
                  Training
                </SuiLink>
                <SuiLink
                  href='https://support.clickhouse.com/s/'
                  color='white'
                  weight='normal'>
                  Support
                </SuiLink>
                <SuiLink href='#' color='white' weight='normal'>
                  Comparison
                </SuiLink>
                <SuiLink href='/customer-stories' color='white' weight='normal'>
                  Use cases
                </SuiLink>
              </div>
            </div>

            <div className='flex flex-col md:w-4/12 pb-6 md:pb-0'>
              <SuiTitle size='xxs' uppercase color='white'>
                <h5>Company</h5>
              </SuiTitle>
              <SuiSpacer />
              <div className='flex w-full flex-row md:flex-col space-x-4 md:space-x-0'>
                <SuiLink href='/blog/' color='white' weight='normal'>
                  Blog
                </SuiLink>
                <SuiLink
                  href='/company/our-story/'
                  color='white'
                  weight='normal'>
                  Our story
                </SuiLink>
                <SuiLink href='/company/careers/' color='white' weight='normal'>
                  Careers
                </SuiLink>
                <SuiLink href='/company/contact/' color='white' weight='normal'>
                  Contact us
                </SuiLink>
                <SuiLink
                  href='/company/news-events/'
                  color='white'
                  weight='normal'>
                  News and events
                </SuiLink>
              </div>
            </div>
          </div>
          <div className='flex pt-12'>
            <div className='md:w-64 mr-4'>
              <Image
                src='/footer/ch_logo.svg'
                alt='CH Logo'
                width={149}
                height={29}
              />
            </div>
            <div className='px-4 self-end'>
              <SuiText size='sm' color='white' padding_0>
                <p>
                  ClickHouse source code is published under the Apache 2.0
                  License. Software is distributed on an &ldquo;AS IS&ldquo;
                  BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
                  express or implied.
                </p>
              </SuiText>
            </div>
          </div>
        </div>
        <div className='hidden md:flex flex-col md:w-4/12 pl-12'>
          <SuiTitle size='sm' color='white'>
            <h4>Subscribe to our newsletter</h4>
          </SuiTitle>
          <SuiText color='white'>
            <p>
              Stay informed on feature releases, product roadmap, future
              support, and cloud offerings!
            </p>
          </SuiText>
          <div className='flex align-middle items-center space-x-2'>
            <SuiTextField htmlFor='email' placeholder='Email address' />
            <div className='mt-1'>
              <SuiButton title='Sign up' />
            </div>
          </div>

          <div className='flex flex-col pt-2'>
            <SuiText color='white'>
              <p>Join the ClickHouse conversation on </p>
            </SuiText>
            <div className='flex space-x-4 pt-2'>
              <Link href='#'>
                <div className='bg-light-purple2 border border-light-purple3 px-3 pt-3 pb-2 rounded hover:bg-light-purple1'>
                  <Image
                    src='/footer/logo_github.svg'
                    className='hover:cursor-pointer hover:animate-pulse'
                    alt='CH Logo'
                    width={21}
                    height={20}
                  />
                </div>
              </Link>

              <Link href='#'>
                <div className='bg-light-purple2 border border-light-purple3 px-3 pt-3 pb-2 rounded hover:bg-light-purple1'>
                  <Image
                    src='/footer/logo_slack.svg'
                    className='hover:cursor-pointer hover:animate-pulse'
                    alt='CH Logo'
                    width={21}
                    height={20}
                  />
                </div>
              </Link>

              <Link href='#'>
                <div className='bg-light-purple2 border border-light-purple3 px-3 pt-3 pb-2 rounded hover:bg-light-purple1'>
                  <Image
                    src='/footer/logo_telegram.svg'
                    className='hover:cursor-pointer hover:animate-pulse'
                    alt='CH Logo'
                    width={21}
                    height={20}
                  />
                </div>
              </Link>

              <Link href='#'>
                <div className='bg-light-purple2 border border-light-purple3 px-3 pt-3 pb-2 rounded hover:bg-light-purple1'>
                  <Image
                    src='/footer/logo_twitter.svg'
                    className='hover:cursor-pointer hover:animate-pulse'
                    alt='CH Logo'
                    width={21}
                    height={20}
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
