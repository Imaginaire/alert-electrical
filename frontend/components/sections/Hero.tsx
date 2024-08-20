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

  //TODO: adjust the location of the box to be in the centre of the hero section

  return (
    <>
      {heroData && (
        <section className="hero w-full flex justify-center space-y-20 items-end pt-24 h-screen relative">
          <Image
            src={backgroundImgUrl ? backgroundImgUrl : ''}
            fill={true}
            alt="Hero Image background image"
            sizes="100vw"
            className="object-cover object-center"
            priority={true}
            quality={100}
          />
          <div className="hero-container absolute top-[20%] text-white bg-primary flex flex-col items-center justify-center py-8 px-6 md:py-10 md:px-12 max-w-[600px] mx-4 md:m-0">
            <h2 className="text-sm animation-delay-300 flex items-center">
              <span className="text-3xl text-center">{header}</span>
            </h2>
            <h1 className="text-7xl lg:text-[128px] m-5">{subheader}</h1>
            <Link href={slug?.current || '/'}>
              <span className="text-3xl underline">{linkText}</span>
            </Link>
          </div>
        </section>
      )}
    </>
  )
}
