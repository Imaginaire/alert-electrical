import {PortableText, PortableTextComponents} from '@portabletext/react'
import type {PortableTextBlock} from '@portabletext/types'
import ImageBox from './ImageBox'
import urlForImage from '@/shared/utils/urlForImage'
import Link from 'next/link'
import type {Image} from 'sanity'
import {Button} from './Button'
import prepareHref from '@/shared/utils/prepareHref'

export function CustomPortableText({
  paragraphClasses,
  paragraphAltClasses,
  headerClasses,
  h1Classes,
  h2Classes,
  h3Classes,
  h4Classes,
  subheaderClasses,
  linkClasses,
  listItemClasses,
  listClasses,
  quoteClasses,
  value,
}: {
  paragraphClasses?: string
  paragraphAltClasses?: string
  headerClasses?: string
  h1Classes?: string
  h2Classes?: string
  h3Classes?: string
  h4Classes?: string
  subheaderClasses?: string
  linkClasses?: string
  listItemClasses?: string
  listClasses?: string
  quoteClasses?: string
  value: PortableTextBlock[]
}) {
  const components: PortableTextComponents = {
    block: {
      h1: ({children}) => <h1 className={headerClasses || h1Classes}>{children}</h1>,
      h2: ({children}) => <h2 className={headerClasses || h2Classes}>{children}</h2>,
      h3: ({children}) => <h3 className={subheaderClasses || h3Classes}>{children}</h3>,
      h4: ({children}) => <h4 className={subheaderClasses || h4Classes}>{children}</h4>,
      normal: ({children}) => <p className={paragraphClasses}>{children}</p>,
      normalAlt: ({children}) => <p className={paragraphAltClasses}>{children}</p>,
      blockquote: ({children}) => <p className={`blockquote ${quoteClasses}`}>{children}</p>,
    },
    marks: {
      link: ({children, value}) => {
        if (value?.useButton) {
          return (
            <Button
              text={children}
              link={value?.href || '/'}
              fullWidth={false}
              classes="my-6"
              position={value?.buttonPosition}
            />
          )
        } else {
          return (
            <a
              className={` transition hover:opacity-50 ${linkClasses}`}
              href={value?.href || '/'}
              rel="noreferrer noopener"
              target={`${value?.blank ? '_blank' : '_self'}`}
            >
              {children}
            </a>
          )
        }
      },
      internalLink: ({children, value}) => {
        if (value?.useButton) {
          return (
            <Button
              text={children}
              link={value?.slug?.current || '/'}
              fullWidth={false}
              classes="my-6"
              position={value?.buttonPosition}
            />
          )
        } else {
          return (
            <Link
              className={` transition hover:opacity-50 ${linkClasses}`}
              href={value?.slug?.current ? prepareHref(value.slug.current) : '/'}
            >
              {children}
            </Link>
          )
        }
      },
      alignCenter: ({children}) => <span className="text-center block">{children}</span>,
    },
    list: ({children}) => <ul className={` ${listClasses}`}>{children}</ul>,
    listItem: ({children}) => <li className={` ${listItemClasses}`}>{children}</li>,

    types: {
      image: ({value}: {value: Image & {alt?: string; caption?: string}}) => {
        return (
          <div className="my-6 space-y-2">
            <ImageBox image={value} alt={value.alt} classesWrapper="relative aspect-[16/9]" />
            {value?.caption && (
              <div className="font-sans text-sm text-gray-600">{value.caption}</div>
            )}
          </div>
        )
      },
      imageGallery: ({value}: {value: {gridRows?: number; images: Image[]}}) => {
        const {images, gridRows} = value || {}
        const defaultGridRows = gridRows || 2

        return (
          <div
            className="gap-6 my-6"
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${defaultGridRows}, 1fr)`,
            }}
          >
            {images?.map((image, index) => {
              return <img key={index} src={urlForImage(image)?.url()} alt="gallery image" />
            })}
          </div>
        )
      },
    },
  }

  return <PortableText components={components} value={value} />
}
