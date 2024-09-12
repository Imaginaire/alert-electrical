import urlForImage from '@/shared/utils/urlForImage'
import {LockClosedIcon} from '@heroicons/react/24/outline'
import Image from 'next/image'
import {Footer} from '@/types'

interface PaymentProps {
  payment: Footer['payment']
}

export default function Payment({payment}: PaymentProps) {
  return (
    <div className="xl:flex items-center justify-center gap-16 xl:my-14">
      <div className="flex items-center justify-center gap-7 mt-10 mb-5 mx-5 xl:m-0">
        {payment?.paymentIcons?.map((icon, index) => {
          const iconUrl = icon ? urlForImage(icon.icon)?.width(1920).url() : undefined
          return (
            <div key={index}>
              <Image
                src={iconUrl || ''}
                alt=""
                sizes="100vw"
                width={50}
                height={24}
                className="object-cover object-center"
                priority={true}
                quality={100}
              />
            </div>
          )
        })}
      </div>
      <div className="flex justify-center items-center gap-6">
        <LockClosedIcon className="text-white h-5 stroke-2" />
        <p className="text-white uppercase font-manrope text-center">{payment?.paymentText}</p>
      </div>
    </div>
  )
}
