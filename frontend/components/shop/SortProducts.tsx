import {SORT_KEYS} from '@/constants'

interface SortPriceProps {
  setSortOrder: (sortKey: string, reverse?: boolean) => void
}

export default function SortProducts({setSortOrder}: SortPriceProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    if (value.startsWith(SORT_KEYS.PRICE)) {
      setSortOrder(SORT_KEYS.PRICE, value.endsWith('>'))
    } else {
      setSortOrder(value)
    }
  }

  return (
    <div className="flex items-center pr-5 font-manrope text-primary">
      <label className="mr-2 hidden lg:block">Sort products</label>
      <select className="" name="sort-price" id="sort-price" onChange={handleChange}>
        <option value={SORT_KEYS.COLLECTION_DEFAULT}>Default Order</option>
        <option value={SORT_KEYS.BEST_SELLING}>Popularity</option>
        <option value={SORT_KEYS.CREATED_AT}>Lastest</option>
        <option value={SORT_KEYS.PRICE_ASC}>Price: Low to high</option>
        <option value={SORT_KEYS.PRICE_DESC}>Price: High to low</option>
      </select>
    </div>
  )
}
