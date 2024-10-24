import {Disclosure, DisclosureButton, DisclosurePanel} from '@headlessui/react'
import {ChevronUpIcon, ChevronDownIcon} from '@heroicons/react/24/outline'
import {CustomPortableText} from '../shared/CustomPortableText'
import {PortableTextBlock} from '@portabletext/types'
import Link from 'next/link'

type DropdownsTableRow = {label: string; value: string | undefined}

type DropdownsProps = {
  data: {
    name: string
    items: string[] | {title?: string; value: Array<DropdownsTableRow>}[] | PortableTextBlock[][]
  }[]
}

export default function DropDowns({data}: DropdownsProps) {
  return (
    <div className="dropdowns divide-y divide-gray-200 border-b">
      {data.map((detail, index) => (
        <Disclosure key={index} as="div">
          <h3>
            <DisclosureButton className="group relative flex w-full items-center justify-between py-4 px-5 md:px-0 text-left">
              <span className="text-xl  text-black  first-letter:uppercase">{detail.name}</span>
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
          <DisclosurePanel
            transition
            className="prose prose-sm pb-6  transition  ease-out data-[closed]:opacity-0 duration-200"
          >
            <ul role="list" className="px-5">
              {detail.name === 'Categories'
                ? detail.items
                    .filter((item) => item !== 'All Products')
                    .map((collection, subIndex, filteredItems) => {
                      const isLastSubItem = subIndex === filteredItems.length - 1
                      return (
                        <li
                          key={subIndex}
                          className="inline transition-colors duration-300 hover:text-secondary"
                        >
                          <Link
                            target="_blank"
                            href={`/product-category/${formatCollectionValue(collection as string)}`}
                          >
                            {typeof collection === 'string' ? collection : ''}
                          </Link>
                          {!isLastSubItem && ', '}
                        </li>
                      )
                    })
                : detail.items.map((item, index) => {
                    if (typeof item === 'string') {
                      return <li key={index}>{item}</li>
                    }

                    if (typeof item === 'object' && 'value' in item && Array.isArray(item.value)) {
                      return (
                        <table className="w-full" key={index}>
                          <tbody>
                            {item.title ? (
                              <tr>
                                <th
                                  className="font-semibold pt-5 pb-3 text-left text-lg border-b border-gray-200"
                                  colSpan={2}
                                >
                                  {item.title}
                                </th>
                              </tr>
                            ) : null}
                            {item.value.map((subItem, subIndex: number) => {
                              if (!subItem.value) return null
                              return (
                                <tr key={subIndex} className="">
                                  <td className="font-medium pr-4 py-2 text-left w-2/3">
                                    {subItem.label}
                                  </td>
                                  <td className="py-2 text-left w-1/2 text-gray-500">
                                    {subItem.value || 'N/A'}
                                  </td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      )
                    }

                    return Array.isArray(item) ? (
                      <CustomPortableText
                        key={index}
                        value={item}
                        linkClasses="text-secondary underline"
                      />
                    ) : null
                  })}
            </ul>
          </DisclosurePanel>
        </Disclosure>
      ))}
    </div>
  )
}

const formatCollectionValue = (collection: string) => {
  return collection.toLowerCase().replace(/\s+/g, '-').trim()
}
