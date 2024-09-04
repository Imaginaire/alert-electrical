import {useCart} from '@/contexts/CartContext'

export default function CartModal({}) {
  const {cartState, removeFromCart, checkout} = useCart()
  const {cart} = cartState

  return (
    <div className="cartModal fixed inset-0 z-[60]">
      {/* Overlay */}
      <div className="w-screen h-screen bg-black opacity-60 fixed inset-0"></div>

      {/* Modal Container */}
      <div className="relative z-[70] w-full h-full flex justify-end">
        {/* Modal */}
        <div className="w-1/3 bg-white h-full">
          {/* Header */}
          <h2 className="text-primary text-2xl flex flex-col border-b-secondary border-b-[0.5px] p-6">
            Cart
          </h2>

          {/* Cart Items */}
          <div className="p-6">
            {cart.length > 0 ? (
              cart.map((item, index) => (
                <div key={index} className="cartItem mb-4 flex items-center">
                  <img
                    src={item?.store?.previewImageUrl as string}
                    alt={item?.store?.title}
                    className="w-16 h-16 object-cover"
                  />
                  <div className="ml-4">
                    <h3 className="text-lg">{item?.store?.title}</h3>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: £{item?.store?.price ? item.store.price * item?.quantity : 0}</p>
                  </div>
                  <button
                    className="ml-auto text-red-500"
                    onClick={() => removeFromCart(item?.store?.id)}
                  >
                    Remove
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center">Your cart is empty.</p>
            )}
          </div>

          {/* Checkout Button */}
          {cart.length > 0 && (
            <div className="p-6 border-t-secondary mt-auto">
              <button className="bg-primary text-white px-4 py-2 w-full" onClick={checkout}>
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
