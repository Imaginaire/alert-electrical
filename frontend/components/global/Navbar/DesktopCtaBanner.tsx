import type {CtaBanner} from '@/types'

interface CtaBannerProps {
  navCta: CtaBanner
}

export default function DesktopCtaBanner({navCta}: CtaBannerProps) {
  const {texts} = navCta || {}

  return (
    <>
      {navCta && (
        <div className="bg-primary text-white flex justify-between items-center w-full py-4 text-base">
          {texts?.map((text, index) => (
            <span key={index} className="">
              {text}
            </span>
          ))}
        </div>
      )}
    </>
  )
}
