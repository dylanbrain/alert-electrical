import {ListItemBuilder} from 'sanity/structure'
import defineStructure from '../utils/defineStructure'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Checkout')
    .schemaType('checkout')
    .child(S.editor().title('Checkout').schemaType('checkout').documentId('checkout')),
)
