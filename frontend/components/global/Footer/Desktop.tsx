import {Footer} from '@/types'
import Link from 'next/link'
import Image from 'next/image'
import {LockClosedIcon} from '@heroicons/react/24/outline'
import urlForImage from '@/shared/utils/urlForImage'
import {CustomPortableText} from '@/components/shared/CustomPortableText'

interface DesktopProps {
  footer: Footer
}

export default function Desktop({footer}: DesktopProps) {
  return (
    <footer className="hidden xl:block bg-primary text-white px-7 py-[52px]">
      <div className="flex items-start justify-between">
        {footer.columns?.map((column, index) => {
          return (
            <div key={index} className=" ">
              <h3 className="text-xl uppercase">{column.header}</h3>
              <ul className="mt-7">
                {column.columnLinks?.map((link, index) => {
                  return (
                    <li key={index} className="py-1">
                      <Link href={link.slug || '/'}>
                        <span className="text-white first-letter:uppercase underline font-manrope">
                          {link.title}
                        </span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </div>

      <div className="flex items-center justify-center gap-16 my-14">
        <div className="flex items-center justify-center gap-7">
          {footer.payment?.paymentIcons &&
            footer.payment.paymentIcons.map((icon, index) => {
              const iconUrl = icon ? urlForImage(icon.icon)?.width(1920).url() : undefined
              return (
                <div key={index}>
                  <Image
                    src={iconUrl || ''}
                    alt=""
                    sizes="100vw"
                    width={50}
                    height={24}
                    className="object-cover object-center"
                    priority={true}
                    quality={100}
                  />
                </div>
              )
            })}
        </div>
        <div className="flex justify-center items-center gap-6">
          <LockClosedIcon className="text-white h-5 stroke-2" />
          <p className="text-white uppercase font-manrope text-center">
            {footer.payment?.paymentText}
          </p>
        </div>
      </div>

      <div className="font-manrope font-light my-10 mx-5 text-white text-center">
        {footer.copyright && <CustomPortableText value={footer.copyright} />}
      </div>
      {footer.accreditation && (
        <Link href={footer.accreditation.link || ''}>
          <span className="text-white font-manrope block text-center">
            {footer.accreditation.tagline}
          </span>
        </Link>
      )}
    </footer>
  )
}
