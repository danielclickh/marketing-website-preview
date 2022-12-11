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
          className='block w-full pl-3 py-2 text-base border-light-grey3 dark:border-dark-grey4 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md'
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
        <div className='border-b border-light-grey3 dark:border-dark-grey4'>
          <nav className='-mb-px flex space-x-8' aria-label='Tabs'>
            {props.tabs.map((tab) => (
              <Link
                key={tab.name}
                href={tab.href}
                className={classNames(
                  tab.id == props.activeTab
                    ? 'border-primary text-text-darkest dark:text-white'
                    : 'border-transparent text-text-dark dark:text-text-light hover:text-text-darkest hover:border-light-grey5',
                  'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                )}
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
