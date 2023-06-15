import {FaRegImages as imagesIcon} from 'react-icons/fa'
import {FaRegImage as imageIcon} from 'react-icons/fa'
import {defineArrayMember} from 'sanity'

export const imageWithCaptionAndAttribute = {
  type: 'image',
  icon: imageIcon,
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
}

export const imageList = {
  type: 'array',
  icon: imagesIcon,
  of: [
    defineArrayMember({
      type: 'image',
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
        {
          name: 'fullWidth',
          type: 'boolean',
          title: 'Full width image',
          description:
            'Ensures the image will always be fullwidth, rather than potentionally being resized',
          initialValue: false,
        },
      ],
      options: {
        hotspot: true,
      },
    }),
  ],
}
