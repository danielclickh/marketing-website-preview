import SocialIcon from '../../SocialIcon'
import { SuiTitle } from '../../sui'
import socials from './socials.json'

function GrowingCommunity() {
  return (
    <div className='section-container px-4'>
      <div className='mb-24 flex w-full flex-col items-center justify-center rounded-lg border border-neutral-700/80 bg-neutral-900/50 px-8 py-16 text-neutral-0'>
        <SuiTitle type='h2' className='text-center'>
          <span className='tilted tilted-yellow'>
            <span className='tilted-content'>10万人以上の</span>
          </span>{' '}
          開発者が使うClickHouseユーザーに参加しよう
        </SuiTitle>
        <div className='flex flex-wrap items-center justify-center gap-8 pt-11'>
          {socials.map((social) => (
            <SocialIcon
              key={social.name}
              href={social.href}
              imgSrc={social.imgSrc}
              name={social.name}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default GrowingCommunity
