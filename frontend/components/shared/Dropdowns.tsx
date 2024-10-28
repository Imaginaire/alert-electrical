import {Disclosure, DisclosureButton, DisclosurePanel} from '@headlessui/react'
import {ChevronUpIcon, ChevronDownIcon} from '@heroicons/react/24/outline'
import {CustomPortableText} from '../shared/CustomPortableText'
import {PortableTextBlock} from '@portabletext/types'
import Link from 'next/link'
import {buildCollectionUrl} from '../../lib/shopify.helpers'
import {useEffect} from 'react'
import {FilterItems, SettingsPayload} from '@/types'

type DropdownsTableRow = {label: string; value: string | undefined}

type DropdownsProps = {
  data: {
    name: string
    items: string[] | {title?: string; value: Array<DropdownsTableRow>}[] | PortableTextBlock[][]
  }[]
  settings: SettingsPayload | undefined
  filterItems?: FilterItems
}

export default function DropDowns({data, settings, filterItems}: DropdownsProps) {
  useEffect(() => {
    const test = async () =>
      await buildCollectionUrl({
        handle: 'floor-lamps',
      })
    test().then((result) => console.log({result}))
  }, [])

  function getCollectionUrl(title: string) {
    const categories = [
      {name: 'interior-lighting', items: filterItems?.interiorLightingCategories},
      {name: 'exterior-lighting', items: filterItems?.exteriorLightingCategories},
    ]

    for (const categoryGroup of categories) {
      for (const category of categoryGroup?.items || []) {
        // Check if the title matches the main category slug
        if (category.link.current === title) {
          return `${categoryGroup.name}/${category.link.current}/`
        }

        // Search through the subCategories if available
        if (category.subCategories) {
          for (const subCategory of category.subCategories) {
            if (subCategory.link.current === title) {
              return `${categoryGroup.name}/${category.link.current}/${subCategory.link.current}/`
            }
          }
        }
      }
    }

    // If no match is found, return an empty string or a default path
    return title
  }

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
                    .map((item, subIndex, filteredItems) => {
                      const isLastSubItem = subIndex === filteredItems.length - 1

                      const collectionUrl =
                        typeof item === 'string' ? getCollectionUrl(formatAsHandle(item)) : ''

                      return (
                        <li
                          key={subIndex}
                          className="inline transition-colors duration-300 hover:text-secondary"
                        >
                          <Link target="_blank" href={`/product-category/${collectionUrl}`}>
                            {typeof item === 'string' ? item : ''}
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

const formatAsHandle = (title: string) => {
  return title.toLowerCase().replace(/\s+/g, '-').trim()
}
