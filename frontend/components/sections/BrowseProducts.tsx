// Types
import {BrowseProducts as BrowseProductsType} from '@/types'

// Components
import ProductCard from '../global/ProductCard'
import Header from './Header'
import Link from 'next/link'

// Utils
import {useEffect, useState} from 'react'

export default function BrowseProducts(browseProductsData: BrowseProductsType) {
  const {header, headerLink, headerLinkText, menuItems} = browseProductsData
  const [products, setProducts] = useState([
    {
      title: '',
      products: [],
    },
  ])
  const [selectedCategory, setSelectedCategory] = useState('New In') // Track selected menu item

  const getProducts = async () => {
    const newInProducts = await fetch('/api/productsBySortKey', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({sortKey: 'CREATED_AT'}),
    })

    const bestSellerProducts = await fetch('/api/productsBySortKey', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({sortKey: 'BEST_SELLING'}),
    })

    // Parse the JSON from the response
    const newIn = await newInProducts.json()
    const bestSellers = await bestSellerProducts.json()

    // Set the products state
    setProducts([
      {
        title: 'New In',
        products: newIn.products,
      },
      {
        title: 'Best Sellers',
        products: bestSellers.products,
      },
    ])
  }

  useEffect(() => {
    getProducts()
  }, [])

  // Filter products based on selected category
  const displayedProducts =
    products.find((category) => category.title === selectedCategory)?.products || []

  return (
    <section className="browseProducts w-full flex justify-center">
      {/* Container */}
      <div className="browseProducts-container w-full p-8 flex flex-col">
        {/* Header Container */}
        <div className="flex justify-between items-center">
          {/* Header Left */}
          <div className="flex">
            {/* Header */}
            <Header
              header={header.header}
              headerTag={header.headerTag}
              classes="uppercase text-4xl text-primary pr-8"
            />

            {/* Menu Items */}
            <ul className="flex items-center uppercase text-secondary-grey-text font-manrope">
              <li
                className={`pr-8 cursor-pointer ${selectedCategory === 'New In' ? 'text-primary' : ''}`}
                onClick={() => setSelectedCategory('New In')}
              >
                New In
              </li>
              <li
                className={`pr-8 cursor-pointer ${selectedCategory === 'Best Sellers' ? 'text-primary' : ''}`}
                onClick={() => setSelectedCategory('Best Sellers')}
              >
                Best Sellers
              </li>
              {menuItems &&
                menuItems.map((menuItem, index) => (
                  <li
                    key={index}
                    className={`pr-8 cursor-pointer ${selectedCategory === menuItem.title ? 'text-primary' : ''}`}
                    onClick={() => setSelectedCategory(menuItem.title)}
                  >
                    {menuItem.title}
                  </li>
                ))}
            </ul>
          </div>

          {/* Header Right */}
          <Link className="group relative" href={headerLink.current}>
            <span className="uppercase text-primary">{headerLinkText}</span>
            <span className="absolute left-0 bottom-0 w-0 h-[0.5px] bg-black opacity-0 transition-all duration-300 group-hover:w-full group-hover:opacity-100"></span>
          </Link>
        </div>

        {/* Products */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-x-8 mt-8">
          {displayedProducts.length > 0 ? (
            displayedProducts.map((product, index) => <ProductCard key={index} product={product} />)
          ) : (
            <p>No products available for {selectedCategory}</p>
          )}
        </div>
      </div>
    </section>
  )
}
