import PageHead from './PageHead'
import Layout from '@/shared/Layout'
import {PagePayload, SettingsPayload} from '@/types'
import {Variant} from '@/types/productType'
import {useEffect, useState} from 'react'

interface CartPageProps {
  page: PagePayload | undefined
  settings: SettingsPayload | undefined
  homePageTitle: string | undefined
  preview?: boolean
  loading?: boolean
  canonicalUrl?: string
}

export default function CartPage({
  page,
  settings,
  homePageTitle,
  loading,
  preview,
  canonicalUrl,
}: CartPageProps) {
  // const checkout = async () => {
  //   try {
  //     const response = await fetch('/api/checkout', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         variantId: getVariantId(store?.variants?.[0]?._ref ?? ''),
  //       }),
  //     })

  //     if (!response.ok) {
  //       throw new Error('Network response was not ok')
  //     }

  //     const data = await response.json()
  //     const {checkoutUrl} = data
  //     window.location.href = checkoutUrl
  //   } catch (error) {
  //     console.error('Error fetching Shopify data:', error)
  //   }
  // }

  const [cart, setCart] = useState<Variant[]>()

  useEffect(() => {
    // get cart items from local storage
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    setCart(cart)
  }, [])

  return (
    <Layout settings={settings} preview={preview} loading={loading}>
      <PageHead page={page} settings={settings} title={homePageTitle} canonicalUrl={canonicalUrl} />
      <div className="checkoutPage">
        <h1 className="text-4xl text-center py-8">Cart</h1>
        <div className="cartItems">
          {cart?.map((item, index) => (
            <div key={index} className="cartItem">
              <img
                src={item.store?.previewImageUrl as string}
                alt={item.store?.title}
                className="w-24 h-24 object-cover"
              />
              <div className="cartItemDetails">
                <h2 className="text-2xl">{item.store?.title}</h2>
                <p>Price: £{item.store?.price}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="checkoutButton" onClick={() => console.log('checkout')}>
          Checkout
        </button>
      </div>
    </Layout>
  )
}
