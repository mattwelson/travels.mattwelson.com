import {defineArrayMember, defineField, defineType} from 'sanity'
import {DateTime} from 'luxon'
import {MdEditLocation as icon} from 'react-icons/md'

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
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      fieldset: 'meta',
      options: {
        source: 'title',
        maxLength: 200, // will be ignored if slugify is set
        isUnique: true,
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
      name: 'region',
      title: 'Region',
      type: 'string',
    }),
    defineField({
      fieldset: 'meta',
      name: 'country',
      title: 'Country',
      type: 'reference',
      to: [{type: 'country'}],
    }),
    defineField({
      fieldset: 'meta',
      name: 'order',
      title: 'Order Modifier',
      type: 'number',
      description: 'Used to modify order within a single day, order TBC',
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
    defineField({
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
          type: 'image',
        }),
      ],
    }),
  ],
})
