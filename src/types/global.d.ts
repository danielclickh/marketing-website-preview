// Generic utility to extract only event props from a given HTML element
export type EventPropsOf<T extends keyof JSX.IntrinsicElements> = Pick<
  React.HTMLProps<HTMLElementTagNameMap[T]>,
  {
    [K in keyof React.HTMLProps<
      HTMLElementTagNameMap[T]
    >]: K extends `on${string}` ? K : never
  }[keyof React.HTMLProps<HTMLElementTagNameMap[T]>] &
    keyof React.HTMLProps<HTMLElementTagNameMap[T]>
>

// <MyComponent as='h1' />
// <MyComponent as='span' />
export type PolymorphicComponentProps<
  T extends React.ElementType,
  Props = {}
> = Props & {
  as?: T
} & Omit<React.ComponentPropsWithoutRef<T>, keyof Props | 'as'>
