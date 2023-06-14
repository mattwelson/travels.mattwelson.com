import {defineField, defineArrayMember, defineType} from 'sanity'
import {MdEditDocument as icon} from 'react-icons/md'
import {imageWithCaptionAndAttribute} from './objects'
import {portableText} from './portableText'

export const page = defineType({
  type: 'document',
  name: 'page',
  title: 'Page',
  icon,
  fieldsets: [
    {
      name: 'meta',
      title: 'Metadata',
      options: {
        collapsible: true,
      },
    },
  ],
  fields: [
    defineField({
      type: 'string',
      name: 'title',
      title: 'Title',
    }),
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      fieldset: 'meta',
      options: {
        source: 'title',
        maxLength: 200, // will be ignored if slugify is set
      },
    },
    defineField({
      fieldset: 'meta',
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'string',
        }),
      ],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      ...imageWithCaptionAndAttribute,
      name: 'image',
      title: 'Image',
      options: {
        hotspot: true,
      },
    }),
    portableText,
  ],
})
