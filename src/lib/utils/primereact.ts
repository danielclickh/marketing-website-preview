import { classNames } from './classNames'

export const Tailwind = {
  multiselect: {
    root: ({ props }: { props: any }) => ({
      className: classNames(
        'inline-flex cursor-pointer select-none text-white',
        'border border-primary-600 rounded-full py-[6px] px-4 pr-0 text-sm font-semibold hover:border-primary-300 duration-500 ease-in-out  transform',
        {
          'opacity-60 select-none pointer-events-none cursor-default':
            props.disabled
        }
      )
    }),
    labelContainer: ({ props }: { props: any }) => ({
      className: classNames(
        'overflow-hidden flex flex-auto cursor-pointer py-[1px]'
      )
    }),
    label: ({ props }: { props: any }) => ({
      className: classNames(
        'block overflow-hidden whitespace-nowrap cursor-pointer overflow-ellipsis w-24',
        'text-white '
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
          'border-2 w-6 h-6 text-gray-600 rounded-lg ',
          'hover:border-blue-500 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)]',
          {
            'border-gray-300 bg-white': !props?.checked,
            'border-blue-500 bg-blue-500': props?.checked
          }
        )
      })
    },
    headerCheckboxIcon: ({ props }: { props: any }) => ({
      className: 'w-4 h-4 text-white text-base'
    }),
    closeButton: {
      className: classNames(
        'flex items-center justify-center overflow-hidden relative',
        'w-8 h-8 text-gray-500 border-0 bg-transparent rounded-full mr-2 last:mr-0',
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
        'm-0 px-4 py-1.5 border-0 rounded-none text-[14px]',
        {
          'text-white hover:bg-neutral-725 hover:text-white':
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

    checkboxIcon: ({ props }: { props: any }) => ({
      className: 'w-2 h-2'
    })
  }
}
