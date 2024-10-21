import {useEffect, useState} from 'react'
import Link from 'next/link'
import Chevron from '@/svgs/Chevron'
import {MenuItem} from '@/types'
import {NavbarProps} from '@/types'

interface MobileMenuModalProps extends NavbarProps {
  isOpen: boolean
  closeMenu: () => void
}

export default function MobileMenuModal({
  menuItems,
  menuItemsRight,
  isOpen,
  closeMenu,
}: MobileMenuModalProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [shouldRender, setShouldRender] = useState(isOpen)

  // Combine menuItems and menuItemsRight into one array
  const menuItemsArray = [
    ...(Array.isArray(menuItems) ? menuItems : []),
    ...(Array.isArray(menuItemsRight) ? menuItemsRight : []),
  ]

  console.log('menuItemsArray', menuItemsArray)

  // Handle visibility and body overflow
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true) // Ensure modal is rendered
      document.body.style.overflow = 'hidden'
      setTimeout(() => setIsVisible(true), 10) // Start fade-in
    } else {
      setIsVisible(false) // Start fade-out
      setTimeout(() => {
        setShouldRender(false) // Delay unmount until fade-out completes
        document.body.style.overflow = ''
      }, 300) // Delay matches the transition duration (300ms)
    }
  }, [isOpen])

  return (
    shouldRender && (
      <div className="menuModal fixed inset-0 z-[60]">
        {/* Overlay */}
        <div
          onClick={closeMenu}
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${
            isVisible ? 'opacity-60' : 'opacity-0'
          } z-[60]`}
        ></div>

        {/* Modal Container */}
        <div
          className={`relative z-[70] w-[90%] h-full bg-white flex flex-col transition-transform duration-300 ${
            isVisible ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Close Button */}
          <button className="p-5 font-manrope text-start text-primary" onClick={closeMenu}>
            X
          </button>

          <hr className="border-secondary" />

          {/* Menu Items */}
          <div className="flex flex-col overflow-y-auto h-full">
            {Array.isArray(menuItemsArray) &&
              menuItemsArray.map((menuItem, key) => {
                const hasMegaMenu = menuItem.useMegaMenu
                let megaMenuItems = []
                if (hasMegaMenu) {
                  for (let i = 1; i <= 4; i++) {
                    const title = (menuItem as any)[`megaMenuItemsColumn${i}Title`] || ''
                    const items = (menuItem as any)[`megaMenuItemsColumn${i}`] || ''
                    if (title && items) {
                      megaMenuItems.push({title, items})
                    }
                  }
                }

                return (
                  <div className="py-4 px-4 border-b border-b-secondary" key={key}>
                    {hasMegaMenu ? (
                      <>
                        {/* First Level Links */}
                        <details className="group w-full">
                          <summary className="flex list-none cursor-pointer items-center justify-between">
                            <h2 className="text-xl text-primary uppercase">{menuItem.title}</h2>
                            <span className="transition group-open:rotate-180">
                              <Chevron />
                            </span>
                          </summary>
                          <ul className="pl-2 mt-2">
                            {/* Second Level Links */}
                            {megaMenuItems.map((column, index) => (
                              <details className="group/item w-full py-2" key={index}>
                                <summary className="flex list-none cursor-pointer items-center justify-between">
                                  <h3 className="uppercase text-base text-primary">
                                    {column.title}
                                  </h3>
                                  <span className="transition group-open/item:rotate-180">
                                    <Chevron />
                                  </span>
                                </summary>
                                <li className="flex flex-col gap-2 pl-2 pt-2">
                                  {column.items.map((item: MenuItem, itemIndex: number) => (
                                    <Link
                                      href={(item.link?.current && item.link.current) || '/'}
                                      key={itemIndex}
                                      className="text-gray-800"
                                    >
                                      {item.title}
                                    </Link>
                                  ))}
                                </li>
                              </details>
                            ))}
                          </ul>
                        </details>
                      </>
                    ) : (
                      <>
                        {menuItem.sanityLink ? (
                          <Link
                            href={menuItem.sanityLink?.slug || '/'}
                            className="text-xl text-primary uppercase"
                          >
                            {menuItem.title}
                          </Link>
                        ) : menuItem.externalLink ? (
                          <a
                            href={menuItem.externalLink || ''}
                            className="text-xl text-primary uppercase"
                          >
                            {menuItem.title}
                          </a>
                        ) : (
                          <a
                            href={`/${menuItem.link?.current || ''}`}
                            className="text-xl text-primary uppercase"
                          >
                            {menuItem.title}
                          </a>
                        )}
                      </>
                    )}
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    )
  )
}
