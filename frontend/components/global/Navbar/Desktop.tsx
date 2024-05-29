// Utils
import {useState} from 'react'
import {resolveHref} from '@/shared/utils/resolveHref'

// types
import {NavbarProps} from '@/types'

// components
import Link from 'next/link'
import Image from 'next/image'
import urlForImage from '@/shared/utils/urlForImage'

export default function Desktop({menuItems, companyInfo, contactPage}: NavbarProps) {
  const {name, address, phone, email, logo} = companyInfo || {}
  const [showMegaMenu, setShowMegaMenu] = useState(false)

  return (
    <>
      <div className="navbar-desktop flex h-24 items-center">
        {/* Left - Logo */}

        {logo && (
          <span>
            <Link href="/">
              <Image
                src={urlForImage(logo)?.url()}
                alt={(logo?.alt as string) || 'company logo'}
                width={100}
                height={100}
              />
            </Link>
          </span>
        )}

        {/* Center - Links */}

        <ul className="flex w-full justify-around">
          {menuItems &&
            menuItems.map((menuItem, index) => {
              const href = resolveHref(menuItem.type, menuItem.slug)

              if (!href) return null

              return (
                <li key={index}>
                  <Link href={href}>{menuItem.title}</Link>
                </li>
              )
            })}
        </ul>

        {/* Right - Contact */}
      </div>
    </>
  )
}
