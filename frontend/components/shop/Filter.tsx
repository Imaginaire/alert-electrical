/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/

import {useState} from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  ListboxOption,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react'
import {XMarkIcon, AdjustmentsHorizontalIcon, CheckIcon} from '@heroicons/react/24/outline'
import {ChevronDownIcon} from '@heroicons/react/20/solid'

const filters = [
  {
    id: 'price',
    name: 'Price',
    options: [
      {value: 'tees', label: 'Tees'},
      {value: 'crewnecks', label: 'Crewnecks'},
      {value: 'hats', label: 'Hats'},
    ],
  },
  {
    id: 'category',
    name: 'Category',
    options: [
      {value: 'clothing-company', label: 'Clothing Company'},
      {value: 'fashion-inc', label: 'Fashion Inc.'},
      {value: 'shoes-n-more', label: "Shoes 'n More"},
    ],
  },
  {
    id: 'brand',
    name: 'Brand',
    options: [
      {value: 'white', label: 'White'},
      {value: 'black', label: 'Black'},
      {value: 'grey', label: 'Grey'},
    ],
  },
  {
    id: 'finish',
    name: 'Finish',
    options: [
      {value: 's', label: 'S'},
      {value: 'm', label: 'M'},
      {value: 'l', label: 'L'},
    ],
  },
]

export default function Filter() {
  const [open, setOpen] = useState(false)

  return (
    <div className="filter">
      {/* Mobile filter dialog */}
      <Dialog open={open} onClose={setOpen} className="relative z-40 md:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
          >
            <div className="flex items-center justify-between px-4">
              <h2 className="text-lg font-medium text-gray-900">Filters</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>

            {/* Filters */}
            <form className="mt-4">
              {filters.map((section) => (
                <Disclosure
                  key={section.name}
                  as="div"
                  className="border-t border-gray-200 px-4 py-6"
                >
                  <h3 className="-mx-2 -my-3 flow-root">
                    <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-sm text-gray-400">
                      <span className="font-medium text-gray-900">{section.name}</span>
                      <span className="ml-6 flex items-center">
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="h-5 w-5 rotate-0 transform group-data-[open]:-rotate-180"
                        />
                      </span>
                    </DisclosureButton>
                  </h3>
                  <DisclosurePanel className="pt-6">
                    <div className="space-y-6">
                      {section.options.map((option, optionIdx) => (
                        <div key={option.value} className="flex items-center">
                          <input
                            defaultValue={option.value}
                            id={`filter-mobile-${section.id}-${optionIdx}`}
                            name={`${section.id}[]`}
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                            className="ml-3 text-sm text-gray-500"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </DisclosurePanel>
                </Disclosure>
              ))}
            </form>
          </DialogPanel>
        </div>
      </Dialog>

      <div className="max-w-3xl px-4 text-center md:px-6 lg:max-w-7xl lg:px-8">
        <section aria-labelledby="filter-heading" className="border-gray-200 py-6">
          <h2 id="filter-heading" className="sr-only">
            Product filters
          </h2>

          <Menu as="div" className="flex items-center justify-between font-manrope">
            <MenuButton
              type="button"
              onClick={() => setOpen(true)}
              className="inline-block text-sm text-gray-700 hover:text-gray-900 md:hidden flex gap-3 w-full"
            >
              <AdjustmentsHorizontalIcon className="w-6" />
              <span>Filter products</span>
            </MenuButton>

            <PopoverGroup className="hidden md:flex md:items-baseline sm:space-x-14">
              <p>Filter products</p>
              {filters.map((section, sectionIdx) => (
                <Popover
                  key={section.name}
                  id={`desktop-menu-${sectionIdx}`}
                  className="relative inline-block text-left"
                >
                  <div>
                    <PopoverButton className="group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                      <span className="text-base font-light">{section.name}</span>
                      {/* {sectionIdx === 0 ? (
                        <span className="ml-1.5 rounded bg-gray-200 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-gray-700">
                          1
                        </span>
                      ) : null} */}
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      />
                    </PopoverButton>
                  </div>

                  <PopoverPanel
                    transition
                    className="absolute z-10 mt-2 origin-top-right rounded-md bg-white p-4 shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    <form className="space-y-4">
                      {section.options.map((option, optionIdx) => (
                        <div key={option.value} className="flex items-center">
                          <input
                            defaultValue={option.value}
                            id={`filter-${section.id}-${optionIdx}`}
                            name={`${section.id}[]`}
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            htmlFor={`filter-${section.id}-${optionIdx}`}
                            className="ml-3 whitespace-nowrap pr-6 text-sm font-medium text-gray-900"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </form>
                  </PopoverPanel>
                </Popover>
              ))}
            </PopoverGroup>
          </Menu>
        </section>
      </div>
    </div>
  )
}
