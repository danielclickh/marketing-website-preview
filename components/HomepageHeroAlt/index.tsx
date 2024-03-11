import RollerText from '../RollerText'
import { SuiText, SuiTitle } from '../sui'

export default function HomepageHeroAlt() {
  return (
    <div className='bg-primary-300 py-48 text-black'>
      <div className='section-container'>
        <SuiTitle type='h1'>
          The{' '}
          <span className='tilted tilted-black'>
            <span className='tilted-content text-white'>real-time</span>
          </span>{' '}
          <br />
          data warehouse for <br />
          <RollerText
            phraseList={[
              'analytics',
              'observability',
              'ML & GenAI',
              'business intelligence',
              'financial services',
              'fraud & cybersecurity',
              'gaming'
            ]}
          />
        </SuiTitle>
      </div>
    </div>
  )
}
