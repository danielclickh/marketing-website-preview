import Link from 'next/link'

type TabProps = {
  activeTab: number
  tabs: { id: number; name: string; href: string; current: boolean }[]
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export function SuiTabsPages(props: TabProps) {
  return (
    <div>
      <div className='sm:hidden'>
        <label htmlFor='tabs' className='sr-only'>
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id='tabs'
          name='tabs'
          className='block w-full pl-3 py-2 text-base border-c2 focus:outline-none focus:ring-c6 focus:border-c6 sm:text-sm rounded-md'
          defaultValue={
            // @ts-ignore
            props.tabs.find((tab) => tab.id == props.activeTab).name
          }>
          {props.tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className='hidden sm:block'>
        <div className='border-b border-c2'>
          <nav className='-mb-px flex space-x-8' aria-label='Tabs'>
            {props.tabs.map((tab, index: number) => (
              <Link
                key={tab.name}
                href={tab.href}
                className={`
                ${
                  tab.id == props.activeTab
                    ? 'border-c6 text-c5'
                    : 'border-transparent text-c4 hover:text-c5 hover:border-c4'
                }
                tab-${index}    
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                )`}
                aria-current={tab.current ? 'page' : undefined}>
                {tab.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}
