import {Disclosure, DisclosureButton, DisclosurePanel} from '@headlessui/react'
import {ChevronUpIcon, ChevronDownIcon} from '@heroicons/react/24/outline'
import {CustomPortableText} from '../shared/CustomPortableText'
import {PortableTextBlock} from '@portabletext/types'

type DropdownsTableRow = {label: string; value: string | undefined}

type DropdownsProps = {
  data: {
    name: string
    items: string[] | {title?: string; value: Array<DropdownsTableRow>}[] | PortableTextBlock[][]
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
              {detail.items.map((item, index) => {
                if (typeof item === 'string') {
                  return <li key={item}>{item}</li>
                }

                if (typeof item === 'object' && 'value' in item && Array.isArray(item.value)) {
                  return (
                    <table>
                      <tbody key={index}>
                        {item.title ? (
                          <tr>
                            <th className="font-semibold py-4 text-center" colSpan={2}>
                              {item.title}
                            </th>
                          </tr>
                        ) : null}
                        {item.value.map((subItem, subIndex: number) => {
                          if (!subItem.value) return null
                          return (
                            <tr key={subIndex}>
                              <td className="font-medium pr-4">{subItem.label}</td>
                              <td>{subItem.value || 'N/A'}</td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  )
                }

                return Array.isArray(item) ? (
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
