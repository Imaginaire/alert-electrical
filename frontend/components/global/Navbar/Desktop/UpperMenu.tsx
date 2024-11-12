import {MenuItem} from '@/types'
import VatToggle from './VatToggle'

export default function UpperMenu({
  upperMenuItems,
  upperMenuCtaText,
}: {
  upperMenuItems: MenuItem[]
  upperMenuCtaText: string
}) {
  return (
    <div className="w-full bg-primary flex justify-between items-center h-10 px-5">
      {/* Links Left */}
      <div className=" w-1/3 items-center hidden lg:flex">
        <ul className="flex gap-4">
          {upperMenuItems.map((item, index) => (
            <li key={index} className=" text-white text-sm xl:text-base">
              {item.title}
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <p className="text-white hidden sm:flex w-1/2 lg:w-1/3 text-sm xl:text-base text-left lg:text-center">
        {upperMenuCtaText}
      </p>

      {/* VAT toggle */}
      <VatToggle />
    </div>
  )
}
