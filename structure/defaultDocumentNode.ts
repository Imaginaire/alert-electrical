import {StructureBuilder} from 'sanity/structure'
import {Iframe} from 'sanity-plugin-iframe-pane'
import {type SanityDocument} from 'sanity'

interface MySanityDocument extends SanityDocument {
  slug?: {
    current: string
  }
}

const getPreviewUrl = () => {
  return process.env.SANITY_STUDIO_ENVIRONMENT === 'development'
    ? process.env.SANITY_STUDIO_DEVELOPMENT_URL
    : process.env.SANITY_STUDIO_PRODUCTION_URL
}

export const defaultDocumentNode = (S: StructureBuilder, {schemaType}: {schemaType: string}) => {
  return S.document().views([
    S.view.form(),
    S.view
      .component(Iframe)
      .options({
        url: (document: MySanityDocument) => {
          // Handle singletons like 'home' that do not use slugs
          if (schemaType === 'home') {
            return `${getPreviewUrl()}/`
          }

          // For documents with slugs, construct the preview URL
          if (document?.slug?.current) {
            return `${getPreviewUrl()}/${document.slug.current}`
          }

          return new Error('Missing slug')
        },
        reload: {
          button: true,
        },
      })
      .title('Preview'),
  ])
}
