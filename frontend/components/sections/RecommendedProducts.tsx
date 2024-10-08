/**
 * @TODO - make the title dynamic - pull in from Sanity. Also allow it to pull in by category
 */

import Link from 'next/link'
import {useEffect, useState} from 'react'
import ProductCard from '../global/ProductCard'

export default function RecommendedProducts({brand}: {brand: string}) {
  const [products, setProducts] = useState<{title: string; products: any[]}[]>([])

  const getProductsByBrand = async () => {
    const productsByBrand = await fetch('/api/productsByBrand', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({brand: brand}),
    })

    let {products} = await productsByBrand.json()

    // get the first 6 products
    products = products.slice(0, 6)
    setProducts(products)
  }

  useEffect(() => {
    getProductsByBrand()
  }, [])

  return (
    <section className="recommendedProducts w-full flex justify-center">
      {/* Container */}
      <div className="recommendedProducts-container px-8 py-16 w-full">
        {/* Header*/}
        <div className="flex justify-between w-full items-center">
          <h2 className="text-4xl uppercase text-primary">More from this range</h2>

          <Link className="group relative" href={`/brand/${brand}`}>
            <span className="uppercase whitespace-nowrap text-primary">View Range</span>
            <span className="absolute left-0 bottom-0 w-0 h-[0.5px] bg-black opacity-0 transition-all duration-300 group-hover:w-full group-hover:opacity-100"></span>
          </Link>
        </div>

        {/* Products */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-8 xl:gap-x-16 mt-8">
          {products.length > 0 &&
            products.map((product, index) => <ProductCard key={index} product={product} />)}
        </div>
      </div>
    </section>
  )
}
