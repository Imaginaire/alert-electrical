import urlForImage from '@/shared/utils/urlForImage'
import Image from 'next/image'
import {Footer} from '@/types'

interface PaymentProps {
  payment: Footer['payment']
}

export default function Payment({payment}: PaymentProps) {
  return (
    <ul className="flex items-center justify-center gap-5 lg:gap-2 md:justify-between px-5 md:px-0">
      {payment?.paymentIcons?.map((icon, index) => {
        const iconUrl = icon ? urlForImage(icon.icon)?.width(1920).url() : undefined
        return (
          <li key={index} className="relative h-12 w-14">
            <Image
              src={iconUrl || ''}
              alt=""
              sizes="10vw"
              fill={true}
              className="object-contain object-center"
              priority={true}
              quality={100}
            />
          </li>
        )
      })}
    </ul>
  )
}
