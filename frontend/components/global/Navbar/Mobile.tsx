import {useState} from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
import urlForImage from '@/shared/utils/urlForImage'
import HamburgerMenu from '@/components/shared/HamburgerMenu'
import Search from '@/svgs/Search'
import MyAccount from '@/svgs/MyAccount'
import Cart from '@/svgs/Cart'
import CartWithItems from '@/svgs/CartWithItems'
import MobileMenuModal from './MobileMenuModal' // Import the new modal component
import {useCart} from '@/contexts/CartContext'
import {NavbarProps} from '@/types'
import CartModal from '../CartModal'
import SearchBox from '@/components/shared/SearchBox'

export default function Mobile({menuItems, companyInfo, menuItemsRight}: NavbarProps) {
  const {name, address, phone, email, logo} = companyInfo || {}
  const [isOpen, setIsOpen] = useState(false)
  const [showCartModal, setShowCartModal] = useState(false)
  const {cartState} = useCart()

  const closeMenu = () => setIsOpen(false)

  return (
    <>
      {/* Cart Modal */}
      {showCartModal && <CartModal setShowCartModal={setShowCartModal} />}

      <div className="navbar-mobile h-[79px] flex items-center justify-between px-5">
        <div className="flex gap-6 items-center w-28">
          <HamburgerMenu isOpen={isOpen} handleClick={() => setIsOpen(!isOpen)} />
          <SearchBox />
        </div>
        {logo && (
          <Link href="/">
            <div className="relative">
              <Image
                src={urlForImage(logo)?.url()}
                alt={(logo?.alt as string) || 'company logo'}
                width={100}
                height={100}
              />
            </div>
          </Link>
        )}
        <ul className="flex gap-6 w-28 justify-end">
          <li>
            <Link href="my-account">
              <MyAccount />
            </Link>
          </li>
          <li>
            <button onClick={() => setShowCartModal(true)}>
              {cartState.cart.length > 0 ? <CartWithItems /> : <Cart />}
            </button>
          </li>
        </ul>

        {/* Mobile Menu Modal */}
        <MobileMenuModal
          menuItems={menuItems}
          menuItemsRight={menuItemsRight}
          isOpen={isOpen}
          closeMenu={closeMenu}
        />
      </div>
    </>
  )
}
