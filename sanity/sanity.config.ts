import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {groqdPlaygroundTool} from 'groqd-playground'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'travel.mattwelson.com',

  projectId: 'k3w6sp5u',
  dataset: 'demonstration', //'production',

  plugins: [deskTool(), groqdPlaygroundTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
