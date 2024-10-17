import SocialMediaBlock from '@/components/shared/SocialMediaBlock'
import {FooterProps} from '@/types'

interface GetInTouchProps {
  companyInfo: FooterProps['companyInfo']
  socialMedia: FooterProps['socialMedia']
}

export default function GetInTouch({companyInfo, socialMedia}: GetInTouchProps) {
  return (
    <ul className="text-white xl:p-0 underline decoration-[0.5px] font-manrope font-light break-words px-5 md:px-0">
      <li className="py-1">{companyInfo?.phone}</li>
      <li className="py-1">{companyInfo?.email}</li>
      <li className="py-1">{`${companyInfo?.address?.street},`}</li>
      <li className="py-1">{`${companyInfo?.address?.city},`}</li>
      <li className="py-1">{companyInfo?.address?.postCode}</li>
      {socialMedia && (
        <SocialMediaBlock
          containerClasses="self-start mt-10"
          listClasses="mr-4"
          imgaeClasses="brightness-0 invert-1"
          socialMedia={socialMedia}
        />
      )}
    </ul>
  )
}
