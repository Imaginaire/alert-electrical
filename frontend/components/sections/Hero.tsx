// Swiper
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css'
import {Pagination} from 'swiper/modules'

// Types
import {Hero as HeroType} from '@/types'
import {Image as ImageType} from 'sanity'
import type {PortableTextBlock} from '@portabletext/types'

// Components
import Image from 'next/image'
import Link from 'next/link'

// Utils
import urlForImage from '@/shared/utils/urlForImage'
import {CustomPortableText} from '../shared/CustomPortableText'

// Hero Content component
function HeroContent({
  content,
  linkText,
  slug,
}: {
  content: PortableTextBlock[]
  linkText?: string
  slug?: {current?: string}
}) {
  return (
    <div className="hero-container relative h-[355.19px] xl:h-[630px] m-auto md:mx-0 px-5 md:px-40 py-12 xl:py-40 lg:py-9 lg:px-[78px] text-white text-center md:text-start">
      <CustomPortableText
        value={content}
        headerClasses="text-[32px] font-bold mb-4 xl:text-[64px]"
        paragraphClasses="text-2xl mb-4 xl:text-[32px]"
      />
      <div className="mt-12">
        <Link
          href={slug?.current || '/'}
          className="font-bold uppercase bg-primary rounded-md px-6 py-4 hover:bg-secondary-blue"
        >
          {linkText}
        </Link>
      </div>
    </div>
  )
}

// Hero Image component
function HeroImage({backgroundImage}: {backgroundImage: ImageType}) {
  const backgroundImgUrl = backgroundImage
    ? urlForImage(backgroundImage)?.width(1920).url()
    : undefined

  return (
    <Image
      src={backgroundImgUrl || ''}
      fill={true}
      alt={
        typeof backgroundImage?.alt === 'string'
          ? backgroundImage.alt
          : 'Hero Image background image'
      }
      sizes="100vw"
      className="object-cover object-center brightness-[0.7]"
      priority={true}
      quality={100}
    />
  )
}

export default function Hero(heroData: HeroType) {
  const {content, backgroundImage, linkText, slug, useSwiper, heros} = heroData

  console.log({heroData})

  return (
    <>
      {heroData && (
        <section className="hero w-full flex justify-center items-center relative">
          {/* Conditionally render a Swiper or a single hero */}
          {useSwiper && heros ? (
            <Swiper
              spaceBetween={50}
              slidesPerView={1}
              loop={true}
              pagination={{clickable: true}}
              modules={[Pagination]}
            >
              {heros.map((heroItem, index) => (
                <SwiperSlide
                  key={index}
                  className="flex justify-center items-center relative w-full h-full"
                >
                  {heroItem.backgroundImage && (
                    <HeroImage backgroundImage={heroItem.backgroundImage} />
                  )}
                  <HeroContent
                    content={heroItem.content}
                    linkText={heroItem.linkText}
                    slug={heroItem.slug}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <>
              {backgroundImage && <HeroImage backgroundImage={backgroundImage} />}
              <HeroContent content={content} linkText={linkText} slug={slug} />
            </>
          )}
        </section>
      )}
    </>
  )
}
