// Swiper
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css'

// Types
import {Hero as HeroType} from '@/types'
import {Image as ImageType} from 'sanity'

// Components
import Image from 'next/image'
import Link from 'next/link'

// Utils
import urlForImage from '@/shared/utils/urlForImage'

// Hero Content component
function HeroContent({
  header,
  subheader,
  linkText,
  slug,
}: {
  header?: string
  subheader?: string
  linkText?: string
  slug?: {current?: string}
}) {
  return (
    <div className="hero-wrapper w-full h-full relative flex justify-center items-center">
      <div className="hero-container  z-10 max-w-[700px] mx-5 px-5 py-7 lg:py-9 lg:px-[78px] bg-primary text-white text-center">
        <h2 className="text-[32px] leading-9 mb-4 lg:mb-[8px] uppercase">{header}</h2>
        <p className="text-7xl lg:text-[128px] lg:text-[128px] mb-4 lg:mb-[8px]">{subheader}</p>
        <Link href={slug?.current || '/'}>
          <span className="text-[32px] underline uppercase">{linkText}</span>
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
      className="object-cover object-center"
      priority={true}
      quality={100}
    />
  )
}

export default function Hero(heroData: HeroType) {
  const {header, subheader, backgroundImage, linkText, slug, useSwiper, heros} = heroData

  return (
    <>
      {heroData && (
        <section className="hero w-full h-[calc(100vh-159px)] flex justify-center items-center relative">
          {/* Conditionally render a Swiper or a single hero */}
          {useSwiper && heros ? (
            <Swiper
              spaceBetween={50}
              slidesPerView={1}
              className="h-full "
              loop={true}
              pagination={{clickable: true}}
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
                    header={heroItem.header}
                    subheader={heroItem.subheader}
                    linkText={heroItem.linkText}
                    slug={heroItem.slug}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <>
              {backgroundImage && <HeroImage backgroundImage={backgroundImage} />}
              <HeroContent header={header} subheader={subheader} linkText={linkText} slug={slug} />
            </>
          )}
        </section>
      )}
    </>
  )
}
