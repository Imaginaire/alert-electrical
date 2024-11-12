import {useState} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import urlForImage from '@/shared/utils/urlForImage'
import HamburgerMenu from '@/components/shared/HamburgerMenu'
import User from '@/svgs/User'
import Cart from '@/svgs/Cart'
import CartWithItems from '@/svgs/CartWithItems'
import MobileMenuModal from './MobileMenuModal' // Import the new modal component
import {useCart} from '@/contexts/CartContext'
import UpperMenu from './Desktop/UpperMenu'
import {NavbarProps} from '@/types'
import CartModal from '../CartModal'
import SearchBox from '@/components/shared/SearchBox'

export default function Mobile({
  menuItems,
  companyInfo,
  upperMenuItems,
  upperMenuCtaText,
  contactPage,
  accountPage,
  blogPage,
}: NavbarProps) {
  const {name, address, phone, email, logo} = companyInfo || {}
  const [isOpen, setIsOpen] = useState(false)
  const [showCartModal, setShowCartModal] = useState(false)
  const {cartState} = useCart()

  const closeMenu = () => setIsOpen(false)

  return (
    <>
      <UpperMenu upperMenuItems={upperMenuItems || []} upperMenuCtaText={upperMenuCtaText || ''} />

      {/* Cart Modal */}
      {showCartModal && <CartModal setShowCartModal={setShowCartModal} />}

      <div className="navbar-mobile py-4 flex items-center justify-between px-5">
        <div className="flex gap-6 items-center w-28">
          <HamburgerMenu isOpen={isOpen} handleClick={() => setIsOpen(!isOpen)} />
        </div>
        {logo && (
          <Link href="/">
            <div className="relative">
              <Image
                src={urlForImage(logo)?.url()}
                alt={(logo?.alt as string) || 'company logo'}
                width={200}
                height={100}
              />
            </div>
          </Link>
        )}
        <ul className="flex gap-6  justify-end">
          <li>
            <Link href="my-account " className="flex items-center flex-col justify-center">
              <User width={20} height={20} />
              <span className="uppercase text-sm pt-1"> Account </span>
            </Link>
          </li>
          <li>
            <div
              className="flex flex-col justify-center items-center gap-2 uppercase"
              onClick={() => setShowCartModal(true)}
            >
              {cartState.cart.length > 0 ? (
                <div className="cartBtn-withItems">
                  <Cart /> <span className="pl-2"> Cart </span>
                </div>
              ) : (
                <div className="flex cartBtn-mobile  flex flex-col items-center justify-center ">
                  <Cart fill={'#000'} /> <span className="pt-1 text-sm uppercase"> Cart </span>
                </div>
              )}
            </div>
          </li>
        </ul>

        {/* Mobile Menu Modal */}
        {/* <MobileMenuModal
          menuItems={menuItems}
          menuItemsRight={menuItemsRight}
          isOpen={isOpen}
          closeMenu={closeMenu}
        /> */}
      </div>
      <SearchBox />
    </>
  )
}
