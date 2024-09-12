import {FooterProps} from '@/types'
import {Disclosure, DisclosureButton, DisclosurePanel} from '@headlessui/react'
import {ChevronUpIcon, ChevronDownIcon} from '@heroicons/react/24/outline'
import Link from 'next/link'
import {CustomPortableText} from '@/components/shared/CustomPortableText'
import ColumnItems from './ColumnItems'
import Payment from './Payment'
import GetInTouch from './GetInTouch'

export default function Mobile({footer, companyInfo, socialMedia}: FooterProps) {
  return (
    <footer className="xl:hidden bg-primary pb-10">
      <div className="divide-y divide-white border-b ">
        {footer?.columns?.map((column, index) => (
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
              {column.header === 'Get in Touch' ? (
                <GetInTouch companyInfo={companyInfo} socialMedia={socialMedia} />
              ) : (
                <ul role="list" className="px-5">
                  <ColumnItems column={column} />
                </ul>
              )}
            </DisclosurePanel>
          </Disclosure>
        ))}
      </div>

      {footer?.payment && <Payment payment={footer.payment} />}

      <div className="font-manrope font-light my-10 mx-5 text-white text-center">
        {footer?.copyright && <CustomPortableText value={footer.copyright} />}
      </div>
      {footer?.accreditation && (
        <Link href={footer.accreditation.link || ''}>
          <span className="text-white font-manrope block text-center">
            {footer.accreditation.tagline}
          </span>
        </Link>
      )}
    </footer>
  )
}
