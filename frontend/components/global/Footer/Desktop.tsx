import {FooterProps} from '@/types'
import Link from 'next/link'
import {CustomPortableText} from '@/components/shared/CustomPortableText'
import ColumnItems from './ColumnItems'
import Payment from './Payment'
import GetInTouch from './GetInTouch'

export default function Desktop({footer, companyInfo, socialMedia}: FooterProps) {
  return (
    <footer className="hidden xl:block bg-primary text-white px-7 py-[52px]">
      <div className="flex items-start justify-between">
        {footer &&
          footer.columns?.map((column, index) => {
            return (
              <div key={index} className=" ">
                <h3 className="text-xl uppercase">{column.header}</h3>
                <ul className="mt-7">
                  {column.header === 'Get in Touch' ? (
                    <GetInTouch companyInfo={companyInfo} socialMedia={socialMedia} />
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

      {footer?.payment && <Payment payment={footer.payment} />}

      <div className="font-manrope font-light my-10 mx-5 text-white text-center">
        {footer?.copyright && <CustomPortableText value={footer.copyright} />}
      </div>
      {footer?.accreditation && (
        <Link href={footer.accreditation.link || ''}>
          <span className="text-white font-manrope block text-center">
            {footer.accreditation.tagline}
          </span>
        </Link>
      )}
    </footer>
  )
}
