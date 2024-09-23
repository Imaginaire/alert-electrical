import Layout from '../global/Layout'
import ScrollUp from '@/shared/utils/ScrollUp'
import type {LatestNewsProps} from '../../types'

// components
import Sections from '@/components/global/Sections'
import Image from 'next/image'
import PageHead from './PageHead'

// Utils
import urlForImage from '@/shared/utils/urlForImage'
import SocialMediaBlock from '../shared/SocialMediaBlock'
export function LatestNewsPage({
  page,
  settings,
  homePageTitle,
  preview,
  loading,
  canonicalUrl,
}: LatestNewsProps) {
  // Default to an empty object to allow previews on non-existent documents
  const {sections} = page ?? {}

  const backgroundImgUrl = urlForImage(page?.image).url() || ''

  return (
    <>
      <PageHead page={page} settings={settings} title={homePageTitle} canonicalUrl={canonicalUrl} />

      <Layout settings={settings} preview={preview} loading={loading}>
        <div data-content="main" className="flex flex-col items-center text-primary">
          {/* Background image */}
          <div className="relative w-full min-h-[40vh]">
            <Image
              src={backgroundImgUrl || ''}
              alt={`Background image for ${page?.title}`}
              fill={true}
              sizes="100vw"
              priority={true}
              className="object-cover"
            />
          </div>

          {/* Content Wrapper */}

          <div className="latestNewsPageContentWrapper w-11/12 sm:w-2/3 flex flex-col items-center bg-white mt-[-10vh] z-50 p-12">
            {/* Title */}
            {page?.title && <h1 className=" text-4xl mb-6">{page.title}</h1>}

            {/* Date */}
            {page?.date && <p className="text-sm w-full  mb-6">{page?.date}</p>}

            {/* Sections */}
            {sections && sections.length > 0 && (
              <Sections sections={sections} settings={settings} />
            )}

            {/* Social Media */}

            {settings?.socialMedia && (
              <SocialMediaBlock
                containerClasses="self-start mt-12"
                listClasses="p-3 border border-gray-200"
                socialMedia={settings?.socialMedia}
              />
            )}
          </div>
          {/* Workaround: scroll to top on route change */}
          <ScrollUp />
        </div>
      </Layout>
    </>
  )
}
