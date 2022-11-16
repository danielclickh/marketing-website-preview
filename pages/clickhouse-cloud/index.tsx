import { useState } from 'react'
import { BaseLayout } from '../../components/layout'
import {
  SuiButton,
  SuiSpacer,
  SuiText,
  SuiTextField,
  SuiTitle
} from '../../components/sui'
import { FeatureItem } from '../../components/feature_item'

import Image from 'next/image'
import { IconAWS } from '../../components/icons/icon_aws'
import { IconCloud } from '../../components/icons/icon_cloud'
import { IconSecurity } from '../../components/icons/icon_security'
import { IconAuto } from '../../components/icons/icon_auto'
import { IconPricing } from '../../components/icons/icon_pricing'
import { IconInfra } from '../../components/icons/icon_infra'
import { IconTurnkey } from '../../components/icons/icon_turnkey'

export default function Cloud() {
  return (
    <BaseLayout title='ClickHouse Cloud'>
      <div className='bg-hero_background dark:bg-dark_hero_background bg-cover pt-10'>
        <div className='bg-cloud_hero_background dark:bg-dark_cloud_hero_background bg-no-repeat bg-right-top'>
          <div className='flex container mx-auto flex-col max-w-7xl md:bg-no-repeat bg-opacity-10 pb-20 md:px-8 2xl:px-0'>
            <div data-aos='fade-up' className='flex'>
              <div className='w-11/12 mx-auto md:w-6/12 md:mt-16 flex-col text-center md:text-left'>
                <SuiTitle size='web'>
                  <h1>
                    You get the{' '}
                    <span className='text-transparent bg-clip-text bg-gradient-to-b from-gradientTop to-gradientBottom'>
                      power
                    </span>
                    .
                    <br />
                    We do the infrastructure.
                  </h1>
                </SuiTitle>
                <div className='mt-6'>
                  <SuiText size='lg' color='dark' weight='normal'>
                    <p className='md:max-w-lg md:pr-4'>
                      Introducing{' '}
                      <span className='font-semibold'>ClickHouse Cloud</span>,
                      built by the creators and maintainers of the fastest OLAP
                      database on earth.
                    </p>
                  </SuiText>
                </div>
                <div className='flex flex-col mt-6'>
                  <div className='flex justify-center md:justify-start'>
                    <SuiButton
                      size='md'
                      path='#early-access'
                      title='Get early access'
                    />
                  </div>
                  <div className='flex space-x-6 justify-center md:justify-start'>
                    <div className='pt-8 flex flex-col space-y-2'>
                      <SuiTitle size='xxs' color='dark'>
                        <h5>Cloud providers</h5>
                      </SuiTitle>
                      <div className='flex flex-row'>
                        <IconAWS />
                      </div>
                    </div>
                    <div className='pt-8 flex flex-col space-y-2'>
                      <SuiTitle size='xxs' color='dark'>
                        <h5>Coming soon</h5>
                      </SuiTitle>
                      <div className='flex flex-row'>
                        <Image
                          src='/cloud/logo_gcp.svg'
                          alt='GCP'
                          width='52'
                          height='40'
                          className='opacity-50'
                        />
                        <Image
                          src='/cloud/logo_azure.svg'
                          alt='Azure'
                          width='52'
                          height='40'
                          className='opacity-50'
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='hidden md:flex w-6/12 mx-auto px-8'>
                <div>
                  <div className='mt-20'>
                    {/* <video controls>
                      <source
                        src='/cloud/clickhouse-onboarding.mp4'
                        type='video/mp4'
                      />
                      <source src='movie.ogg' type='video/ogg' />
                      Your browser does not support the video tag.
                    </video> */}
                    <Image
                      src='/cloud/cloud_demo_small.gif'
                      alt='ClickHouse demot'
                      width='748'
                      height='428'
                      className='rounded-md'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='w-full mx-auto bg-strain_background bg-cover h-24 md:h-40 -mt-12 bg-no-repeat 2xl:h-52' />
        </div>
      </div>
      <div className='bg-web-light-c1 dark:bg-web-dark-c1'>
        <div className='flex container mx-auto flex-col max-w-7xl  pb-16 px-4 sm:px-8 2xl:px-0 pt-16'>
          <div className='flex flex-col space-y-8 md:space-y-0 md:flex-row'>
            <FeatureItem
              icon={<IconAuto />}
              title='Limitless scale'
              description='Start building instantly without having to size and scale your cluster.'
              delay={100}
            />

            <FeatureItem
              icon={<IconSecurity />}
              title='World class security'
              description='Let our experts sweat the security, privacy, and compliance details. '
              delay={200}
            />

            <FeatureItem
              icon={<IconInfra />}
              title='Serverless operations'
              description='Sit back, while we take care of sizing, scaling, security, reliability, and upgrades.'
              delay={300}
            />
          </div>

          <div className='flex flex-col space-y-4 md:space-y-0 md:flex-row pt-4 md:pt-16'>
            <FeatureItem
              icon={<IconPricing />}
              title='Pay-as-you-go'
              description='Pay only for what you use, with dimensions for storage and compute.'
              delay={400}
            />

            <FeatureItem
              icon={<IconCloud />}
              title='Cloud-agnostic'
              description='Deploy across public cloud providers, with an initial offering available in AWS.'
              delay={500}
            />

            <FeatureItem
              icon={<IconTurnkey />}
              title='Broad ecosystem'
              description='Bring your favorite data connectors and data visualization tools with you.'
              delay={600}
            />
          </div>
        </div>
      </div>

      <div className='flex w-full bg-web-light-c2 dark:bg-web-dark-c2 pb-12'>
        <div className='flex container mx-auto flex-col max-w-7xl md:bg-no-repeat bg-opacity-10 pt-20 pb-8 text-center px-8 2xl:px-0'>
          <div className='flex flex-col md:flex-row justify-between'>
            <div className='flex flex-col text-left md:w-2/5 pb-4 md:pb-20'>
              <SuiTitle size='lg'>Instant onboarding</SuiTitle>
              <SuiSpacer size='md' />
              <SuiText size='lg' color='dark'>
                <p>
                  All the speed and power that you expect from ClickHouse is now
                  available in a cloud offering.
                </p>
              </SuiText>
              <SuiSpacer size='md' />
              <div className='flex space-x-4 pb-2'>
                <Image
                  src='/homepage/new/icon_check.svg'
                  alt='ClickHouse is fast'
                  width='32'
                  height='32'
                />
                <SuiText size='lg' color='dark'>
                  <p>Start for free</p>
                </SuiText>
              </div>
              <div className='flex space-x-4 pb-2'>
                <Image
                  src='/homepage/new/icon_check.svg'
                  alt='ClickHouse is fast'
                  width='32'
                  height='32'
                />
                <SuiText size='lg' color='dark'>
                  <p>No upfront sizing</p>
                </SuiText>
              </div>
              <div className='flex space-x-4 pb-2'>
                <Image
                  src='/homepage/new/icon_check.svg'
                  alt='ClickHouse is fast'
                  width='32'
                  height='32'
                />
                <SuiText size='lg' color='dark'>
                  <p>No manual replication setup</p>
                </SuiText>
              </div>
              <div className='flex space-x-4'>
                <Image
                  src='/homepage/new/icon_check.svg'
                  alt='ClickHouse is fast'
                  width='32'
                  height='32'
                />
                <SuiText size='lg' color='dark'>
                  <p>No manual data sharding</p>
                </SuiText>
              </div>
            </div>
            <div className='flex md:w-1/2 justify-center'>
              <Image
                src='/homepage/new/image_cloud.png'
                alt='ClickHouse Cloud is coming'
                width='611'
                height='366'
              />
            </div>
          </div>

          <div className='flex flex-col-reverse md:flex-row pt-12 justify-between'>
            <div className='flex md:w-1/2 items-center'>
              <div>
                <Image
                  src='/homepage/new/image_metrics.png'
                  alt='ClickHouse Cloud is coming'
                  width='612'
                  height='216'
                />
              </div>
            </div>
            <div className='flex flex-col text-left md:w-2/5 pb-4 md:pb-20'>
              <SuiTitle size='lg'>Operational insights</SuiTitle>
              <SuiSpacer size='md' />
              <SuiText size='lg' color='dark'>
                <p>
                  Get a 360 view of your ClickHouse service instantly, and keep
                  tabs on the historic usage as you scale.
                </p>
              </SuiText>
              <SuiSpacer size='md' />
              <div className='flex space-x-4 pb-2'>
                <Image
                  src='/homepage/new/icon_check.svg'
                  alt='ClickHouse is fast'
                  width='32'
                  height='32'
                />
                <SuiText size='lg' color='dark'>
                  <p>Track your usage</p>
                </SuiText>
              </div>
              <div className='flex space-x-4 pb-2'>
                <Image
                  src='/homepage/new/icon_check.svg'
                  alt='ClickHouse is fast'
                  width='32'
                  height='32'
                />
                <SuiText size='lg' color='dark'>
                  <p>Observe trends</p>
                </SuiText>
              </div>
              <div className='flex space-x-4 pb-2'>
                <Image
                  src='/homepage/new/icon_check.svg'
                  alt='ClickHouse is fast'
                  width='32'
                  height='32'
                />
                <SuiText size='lg' color='dark'>
                  <p>Detect and react to issues</p>
                </SuiText>
              </div>
              <div className='flex space-x-4'>
                <Image
                  src='/homepage/new/icon_check.svg'
                  alt='ClickHouse is fast'
                  width='32'
                  height='32'
                />
                <SuiText size='lg' color='dark'>
                  <p>Optimize your queries</p>
                </SuiText>
              </div>
            </div>
          </div>

          <div className='flex flex-col md:flex-row pt-12 justify-between'>
            <div className='flex flex-col text-left md:w-2/5 pb-4 md:pb-20'>
              <SuiTitle size='lg'>Uncompromising reliability</SuiTitle>
              <SuiSpacer size='md' />
              <SuiText size='lg' color='dark'>
                <p>
                  We take care of running the most reliable service for you, so
                  you can focus on developing great applications.
                </p>
              </SuiText>
              <SuiSpacer size='md' />
              <div className='flex space-x-4 pb-2'>
                <Image
                  src='/homepage/new/icon_check.svg'
                  alt='ClickHouse is fast'
                  width='32'
                  height='32'
                />
                <SuiText size='lg' color='dark'>
                  <p>Highly available</p>
                </SuiText>
              </div>
              <div className='flex space-x-4 pb-2'>
                <Image
                  src='/homepage/new/icon_check.svg'
                  alt='ClickHouse is fast'
                  width='32'
                  height='32'
                />
                <SuiText size='lg' color='dark'>
                  <p>Zero downtime upgrades</p>
                </SuiText>
              </div>
              <div className='flex space-x-4 pb-2'>
                <Image
                  src='/homepage/new/icon_check.svg'
                  alt='ClickHouse is fast'
                  width='32'
                  height='32'
                />
                <SuiText size='lg' color='dark'>
                  <p>Automated backups</p>
                </SuiText>
              </div>
              <div className='flex space-x-4'>
                <Image
                  src='/homepage/new/icon_check.svg'
                  alt='ClickHouse is fast'
                  width='32'
                  height='32'
                />
                <SuiText size='lg' color='dark'>
                  <p>Disaster recovery</p>
                </SuiText>
              </div>
            </div>
            <div className='flex md:w-1/2 justify-center'>
              <Image
                src='/cloud/image_backups.png'
                alt='ClickHouse Cloud is coming'
                width='611'
                height='366'
              />
            </div>
          </div>

          <div className='flex flex-col-reverse md:flex-row pt-12 justify-between'>
            <div className='flex md:w-1/2 justify-center'>
              <div>
                <Image
                  src='/cloud/image_rbac.png'
                  alt='ClickHouse Cloud is coming'
                  width='446'
                  height='326'
                />
              </div>
            </div>
            <div className='flex flex-col text-left md:w-2/5 pb-4 md:pb-20'>
              <SuiTitle size='lg'>World-class security</SuiTitle>
              <SuiSpacer size='md' />
              <SuiText size='lg' color='dark'>
                <p>
                  Let our experts sweat the security, privacy, and compliance
                  details. Always-on industry standard defaults and customizable
                  policies.
                </p>
              </SuiText>
              <SuiSpacer size='md' />
              <div className='flex space-x-4 pb-2'>
                <Image
                  src='/homepage/new/icon_check.svg'
                  alt='ClickHouse is fast'
                  width='32'
                  height='32'
                />
                <SuiText size='lg' color='dark'>
                  <p>Strong authentication</p>
                </SuiText>
              </div>
              <div className='flex space-x-4 pb-2'>
                <Image
                  src='/homepage/new/icon_check.svg'
                  alt='ClickHouse is fast'
                  width='32'
                  height='32'
                />
                <SuiText size='lg' color='dark'>
                  <p>Encryption in transit and at rest</p>
                </SuiText>
              </div>
              <div className='flex space-x-4 pb-2'>
                <Image
                  src='/homepage/new/icon_check.svg'
                  alt='ClickHouse is fast'
                  width='32'
                  height='32'
                />
                <SuiText size='lg' color='dark'>
                  <p>Role based access control</p>
                </SuiText>
              </div>
              <div className='flex space-x-4'>
                <Image
                  src='/homepage/new/icon_check.svg'
                  alt='ClickHouse is fast'
                  width='32'
                  height='32'
                />
                <SuiText size='lg' color='dark'>
                  <p>Security and privacy compliance</p>
                </SuiText>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className='flex w-full bg-web-light-c1 dark:bg-web-dark-c1 pb-20'
        id='early-access'>
        <div className='flex container mx-auto flex-col max-w-7xl md:bg-no-repeat bg-opacity-10 pt-20 pb-8 text-center px-8 2xl:px-0'>
          <SuiTitle size='xs' color='primary' dark_color='primary'>
            <h3>Early access</h3>
          </SuiTitle>
          <SuiSpacer size='sm' />
          <SuiTitle size='xl'>
            <h3>Apply to get early access today</h3>
          </SuiTitle>
          <SuiSpacer size='md' />
          <SuiText size='lg' color='dark' className='self-center'>
            <p className='max-w-xl'>
              We&lsquo;re rolling out private preview to a select number of
              companies at this time. Enter your details below to get added to
              the list.
            </p>
          </SuiText>
          <SuiSpacer size='xl' />
          <div className='w-full md:w-128 self-center text-left space-y-8'>
            <div className='flex space-x-8'>
              <SuiTextField
                htmlFor='firstName'
                label='First name'
                className='w-full'
              />
              <SuiTextField
                htmlFor='lastName'
                label='Last name'
                className='w-full'
              />
            </div>
            <div className='flex w-full'>
              <SuiTextField htmlFor='email' label='Email' className='w-full' />
            </div>
            <div className='flex'>
              <SuiTextField
                htmlFor='company'
                label='Company (Optional)'
                className='w-full'
              />
            </div>
            <div className='flex'>
              <SuiTextField
                htmlFor='useCase'
                label='Tell us your use case (Optional)'
                className='w-full'
              />
            </div>

            <div className='flex w-64 mx-auto'>
              <SuiButton title='Apply for early access' />
            </div>

            <div className='flex text-center'>
              <SuiText color='dark' size='sm'>
                You will be added to the wait list and signed up for our product
                newsletter. A confirmation email will be sent to the email
                address above and we may reach out to find out more about your
                use case.
              </SuiText>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}
