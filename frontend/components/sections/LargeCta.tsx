import urlForImage from '@/shared/utils/urlForImage'
import {LargeCta as LargeCtaType} from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import {CustomPortableText} from '../shared/CustomPortableText'

export default function LargeCta(largeCtaData: LargeCtaType) {
  const {header, description, backgroundImage, linkText, slug} = largeCtaData

  console.log('largeCtaData', largeCtaData)

  const backgroundImgUrl = backgroundImage
    ? urlForImage(backgroundImage)?.width(1920).url()
    : undefined

  return (
    <>
      {largeCtaData && (
        <section className="large-cta w-full flex justify-center relative">
          <Image
            src={backgroundImgUrl || ''}
            fill={true}
            alt="Large CTA background image"
            sizes="100vw"
            className="object-cover object-center"
            priority={true}
            quality={100}
          />
          <div className="large-cta-container z-10 max-w-[600px] my-32 mx-5 p-[30px] sm:p-11 bg-primary text-white text-center">
            {header && <h2 className="text-[32px] leading-9 mb-3 sm:mb-7">{header}</h2>}
            {description && (
              <div className="font-manrope font-light mb-3 sm:mb-7">
                <CustomPortableText value={description} paragraphClasses="[&:not(last)]:mb-4" />
              </div>
            )}
            <Link href={slug?.current || '/'}>
              <span className="text-xl underline uppercase">{linkText}</span>
            </Link>
          </div>
        </section>
      )}
    </>
  )
}
