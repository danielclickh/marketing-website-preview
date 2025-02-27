import { Button, CodeBlock, Icon, Tooltip } from '@clickhouse/click-ui'
import CodeInterpreter from './CodeInterpreter'
import { useEffect, useState } from 'react'


function CodeViewer({
    node,
    inline,
    className,
    type,
    language,
    show_line_numbers = 'true',
    runnable = false,
    run = false,
    clickhouse_url,
    clickhouse_user,
    play_link,
    children,
    ...props
}: any) {

    const showLineNumbers = (show_line_numbers === 'true')
    const runBoolean = (run === 'true')
    const runnableBoolean = (runnable === 'true')
    if (type === 'click-ui') {
        const codeContent = (
            Array.isArray(children)
                ? children
                    .map((child) =>
                        typeof child === 'object' ? child.props?.children || '' : child
                    )
                    .join('')
                : children.toString()
        ).trim()
        return (
            <div className="bg-[#282828] mb-9">
                <CodeBlock
                    language={language}
                    onCopy={function Da() { }}
                    onCopyError={function Da() { }}
                    showLineNumbers={showLineNumbers}
                    wrapLines>
                    {codeContent}
                </CodeBlock>
                <CodeInterpreter play_link={play_link} run={runBoolean} runnable={runnableBoolean} queryString={codeContent} clickhouseUrl={clickhouse_url} clickhouseUser={clickhouse_user} />
            </div>
        )
    }
    return (
        <code
            className={`${className} mb-9 border border-solid border-c3`}
            style={{wordBreak: 'break-word'}}
            {...props}>
            {children}
        </code>
    )
}

export default CodeViewer
