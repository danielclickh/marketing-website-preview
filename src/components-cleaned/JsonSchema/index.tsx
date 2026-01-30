import { Thing, WithContext } from 'schema-dts'

export interface JsonSchemaProps {
  schema: WithContext<Thing> | Array<WithContext<Thing>> | any
}

export default function JsonSchema({ schema }: JsonSchemaProps) {
  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
