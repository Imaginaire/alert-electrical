// Utils
import {useState} from 'react'
import {resolveHref} from '@/shared/utils/resolveHref'

// types
import {NavbarProps} from '@/types'

// components
import Link from 'next/link'
import Image from 'next/image'
import urlForImage from '@/shared/utils/urlForImage'
import {title} from 'process'
import Search from '@/svgs/Search'
import Inspiration from '@/svgs/Inspiration'
import Cart from '@/svgs/Cart'
import CartWithItems from '@/svgs/CartWithItems'
import VisitUs from '@/svgs/VisitUs'
import ContactUs from '@/svgs/ContactUs'
import MyAccount from '@/svgs/MyAccount'
import dynamic from 'next/dynamic'

// context
import {useCart} from '@/contexts/CartContext'

const fakeLeftMenuItems = [
  {title: 'Home', href: '/'},
  {title: 'Lighting', href: '/lighting'},
  {title: 'Lightbulbs', href: '/lightbulbs'},
  {title: 'About Us', href: '/about-us'},
]
const fakeRightMenuItems = [
  {title: 'Inspiration', href: '/inspiration'},
  {title: 'Visit Us', href: '/visit-us'},
  {title: 'Contact Us', href: '/contact-us'},
  {title: 'My Account', href: '/my-account'},
]

const icons = [
  {name: 'Inspiration', icon: Inspiration},
  {name: 'Visit Us', icon: VisitUs},
  {name: 'Contact Us', icon: ContactUs},
  {name: 'My Account', icon: MyAccount},
]

const CartModal = dynamic(() => import('../CartModal'))

export default function Desktop({menuItems, companyInfo, contactPage}: NavbarProps) {
  const {name, address, phone, email, logo} = companyInfo || {}
  const [showMegaMenu, setShowMegaMenu] = useState(false)
  const [showCartModal, setShowCartModal] = useState(false)

  // Get cart state from context
  const {cartState} = useCart()
  return (
    <>
      {/* Cart Modal */}
      {showCartModal && <CartModal setShowCartModal={setShowCartModal} />}

      <div className="hidden xl:flex navbar-desktop  items-center justify-between p-5">
        {/* Left - search */}
        <button className="mr-14">
          <Search />
        </button>

        {/* Left - Links */}
        <ul className="flex w-full gap-14">
          {fakeLeftMenuItems &&
            fakeLeftMenuItems.map((menuItem, index) => {
              return (
                <li key={index} className="relative group uppercase">
                  <Link href={menuItem.href}>{menuItem.title}</Link>
                  <span className="absolute left-0 bottom-0 w-0 h-[0.5px] bg-black opacity-0 transition-all duration-300 group-hover:w-full group-hover:opacity-100"></span>
                </li>
              )
            })}
        </ul>
        {/* <ul className="flex w-full justify-around">
          {menuItems &&
            menuItems.map((menuItem, index) => {
              const href = resolveHref(menuItem.type, menuItem.slug)


              return (
                <li key={index}>
                  <Link href={href}>{menuItem.title}</Link>
                </li>
              )
            })}
        </ul> */}

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
          {fakeRightMenuItems &&
            fakeRightMenuItems.map((menuItem, index) => {
              const IconComponent = icons.find((icon) => icon.name === menuItem.title)?.icon
              {
                console.log('menuItem', menuItem)
              }
              return (
                <li key={index} className="relative group ">
                  <Link
                    href={menuItem.href}
                    className="flex flex-col justify-center items-center gap-2"
                  >
                    {IconComponent && <IconComponent />}
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
