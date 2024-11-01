import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'
import {XMarkIcon, ChevronDownIcon, AdjustmentsHorizontalIcon} from '@heroicons/react/24/outline'
import {Dispatch, SetStateAction, useState} from 'react'
import {BreakpointFilterProps} from './types'

export default function MobileFilter({
  searchParams,
  filters,
  priceFilter,
  handleRadioChange,
  handleCheckboxChange,
  category,
  brand,
  finish,
  mobileMenuOpen,
  setMobileMenuOpen,
}: BreakpointFilterProps & {
  mobileMenuOpen: boolean
  setMobileMenuOpen: Dispatch<SetStateAction<boolean>>
}) {
  return (
    <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="relative z-40 md:hidden">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0 "
      />

      <div className="fixed inset-0 z-40 flex">
        <DialogPanel
          transition
          className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full "
        >
          <div className="flex items-center justify-between px-4">
            <h2 className="text-xl font-medium text-primary font-manrope">Filters</h2>
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
              <h3 className="-mx-2 -my-3 flow-root font-manrope">
                <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-sm text-gray-400">
                  <div>
                    <span className="text-base text-primary font-manrope">Price</span>
                    {searchParams.get('minPrice') || searchParams.get('maxPrice') ? (
                      <span className="ml-1.5 rounded bg-gray-200 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-gray-700">
                        1
                      </span>
                    ) : null}
                  </div>
                  <span className="ml-6 flex items-center">
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="h-5 w-5 rotate-0 transform group-data-[open]:-rotate-180"
                    />
                  </span>
                </DisclosureButton>
              </h3>
              <DisclosurePanel className="pt-6 mb-6">{priceFilter}</DisclosurePanel>
            </Disclosure>
            {filters.map((filter) => (
              <Disclosure key={filter.id} as="div" className="border-t border-gray-200 px-4 py-6">
                <h3 className="-mx-2 -my-3 flow-root">
                  <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-sm text-gray-400">
                    <div>
                      <span className="text-base text-primary">{filter.caption}</span>
                      {filter.id === 'category' && category !== 'all-products' ? (
                        <span className="ml-1.5 rounded bg-gray-200 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-gray-700">
                          1
                        </span>
                      ) : filter.id === 'brand' && brand ? (
                        <span className="ml-1.5 rounded bg-gray-200 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-gray-700">
                          {brand.split(',').length}
                        </span>
                      ) : filter.id === 'finish' && finish ? (
                        <span className="ml-1.5 rounded bg-gray-200 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-gray-700">
                          {finish.split(',').length}
                        </span>
                      ) : null}
                    </div>
                    <span className="ml-6 flex items-center">
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="h-5 w-5 rotate-0 transform group-data-[open]:-rotate-180"
                      />
                    </span>
                  </DisclosureButton>
                </h3>
                <DisclosurePanel className="pt-6">
                  <div className="space-y-2">
                    {filter.options.map((option, optionIdx) => {
                      return (
                        <div key={option.value ?? option.label} className="flex items-center">
                          <input
                            checked={
                              searchParams.get(filter.id) === option.value ||
                              searchParams.get(filter.id)?.split(',').includes(option.value) ||
                              (searchParams.get('category') === null &&
                                option.value === 'all-products')
                                ? true
                                : false
                            }
                            id={`filter-mobile-${filter.id}-${optionIdx}`}
                            name={filter.id}
                            type={filter.type}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            onChange={(e) => {
                              const checked = e.target.checked
                              if (filter.type === 'radio') {
                                handleRadioChange(filter.id, option.value)
                              } else {
                                handleCheckboxChange(filter.id, option.value, checked)
                              }
                            }}
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
  )
}
