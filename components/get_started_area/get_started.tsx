import {
  SuiButton,
  SuiCodeblock,
  SuiLink,
  SuiSpacer,
  SuiTabs,
  SuiText,
  SuiTitle
} from '../sui'

export function GetStarted() {
  const osTabs = [
    {
      id: 1,
      name: 'Ubuntu or debian',
      href: '#',
      current: true,
      content: (
        <SuiCodeblock bgColor='bg-dark-grey5'>
          <p>
            sudo apt-get install apt-transport-https ca-certificates dirmngr{' '}
            <br />
            sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv
            8919F6BD2B48D754 <br />
            <br /> echo &ldquo;deb https://packages.clickhouse.com/deb stable
            main&ldquo; | sudo tee \<br />{' '}
            /etc/apt/sources.list.d/clickhouse.list
            <br />
            <br />
            sudo apt-get update sudo apt-get install -y clickhouse-server
            clickhouse-client sudo service clickhouse-server start
            clickhouse-client # or &ldquo;clickhouse-client --password&ldquo; if
            you set up a password.
          </p>
        </SuiCodeblock>
      )
    },
    {
      id: 2,
      name: 'CentOs or RedHat',
      href: '#',
      current: false,
      content: (
        <SuiCodeblock bgColor='bg-dark-grey5'>
          <p>
            sudo yum install -y yum-utils
            <br />
            sudo yum-config-manager --add-repo
            https://packages.clickhouse.com/rpm/clickhouse.repo
            <br />
            sudo yum install -y clickhouse-server clickhouse-client
            <br />
            <br />
            sudo /etc/init.d/clickhouse-server start
            <br />
            clickhouse-client # or &ldquo;clickhouse-client --password&ldquo; if
            you set up a password.
          </p>
        </SuiCodeblock>
      )
    },
    {
      id: 3,
      name: 'Other Linux (x86)',
      href: '#',
      current: false,
      content: (
        <SuiCodeblock bgColor='bg-dark-grey5'>
          <p>
            LATEST_VERSION=$(curl -s https://packages.clickhouse.com/tgz/stable/
            | \ <br />
            grep -Eo &lsquo;[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+&lsquo; | sort -V -r |
            head -n 1) <br />
            export LATEST_VERSION
            <br />
            curl -O
            &quot;https://packages.clickhouse.com/tgz/stable/clickhouse-common-static-$LATEST_VERSION.tgz&quot;
            <br />
            curl -O
            &quot;https://packages.clickhouse.com/tgz/stable/clickhouse-common-static-dbg-$LATEST_VERSION.tgz&quot;
            <br />
            curl -O
            &quot;https://packages.clickhouse.com/tgz/stable/clickhouse-server-$LATEST_VERSION.tgz&quot;
            <br />
            curl -O
            &quot;https://packages.clickhouse.com/tgz/stable/clickhouse-client-$LATEST_VERSION.tgz&quot;
            <br />
            <br />
            tar -xzvf &quot;clickhouse-common-static-$LATEST_VERSION.tgz&quot;
            <br />
            sudo
            &quot;clickhouse-common-static-$LATEST_VERSION/install/doinst.sh&quot;
            <br />
            <br />
            tar -xzvf
            &quot;clickhouse-common-static-dbg-$LATEST_VERSION.tgz&quot;
            <br />
            sudo
            &quot;clickhouse-common-static-dbg-$LATEST_VERSION/install/doinst.sh&quot;
            <br />
            <br />
            tar -xzvf &quot;clickhouse-server-$LATEST_VERSION.tgz&quot;
            <br />
            sudo &quot;clickhouse-server-$LATEST_VERSION/install/doinst.sh&quot;
            <br />
            sudo /etc/init.d/clickhouse-server start
            <br />
            <br />
            tar -xzvf &quot;clickhouse-client-$LATEST_VERSION.tgz&quot;
            <br />
            sudo &quot;clickhouse-client-$LATEST_VERSION/install/doinst.sh&quot;
            <br />
          </p>
        </SuiCodeblock>
      )
    },
    {
      id: 4,
      name: 'Other Linux (ARM)',
      href: '#',
      current: false,
      content: <p>Hee we go</p>
    },
    {
      id: 5,
      name: 'MacOS (Intel)',
      href: '#',
      current: false,
      content: <p>Hee we go</p>
    },
    {
      id: 6,
      name: 'MacOS (Apple Silicon)',
      href: '#',
      current: false,
      content: <p>Hee we go</p>
    },
    {
      id: 7,
      name: 'FreeBSD (x86_64)',
      href: '#',
      current: false,
      content: <p>Hee we go</p>
    }
  ]

  return (
    <div className='flex bg-light-purple2'>
      <div className='container mx-auto justify-center py-12 px-8 2xl:px-0  flex flex-col w-full max-w-7xl'>
        <div className='flex flex-col text-center md:w-5/12 mx-auto '>
          <SuiTitle size='xl' color='white'>
            <h3>Get started for free.</h3>
          </SuiTitle>
          <SuiText size='lg' color='offWhite'>
            <p>Simple start, however you choose to use ClickHouse.</p>
          </SuiText>

          <SuiSpacer />
          <div className='flex flex-col-reverse gap-4 md:flex-row md:space-x-8 justify-center'>
            <div className='w-full md:w-60'>
              <SuiButton
                color='dark_alt'
                textColor='text-text-lightest'
                borderColor='border-primary'
                title='Open source quickstart'
                path='https://clickhouse.com/docs/en/quick-start/'
              />
              <div className='mt-8 overflow-hidden inline-block'>
                <div className='h-9 w-12 bg-dark-grey5 rotate-45 transform border border-dark-grey3 origin-bottom-left'></div>
              </div>
            </div>
            <div className='w-full md:w-60'>
              <SuiButton
                color='primary'
                textColor='text-text-darkest'
                title='Fully hosted Cloud service'
                path='/clickhouse-cloud/'
              />
            </div>
          </div>
        </div>
        <div className='bg-dark-grey5 w-11/12 md:w-full self-center border border-dark-grey3 rounded-lg p-2 px-6 overflow-scroll -mt-2'>
          <SuiTabs
            tabs={osTabs}
            activeTab={1}
            color='offWhite'
            activeColor='white'
            borderColor='border-light-purple3'
            hoverColor='white'
            hoverBorderColor='border-dark-grey5'
          />
        </div>
        <SuiSpacer size='sm' />
        <div className='px-6 md:px-0'>
          <SuiText color='white'>
            <p>
              There’s a number of{' '}
              <SuiLink color='primary' href='#'>
                alternative options
              </SuiLink>{' '}
              to get started, most notably the{' '}
              <SuiLink color='primary' href='#'>
                official Docker images of ClickHouse
              </SuiLink>
              . To learn more about our future cloud offerings,{' '}
              <SuiLink color='primary' href='#'>
                contact us
              </SuiLink>
              .{' '}
            </p>
          </SuiText>
        </div>
      </div>
    </div>
  )
}
