import CodeViewer from '@/components/CodeViewer'
import { BlogModuleCodeBlock } from '@/types/strapi'
import React from 'react'

export default function BlogModulesCodeBlock({
  language,
  runnable,
  playLink,
  code
}: BlogModuleCodeBlock) {
  return (
    <CodeViewer
      type='click-ui'
      language={language}
      runnable={runnable}
      play_link={playLink}
      raw_code={code}
    />
  )
}

export function blogModulesCodeBlockMarkdown({
  language,
  runnable,
  playLink,
  code
}: BlogModuleCodeBlock) {
  return `\`\`\`${language}
${code}
\`\`\`

[Run code block](${playLink})`
}
