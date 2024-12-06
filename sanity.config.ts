import {defineConfig, isDev} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'
import {defaultDocumentNode} from './structure/defaultDocumentNode'

import {visionTool} from '@sanity/vision'
import {colorInput} from '@sanity/color-input'
import {imageHotspotArrayPlugin} from 'sanity-plugin-hotspot-array'
import {media, mediaAssetSource} from 'sanity-plugin-media'
import {customDocumentActions} from './plugins/customDocumentActions'
import {availability} from 'sanity-plugin-availability'
import Navbar from './components/studio/Navbar'
import {table} from '@sanity/table'
import {simplerColorInput} from 'sanity-plugin-simpler-color-input'

const devOnlyPlugins = [visionTool()]

export default defineConfig({
  name: 'default',
  title: process.env.SANITY_STUDIO_TITLE || 'Sanity Studio',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || '',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [
    structureTool({defaultDocumentNode, structure}),
    simplerColorInput({
      defaultColorFormat: 'rgba',
      defaultColorList: [
        {label: 'White', value: '#ffffff'},
        {label: 'Black', value: '#000000'},
        {label: 'Bronze', value: '#b4886f'},
        {label: 'Rose Gold', value: '#d9a1a1'},
        {label: 'Rose Gold Alt', value: '#d6aeaf'},
        {label: 'Slate', value: '#0D2A39'},
        {label: 'Mid Grey', value: '#535353'},
        {label: 'Cool Grey', value: '#D4D6D1'},
        {label: 'Light Grey', value: '#F2F2F2'},
        {label: 'Soft Grey', value: '#FBFBFB'},
        {label: 'Light Pink', value: '#FFFAFB'},
      ],
      enableSearch: true,
    }),
    colorInput(),
    imageHotspotArrayPlugin(),
    customDocumentActions(),
    media(),
    availability(),
    table(),
    ...(isDev ? devOnlyPlugins : []),
  ],

  schema: {
    types: schemaTypes,
  },

  form: {
    file: {
      assetSources: (previousAssetSources) => {
        return previousAssetSources.filter((assetSource) => assetSource !== mediaAssetSource)
      },
    },
    image: {
      assetSources: (previousAssetSources) => {
        return previousAssetSources.filter((assetSource) => assetSource === mediaAssetSource)
      },
    },
  },

  studio: {
    components: {
      navbar: Navbar,
    },
  },
})
