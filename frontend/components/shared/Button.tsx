/*
  @TODO: create internalLink / externalLink 
*/

import Link from 'next/link'
import prepareHref from '@/shared/utils/prepareHref'

interface ButtonProps {
  text: string | React.ReactNode
  link: string
  fullWidth?: boolean
  classes?: string
  position?: 'left' | 'right' | 'center'
}

export function Button({text, link, fullWidth, classes = '', position}: ButtonProps) {
  const wrapperClasses = position ? `flex justify-${position}` : ``

  return (
    <Link href={prepareHref(link)} className={`${wrapperClasses} ${fullWidth ? 'w-full' : ''} `}>
      <span
        className={`bg-primary ${classes} border-primary transition-all duration-500 ease-in-out hover:bg-white hover:text-primary text-white ${
          position ? 'text-base' : 'text-xs'
        } px-3 rounded-full hover:border-primary py-2 ${fullWidth ? 'w-full' : ''}`}
      >
        {text}
      </span>
    </Link>
  )
}
