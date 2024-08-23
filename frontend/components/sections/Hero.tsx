import urlForImage from '@/shared/utils/urlForImage'
import {Hero as HeroType} from '@/types'
import Image from 'next/image'
import Link from 'next/link'

export default function Hero(heroData: HeroType) {
  const {header, subheader, backgroundImage, linkText, slug} = heroData

  console.log(heroData)

  const backgroundImgUrl = backgroundImage
    ? urlForImage(backgroundImage)?.width(1920).url()
    : undefined

  return (
    <>
      {heroData && (
        <section className="hero w-full h-[calc(100vh-159px)] flex justify-center items-center relative">
          <Image
            src={backgroundImgUrl ? backgroundImgUrl : ''}
            fill={true}
            alt="Hero Image background image"
            sizes="100vw"
            className="object-cover object-center"
            priority={true}
            quality={100}
          />
          <div className="hero-container z-10 max-w-[620px] mx-5 px-5 py-7 lg:py-9 lg:px-[78px]  bg-primary text-white text-center">
            <h2 className="text-[32px] leading-9 mb-4 lg:mb-[8px] uppercase">{header}</h2>
            <p className="text-7xl lg:text-[128px] lg:text-[128px] mb-4 lg:mb-[8px]">{subheader}</p>
            <Link href={slug?.current || '/'}>
              <span className="text-[32px] underline uppercase">{linkText}</span>
            </Link>
          </div>
        </section>
      )}
    </>
  )
}
