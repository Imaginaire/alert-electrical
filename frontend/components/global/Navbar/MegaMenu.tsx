import {MenuItems, MenuItem} from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import urlForImage from '@/shared/utils/urlForImage'
import {Key} from 'react'

interface MegaMenuProps {
  menuItem: MenuItem
  showMegaMenu: boolean
  setShowMegaMenu: (showMegaMenu: boolean) => void
}

export default function MegaMenu({menuItem, showMegaMenu, setShowMegaMenu}: MegaMenuProps) {
  // If no menu item, return null
  if (!menuItem) return null

  // Initialise mega menu items for each column
  const megaMenuItems = []
  for (let i = 1; i <= 4; i++) {
    const title = (menuItem as any)[`megaMenuItemsColumn${i}Title`] || ''
    const items = (menuItem as any)[`megaMenuItemsColumn${i}`] || []

    if (title && items) {
      megaMenuItems.push({title, items})
    }
  }

  const megaMenuImage = menuItem?.megaMenuImage ? urlForImage(menuItem.megaMenuImage)?.url() : ''

  return (
    <>
      {/* Mega Menu Overlay */}
      <div
        className={`megaMenu-overlay w-full absolute top-24 left-0 h-screen transition-opacity duration-300 bg-black z-20 ${showMegaMenu ? 'opacity-30' : 'opacity-0'} `}
        onMouseEnter={() => setShowMegaMenu(false)}
      ></div>

      {/* Mega Menu */}
      <div
        className={`${
          showMegaMenu ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        } megamenu absolute top-24 left-0 w-full z-50 bg-white flex transition-opacity duration-300`}
      >
        <div className="megamenu-container p-5 w-full flex">
          {/* Column Links */}
          <div className="grid grid-cols-4 w-4/5">
            {megaMenuItems.map((column, index) => (
              <div key={index} className="flex flex-col gap-2">
                <h3 className="uppercase text-xl text-primary">{column.title}</h3>
                {column.items.map((item: MenuItem, itemIndex: Key | null | undefined) => (
                  <a
                    className="text-black"
                    href={(item.link?.current && item.link.current) || '/'}
                    key={itemIndex}
                  >
                    {item.title}
                  </a>
                ))}
              </div>
            ))}
          </div>

          {/* Mega Menu Image */}
          {megaMenuImage && (
            <Link href="/" className="w-1/5 h-full relative">
              <Image
                src={megaMenuImage}
                alt="Mega Menu Image"
                fill={true}
                sizes="25vw"
                className="object-cover object-center"
              />
            </Link>
          )}
        </div>
      </div>
    </>
  )
}
