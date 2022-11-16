import { GetStarted } from '../../components/get_started_area'
import { BaseLayout } from '../../components/layout'
import {
  SuiHorizontalDivide,
  SuiSpacer,
  SuiText,
  SuiTextField,
  SuiTitle
} from '../../components/sui'

import Image from 'next/image'
import { IconAeroplaneLarge } from '../../components/icons/icon_aeroplane_large'
import { IconCustomersLarge } from '../../components/icons/icon_customers_large'

export default function Careers() {
  return (
    <BaseLayout title='Careers • ClickHouse'>
      <div className='bg-web-light-c1 dark:bg-web-dark-c1 bg-cover pt-10'>
        <div className='flex container mx-auto flex-col px-6 2xl:px-0'>
          <div
            className='flex flex-col text-center mx-auto pt-6'
            data-aos='fade-up'>
            <SuiTitle size='web'>
              <h1>Careers</h1>
            </SuiTitle>
            <SuiSpacer size='sm' />
            <div className='max-w-2xl'>
              <SuiText size='lg' color='dark' weight='normal'>
                <p>Come and join us make something special.</p>
              </SuiText>
            </div>
          </div>
        </div>
        <div className='bg-careers_background bg-center bg-cover w-full h-64 my-12' />
        <div className='w-full pt-4 pb-12'>
          <div className='flex flex-col md:flex-row container mx-auto max-w-7xl px-6 md:space-x-16 mb-12'>
            <div className='flex flex-col md:w-4/5'>
              <SuiTitle size='lg'>
                <h2>Creativity at the speed of change</h2>
              </SuiTitle>
              <SuiSpacer size='md' />
              <SuiText size='lg'>
                <p>
                  ClickHouse would not be able to deliver our industry-leading,
                  real-time analytics without the incredible work of talented
                  employees across the globe.
                </p>
              </SuiText>
              <SuiText size='lg'>
                <p>
                  We are looking for curious, creative, and passionate folks who
                  are excited to bring their talents and ready to grow with us.
                  If you are looking for a place to build something new, expand
                  your skill set, collaborate with friends around the world
                  across a broad spectrum of subject domains — to have a
                  significant impact on our success as a team — then
                  you&lsquo;ve found the right place.
                </p>
              </SuiText>
              <SuiText size='lg'>
                <p>
                  We hire remotely for most positions, with hubs in the Bay Area
                  and Amsterdam.
                </p>
              </SuiText>
            </div>
          </div>
        </div>
      </div>

      <div className='w-full bg-web-light-c2 dark:bg-web-dark-c2 pt-12 pb-12'>
        <div className='flex flex-col md:flex-row container mx-auto max-w-7xl px-6 md:space-x-16 mb-12 items-center'>
          <div className='flex flex-col md:w-3/5'>
            <SuiTitle size='lg'>
              <h2>Distributed and diverse by design</h2>
            </SuiTitle>
            <SuiSpacer size='md' />
            <SuiText size='lg' color='dark'>
              <p>
                ClickHouse is proud to have employees in 10+ countries and
                across the United States. We believe that diverse and
                distributed workplaces are an essential advantage and a moral
                imperative.
              </p>
            </SuiText>
            <SuiText color='dark' size='lg'>
              <p>
                Our leadership team consists of approximately 40% women and we
                are proud of a diverse group of board members, investors, and
                advisors.
              </p>
            </SuiText>
          </div>
          <div className='flex flex-col md:w-2/5 mt-6 md:mt-12 items-center'>
            <IconAeroplaneLarge />
          </div>
        </div>

        <div className='flex flex-col-reverse md:flex-row container mx-auto max-w-7xl px-6 md:space-x-16 mb-12 items-center'>
          <div className='flex flex-col md:w-2/5 mt-6 md:mt-12'>
            <Image
              src={`/career/image_heart.svg`}
              alt='Empathy at work'
              width='212'
              height='212'
            />
          </div>

          <div className='flex flex-col md:w-3/5'>
            <SuiTitle size='lg'>
              <h2>Empathy at work</h2>
            </SuiTitle>
            <SuiSpacer size='md' />
            <SuiText color='dark' size='lg'>
              <p>
                We believe inclusion is empathy put to work. Empathy is the
                ability to place yourself in the shoes of others — to desire
                understanding of their thoughts, feelings, and needs. We expect
                an openness to diverse backgrounds, perspectives, and
                approaches; awareness of biases; and the courage to act. We
                believe in spaces that enable our employees to show up to work
                as they are, and an environment that is safe and open.
              </p>
            </SuiText>
          </div>
        </div>

        <div className='flex flex-col md:flex-row container mx-auto max-w-7xl px-6 md:space-x-16 mb-12  items-center'>
          <div className='flex flex-col md:w-3/5'>
            <SuiTitle size='lg'>
              <h2>Customer-centric</h2>
            </SuiTitle>
            <SuiSpacer size='md' />
            <SuiText color='dark' size='lg'>
              <p>
                ClickHouse is proud to have employees in 10+ countries and
                across the United States. We believe that diverse and
                distributed workplaces are an essential advantage and a moral
                imperative. Our leadership team consists of approximately 40%
                women and we are proud of a diverse group of board members,
                investors, and advisors.
              </p>
            </SuiText>
          </div>
          <div className='flex flex-col md:w-2/5 mt-6 md:mt-12 items-center'>
            <IconCustomersLarge />
          </div>
        </div>
      </div>

      <div className='w-full bg-web-light-c1 dark:bg-web-dark-c1 pt-16 pb-16'>
        <div className='flex flex-col md:flex-row container mx-auto max-w-7xl px-6 md:space-x-16 mb-12 items-center'>
          <div className='flex flex-col md:w-3/5'>
            <SuiTitle size='lg'>
              <h2>Open positions</h2>
            </SuiTitle>
          </div>
        </div>

        <div className='flex flex-col md:flex-row container mx-auto max-w-7xl px-6 justify-between'>
          <div className='flex md:w-64 md:pr-8 pb-8 md:pb-0 flex-col'>
            <SuiTextField placeholder='Search' htmlFor='search' />
            <SuiSpacer size='lg' />
            <SuiTitle size='xxs'>
              <h4>Office</h4>
            </SuiTitle>
            <ul className='mt-4'>
              <li className='bg-primary text-web-light-c1 dark:text-web-dark-c1 text-sm font-medium px-4 py-2 rounded-md'>
                All
              </li>
              <li className='text-web-light-c4 dark:text-web-dark-c4 text-sm px-4 py-2 font-medium rounded-md cursor-pointer hover:text-web-light-c5 dark:hover:text-web-dark-c5 hover:bg-web-light-c2 hover:dark:bg-web-dark-c2 transition-all duration-500 ease-in-out transform'>
                Netherlands
              </li>
              <li className='text-web-light-c4 dark:text-web-dark-c4 text-sm px-4 py-2 font-medium rounded-md cursor-pointer hover:text-web-light-c5 dark:hover:text-web-dark-c5 hover:bg-web-light-c2 hover:dark:bg-web-dark-c2 transition-all duration-500 ease-in-out transform'>
                United States
              </li>
            </ul>

            <SuiSpacer size='lg' />
            <SuiTitle size='xxs'>
              <h4>Department</h4>
            </SuiTitle>
            <ul className='mt-4'>
              <li className='text-web-light-c4 dark:text-web-dark-c4 text-sm px-4 py-2 font-medium rounded-md cursor-pointer hover:text-web-light-c5 dark:hover:text-web-dark-c5 hover:bg-web-light-c2 hover:dark:bg-web-dark-c2 transition-all duration-500 ease-in-out transform'>
                All
              </li>
              <li className='text-web-light-c4 dark:text-web-dark-c4 text-sm px-4 py-2 font-medium rounded-md cursor-pointer hover:text-web-light-c5 dark:hover:text-web-dark-c5 hover:bg-web-light-c2 hover:dark:bg-web-dark-c2 transition-all duration-500 ease-in-out transform'>
                Design
              </li>
              <li className='bg-primary text-web-light-c1 dark:text-web-dark-c1 text-sm font-medium px-4 py-2 rounded-md'>
                Engineering
              </li>
              <li className='text-web-light-c4 dark:text-web-dark-c4 text-sm px-4 py-2 font-medium rounded-md cursor-pointer hover:text-web-light-c5 dark:hover:text-web-dark-c5 hover:bg-web-light-c2 hover:dark:bg-web-dark-c2 transition-all duration-500 ease-in-out transform'>
                Product
              </li>
              <li className='text-web-light-c4 dark:text-web-dark-c4 text-sm px-4 py-2 font-medium rounded-md cursor-pointer hover:text-web-light-c5 dark:hover:text-web-dark-c5 hover:bg-web-light-c2 hover:dark:bg-web-dark-c2 transition-all duration-500 ease-in-out transform'>
                Support Services
              </li>
            </ul>
          </div>
          <div className='flex flex-col md:flex-row md:w-3/4 md:space-x-16 justify-center'>
            <div className='flex flex-col space-y-6 w-full'>
              <SuiTitle size='sm'>
                <h4>Engineering</h4>
              </SuiTitle>
              <div className='rounded-md pl-4 flex flex-col w-full cursor-pointer hover:bg-web-light-c2 hover:dark:bg-web-dark-c2 transition-all duration-300 ease-in-out transform'>
                <SuiText size='lg'>
                  <p>
                    Cloud Software Engineer - EMEA (Remote)
                    <span className='text-web-light-c4 dark:text-web-dark-c4 flex'>
                      Netherlands
                    </span>
                  </p>
                </SuiText>
                <SuiHorizontalDivide />
              </div>
              <div className='rounded-md pl-4 flex flex-col w-full cursor-pointer hover:bg-web-light-c2 hover:dark:bg-web-dark-c2 transition-all duration-300 ease-in-out transform'>
                <SuiText size='lg'>
                  <p>
                    Cloud Software Engineer - Americas (Remote)
                    <span className='text-web-light-c4 dark:text-web-dark-c4 flex'>
                      United States
                    </span>
                  </p>
                </SuiText>
                <SuiHorizontalDivide />
              </div>
              <div className='rounded-md pl-4 flex flex-col w-full cursor-pointer hover:bg-web-light-c2 hover:dark:bg-web-dark-c2 transition-all duration-300 ease-in-out transform'>
                <SuiText size='lg'>
                  <p>
                    Full Stack Software Engineer (Remote)
                    <span className='text-web-light-c4 dark:text-web-dark-c4 flex'>
                      Netherlands, United States
                    </span>
                  </p>
                </SuiText>
                <SuiHorizontalDivide />
              </div>
              <div className='rounded-md pl-4 flex flex-col w-full cursor-pointer hover:bg-web-light-c2 hover:dark:bg-web-dark-c2 transition-all duration-300 ease-in-out transform'>
                <SuiText size='lg'>
                  <p>
                    Security - Corporate Security Engineer (Remote)
                    <span className='text-web-light-c4 dark:text-web-dark-c4 flex'>
                      Netherlands, United States
                    </span>
                  </p>
                </SuiText>
                <SuiHorizontalDivide />
              </div>
              <div className='rounded-md pl-4 flex flex-col w-full cursor-pointer hover:bg-web-light-c2 hover:dark:bg-web-dark-c2 transition-all duration-300 ease-in-out transform'>
                <SuiText size='lg'>
                  <p>
                    Security - Governance, Risk, and Compliance Lead (Remote)
                    <span className='text-web-light-c4 dark:text-web-dark-c4 flex'>
                      Netherlands, United States
                    </span>
                  </p>
                </SuiText>
                <SuiHorizontalDivide />
              </div>
              <div className='rounded-md pl-4 flex flex-col w-full cursor-pointer hover:bg-web-light-c2 hover:dark:bg-web-dark-c2 transition-all duration-300 ease-in-out transform'>
                <SuiText size='lg'>
                  <p>
                    Software Engineer C++ (Remote)
                    <span className='text-web-light-c4 dark:text-web-dark-c4 flex'>
                      Netherlands, United States
                    </span>
                  </p>
                </SuiText>
                <SuiHorizontalDivide />
              </div>
            </div>
          </div>
        </div>
      </div>
      <GetStarted />
    </BaseLayout>
  )
}
