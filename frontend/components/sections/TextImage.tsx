import React from 'react'
import Image from 'next/image'
import urlForImage from '@/shared/utils/urlForImage'
import {TextImage as TextImageType} from '@/types'
import {CustomPortableText} from '../shared/CustomPortableText'
import Availability from '../shared/Availability'

export default function TextImage(textImageData: TextImageType) {
  const {header, description, images, settings} = textImageData

  return (
    <>
      {textImageData && (
        <section className="text-image flex justify-center md:min-h-[465px] py-7 px-5 md:px-7">
          <div className="flex flex-col gap-10 lg:flex-row max-w-screen-2xl">
            <div className="flex-1 w-full justify-center max-w-screen-2xl lg:py-3">
              <h2 className="text-[36px] font-light leading-9 mb-7 uppercase">{header}</h2>
              {description && (
                <div className="font-manrope font-light space-y-6">
                  <CustomPortableText value={description} />
                </div>
              )}
              {settings?.companyInfo?.availability && (
                <Availability availability={settings?.companyInfo?.availability} classes="mt-5" />
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
