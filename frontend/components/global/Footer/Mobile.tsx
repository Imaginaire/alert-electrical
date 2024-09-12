import {Footer} from '@/types'

import {Disclosure, DisclosureButton, DisclosurePanel} from '@headlessui/react'
import {ChevronUpIcon, ChevronDownIcon, LockClosedIcon} from '@heroicons/react/24/outline'
import Link from 'next/link'
import Image from 'next/image'
import urlForImage from '@/shared/utils/urlForImage'
import {CustomPortableText} from '@/components/shared/CustomPortableText'

interface MobileProps {
  footer: Footer
}

export default function Mobile({footer}: MobileProps) {
  console.log('footer', footer)

  return (
    <footer className="bg-primary pb-10">
      <div className="divide-y divide-white border-b ">
        {footer.columns?.map((column, index) => (
          <Disclosure key={index} as="div">
            <h3>
              <DisclosureButton className="group relative flex w-full items-center justify-between py-4 px-5 text-left">
                <span className="text-xl text-white uppercase">{column.header}</span>
                <span className="ml-6 flex items-center">
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="block h-6 w-6 text-white group-hover:text-gray-500 group-data-[open]:hidden"
                  />
                  <ChevronUpIcon
                    aria-hidden="true"
                    className="hidden h-6 w-6 text-gray-500 group-hover:text-gray-500 group-data-[open]:block"
                  />
                </span>
              </DisclosureButton>
            </h3>
            <DisclosurePanel className="prose prose-sm pb-6">
              <ul role="list" className="px-5">
                {column.columnLinks?.map((link, index) => (
                  <li key={index} className="py-1">
                    <Link href={link.slug || '/'}>
                      <span className="text-white first-letter:uppercase underline font-manrope">
                        {link.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </DisclosurePanel>
          </Disclosure>
        ))}
      </div>
      <div>
        <div className="flex items-center justify-center gap-7 mt-10 mb-5 mx-5">
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
