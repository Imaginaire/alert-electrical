import {useState} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import urlForImage from '@/shared/utils/urlForImage'
import Cart from '@/svgs/Cart'
import CartWithItems from '@/svgs/CartWithItems'
import MegaMenu from '../MegaMenu'
import {useCart} from '@/contexts/CartContext'
import {MenuItem, NavbarProps} from '@/types'
import CartModal from '../../CartModal'
import SearchBox from '@/components/shared/SearchBox'
import UpperMenu from './UpperMenu'

export default function Desktop({
  menuItems,
  upperMenuItems,
  upperMenuCtaText,
  companyInfo,
}: NavbarProps) {
  const {logo} = companyInfo || {}
  const [showMegaMenu, setShowMegaMenu] = useState<boolean | false>(false)
  const [menuItem, setMenuItem] = useState<MenuItem | null>(null)
  const [showCartModal, setShowCartModal] = useState(false)

  // Get cart state from context
  const {cartState} = useCart()

  console.log(upperMenuItems)

  return (
    <>
      {/* Cart Modal */}
      {showCartModal && <CartModal setShowCartModal={setShowCartModal} />}

      <div className="navbar-desktop flex flex-col relative h-36 ">
        {/* Upper Menu */}
        <UpperMenu upperMenuItems={upperMenuItems || []} upperMenuCtaText={upperMenuCtaText} />

        {/* Mid Menu */}
        <div className="navbar-mid flex justify-between items-center px-5">
          <div className="w-[45%] flex items-center overflow-hidden">
            <button className="">
              <SearchBox />
            </button>

            {/* Lower Menu */}
            <ul className={`flex w-full md:gap-8 lg:gap-10 xl:gap-14`}>
              {Array.isArray(menuItems) &&
                menuItems.map((menuItem, index) => {
                  const hasMegaMenu = menuItem.useMegaMenu

                  return (
                    <li
                      key={index}
                      className="relative whitespace-nowrap group uppercase hover:cursor-pointer flex justify-center items-center transition-opacity duration-300"
                      onMouseEnter={() => {
                        if (hasMegaMenu) {
                          setMenuItem(menuItem)
                          setShowMegaMenu(true)
                        } else {
                          setShowMegaMenu(false)
                        }
                      }}
                    >
                      {menuItem.sanityLink ? (
                        <Link
                          href={
                            hasMegaMenu
                              ? '#'
                              : menuItem.title === 'Home'
                                ? '/'
                                : `/${menuItem.sanityLink?.slug || `/${menuItem.shopifyLink}` || ''}`
                          }
                          className={menuItem.title === 'About Us' ? 'md:hidden xl:block' : ''}
                        >
                          {menuItem.title}
                        </Link>
                      ) : (
                        <a href={hasMegaMenu ? '#' : `/${menuItem.shopifyLink}`}>
                          {menuItem.title}
                        </a>
                      )}

                      <span className="absolute left-0 bottom-0 w-0 h-[0.5px] bg-black opacity-0 transition-all duration-300 group-hover:w-full group-hover:opacity-100"></span>
                    </li>
                  )
                })}
            </ul>
          </div>

          {/* Mega Menu */}
          <MegaMenu
            menuItem={menuItem || ({} as MenuItem)}
            showMegaMenu={showMegaMenu}
            setShowMegaMenu={setShowMegaMenu}
          />

          {/* Cart */}
          <button
            className="flex flex-col justify-center items-center gap-2"
            onClick={() => setShowCartModal(true)}
          >
            {cartState.cart.length > 0 ? <CartWithItems /> : <Cart />}
            Your Cart
          </button>
          <span className="absolute left-0 bottom-0 w-0 h-[0.5px] bg-black opacity-0 transition-all duration-300 group-hover:w-full group-hover:opacity-100"></span>
        </div>
      </div>
    </>
  )
}
