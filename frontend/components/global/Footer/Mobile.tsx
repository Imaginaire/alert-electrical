import {Footer} from '@/types'

import {Disclosure, DisclosureButton, DisclosurePanel} from '@headlessui/react'
import {ChevronUpIcon, ChevronDownIcon, MinusIcon, PlusIcon} from '@heroicons/react/24/outline'
import Link from 'next/link'

interface MobileProps {
  footer: Footer
}

export default function Mobile({footer}: MobileProps) {
  console.log('footer', footer)

  return (
    <footer>
      <div className="divide-y divide-white border-b bg-primary">
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
    </footer>
  )
}
