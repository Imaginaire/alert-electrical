// Utils
import {useEffect, useState} from 'react'
import {resolveHref} from '@/shared/utils/resolveHref'

// types
import {NavbarProps} from '@/types'

// components
import Link from 'next/link'
import Image from 'next/image'
import urlForImage from '@/shared/utils/urlForImage'
import HamburgerMenu from '@/components/shared/HamburgerMenu'
import {Button} from '@/components/shared/Button'
import Search from '@/svgs/Search'
import MyAccount from '@/svgs/MyAccount'
import Cart from '@/svgs/Cart'
import CartModal from '../CartModal'

export default function Mobile({menuItems, companyInfo, contactPage}: NavbarProps) {
  const {name, address, phone, email, logo} = companyInfo || {}
  const [isOpen, setIsOpen] = useState(false)
  const [showCartModal, setShowCartModal] = useState(false)

  console.log('logo', logo)
  return (
    <>
      {/* Cart Modal */}
      {showCartModal && <CartModal setShowCartModal={setShowCartModal} />}

      <div className="xl:hidden navbar-mobile h-[79px] flex items-center justify-between px-5">
        <div className="flex gap-6 items-center">
          <HamburgerMenu isOpen={isOpen} handleClick={() => setIsOpen(!isOpen)} />
          <Search />
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
        <ul className="flex gap-6">
          <li>
            <Link href="my-account">
              <MyAccount />
            </Link>
          </li>
          <li>
            <button onClick={() => setShowCartModal(true)}>
              <Cart />
            </button>
          </li>
        </ul>

        {isOpen && (
          <div className="absolute top-0 left-0 right-15  w-3/4 h-full bg-white z-50">
            <button className="p-5 font-manrope text-2xl" onClick={() => setIsOpen(false)}>
              X
            </button>
            <hr className="border-gray-500" />
          </div>
        )}
      </div>
    </>
  )
}
