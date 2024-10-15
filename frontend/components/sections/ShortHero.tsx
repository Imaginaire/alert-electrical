import {ShortHero as ShortHeroType} from '@/types'
import {CustomPortableText} from '../shared/CustomPortableText'

export default function ShortHero(shortHeroData: ShortHeroType) {
  const {header, description, shopifyData = false} = shortHeroData

  console.log(Array.isArray(description))

  return (
    <>
      {shortHeroData && (
        <section className="short-hero flex justify-center py-7 px-5 sm:py-11 bg-primary text-white text-center">
          <div className="max-w-[1000px]">
            <h2 className="text-[36px] leading-9 mb-7 uppercase">{header}</h2>
            {description &&
              (shopifyData ? (
                typeof description === 'string' ? (
                  <p>{description}</p>
                ) : null
              ) : (
                <div className="font-manrope font-light">
                  {Array.isArray(description) ? (
                    <CustomPortableText value={description} headerClasses="text-xl mb-4" />
                  ) : null}
                </div>
              ))}
          </div>
        </section>
      )}
    </>
  )
}
