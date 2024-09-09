import {createContext, useContext, useReducer, useEffect, useState} from 'react'
import {Variant} from '@/types/productType'

// Define action types for cart operations
type CartAction =
  | {type: 'ADD_TO_CART'; payload: Variant}
  | {type: 'REMOVE_FROM_CART'; payload: number}
  | {type: 'CLEAR_CART'}
  | {type: 'SET_CART'; payload: Variant[]} // For setting initial cart items
  | {type: 'UPDATE_QUANTITY'; payload: {id: number; quantity: number}} // For updating quantity

// Define the cart state structure
type CartState = {
  cart: Variant[]
}

// Define cart API responses
type CheckoutResponse = {
  checkoutUrl: string
}

// Initial empty state
const initialState: CartState = {
  cart: [],
}

// Create a reducer function to manage cart actions
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        cart: [...state.cart, action.payload],
      }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter((item) => item?.store?.id !== action.payload),
      }
    case 'CLEAR_CART':
      return {
        ...state,
        cart: [],
      }
    case 'SET_CART':
      return {
        ...state,
        cart: action.payload,
      }
    case 'UPDATE_QUANTITY': // Handle quantity update
      return {
        ...state,
        cart: state.cart.map((item) =>
          item?.store?.id === action.payload.id
            ? {...item, quantity: action.payload.quantity}
            : item,
        ),
      }
    default:
      return state
  }
}

// Create the CartContext
const CartContext = createContext<{
  cartState: CartState
  addToCart: (item: Variant) => void
  removeFromCart: (id: number) => void
  clearCart: () => void
  updateQuantity: (id: number, quantity: number) => void
  checkout: () => Promise<void>
}>({
  cartState: initialState,
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  updateQuantity: () => {},
  checkout: async () => {},
})

// CartProvider component to wrap around your app
export const CartProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialState)
  const [isInitialised, setIsInitialised] = useState(false)

  console.log(cartState)

  // Sync with localStorage whenever cart changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCart = JSON.parse(localStorage.getItem('cart') || '[]')
      dispatch({type: 'SET_CART', payload: storedCart})
      setIsInitialised(true) // Ensure this runs only in the browser
    }
  }, [])

  useEffect(() => {
    if (isInitialised) {
      localStorage.setItem('cart', JSON.stringify(cartState.cart))
    }
  }, [cartState.cart, isInitialised])

  const addToCart = (item: Variant) => dispatch({type: 'ADD_TO_CART', payload: item})
  const removeFromCart = (id: number) => dispatch({type: 'REMOVE_FROM_CART', payload: id})
  const clearCart = () => dispatch({type: 'CLEAR_CART'})
  const updateQuantity = (id: number, quantity: number) =>
    dispatch({type: 'UPDATE_QUANTITY', payload: {id, quantity}})

  // Function to handle checkout by making API call
  const checkout = async () => {
    try {
      const cartItems = cartState.cart.map((item) => ({
        variantId: item?.store?.id,
        quantity: item.quantity || 1,
      }))

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({cartItems}),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data: CheckoutResponse = await response.json()
      window.location.href = data.checkoutUrl
    } catch (error) {
      console.error('Error during checkout:', error)
    }
  }

  return (
    <CartContext.Provider
      value={{cartState, addToCart, removeFromCart, clearCart, updateQuantity, checkout}}
    >
      {children}
    </CartContext.Provider>
  )
}

// Custom hook to use the cart context
export const useCart = () => useContext(CartContext)
