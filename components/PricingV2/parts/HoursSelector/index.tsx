import { usePricingV2Context } from '../../../PricingV2ContextProvider'
import Label from '../../ui/Label'
import Range from '../../ui/Range'

export default function HoursSelector() {
  const { hours, setHours } = usePricingV2Context()
  return (
    <div>
      <Label tooltip='We idle your service when it’s inactive, saving you on cost.'>
        Active hours per day
      </Label>
      <Range min={0} max={24} value={hours || 0} onChange={setHours} />
    </div>
  )
}
