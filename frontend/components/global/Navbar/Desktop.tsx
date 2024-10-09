import {useState} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import urlForImage from '@/shared/utils/urlForImage'
import Search from '@/svgs/Search'
import Cart from '@/svgs/Cart'
import CartWithItems from '@/svgs/CartWithItems'
import dynamic from 'next/dynamic'
import MegaMenu from './MegaMenu'
import {useCart} from '@/contexts/CartContext'
import {MenuItem, NavbarProps} from '@/types'
import CartModal from '../CartModal'

export default function Desktop({menuItems, menuItemsRight, companyInfo}: NavbarProps) {
  const {logo} = companyInfo || {}
  const [showMegaMenu, setShowMegaMenu] = useState<boolean | false>(false)
  const [menuItem, setMenuItem] = useState<MenuItem | null>(null)
  const [showCartModal, setShowCartModal] = useState(false)

  // Get cart state from context
  const {cartState} = useCart()

  return (
    <>
      {/* Cart Modal */}
      {showCartModal && <CartModal setShowCartModal={setShowCartModal} />}

      <div className="hidden xl:flex navbar-desktop relative h-24 items-center justify-between p-5">
        {/* Left - search */}
        <button className="mr-14">
          <Search />
        </button>

        {/* Left - Links */}
        <ul className="flex w-full gap-14">
          {Array.isArray(menuItems) &&
            menuItems.map((menuItem, index) => {
              const hasMegaMenu = menuItem.useMegaMenu

              return (
                <li
                  key={index}
                  className="relative group uppercase hover:cursor-pointer"
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
                      href={menuItem.title === 'Home' ? '/' : `/${menuItem.sanityLink?.slug || ''}`}
                    >
                      {menuItem.title}
                    </Link>
                  ) : (
                    <a href={menuItem.slug}>{menuItem.title}</a>
                  )}

                  <span className="absolute left-0 bottom-0 w-0 h-[0.5px] bg-black opacity-0 transition-all duration-300 group-hover:w-full group-hover:opacity-100"></span>
                </li>
              )
            })}
        </ul>

        {/* Mega Menu */}

        <MegaMenu
          menuItem={menuItem || ({} as MenuItem)}
          showMegaMenu={showMegaMenu}
          setShowMegaMenu={setShowMegaMenu}
        />

        {/* Centre - Logo */}
        {logo && (
          <Link href="/">
            <div className="relative m-auto w-36">
              <Image
                src={urlForImage(logo)?.url()}
                alt={(logo?.alt as string) || 'company logo'}
                width={100}
                height={100}
              />
            </div>
          </Link>
        )}

        {/* Right - Contact */}
        <ul className="flex w-full justify-end gap-7">
          {Array.isArray(menuItemsRight) &&
            menuItemsRight.map((menuItem, index) => {
              const icon = urlForImage(menuItem?.icon)?.url()

              return (
                <li key={index} className="relative group">
                  <Link
                    href={menuItem?.link?.current || '/'}
                    className="flex flex-col justify-center items-center gap-2"
                  >
                    <div className="relative h-6 w-5">
                      <Image src={icon || ''} alt={menuItem.title} fill={true} />
                    </div>
                    {menuItem.title}
                  </Link>
                  <span className="absolute left-0 bottom-0 w-0 h-[0.5px] bg-black opacity-0 transition-all duration-300 group-hover:w-full group-hover:opacity-100"></span>
                </li>
              )
            })}

          {/* Cart */}
          <li className="group relative">
            <button
              className="flex flex-col justify-center items-center gap-2"
              onClick={() => setShowCartModal(true)}
            >
              {cartState.cart.length > 0 ? <CartWithItems /> : <Cart />}
              Your Cart
            </button>
            <span className="absolute left-0 bottom-0 w-0 h-[0.5px] bg-black opacity-0 transition-all duration-300 group-hover:w-full group-hover:opacity-100"></span>
          </li>
        </ul>
      </div>
    </>
  )
}
