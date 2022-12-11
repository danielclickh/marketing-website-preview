import React, { FunctionComponent, ReactElement } from 'react'

export type CodeblockProps = {
  bgColor?: string | undefined
  children: ReactElement
}

export const SuiCodeblock: FunctionComponent<CodeblockProps> = ({
  ...CodeblockProps
}) => {
  const { bgColor, children } = CodeblockProps

  return (
    <pre
      className={`break-all ${
        bgColor ? bgColor : 'bg-light-purple2'
      } text-white rounded-lg p-4 text-sm`}>
      {children}
    </pre>
  )
}
