import { classNames } from '../../lib/utils/classNames'

export const TRANSITIONS = {
  overlay: {
    timeout: 50
  }
}

export const Tailwind = {
  multiselect: {
    root: ({ props }: { props: any }) => ({
      className: classNames(
        'inline-flex cursor-pointer select-none text-white',
        'border border-primary-600 rounded-full py-2.5 px-4 pr-0 text-sm font-semibold transition-colors duration-500  hover:border-primary-300 ease-in-out transform',
        {
          'opacity-60 select-none pointer-events-none cursor-default':
            props.disabled
        }
      )
    }),
    labelContainer: ({ props }: { props: any }) => ({
      className: classNames('overflow-hidden flex flex-auto cursor-pointer ')
    }),
    label: ({ props }: { props: any }) => ({
      className: classNames(
        'block overflow-hidden whitespace-nowrap cursor-pointer overflow-ellipsis w-24',
        'text-white ',
        'transition duration-200'
      )
    }),
    token: {
      className: classNames(
        'bg-gray-300  text-gray-700 rounded-full',
        'cursor-default inline-flex items-center'
      )
    },
    removeTokenIcon: ({ props }: { props: any }) => ({
      className: 'ml-2' // Adjust as needed
    }),
    trigger: {
      className: classNames(
        'flex items-center justify-center shrink-0',
        'bg-transparent text-white w-12'
      )
    },
    panel: {
      className: classNames()
    },
    header: {
      className: classNames(
        'border-b border-gray-300 text-gray-700 bg-gray-100 rounded-t-lg',
        'flex items-center justify-between'
      )
    },
    headerCheckboxContainer: {
      className: classNames(
        'inline-flex cursor-pointer select-none align-bottom relative',
        'mr-2',
        'w-6 h-6'
      )
    },
    headerCheckbox: {
      root: ({ props }: { props: any }) => ({
        className: classNames(
          'flex items-center justify-center',
          'border-2 w-6 h-6 text-gray-600 rounded-lg transition-colors duration-200',
          'hover:border-blue-500 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]',
          {
            'border-gray-300 bg-white': !props?.checked,
            'border-blue-500 bg-blue-500': props?.checked
          }
        )
      })
    },
    headerCheckboxIcon: ({ props }: { props: any }) => ({
      className: 'w-4 h-4 transition-all duration-200 text-white text-base'
    }),
    closeButton: {
      className: classNames(
        'flex items-center justify-center overflow-hidden relative',
        'w-8 h-8 text-gray-500 border-0 bg-transparent rounded-full transition duration-200 ease-in-out mr-2 last:mr-0',
        'hover:text-gray-700 hover:border-transparent hover:bg-gray-200',
        'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]'
      )
    },
    closeIcon: ({ props }: { props: any }) => ({
      className: 'w-4 h-4 inline-block'
    }),
    wrapper: {
      className: classNames(
        'border border-primary-600 py-1.5 mt-2',
        'bg-neutral-800 text-white rounded-xl rounded-t-0 shadow-xl',
        'overflow-auto'
      )
    },
    list: ({ props }: { props: any }) => ({
      className: 'list-none m-0'
    }),
    item: ({ context }: { context: any }) => ({
      className: classNames(
        'cursor-pointer font-normal overflow-hidden relative whitespace-nowrap text-white flex items-center',
        'm-0 px-4 py-1.5 border-0 transition-shadow duration-200 rounded-none text-base',
        {
          'text-white hover:bg-neutral-725 hover:text-primary-900':
            !context || context.selected
        }
      )
    }),
    checkboxContainer: {
      className: classNames(
        'inline-flex cursor-pointer select-none align-bottom relative mr-2',
        'w-4 h-4'
      )
    },

    checkbox: {
      classNames: ''
    },
    checkboxIcon: ({ props }: { props: any }) => ({
      className: 'w-2 h-2 transition-all duration-200 text-white text-base'
    }),
    itemGroup: {
      className: classNames(
        'm-0 p-3 text-gray-800 bg-white font-bold',
        'cursor-auto'
      )
    },
    filterContainer: ({ props }: { props: any }) => ({
      className: 'relative'
    }),
    filterInput: {
      root: {
        className: classNames(
          'pr-7 -mr-7',
          'w-full',
          'font-sans text-base text-gray-700 bg-white py-3 px-3 border border-gray-300 transition duration-200 rounded-lg appearance-none',
          'hover:border-blue-500 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]'
        )
      }
    },
    filterIcon: ({ props }: { props: any }) => ({
      className: '-mt-2 absolute top-1/2'
    }),
    clearIcon: ({ props }: { props: any }) => ({
      className: 'text-gray-500 right-12 -mt-2 absolute top-1/2'
    }),
    transition: TRANSITIONS.overlay
  }
}
