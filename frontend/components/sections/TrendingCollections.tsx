import {TrendingCollections as TrendingCollectionsType} from '@/types'
import Header from './Header'
import Link from 'next/link'
import Image from 'next/image'
import urlForImage from '@/shared/utils/urlForImage'

export default function TrendingCollections(trendingCollectionsData: TrendingCollectionsType) {
  const {header, linkText, collections, slug} = trendingCollectionsData || {}

  return (
    <section className="trendingCollections w-full flex justify-center bg-secondary-grey py-12">
      {/* Container */}
      <div className="trendingCollectionsContainer w-full px-5 md:px-7 flex flex-col">
        {/* Header & Link */}
        <div className="trendingCollectionsHeader w-full flex justify-between sm:items-center mb-4 flex-col sm:flex-row">
          {/* Header */}

          <Header
            classes={'text-4xl uppercase text-primary'}
            header={header?.header || ''}
            headerTag={header?.headerTag || 'h2'}
          />

          {/* Header Link */}
          <Link href={typeof slug === 'string' ? slug : ''} className="group relative mt-4 sm:mt-0">
            <span className=" uppercase text-primary">{linkText}</span>
            <span className="absolute left-0 bottom-0 w-0 h-[0.5px] bg-black opacity-0 transition-all duration-300 group-hover:w-full group-hover:opacity-100"></span>
          </Link>
        </div>

        {/* Collections */}
        <div className="trendingCollectionsCollections w-full grid grid-cols-1 sm:grid-cols-3 gap-8">
          {collections &&
            collections.map((collection, index) => {
              const imageUrl = urlForImage(collection?.image)?.url()

              return (
                <div key={index} className="trendingCollection w-full flex flex-col gap-4">
                  {/* Image */}
                  <div className="relative  aspect-[3/3.5] ">
                    <Image
                      src={imageUrl}
                      alt={collection?.title || 'collections image'}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>

                  {/* Title */}
                  <Header
                    classes={'text-3xl text-primary'}
                    header={collection?.title || ''}
                    headerTag={'h3'}
                  />

                  {/* Link: @TODO fix when collections done */}
                  <Link href={collection?.link?.slug || ''} className="group relative">
                    <span className="text-xl uppercase text-secondary-grey-text underline decoration-[0.5px] text-primary">
                      {collection?.linkText}
                    </span>
                  </Link>
                </div>
              )
            })}
        </div>
      </div>
    </section>
  )
}
