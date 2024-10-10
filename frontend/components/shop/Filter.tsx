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
import {useRouter, useSearchParams, usePathname} from 'next/navigation'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Field,
  Input,
  Label,
} from '@headlessui/react'
import {XMarkIcon, AdjustmentsHorizontalIcon} from '@heroicons/react/24/outline'
import {ChevronDownIcon} from '@heroicons/react/20/solid'
import {FilterItems} from '../../types'

interface FilterProps {
  filterItems?: FilterItems
}

// TODO: hide brand filter if on brand page
// and hide category filter if on collection page
// reset price filter?

//   const isCollection = resolvedUrl?.startsWith('/collection')
// resolvedUrl?.startsWith('/brand') ||
// resolvedUrl?.startsWith('/finish') ||
// resolvedUrl?.startsWith('/range')
// pathName

export default function Filter({filterItems}: FilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const filtersData = filterItems
  const categoryColumn = filtersData?.categoryFilter
  const brandColumn = filtersData?.brandFilter
  const finishColumn = filtersData?.finishFilter

  const filters = []

  if (categoryColumn) {
    filters.push({
      id: 'category',
      caption: 'Category',
      options: categoryColumn
        .map((item) => ({
          value: item.link?.current,
          label: item.title,
        }))
        .filter((item) => item.value),
    })
  }

  if (brandColumn) {
    filters.push({
      id: 'brand',
      caption: 'Brand',
      options: brandColumn
        .map((item) => ({
          value: item.link?.current,
          label: item.title,
        }))
        .filter((item) => item.value),
    })
  }

  if (finishColumn) {
    filters.push({
      id: 'finish',
      caption: 'Finish',
      options: finishColumn
        .map((item) => ({
          value: item.link?.current,
          label: item.title,
        }))
        .filter((item) => item.value),
    })
  }

  const handleCheckboxChange = (filterId: string, value: string, checked: boolean) => {
    const currentFilterValue = searchParams.get(filterId)
    const newSearchParams = new URLSearchParams(window.location.search)

    if (checked) {
      if (!currentFilterValue) {
        // If the filterId is not in the URL, add it
        newSearchParams.set(filterId, value)
      } else {
        // If filterId exists, add the new value while retaining the existing ones
        const valuesArray = currentFilterValue.split(',')
        if (!valuesArray.includes(value)) {
          valuesArray.push(value)
        }
        newSearchParams.set(filterId, valuesArray.join(','))
      }
    } else {
      // If the filter is being unchecked
      if (currentFilterValue) {
        const valuesArray = currentFilterValue.split(',').filter((item) => item !== value)
        if (valuesArray.length) {
          newSearchParams.set(filterId, valuesArray.join(','))
        } else {
          newSearchParams.delete(filterId) // Remove filterId if no values remain
        }
      }
    }

    const newSearchParamsString = newSearchParams.toString()

    if (!newSearchParamsString) {
      router.push(pathname)
    } else {
      // Update the URL while retaining other query parameters
      router.push(`${pathname}?${newSearchParamsString}`)
    }
  }

  const handlePriceChange = (filterId: string, value: string) => {
    const currentFilterValue = searchParams.get(filterId)
    const newSearchParams = new URLSearchParams(window.location.search)

    if (value) {
      newSearchParams.set(filterId, value)
    } else if (currentFilterValue) {
      newSearchParams.delete(filterId)
    }

    const newSearchParamsString = newSearchParams.toString()

    if (!newSearchParamsString) {
      router.push(pathname)
    } else {
      // Update the URL while retaining other query parameters
      router.push(`${pathname}?${newSearchParamsString}`)
    }
  }

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="filter">
      {/* Mobile filter dialog */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="relative z-40 md:hidden">
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
                onClick={() => setMobileMenuOpen(false)}
                className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>

            {/* Filters */}
            <form className="mt-4">
              <Disclosure key="price" as="div" className="border-t border-gray-200 px-4 py-6">
                <h3 className="-mx-2 -my-3 flow-root">
                  <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-sm text-gray-400">
                    <span className="font-medium text-gray-900">Price</span>
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
                    <Field>
                      <Label>Min</Label>
                      <Input
                        name="minPrice"
                        type="number"
                        min={0}
                        max={searchParams.get('maxPrice') || 999999}
                        step={10}
                        onChange={(e) => handlePriceChange('minPrice', e.target.value)}
                        value={searchParams.get('minPrice') || undefined}
                      />
                    </Field>
                    <Field>
                      <Label>Max</Label>
                      <Input
                        name="maxPrice"
                        type="number"
                        min={searchParams.get('minPrice') || 0}
                        max={999999}
                        step={10}
                        onChange={(e) => handlePriceChange('maxPrice', e.target.value)}
                        value={searchParams.get('maxPrice') || undefined}
                      />
                    </Field>
                  </div>
                </DisclosurePanel>
              </Disclosure>
              {filters.map((filter) => (
                <Disclosure key={filter.id} as="div" className="border-t border-gray-200 px-4 py-6">
                  <h3 className="-mx-2 -my-3 flow-root">
                    <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-sm text-gray-400">
                      <span className="font-medium text-gray-900">{filter.caption}</span>
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
                      {filter.options.map((option, optionIdx) => {
                        return (
                          <div key={option.value ?? option.label} className="flex items-center">
                            <input
                              defaultValue={option.value}
                              id={`filter-mobile-${filter.id}-${optionIdx}`}
                              name={`${filter.id}[]`}
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor={`filter-mobile-${filter.id}-${optionIdx}`}
                              className="ml-3 text-sm text-gray-500"
                            >
                              {option.label}
                            </label>
                          </div>
                        )
                      })}
                    </div>
                  </DisclosurePanel>
                </Disclosure>
              ))}
            </form>
          </DialogPanel>
        </div>
      </Dialog>

      <div className="text-center border-b-2 border-gray-200   w-full ">
        <section aria-labelledby="filter-heading" className="border-gray-200 py-4">
          <h2 id="filter-heading" className="sr-only">
            Product filters
          </h2>

          <Menu as="div" className="flex items-center justify-between font-manrope px-5">
            <MenuButton
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="inline-block text-sm text-gray-700 hover:text-gray-900 md:hidden flex gap-3 w-full"
            >
              <AdjustmentsHorizontalIcon className="w-6" />
              <span>Filter products</span>
            </MenuButton>

            <PopoverGroup className="hidden md:flex md:items-baseline sm:space-x-14">
              <p>Filter products</p>
              <Popover className="relative inline-block text-left">
                <div>
                  <PopoverButton className="group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    <span className="text-base font-light">Price</span>
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
                    <Field>
                      <Label>Min</Label>
                      <Input
                        name="minPrice"
                        type="number"
                        min={0}
                        max={searchParams.get('maxPrice') || 999999}
                        step={10}
                        onChange={(e) => handlePriceChange('minPrice', e.target.value)}
                        value={searchParams.get('minPrice') || undefined}
                      />
                    </Field>
                    <Field>
                      <Label>Max</Label>
                      <Input
                        name="maxPrice"
                        type="number"
                        min={searchParams.get('minPrice') || 0}
                        max={999999}
                        step={10}
                        onChange={(e) => handlePriceChange('maxPrice', e.target.value)}
                        value={searchParams.get('maxPrice') || undefined}
                      />
                    </Field>
                  </form>
                </PopoverPanel>
              </Popover>
              {filters.map((filter, filterIdx) => (
                <Popover
                  key={filter.id}
                  id={`desktop-menu-${filterIdx}`}
                  className="relative inline-block text-left"
                >
                  <div>
                    <PopoverButton className="group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                      <span className="text-base font-light">{filter.caption}</span>
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
                      {filter.options.map((option, optionIdx) => (
                        <div key={option.value ?? option.label} className="flex items-center">
                          <input
                            checked={
                              searchParams.get(filter.id) === option.value ||
                              searchParams.get(filter.id)?.split(',').includes(option.value) ||
                              false
                            }
                            id={`filter-${filter.id}-${optionIdx}`}
                            name={`${filter.id}[]`}
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            onChange={(e) => {
                              const checked = e.target.checked
                              handleCheckboxChange(filter.id, option.value, checked)
                            }}
                          />
                          <label
                            htmlFor={`filter-${filter.id}-${optionIdx}`}
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
