import {useCart} from '@/contexts/CartContext'
import CartModalItem from './CartModalItem'
import {useEffect, useState} from 'react'

interface CartModalProps {
  setShowCartModal: (show: boolean) => void
}

export default function CartModal({setShowCartModal}: CartModalProps) {
  const {cartState, removeFromCart, checkout, updateQuantity} = useCart()
  const {cart} = cartState

  // State to trigger animations
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Allow the animations to trigger after the initial render
    setIsVisible(true)
  }, [])

  // Calculate subtotal by summing the total price of each item
  const subtotal = cart.reduce((total, item) => {
    const itemPrice = item?.store?.price || 0
    const itemQuantity = item.quantity || 1
    return total + itemPrice * itemQuantity
  }, 0)

  return (
    <div className="cartModal fixed inset-0 z-[60]">
      {/* Overlay and Modal Container */}
      <div className="relative w-full h-full flex justify-end">
        {/* Overlay */}
        <div
          onClick={() => {
            setIsVisible(false)
            setTimeout(() => setShowCartModal(false), 300) // delay to allow fade-out
          }}
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${
            isVisible ? 'opacity-60' : 'opacity-0'
          } z-[60]`}
        ></div>

        {/* Modal */}
        <div
          className={`relative z-[70] w-[90%] xs:w-3/4 sm:w-1/2 lg:w-1/3 bg-white h-full flex flex-col transform transition-transform duration-300 ${
            isVisible ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Header */}
          <div className="flex justify-end p-6 border-b-secondary border-b-[0.5px]">
            <h2 className="text-primary text-2xl flex flex-col ">Cart</h2>

            {/* Close Button */}
            <button
              className="ml-auto"
              onClick={() => {
                setIsVisible(false)
                setTimeout(() => setShowCartModal(false), 300) // delay to allow animation
              }}
            >
              X
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-grow p-6 overflow-auto">
            {cart.length > 0 ? (
              cart.map((item, index) => (
                <CartModalItem
                  key={index}
                  item={item}
                  removeFromCart={removeFromCart}
                  updateQuantity={updateQuantity}
                />
              ))
            ) : (
              <p className="text-center">Your cart is empty.</p>
            )}
          </div>

          {/* Subtotal and Checkout */}
          <div className="mt-auto">
            {/* Subtotal */}
            {cart.length > 0 && (
              <div className="px-6 pt-6 border-t-secondary border-t-[0.5px]">
                <p className="flex justify-between text-xl">
                  <span>Subtotal</span>
                  <span>£{subtotal.toFixed(2)}</span>
                </p>
              </div>
            )}

            {/* Checkout Button */}
            {cart.length > 0 && (
              <div className="p-6 border-t-secondary">
                <button className="bg-primary text-white px-4 py-2 w-full" onClick={checkout}>
                  Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
