import {useState} from 'react'
import dynamic from 'next/dynamic'

interface CartBannerProps {
  title: string
  quantity: number
}

const CartModal = dynamic(() => import('../global/CartModal'))

export default function CartBanner({title, quantity}: CartBannerProps) {
  const [showCartModal, setShowCartModal] = useState(false)

  return (
    <div className="absolute w-full z-50 bg-primary text-white py-3 px-5 flex justify-center items-center gap-3">
      <p>{`${title} ${quantity > 1 ? `(${quantity})` : ''} added to your cart!`}</p>
      <button className="underline" onClick={() => setShowCartModal((prev) => !prev)}>
        View Cart
      </button>
      {showCartModal && <CartModal setShowCartModal={setShowCartModal} />}
    </div>
  )
}
