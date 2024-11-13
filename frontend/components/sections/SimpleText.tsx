import {CustomPortableText} from '../shared/CustomPortableText'

interface SimpleTextProps {
  text: any
}

export default function SimpleText(data: SimpleTextProps) {
  return (
    <section className="simpleText p-5 flex justify-center bg-secondary-grey">
      {/* Container */}
      <div className="w-full md:py-12 p-8 md:px-20 bg-secondary-light-blue max-w-screen-2xl">
        <CustomPortableText paragraphClasses={'text-primary font-semibold'} value={data.text} />
      </div>
    </section>
  )
}
