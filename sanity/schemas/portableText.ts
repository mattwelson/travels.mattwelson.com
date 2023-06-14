import {defineArrayMember, defineField} from 'sanity'
import {imageList, imageWithCaptionAndAttribute} from './objects'

export const portableText = defineField({
  type: 'array',
  name: 'body',
  title: 'Body',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'Heading 2', value: 'h2'},
        {title: 'Heading 3', value: 'h3'},
        {title: 'Heading 4', value: 'h4'},
        {title: 'Heading 5', value: 'h5'},
        {title: 'Heading 6', value: 'h6'},
        {title: 'Quote', value: 'blockquote'},
      ],
    }),
    defineArrayMember({
      ...imageWithCaptionAndAttribute,
    }),
    defineArrayMember({
      type: 'object',
      name: 'imageList',
      fields: [
        defineField({
          name: 'images',
          ...imageList,
        }),
      ],
    }),
  ],
})
