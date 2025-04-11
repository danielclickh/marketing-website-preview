import { Tab } from '@headlessui/react'
import { ReactElement } from 'react'
import { SuiText } from '../typography'
import { colorCalculator } from '../typography/calculator'

type TabProps = {
  color?: string | undefined
  activeColor?: string | undefined
  borderColor?: string | undefined
  hoverColor?: string | undefined
  hoverBorderColor?: string | undefined
  tabs: {
    name: string
    content: ReactElement
  }[]
}

export const SuiTabs = ({ ...TabProps }: TabProps) => {
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
        className={`flex w-full space-x-8 pr-10 text-base ${
          borderColor ? borderColor : 'border-c2'
        } rounded-t-md border-b focus:outline-none sm:text-sm`}>
        <nav className='-mb-px flex space-x-8' aria-label='Tabs'>
          {tabs.map((tab: any) => (
            <Tab
              key={`tab-button-${tab.name}`}
              className={({ selected }) =>
                selected
                  ? `border-c6 ${colorCalculator(
                      color ?? '',
                      'text-neutral-0'
                    )} whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium focus:outline-none`
                  : `border-transparent ${colorCalculator(
                      activeColor ?? '',
                      'text-neutral-0'
                    )} hover:${colorCalculator(
                      hoverColor ?? '',
                      'text-neutral-0'
                    )} hover:${
                      hoverBorderColor ? hoverBorderColor : 'border-c4/20'
                    } whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium`
              }>
              {tab.name}
            </Tab>
          ))}
        </nav>
      </Tab.List>
      <Tab.Panels className='flex overflow-auto'>
        {tabs.map((tab: any) => (
          <Tab.Panel key={`tab-panel-${tab.name}`}>
            <SuiText
              size='base'
              weight='normal'
              className='whitespace-pre-wrap'>
              {tab.content}
            </SuiText>
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  )
}
