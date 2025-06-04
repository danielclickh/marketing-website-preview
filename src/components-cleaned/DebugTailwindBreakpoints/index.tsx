export type DebugTailwindBreakpointsProps = React.HTMLProps<HTMLDivElement>

export default function DebugTailwindBreakpoints({
  className = '',
  ...props
}: DebugTailwindBreakpointsProps) {
  return (
    <div className={`bg-red-700 px-4 py-3 text-white ${className}`} {...props}>
      <span className='sm:hidden'>xs</span>
      <span className='hidden sm:block sm-mid:hidden'>sm</span>
      <span className='hidden sm-mid:block md:hidden'>sm-mid</span>
      <span className='hidden md:block md-mid:hidden'>md</span>
      <span className='hidden md-mid:block lg:hidden'>md-mid</span>
      <span className='hidden lg:block lg-mid:hidden'>lg</span>
      <span className='hidden lg-mid:block xl:hidden'>lg-mid</span>
      <span className='hidden xl:block xl-mid:hidden'>xl</span>
      <span className='hidden xl-mid:block 2xl:hidden'>xl-mid</span>
      <span className='hidden 2xl:block 3xl:hidden'>2xl</span>
      <span className='hidden 3xl:block'>3xl</span>
    </div>
  )
}
