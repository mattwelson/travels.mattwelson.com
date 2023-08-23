import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {groqdPlaygroundTool} from 'groqd-playground'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'travels.mattwelson.com',

  projectId: 'k3w6sp5u',
  dataset: 'production', //'demonstration',

  plugins: [deskTool(), groqdPlaygroundTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
