import type {CtaBanner} from '@/types'
import Link from 'next/link'

interface CtaBannerProps {
  ctas: CtaBanner['ctas']
}

export default function DesktopCtaBanner(props: CtaBannerProps) {
  const {ctas = []} = props

  return (
    <>
      {ctas.length > 0 && (
        <div className="bg-primary text-white  w-full py-3 text-base">
          <div className="mx-7 flex justify-between items-center">
            {ctas.map((cta, index) => {
              if (cta.link) {
                return (
                  <Link
                    href={cta.link?.slug ?? ''}
                    key={index}
                    className="hover:text-blue-400 transition-colors duration-200 ease-in-out"
                  >
                    {cta.text}
                  </Link>
                )
              }
              return <span key={index}>{cta.text}</span>
            })}
          </div>
        </div>
      )}
    </>
  )
}
