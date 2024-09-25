import {Column} from '@/types'
import Link from 'next/link'

interface ColumnItemsProps {
  column: Column
}

export default function ColumnItems({column}: ColumnItemsProps) {
  return (
    <>
      {column.columnLinks?.map((link, index) => (
        <li key={index} className="py-1">
          <Link href={link.slug || '/'}>
            <span className="text-white first-letter:uppercase decoration-[0.5px] underline font-manrope">
              {link.title}
            </span>
          </Link>
        </li>
      ))}
    </>
  )
}
