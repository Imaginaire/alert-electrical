interface SortPriceProps {
  setSortOrder: (sortKey: string, reverse?: boolean) => void
}

export default function SortProducts({setSortOrder}: SortPriceProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    if (value.startsWith('PRICE')) {
      setSortOrder('PRICE', value.endsWith('>'))
    } else {
      setSortOrder(value)
    }
  }
  return (
    <div className="flex items-center pr-5 font-manrope">
      <label className="mr-2 hidden lg:block">Sort products</label>
      <select className="" name="sort-price" id="sort-price" onChange={handleChange}>
        <option value="COLLECTION_DEFAULT">Default Order</option>
        <option value="BEST_SELLING">Popularity</option>
        <option value="CREATED">Lastest</option>
        <option value="PRICE:<">Price: Low to high</option>
        <option value="PRICE:>">Price: High to low</option>
      </select>
    </div>
  )
}
