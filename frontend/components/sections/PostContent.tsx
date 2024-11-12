import {usePathname} from 'next/navigation'
import {CustomPortableText} from '../shared/CustomPortableText'
import type {PostContent} from '@/types'

export default function PostContent(data: PostContent) {
  const {backgroundColour, padding, width} = data

  let widthClass = 'w-full'

  if (width) {
    switch (width) {
      case 75:
        widthClass = 'sm:w-3/4'
        break
      case 60:
        widthClass = 'sm:w-3/5'
        break
      case 50:
        widthClass = 'sm:w-1/2'
        break
      default:
        widthClass = 'sm:w-full'
    }
  }

  return (
    <div className="px-5 pt-10 pb-10 m-auto bg-secondary-grey">
      {data?.content && (
        <div className="max-w-screen-xl m-auto">
          <section
            className="postContent w-full flex justify-center p-5 shadow-lg"
            style={{
              backgroundColor: (backgroundColour?.hex && backgroundColour.hex) || 'white',
              paddingTop: (padding && `${padding}px`) || '0',
              paddingBottom: (padding && `${padding}px`) || '0',
            }}
          >
            <div className={`postContent-container max-w-screen-xl w-11/12 ${widthClass} `}>
              <CustomPortableText
                value={data.content || []}
                headerClasses="text-3xl text-primary mb-4 mt-6 font-bold"
                subheaderClasses="text-xl text-secondary-grey-text mb-4 mt-6 font-bold"
                paragraphClasses="text-secondary-grey-text mb-4"
                listClasses="list-bullets-black pl-10 mb-4"
                listItemClasses="text-secondary-grey-text"
              />
            </div>
          </section>
        </div>
      )}
    </div>
  )
}
