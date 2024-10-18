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
    <>
      <div className="absolute w-full z-10 bg-primary text-white py-3 px-5 flex justify-center items-center gap-3 animate-dropIn">
        <p>{`${title} ${quantity > 1 ? `(${quantity})` : ''} added to your cart!`}</p>
        <button
          className="relative group transition-opacity duration-300"
          onClick={() => setShowCartModal((prev) => !prev)}
        >
          <span>View Cart</span>
          <span className="absolute left-0 bottom-0 w-0 h-[0.5px] bg-slate-100 opacity-0 transition-all duration-300 group-hover:w-full group-hover:opacity-100"></span>
        </button>
      </div>
      {showCartModal && <CartModal setShowCartModal={setShowCartModal} />}
    </>
  )
}
