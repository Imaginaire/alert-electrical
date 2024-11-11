import {Column} from '@/types'
import Link from 'next/link'

interface ColumnItemsProps {
  column: Column
}

export default function ColumnItems({column}: ColumnItemsProps) {
  return (
    <>
      {column.columnCollectionsLinks?.map((collection, index) => (
        <li key={index} className="py-1">
          <Link href={collection.link || '/'}>
            <span className="text-white first-letter:uppercase decoration-[0.5px] underline font-manrope">
              {collection.title}
            </span>
          </Link>
        </li>
      ))}
      {column.columnLinks?.map((link, index) => (
        <li key={index} className="py-1">
          {link.slug?.startsWith('http') ? (
            <a
              href={link.slug}
              rel="noopener noreferrer"
              className="text-white first-letter:uppercase decoration-[0.5px]  font-manrope"
            >
              {link.title}
            </a>
          ) : (
            <Link href={link.slug || '/'}>
              <span className="text-white first-letter:uppercase decoration-[0.5px]  font-manrope">
                {link.title}
              </span>
            </Link>
          )}
        </li>
      ))}
    </>
  )
}
