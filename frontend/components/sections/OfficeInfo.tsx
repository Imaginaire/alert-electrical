import {Header as HeaderType} from '@/types'
import {Image as ImageType} from 'sanity'
import Header from './Header'
import Image from 'next/image'
import urlForImage from '@/shared/utils/urlForImage'
import {CustomPortableText, CustomPortableTextType} from '../shared/CustomPortableText'

interface OfficeInfoType {
  officeCard: {
    content: any
    header: HeaderType
    image: ImageType
    additionalContent: any
  }
  branchesCard: {
    header: HeaderType
    branches: Array<{
      branchContent: CustomPortableTextType
    }>
  }
}

export default function OfficeInfo(data: OfficeInfoType) {
  const {officeCard, branchesCard} = data

  const OfficeInfoLeft = ({showHeader}: {showHeader: boolean}) => {
    return (
      <div className="officeInfo-left bg-white rounded-sm shadow-md p-8">
        {showHeader && (
          <Header
            header={officeCard.header.header}
            headerTag={officeCard.header.headerTag}
            classes="text-black text-2xl font-semibold uppercase "
          />
        )}

        <div className="officeInfo-left-image relative w-[40%] h-16 md:h-24">
          <Image
            src={urlForImage(officeCard.image).url() || ''}
            fill
            alt="logo"
            className="object-contain"
          />
        </div>

        <CustomPortableText paragraphClasses="mb-2" value={officeCard.content} />

        <div className="bg-secondary-light-blue rounded-md p-8 mt-6">
          <CustomPortableText
            paragraphClasses="mb-2 text-primary font-semibold"
            value={officeCard.additionalContent}
          />
        </div>
      </div>
    )
  }

  const OfficeInfoRight = ({showHeader}: {showHeader: boolean}) => {
    return (
      <div className="officeInfo-right bg-white rounded-sm shadow-md p-8">
        {showHeader && (
          <Header
            header={branchesCard.header.header}
            headerTag={branchesCard.header.headerTag}
            classes="text-black text-2xl font-semibold uppercase "
          />
        )}

        {/* Branches */}
        <div className="officeInfo-right-branches md:mt-4 grid grid-cols-2 gap-6">
          {branchesCard?.branches &&
            branchesCard?.branches?.map((branch, index) => (
              <div key={index}>
                <CustomPortableText
                  subheaderClasses="text-xl mb-2 font-semibold"
                  value={branch?.branchContent as any}
                />
              </div>
            ))}
        </div>
      </div>
    )
  }

  return (
    <section className="officeInfo px-5 bg-secondary-grey flex justify-center py-2">
      {/* Container - Desktop */}
      <div className="officeInfo-container hidden md:grid md:grid-cols-2 gap-2 w-full max-w-screen-2xl">
        {/* Left */}
        <OfficeInfoLeft showHeader={true} />

        {/* Right  */}
        <OfficeInfoRight showHeader={true} />
      </div>

      {/* Container - Mobile */}
      <div className="officeInfo-container-mobile md:hidden w-full flex flex-col shadow-md rounded-sm bg-white">
        {/* Details dropdown */}
        <details className="">
          <summary className="flex justify-between p-5 border-b ">
            <Header
              header={officeCard.header.header}
              headerTag={officeCard.header.headerTag}
              classes="text-black text-2xl font-semibold uppercase "
            />
            <svg
              fill="none"
              height="24"
              shape-rendering="geometricPrecision"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              width="24"
            >
              <path d="M6 9l6 6 6-6"></path>
            </svg>
          </summary>
          <OfficeInfoLeft showHeader={false} />
        </details>

        {/* Branches dropdown */}
        <details className="">
          <summary className="flex justify-between p-5 border-b ">
            <Header
              header={branchesCard.header.header}
              headerTag={branchesCard.header.headerTag}
              classes="text-black text-2xl font-semibold uppercase "
            />
            <svg
              fill="none"
              height="24"
              shape-rendering="geometricPrecision"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              width="24"
            >
              <path d="M6 9l6 6 6-6"></path>
            </svg>
          </summary>
          <OfficeInfoRight showHeader={false} />
        </details>
      </div>
    </section>
  )
}
