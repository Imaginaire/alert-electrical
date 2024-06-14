import {Store} from '@/types/productType'
import {useState, useEffect} from 'react'

interface VariantOption {
  [key: string]: string[] | string
}

export default function ProductVariantSelector({
  product,
  onVariantChange,
}: {
  product: Store
  onVariantChange: (variant: any) => void
}) {
  // state for selected options and available options
  const [selectedOptions, setSelectedOptions] = useState<VariantOption>({})
  const [availableOptions, setAvailableOptions] = useState<VariantOption>({})

  // initalise available options based on product options
  useEffect(() => {
    const initialAvailableOptions: VariantOption = {}

    product?.options?.forEach((option) => {
      if (option?.name) {
        initialAvailableOptions[option?.name] = option.values ?? []
      }
    })

    setAvailableOptions(initialAvailableOptions)
  }, [product])

  // update available options based on selected options
  useEffect(() => {
    const newAvailableOptions: VariantOption = {}

    product?.options?.forEach((option) => {
      if (!option.name) return

      // Create a copy of the selected options excluding the current option
      const otherSelectedOptions = {...selectedOptions}
      if (option?.name) delete otherSelectedOptions[option?.name]

      // Filter variants that match the currently selected options
      const matchingVariants = product?.variants?.filter((variant) => {
        return Object.keys(otherSelectedOptions).every((key) => {
          if (!product?.options) return false
          const optionIndex = product.options.findIndex((opt) => opt?.name === key) + 1
          const optionKey = `option${optionIndex}` as keyof typeof variant.store

          if (!variant?.store) return false
          return (
            !otherSelectedOptions[key] || variant?.store[optionKey] === otherSelectedOptions[key]
          )
        })
      })

      // Determine the available values for the current option based on matching variants
      const availableValues = Array.from(
        new Set(
          matchingVariants
            ?.map((variant) => {
              if (!variant.store || !product.options) return undefined

              const optionIndex = product?.options.findIndex((opt) => opt.name === option.name) + 1
              const optionKey = `option${optionIndex}` as keyof typeof variant.store
              return variant.store[optionKey] as string
            })
            .filter((value): value is string => value !== undefined),
        ),
      )

      // Update the available options with the new available values
      newAvailableOptions[option.name] =
        availableValues.length > 0 ? availableValues : option.values ?? []
    })

    setAvailableOptions(newAvailableOptions)

    // Find the matching variant based on selected options
    const selectedVariant = product?.variants?.find((variant) =>
      product?.options?.every((option) => {
        if (!variant.store || !product.options || !option.name) return false
        const optionIndex = product.options.findIndex((opt) => opt.name === option.name) + 1
        const optionKey = `option${optionIndex}` as keyof typeof variant.store

        return selectedOptions[option.name] === variant.store[optionKey]
      }),
    )

    // Call the onVariantChange callback with the selected variant
    if (selectedVariant) {
      onVariantChange(selectedVariant)
    }
  }, [selectedOptions, product, onVariantChange])

  const handleOptionChange = (optionName: string, value: string) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [optionName]: value,
    }))
  }

  return (
    <div>
      {product?.options?.map((option) => (
        <div key={option.name}>
          <label>{option.name}</label>
          <select
            value={selectedOptions[option.name || '']}
            onChange={(e) => handleOptionChange(option.name || '', e.target.value)}
          >
            <option value="">Select {option.name}</option>
            {option?.values?.map((value) => (
              <option
                key={value}
                value={value}
                disabled={!availableOptions[option.name || '']?.includes(value)}
              >
                {value}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  )
}
