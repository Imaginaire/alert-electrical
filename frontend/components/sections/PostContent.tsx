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
    <>
      {data?.content && (
        <section
          className="postContent w-full flex justify-center"
          style={{
            backgroundColor: (backgroundColour?.hex && backgroundColour.hex) || 'white',
            paddingTop: (padding && `${padding}px`) || '0',
            paddingBottom: (padding && `${padding}px`) || '0',
          }}
        >
          <div className={`postContent-container max-w-screen-xl w-11/12 ${widthClass} `}>
            <CustomPortableText
              value={data.content || []}
              headerClasses="text-3xl text-secondary py-4"
              subheaderClasses="text-2xl text-secondary py-4"
              paragraphClasses="text-secondary-dark-gray pb-2 font-manrope"
              listClasses="list-bullets-black"
              listItemClasses="text-secondary-dark-gray font-manrope"
            />
          </div>
        </section>
      )}
    </>
  )
}
