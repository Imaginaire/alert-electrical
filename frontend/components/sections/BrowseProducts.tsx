// Types
import {BrowseProducts as BrowseProductsType} from '@/types'

// Components
import ProductCard from '../global/ProductCard'
import Header from './Header'
import Link from 'next/link'

// Utils
import {useEffect, useState} from 'react'
import {SORT_KEYS} from '@/constants'

export default function BrowseProducts(browseProductsData: BrowseProductsType) {
  const {header, headerLink, headerLinkText, menuItems} = browseProductsData
  const [products, setProducts] = useState<{title: string; products: any[]}[]>([])
  const [selectedCategory, setSelectedCategory] = useState('New In') // Track selected menu item
  const [isTransitioning, setIsTransitioning] = useState(false) // Track if the menu is transitioning

  const getProducts = async () => {
    // Fetch New In and Best Sellers products
    const newInProducts = await fetch('/api/productsBySortKey', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({sortKey: SORT_KEYS.CREATED_AT}),
    })

    const bestSellerProducts = await fetch('/api/productsBySortKey', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({sortKey: SORT_KEYS.BEST_SELLING}),
    })

    // Parse the JSON from the New In and Best Sellers responses
    const newIn = await newInProducts.json()
    const bestSellers = await bestSellerProducts.json()

    // Fetch products for each menu item
    const menuItemsPromises = menuItems.map(async (menuItem) => {
      const productTitles = [
        menuItem.product1Title,
        menuItem.product2Title,
        menuItem.product3Title,
        menuItem.product4Title,
        menuItem.product5Title,
        menuItem.product6Title,
      ].filter(Boolean) // Filter out undefined handles

      if (productTitles.length === 0) return null // Return null if no product titles are provided

      const titlesQuery = productTitles.map((title) => `(title:${title})`).join(' OR ')

      const productsByTitles = await fetch('/api/productsByTitle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({titlesQuery}),
      })

      const productsByTitlesResponse = await productsByTitles.json()

      return {
        title: menuItem.title,
        products: productsByTitlesResponse.products,
      }
    })

    // Wait for all the menu item product fetches to complete
    const menuItemsProducts = await Promise.all(menuItemsPromises)

    // Combine all product categories (New In, Best Sellers, and menu items)
    const allProducts = [
      {
        title: 'New In',
        products: newIn.products,
      },
      {
        title: 'Best Sellers',
        products: bestSellers.products,
      },
      ...menuItemsProducts.filter(
        (item): item is {title: string; products: any[]} => item !== null,
      ), // Filter out null values
    ]

    // Set the combined product state
    setProducts(allProducts)
  }

  useEffect(() => {
    getProducts()
  }, [])

  // Filter products based on selected category
  const displayedProducts =
    products.find((category) => category.title === selectedCategory)?.products || []

  const handleCategoryChange = (category: string) => {
    setIsTransitioning(true) // Start fade out
    setTimeout(() => {
      setSelectedCategory(category) // Change category
      setIsTransitioning(false) // Fade back in
    }, 300) // Timeout matches transition duration
  }

  return (
    <section className="browseProducts w-full flex justify-center">
      <div className="browseProducts-container w-full p-8 flex flex-col">
        <div className="flex flex-wrap lg:flex-nowrap items-center">
          <Header
            header={header.header}
            headerTag={header.headerTag}
            classes="uppercase text-4xl text-primary pr-8 mb-4 lg:mb-0"
          />

          {/* Menu Items */}
          <ul className="flex items-center order-last lg:-order-none w-full uppercase text-secondary-grey-text overflow-x-scroll font-manrope">
            <li
              className={`pr-4 md:pr-8 whitespace-nowrap cursor-pointer hover:text-primary transition-colors duration-200 ease-in-out ${
                selectedCategory === 'New In' ? 'text-primary ' : ''
              }`}
              onClick={() => handleCategoryChange('New In')}
            >
              New In
            </li>
            <li
              className={`pr-4 md:pr-8 whitespace-nowrap cursor-pointer hover:text-primary transition-colors duration-200 ease-in-out ${
                selectedCategory === 'Best Sellers' ? 'text-primary' : ''
              }`}
              onClick={() => handleCategoryChange('Best Sellers')}
            >
              Best Sellers
            </li>
            {menuItems &&
              menuItems.map((menuItem, index) => (
                <li
                  key={index}
                  className={`pr-4 md:pr-8 whitespace-nowrap cursor-pointer hover:text-primary transition-colors duration-200 ease-in-out ${
                    selectedCategory === menuItem.title ? 'text-primary' : ''
                  }`}
                  onClick={() => handleCategoryChange(menuItem.title)}
                >
                  {menuItem.title}
                </li>
              ))}
          </ul>

          {/* Header Right */}
          <Link className="group relative ml-auto" href={headerLink.current}>
            <span className="uppercase whitespace-nowrap text-primary">{headerLinkText}</span>
            <span className="absolute left-0 bottom-0 w-0 h-[0.5px] bg-black opacity-0 transition-all duration-300 group-hover:w-full group-hover:opacity-100"></span>
          </Link>
        </div>

        {/* Products */}
        <div
          className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-8 xl:gap-x-16 mt-8 transition-opacity duration-300 ${
            isTransitioning ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {displayedProducts.length > 0 ? (
            displayedProducts.map((product, index) => (
              <ProductCard
                key={index}
                product={product}
                isLastTwoProducts={index >= displayedProducts.length - 2}
              />
            ))
          ) : (
            <p>No products available for {selectedCategory}</p>
          )}
        </div>
      </div>
    </section>
  )
}
