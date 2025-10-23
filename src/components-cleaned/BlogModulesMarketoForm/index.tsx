import MarketoForm from '@/components/MarketoForm'
import { SuiText, SuiTitle } from '@/components/sui'
import { BlogModuleMarketoForm } from '@/types/strapi'

export default function BlogModulesMarketoForm({
  title,
  description,
  formId
}: BlogModuleMarketoForm) {
  return (
    <div className='rounded bg-white/5 p-4 md:flex-row md:items-center md:p-6'>
      <SuiTitle type='h3' className='mb-2.5'>
        {title}
      </SuiTitle>
      <SuiText size='sm' weight='medium' color='secondary'>
        {description}
      </SuiText>
      <div className='mt-6'>
        <MarketoForm formId={formId} />
      </div>
    </div>
  )
}
