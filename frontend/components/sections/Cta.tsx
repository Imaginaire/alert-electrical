// import urlForImage from '@/shared/utils/urlForImage'
import {Cta as CtaType} from '@/types'
import Link from 'next/link'
import {CustomPortableText} from '../shared/CustomPortableText'

export default function Cta(ctaData: CtaType) {
  const {content, linkText, slug} = ctaData

  return (
    <>
      {ctaData && (
        <section className="large-cta m-auto max-w-[1280px]">
          <div className="large-cta-container z-10 my-32 mx-5 p-[30px] sm:p-11 bg-secondary-grey flex flex-col items-center text-center lg:text-left lg:flex-row lg:justify-between gap-5">
            {/* {header && <h2 className="text-[32px] leading-9 mb-3 sm:mb-7">{header}</h2>} */}
            {content && (
              <div className="font-manrope font-light flex-1">
                <CustomPortableText
                  value={content}
                  headerClasses="text-3xl mb-4"
                  paragraphClasses="[&:not(last)]:mb-4"
                />
              </div>
            )}
            <Link
              href={slug?.current || '/'}
              className="bg-secondary hover:bg-secondary-green-hover  text-white py-3 px-6 rounded-md flex-2"
            >
              <span className="text-xl uppercase font-bold">{linkText}</span>
            </Link>
          </div>
        </section>
      )}
    </>
  )
}
