import {CustomPortableText} from '../shared/CustomPortableText'
import {useState} from 'react'

interface AccordionType {
  mainHeading: string
  items: {
    heading: string
    description: any
  }[]
}

export default function Accordion(data: AccordionType) {
  const {mainHeading, items} = data
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="accordion px-5 lg:px-0 py-7 max-w-[1280px] mx-auto">
      <h3 className="text-2xl font-medium text-center pb-7 mb-3 border-b border-stone-200">
        {mainHeading}
      </h3>
      <ul className="space-y-4">
        {items.map((item, index) => (
          <li key={item.heading} className="border-b border-stone-200 rounded-lg">
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full flex justify-between items-center p-4 text-left"
            >
              <h4 className="text-lg lg:text-xl font-medium mr-2">{item.heading}</h4>
              <svg
                className="w-6 h-6 bg-secondary-grey rounded-md p-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {openIndex === index ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                )}
              </svg>
            </button>
            <div className={`${openIndex === index ? 'p-4' : 'hidden'}`}>
              <CustomPortableText value={item.description} />
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
