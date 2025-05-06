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
          className='block w-full rounded-md border-c2 py-2 pl-3 text-base focus:border-c6 focus:outline-none focus:ring-c6 sm:text-sm'
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
                className={` ${
                  tab.id == props.activeTab
                    ? 'border-c6 text-neutral-0'
                    : 'border-transparent text-c4 hover:border-c4 hover:text-neutral-0'
                } tab-${index} ) whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium`}
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
