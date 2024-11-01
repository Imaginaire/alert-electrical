import {
  Menu,
  MenuButton,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react'
import {AdjustmentsHorizontalIcon, ChevronDownIcon} from '@heroicons/react/24/outline'
import {BreakpointFilterProps} from './types'

export default function DesktopFilter({
  searchParams,
  filters,
  priceFilter,
  handleRadioChange,
  handleCheckboxChange,
  category,
  brand,
  finish,
}: BreakpointFilterProps) {
  return (
    <PopoverGroup className="hidden md:flex md:items-baseline sm:space-x-14 md:space-x-8 lg:space-x-14">
      <p className="text-base">Filter products</p>
      <Popover className="relative inline-block text-left">
        <div>
          <PopoverButton className="group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
            <span className="text-base font-light outline-none border-2 border-transparent focus:border-primary">
              Price
            </span>
            {searchParams.get('minPrice') || searchParams.get('maxPrice') ? (
              <span className="ml-1.5 rounded bg-gray-200 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-gray-700">
                1
              </span>
            ) : null}
            <ChevronDownIcon
              aria-hidden="true"
              className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
            />
          </PopoverButton>
        </div>

        <PopoverPanel
          transition
          className="absolute z-10 mt-2 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in w-[500px] p-10"
        >
          <form className="space-y-4">{priceFilter}</form>
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
              <span className="text-base font-light outline-none border-2 border-transparent focus:border-primary">
                {filter.caption}
              </span>
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
              {filter.options.map((option, optionIdx) => {
                return (
                  <div key={option.value ?? option.label} className="flex items-center">
                    <input
                      checked={
                        searchParams.get(filter.id) === option.value ||
                        searchParams.get(filter.id)?.split(',').includes(option.value) ||
                        (searchParams.get('category') === null && option.value === 'all-products')
                          ? true
                          : false
                      }
                      id={`filter-${filter.id}-${optionIdx}`}
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
                      htmlFor={`filter-${filter.id}-${optionIdx}`}
                      className="ml-3 whitespace-nowrap pr-6 text-sm font-medium text-gray-900"
                    >
                      {option.label}
                    </label>
                  </div>
                )
              })}
            </form>
          </PopoverPanel>
        </Popover>
      ))}
    </PopoverGroup>
  )
}
