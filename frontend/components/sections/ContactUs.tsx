import Envelope from '@/svgs/Envelope'
import {CustomPortableText} from '../shared/CustomPortableText'
import Phone from '@/svgs/Phone'
import FormBuilder from './FormBuilder'
import {FormBuilderType} from '@/types'

interface ContactUsProps {
  emailDetails: {
    emailDetailsContent: any
    emailLink: string
    emailLinkText: string
  }
  phoneDetails: {
    phoneDetailsContent: any
    phoneLink: string
    phoneLinkText: string
  }

  formBuilder: FormBuilderType
}

export default function ContactUs(data: ContactUsProps) {
  const {emailDetailsContent} = data.emailDetails
  const {phoneDetailsContent} = data.phoneDetails
  const {formBuilder} = data

  return (
    <section className="contactUs px-5 bg-secondary-grey flex justify-center ">
      {/* Container  */}

      <div className="contactUs-container grid grid-cols-1 md:grid-cols-2 gap-2 w-full max-w-screen-2xl ">
        {/*Left */}

        <div className="contactUs-left grid grid-cols-1 sm:grid-cols-2 gap-2">
          {/* Email */}
          <div className="contactUs-left-email flex flex-col items-center p-12 sm:px-4 sm:py-8 bg-white rounded-sm shadow-md">
            <Envelope fill={'#15387D'} width={50} height={50} />
            <CustomPortableText
              subheaderClasses="text-2xl font-semibold my-4 uppercase"
              value={emailDetailsContent}
            />

            {/* Email button */}
            <a className="w-full mt-auto pt-6" href={`mailto:${data.emailDetails.emailLink}`}>
              <button className="bg-primary w-full text-white  px-4 py-1 rounded-lg uppercase">
                {data.emailDetails.emailLinkText}
              </button>
            </a>
          </div>

          {/* Phone */}
          <div className="contactUs-left-phone flex sm:px-4 sm:py-8 p-12 flex-col items-center bg-white rounded-sm shadow-md">
            <Phone fill={'#15387D'} width={50} height={50} />
            <CustomPortableText
              subheaderClasses="text-2xl font-semibold my-4 uppercase"
              value={phoneDetailsContent}
            />

            {/* Phone button */}
            <a className="w-full pt-6 mt-auto" href={`tel:${data.phoneDetails.phoneLink}`}>
              <button className="bg-primary w-full text-white px-4 py-1 rounded-lg uppercase">
                {data.phoneDetails.phoneLinkText}
              </button>
            </a>
          </div>
        </div>

        {/* Right */}

        <div className="contactUs-right">
          <FormBuilder {...formBuilder} />
        </div>
      </div>
    </section>
  )
}
