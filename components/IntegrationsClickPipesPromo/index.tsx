import { galaxyOnClick } from '../../lib/galaxy/galaxy'
import { CUIButton } from '../ClickUI'

export default function IntegrationsClickPipesPromo() {
  return (
    <div className='rounded-lg border border-neutral-700/80 bg-neutral-700/50 p-10'>
      <div className='grid grid-cols-2'>
        <div>
          <h3 className='font-basier text-3xl font-semibold'>
            Managed Integration Pipelines for ClickHouse Cloud.
          </h3>
          <p className='my-4 text-[#B3B6BD]'>
            ClickPipes is an integration engine that makes ingesting massive
            volumes of data from a diverse set of sources as simple as clicking
            a few buttons.
          </p>
          <CUIButton
            href='/cloud/clickpipes'
            type='primary'
            onClick={() => {
              galaxyOnClick(
                'integrations.clickpipesPromoSection.learnClickpipesSelect'
              )
            }}>
            Learn more about ClickPipes
          </CUIButton>
        </div>
      </div>
    </div>
  )
}
