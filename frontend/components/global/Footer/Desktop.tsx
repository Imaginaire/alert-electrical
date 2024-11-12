import {FooterProps} from '@/types'
import Link from 'next/link'
import {CustomPortableText} from '@/components/shared/CustomPortableText'
import ColumnItems from './ColumnItems'
import Payment from './Payment'

export default function Desktop({footer}: FooterProps) {
  return (
    <footer className="hidden md:block bg-primary text-white px-7 py-[52px] ">
      <div className="max-w-[1680px] mx-auto">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 justify-between ">
          {footer &&
            footer.columns?.map((column, index) => {
              return (
                <div key={index} className=" ">
                  <h3 className="text-xl uppercase">{column.header}</h3>
                  <ul className="mt-7">
                    {column.header === 'PAYMENT METHODS' ? (
                      <Payment payment={footer.payment} />
                    ) : (
                      <ul role="list">
                        <ColumnItems column={column} />
                      </ul>
                    )}
                  </ul>
                </div>
              )
            })}
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-center gap-10 my-10">
          <div className="font-manrope font-light text-white text-center">
            {footer?.copyright && <CustomPortableText value={footer.copyright} />}
          </div>
          {footer?.accreditation && (
            <Link href={footer.accreditation.link || ''}>
              <span className="text-white font-manrope block text-center">
                {footer.accreditation.tagline}
              </span>
            </Link>
          )}
        </div>
      </div>
    </footer>
  )
}
