import { ReactElement } from 'react'
import { Tab } from '@headlessui/react'
import { SuiText } from '../typography'
import { colourCalculator } from '../typography/calculator'

type TabProps = {
  color?: string | undefined
  activeColor?: string | undefined
  borderColor?: string | undefined
  hoverColor?: string | undefined
  hoverBorderColor?: string | undefined
  tabs: {
    id: number
    name: string
    href: string
    content: ReactElement
  }[]
}

export const SuiTabs = ({ ...TabProps }) => {
  const {
    color,
    activeColor,
    borderColor,
    hoverColor,
    hoverBorderColor,
    tabs
  } = TabProps
  return (
    <Tab.Group>
      <Tab.List
        className={`flex space-x-8 w-full pr-10 text-base ${
          borderColor ? borderColor : 'border-light-grey3'
        } dark:border-dark-grey4 focus:outline-none sm:text-sm rounded-t-md border-b`}>
        <nav className='-mb-px flex space-x-8' aria-label='Tabs'>
          {tabs.map((tab: any) => (
            <Tab
              key={tab.id}
              className={({ selected }) =>
                selected
                  ? `border-primary ${colourCalculator(
                      color,
                      'text-text-darkest'
                    )} focus:outline-none dark:text-white whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`
                  : `border-transparent ${colourCalculator(
                      activeColor,
                      'text-text-darkest'
                    )} hover:${colourCalculator(
                      hoverColor,
                      'text-text-darkest'
                    )} hover:${
                      hoverBorderColor ? hoverBorderColor : 'border-light-grey5'
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`
              }>
              {tab.name}
            </Tab>
          ))}
        </nav>
      </Tab.List>
      <Tab.Panels className='flex overflow-auto'>
        {tabs.map((tab: any) => (
          <Tab.Panel key={tab.id}>
            <SuiText
              type='p2'
              weight='normal'
              className='whitespace-pre-wrap px-9 py-6'>
              {tab.content}
            </SuiText>
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  )
}
