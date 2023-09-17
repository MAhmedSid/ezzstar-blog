import { type SchemaTypeDefinition } from 'sanity'
import { blogs } from './Schemas/Blog'
import { comments } from './Schemas/Comment'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blogs,comments],
}
