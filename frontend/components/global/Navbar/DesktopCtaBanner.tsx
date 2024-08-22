import type {CtaBanner} from '@/types'
import Link from 'next/link'

interface CtaBannerProps {
  ctas: CtaBanner['ctas']
}

export default function DesktopCtaBanner(props: CtaBannerProps) {
  const {ctas = []} = props

  console.log(ctas)

  return (
    <>
      {ctas.length > 0 && (
        <div className="bg-primary text-white flex justify-between items-center w-full py-4 text-base">
          {ctas.map((cta, index) => {
            if (cta.link) {
              return (
                <Link href={cta.link?.slug ?? ''} key={index} className="hover:text-blue-400">
                  {cta.text}
                </Link>
              )
            }
            return <span key={index}>{cta.text}</span>
          })}
        </div>
      )}
    </>
  )
}
