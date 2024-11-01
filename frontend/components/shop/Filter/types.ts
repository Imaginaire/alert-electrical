export type BreakpointFilterProps = {
  searchParams: URLSearchParams
  filters: FilterItem[]
  priceFilter: React.ReactNode
  handleRadioChange: (filterId: string, value: string) => void
  handleCheckboxChange: (filterId: string, value: string, checked: boolean) => void
  category: string
  brand: string | null
  finish: string | null
}

export type FilterItem = {
  id: string
  caption: string
  type: string
  options: {value: string; label: string}[]
}
