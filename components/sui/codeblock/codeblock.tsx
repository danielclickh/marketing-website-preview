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
        bgColor ? bgColor : 'bg-arsenic'
      } text-white rounded-lg py-4 text-sm`}>
      {children}
    </pre>
  )
}
