import React, { FunctionComponent } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism'

export type CodeProps = {}

export const SuiCode: FunctionComponent<CodeProps> = ({
  // @ts-ignore
  className,
  ...props
}) => {
  const match = /language-(\w+)/.exec(className || '')
  return match ? (
    // @ts-ignore
    <SyntaxHighlighter
      language={match[1]}
      style={dracula}
      PreTag='div'
      {...props}
    />
  ) : (
    <>
      <SuiCode {...props}></SuiCode>
    </>
  )
}
