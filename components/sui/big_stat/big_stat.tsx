import { SuiPanel } from '../panel'
import { SuiText, SuiTitle, SuiLink } from '../typography'
import { Sparklines, SparklinesLine } from 'react-sparklines'

type BigStatProps = {
  id?: number
  label: string
  color?: string
  stat: string
  border?: boolean
  link_text?: string
  link_href?: string
  change_value?: string
  change_value_color?: string
  sparklines_data?: number[]
  sparklines_color?: string
  sparklines_margin?: string
}

export function SuiBigStat(props: BigStatProps) {
  const {
    id,
    label,
    color,
    stat,
    border,
    link_text,
    link_href,
    change_value,
    change_value_color,
    sparklines_data,
    sparklines_color,
    sparklines_margin
  } = props

  return (
    <>
      <SuiPanel
        key={id}
        padding='sm'
        color={color ? color : 'bg-white dark:bg-dark-grey2'}
        border={border ? border : false}>
        <div className='flex flex-col'>
          <SuiText size='base' color='secondary' weight='bold'>
            {label}
          </SuiText>
          <div className='flex md:flex-col xl:flex-row'>
            <div className={`flex-col ${sparklines_data ? 'w-2/4' : 'w-full'}`}>
              <SuiTitle type='h3'>{stat}</SuiTitle>
              {link_text && (
                <SuiText size='sm' weight='normal'>
                  <SuiLink href={link_href}>{link_text}</SuiLink>
                </SuiText>
              )}
              {change_value && (
                <SuiText size='sm' weight='bold' color={change_value_color}>
                  {change_value}
                </SuiText>
              )}
            </div>
            {sparklines_data && (
              <span
                className={`w-full xl:w-2/4 ${
                  sparklines_margin ? sparklines_margin : 'mt-5'
                }`}>
                <Sparklines data={sparklines_data}>
                  <SparklinesLine color={sparklines_color} />
                </Sparklines>
              </span>
            )}
          </div>
        </div>
      </SuiPanel>
    </>
  )
}
