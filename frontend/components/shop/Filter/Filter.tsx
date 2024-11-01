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
import {Menu, MenuButton} from '@headlessui/react'
import {AdjustmentsHorizontalIcon} from '@heroicons/react/24/outline'
import {FilterItems} from '../../../types'
import {DualRangeSlider} from '../../global/DualRangeSlider'
import {BreakpointFilterProps, FilterItem} from './types'
import DesktopFilter from './DesktopFilter'
import MobileFilter from './MobileFilter'

interface FilterProps {
  filterItems?: FilterItems
}

const MAX_PRICE = 1000 // max for slider, will be replaced with £9999 for query

export default function Filter({filterItems}: FilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const brandColumn = filterItems?.brandFilter
  const finishColumn = filterItems?.finishFilter

  const filters: FilterItem[] = []

  const categoryColumn = getCategoryColumnByPath(pathname, filterItems)

  if (categoryColumn) {
    filters.push({
      id: 'category',
      caption: 'Category',
      type: 'radio',
      options: [
        {value: 'all-products', label: 'All Products'},
        ...categoryColumn.map((item) => ({
          value: item.link?.current,
          label: item.title,
        })),
      ].filter((item) => item.value),
    })
  }

  if (brandColumn && !pathname.startsWith('/brand')) {
    filters.push({
      id: 'brand',
      caption: 'Brand',
      type: 'checkbox',
      options: brandColumn
        .map((item) => ({
          value: item.link?.current,
          label: item.title,
        }))
        .filter((item) => item.value),
    })
  }

  if (finishColumn && !pathname.startsWith('/finish')) {
    filters.push({
      id: 'finish',
      caption: 'Finish',
      type: 'checkbox',
      options: finishColumn
        .map((item) => ({
          value: item.link?.current,
          label: item.title,
        }))
        .filter((item) => item.value),
    })
  }

  const handleRadioChange = (filterId: string, value: string) => {
    const newSearchParams = new URLSearchParams(window.location.search)

    if (value === 'all-products') {
      newSearchParams.delete(filterId)
    } else {
      newSearchParams.set(filterId, value)
    }

    const newSearchParamsString = newSearchParams.toString()

    if (!newSearchParamsString) {
      router.push(pathname)
    } else {
      // Update the URL while retaining other query parameters
      router.push(`${pathname}?${newSearchParamsString}`)
    }
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

  const [priceValues, setPriceValues] = useState([0, MAX_PRICE])

  const handlePriceChange = (values: Number[]) => {
    const [minPrice, maxPrice] = values
    const newSearchParams = new URLSearchParams(window.location.search)

    if (minPrice) {
      newSearchParams.set('minPrice', String(minPrice))
    } else {
      newSearchParams.delete('minPrice')
    }

    if (maxPrice) {
      if (maxPrice === MAX_PRICE) {
        newSearchParams.set('maxPrice', String(9999))
      } else {
        newSearchParams.set('maxPrice', String(maxPrice))
      }
    } else {
      newSearchParams.delete('maxPrice')
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

  const category = searchParams.get('category') || 'all-products'
  const brand = searchParams.get('brand') || null
  const finish = searchParams.get('finish') || null

  const priceFilter = (
    <DualRangeSlider
      label={(value) => {
        if (value === MAX_PRICE) {
          return '£1,000+'
        }
        return `£${value}`
      }}
      value={priceValues}
      onValueChange={setPriceValues}
      onValueCommit={handlePriceChange}
      min={0}
      max={MAX_PRICE}
      step={5}
    />
  )

  const props: BreakpointFilterProps = {
    searchParams,
    filters,
    priceFilter,
    handleRadioChange,
    handleCheckboxChange,
    category,
    brand,
    finish,
  }

  return (
    <div className="filter">
      <MobileFilter
        {...props}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <div className="text-center w-full ">
        <section aria-labelledby="filter-heading" className="border-gray-200 py-4">
          <h2 id="filter-heading" className="sr-only">
            Product filters
          </h2>

          <Menu as="div" className="flex items-center justify-between font-manrope pl-5">
            <MenuButton
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="text-sm text-gray-700 hover:text-gray-900 md:hidden flex gap-3 w-full"
            >
              <AdjustmentsHorizontalIcon className="w-6" />
              <span className="text-base">Filter products</span>
            </MenuButton>

            <DesktopFilter {...props} />
          </Menu>
        </section>
      </div>
    </div>
  )
}

function getCategoryColumnByPath(pathname: string, filterItems: FilterItems | undefined) {
  const firstSlug = pathname.split('/').filter(Boolean)[0] || ''
  const endSlug = pathname.split('/').filter(Boolean).pop() || ''

  const interiorLightingCategories = filterItems?.interiorLightingCategories
  const exteriorLightingCategories = filterItems?.exteriorLightingCategories

  let combinedArray: FilterItems['interiorLightingCategories'] = []

  if (interiorLightingCategories) {
    combinedArray = [...combinedArray, ...interiorLightingCategories]
  }

  if (exteriorLightingCategories) {
    combinedArray = [...combinedArray, ...exteriorLightingCategories]
  }

  const allCategories = combinedArray.length ? combinedArray : undefined

  if (firstSlug === 'shop' || firstSlug === 'brand' || firstSlug === 'finish') {
    return allCategories
  }

  switch (endSlug) {
    case 'interior-lighting':
      return interiorLightingCategories
    case 'exterior-lighting':
      return exteriorLightingCategories
    default:
      const parentCategory = allCategories?.find((category) => category?.link?.current === endSlug)

      return parentCategory?.subCategories
  }
}
