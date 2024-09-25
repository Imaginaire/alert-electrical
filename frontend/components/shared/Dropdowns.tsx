import {Disclosure, DisclosureButton, DisclosurePanel} from '@headlessui/react'
import {ChevronUpIcon, ChevronDownIcon} from '@heroicons/react/24/outline'
import {CustomPortableText} from '../shared/CustomPortableText'

interface DropdownsProps {
  data: {
    name: string
    items: (string | any)[]
  }[]
}

export default function DropDowns({data}: DropdownsProps) {
  return (
    <div className="divide-y divide-gray-200 border-b">
      {data.map((detail) => (
        <Disclosure key={detail.name} as="div">
          <h3>
            <DisclosureButton className="group relative flex w-full items-center justify-between py-4 px-5 text-left">
              <span className="text-xl  text-black group-data-[open]:text-secondary first-letter:uppercase">
                {detail.name}
              </span>
              <span className="ml-6 flex items-center">
                <ChevronDownIcon
                  aria-hidden="true"
                  className="block h-6 w-6 text-primary group-hover:text-gray-500 group-data-[open]:hidden"
                />
                <ChevronUpIcon
                  aria-hidden="true"
                  className="hidden h-6 w-6 text-secondary group-hover:text-secondary group-data-[open]:block"
                />
              </span>
            </DisclosureButton>
          </h3>
          <DisclosurePanel className="prose prose-sm pb-6 font-manrope">
            <ul role="list" className="px-5">
              {detail.items.map((item) => {
                if (typeof item === 'string') {
                  return <li key={item}>{item}</li>
                }
                return item ? (
                  <CustomPortableText value={item} linkClasses="text-secondary underline" />
                ) : null
              })}
            </ul>
          </DisclosurePanel>
        </Disclosure>
      ))}
    </div>
  )
}
