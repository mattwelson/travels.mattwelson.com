import {defineArrayMember, defineField, defineType} from 'sanity'
import {MdOutlineMap as icon} from 'react-icons/md'
import {portableText} from './portableText'
import {DateTime} from 'luxon'

export const country = defineType({
  type: 'document',
  name: 'country',
  title: 'Country',
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
      name: 'date',
      type: 'date',
      title: 'Date',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
      initialValue: () => DateTime.now().toFormat('yyyy-MM-dd'),
    }),
    defineField({
      fieldset: 'meta',
      name: 'endDate',
      type: 'date',
      title: 'End date',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
      initialValue: () => DateTime.now().toFormat('yyyy-MM-dd'),
    }),
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
      type: 'image',
      name: 'image',
      title: 'Image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
        },
        {
          name: 'attribution',
          type: 'string',
          title: 'Attribution',
        },
      ],
    }),
    portableText,
  ],
})
