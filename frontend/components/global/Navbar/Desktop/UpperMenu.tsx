import {MenuItem} from '@/types'

export default function UpperMenu({
  upperMenuItems,
  upperMenuCtaText,
}: {
  upperMenuItems: MenuItem[]
  upperMenuCtaText: string
}) {
  return (
    <div className="w-full bg-primary flex items-center  px-5">
      {/* Links Left */}
      <div className="flex  w-1/3 items-center h-10">
        <ul className="flex gap-4">
          {upperMenuItems.map((item, index) => (
            <li key={index} className=" text-white text-base">
              {item.title}
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}

      <p className="text-white w-1/3 text-center">{upperMenuCtaText}</p>

      {/* VAT toggle */}
      <div className="text-end w-1/3 text-white"> vat toggle placeholder</div>
    </div>
  )
}
