import FontSohneBreit from '@/components/FontSohneBreit'
import ReactMarkdown from 'react-markdown'

export default function OpenhouseMarkdown({
  children,
  className = ''
}: {
  children: string
  className?: string
}) {
  return (
    <div className={`space-y-6 ${className}`}>
      <ReactMarkdown
        components={{
          h1({ node, children, className = '', ...props }) {
            return (
              <FontSohneBreit
                as='h1'
                className={`!-mb-6 text-4xl font-black ${className}`}
                {...props}>
                {children}
              </FontSohneBreit>
            )
          },
          h2({ node, children, className = '', ...props }) {
            return (
              <FontSohneBreit
                as='h2'
                className={`!-mb-6 text-2xl font-black ${className}`}
                {...props}>
                {children}
              </FontSohneBreit>
            )
          },
          h3({ node, children, className = '', ...props }) {
            return (
              <FontSohneBreit
                as='h3'
                className={`!-mb-6 text-xl font-black ${className}`}
                {...props}>
                {children}
              </FontSohneBreit>
            )
          },
          h4({ node, children, className = '', ...props }) {
            return (
              <FontSohneBreit
                as='h4'
                className={`!-mb-6 text-lg font-black ${className}`}
                {...props}>
                {children}
              </FontSohneBreit>
            )
          },
          h5({ node, children, className = '', ...props }) {
            return (
              <FontSohneBreit
                as='h5'
                className={`!-mb-6 text-base font-black ${className}`}
                {...props}>
                {children}
              </FontSohneBreit>
            )
          },
          h6({ node, children, className = '', ...props }) {
            return (
              <FontSohneBreit
                as='h6'
                className={`!-mb-6 text-sm font-black ${className}`}
                {...props}>
                {children}
              </FontSohneBreit>
            )
          },
          p({ node, children, className = '', ...props }) {
            return (
              <p className={`${className}`} {...props}>
                {children}
              </p>
            )
          },
          ul({ node, children, className = '', ...props }) {
            return (
              <ul
                className={`list-disc space-y-3 pl-5 ${className}`}
                {...props}>
                {children}
              </ul>
            )
          },
          ol({ node, children, className = '', ...props }) {
            return (
              <ol
                className={`list-decimal space-y-3 pl-5 ${className}`}
                {...props}>
                {children}
              </ol>
            )
          },
          li({ node, children, className = '', ...props }) {
            return (
              <li className={`${className}`} {...props}>
                {children}
              </li>
            )
          },
          a({ node, children, className = '', ...props }) {
            return (
              <a
                className={`underline hover:decoration-2 ${className}`}
                {...props}>
                {children}
              </a>
            )
          },
          blockquote({ node, children, className = '', ...props }) {
            return (
              <blockquote
                className={`relative space-y-3 p-4 before:pointer-events-none before:absolute before:inset-0 before:block before:bg-current before:opacity-10 ${className}`}
                {...props}>
                {children}
              </blockquote>
            )
          }
        }}>
        {children}
      </ReactMarkdown>
    </div>
  )
}
