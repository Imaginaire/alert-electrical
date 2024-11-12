import {useState} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import urlForImage from '@/shared/utils/urlForImage'
import Cart from '@/svgs/Cart'
import MegaMenu from '../MegaMenu'
import {useCart} from '@/contexts/CartContext'
import {MenuItem, NavbarProps} from '@/types'
import CartModal from '../../CartModal'
import SearchBox from '@/components/shared/SearchBox'
import UpperMenu from './UpperMenu'
import QuickEntry from './QuickEntry'
import Message from '@/svgs/Message'
import PenToSquare from '@/svgs/PenToSquare'
import User from '@/svgs/User'

export default function Desktop({
  menuItems,
  upperMenuItems,
  upperMenuCtaText,
  companyInfo,
  contactPage,
  blogPage,
  accountPage,
}: NavbarProps) {
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

      <div className="navbar-desktop flex flex-col relative h-36 ">
        {/* Upper Menu */}
        <UpperMenu
          upperMenuItems={upperMenuItems || []}
          upperMenuCtaText={upperMenuCtaText || ''}
        />

        {/* Mid Menu */}
        <div className="navbar-mid flex justify-between items-center p-5">
          <div className="navbar-mid-left h-full w-2/3 flex">
            {/* Logo */}
            <Link href="/" className="mr-8 w-1/4 relative object-fit h-auto">
              <Image
                src={urlForImage(logo).url() || ''}
                alt="Logo"
                fill
                className="object-contain object-left"
              />
            </Link>

            <SearchBox />
            <QuickEntry />
          </div>

          {/* Right Links */}
          <div className="navbar-mid-right flex w-1/3  justify-end items-center gap-3 lg:gap-8">
            <Link href={contactPage?.slug || ''} className="flex items-center">
              <Message />
              <span className="uppercase pl-1 whitespace-nowrap hidden lg:flex">Contact Us</span>
            </Link>

            <Link href={blogPage?.slug || ''} className="flex items-center">
              <PenToSquare />
              <span className="uppercase pl-1 whitespace-nowrap hidden lg:flex">Blog</span>
            </Link>

            <Link href={accountPage || ''} className=" flex items-center">
              <User />
              <span className="uppercase pl-1 whitespace-nowrap hidden lg:flex">Account</span>
            </Link>

            {/* Cart */}
            <div
              className="flex flex-col justify-center items-center gap-2 uppercase"
              onClick={() => setShowCartModal(true)}
            >
              {cartState.cart.length > 0 ? (
                <button className="cartBtn-withItems">
                  <Cart /> <span className="pl-2"> Cart </span>
                </button>
              ) : (
                <button className="flex cartBtn uppercase  bg-primary border-primary border-2 rounded p-3 text-white font-semibold">
                  <Cart /> <span className="pl-2"> Cart </span>
                </button>
              )}
            </div>
            <span className="absolute left-0 bottom-0 w-0 h-[0.5px] bg-black opacity-0 transition-all duration-300 group-hover:w-full group-hover:opacity-100"></span>
          </div>
        </div>

        {/* Lower Menu */}
        {/* <ul className={`flex w-full md:gap-8 lg:gap-10 xl:gap-14`}>
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
                    <a href={hasMegaMenu ? '#' : `/${menuItem.shopifyLink}`}>{menuItem.title}</a>
                  )}

                  <span className="absolute left-0 bottom-0 w-0 h-[0.5px] bg-black opacity-0 transition-all duration-300 group-hover:w-full group-hover:opacity-100"></span>
                </li>
              )
            })}
        </ul> */}

        {/* Mega Menu */}
        <MegaMenu
          menuItem={menuItem || ({} as MenuItem)}
          showMegaMenu={showMegaMenu}
          setShowMegaMenu={setShowMegaMenu}
        />
      </div>
    </>
  )
}
