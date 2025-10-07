import Label from '../Label'

export interface FieldContainerProps {
  children: React.ReactNode
  className?: string
  label?: string | React.ReactNode
  tooltip?: string | React.ReactNode
}

export default function FieldContainer({
  children,
  className = '',
  label,
  tooltip
}: FieldContainerProps) {
  return (
    <div className={`relative flex min-h-full flex-col gap-2 ${className}`}>
      {(label || tooltip) && (
        <Label tooltip={tooltip} className='mb-auto'>
          {label}
        </Label>
      )}
      {children}
    </div>
  )
}
