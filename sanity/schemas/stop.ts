import {defineArrayMember, defineField, defineType} from 'sanity'
import {DateTime} from 'luxon'
import {MdEditLocation as icon} from 'react-icons/md'
import {portableText} from './portableText'

export const stop = defineType({
  name: 'stop',
  type: 'document',
  title: 'Stop',
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
      name: 'title',
      type: 'string',
      title: 'Title',
    }),
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
      fieldset: 'meta',
      name: 'country',
      title: 'Country',
      type: 'reference',
      to: [
        {
          type: 'country',
        },
      ],
    }),
    defineField({
      fieldset: 'meta',
      name: 'region',
      title: 'Region',
      type: 'string',
    }),
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      fieldset: 'meta',
      options: {
        source: 'title',
      },
    },
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
