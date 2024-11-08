import React from 'react'
import Image from 'next/image'
import urlForImage from '@/shared/utils/urlForImage'
import {TextImage as TextImageType} from '@/types'
import {CustomPortableText} from '../shared/CustomPortableText'

export default function TextImage(textImageData: TextImageType) {
  const {content, imagePosition, images} = textImageData

  return (
    <>
      {textImageData && (
        <section className="text-image flex justify-center md:min-h-[465px] py-7 px-5 md:px-7">
          <div
            className={`flex flex-col gap-10 lg:flex-row ${imagePosition === 'left' ? 'lg:flex-row-reverse' : ''} max-w-screen-2xl`}
          >
            <div className="flex-1 w-full max-w-screen-2xl flex items-center">
              {content && (
                <div className="font-manrope font-light space-y-6">
                  <CustomPortableText value={content} subheaderClasses="text-2xl" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row gap-2 md:gap-4 h-full">
                {images &&
                  images.map((image, index) => (
                    <React.Fragment key={index}>
                      <div className="lg:hidden relative">
                        <Image
                          src={urlForImage(image).width(1920).url() || ''}
                          alt={`Image ${index}`}
                          sizes="100vw"
                          width={0}
                          height={0}
                          className="w-full"
                        />
                      </div>

                      <div className="hidden lg:block relative flex-1 h-full">
                        <Image
                          src={urlForImage(image).width(1920).url() || ''}
                          alt={`Image ${index}`}
                          sizes="100vw"
                          className="object-cover"
                          fill
                        />
                      </div>
                    </React.Fragment>
                  ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
