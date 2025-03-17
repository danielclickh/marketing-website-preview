import { PricingConfig } from './types'

const config: PricingConfig = {
  plans: {
    basic: {
      planTemplateId: 'c84c5422-f679-48b4-9910-4265b285795f',
      aggregationIds: {
        compute: ['5e976c25-4e0b-4f60-a527-b398fcb8f0f3'],
        storage: ['45c9fb58-c97f-4819-8adf-821ae75ce90c']
      }
    },
    scale: {
      planTemplateId: '439c1511-9402-4cf5-96b9-164de5745df6',
      aggregationIds: {
        compute: ['5e976c25-4e0b-4f60-a527-b398fcb8f0f3'],
        storage: ['45c9fb58-c97f-4819-8adf-821ae75ce90c']
      }
    },
    enterprise: {
      planTemplateId: 'ccf9c9b7-df2f-4a97-b400-e559dbaae595',
      aggregationIds: {
        compute: [
          'efb2eef7-cc62-4ae4-8cbf-be6c45c6d9b7',
          'f7e1901e-89ba-4fdc-af3b-2e68ae100b46',
          '66857306-9235-4926-94fe-98a0042564ad'
        ],
        storage: ['45c9fb58-c97f-4819-8adf-821ae75ce90c']
      }
    }
  }
}

export default config
