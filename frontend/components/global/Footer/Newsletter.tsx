import {Newsletter as NewsletterType} from '@/types'

export default function Newsletter({newsletter}: {newsletter: NewsletterType}) {
  return (
    <div className="bg-secondary-grey px-7 py-12 ">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center ">
        <div className=" flex flex-col gap-1 text-center lg:text-left flex-1">
          <h2 className=" text-secondary-grey-text text-2xl font-bold">{newsletter.heading}</h2>
          <p>{newsletter.subHeading}</p>
        </div>

        <div className="flex min-w-[500px] max-w-4xl lg:w-full flex-1 mt-7 lg:mt-0">
          <div className="relative flex-grow ">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-4 bg-pwhite rounded-md"
            />
            <button className="absolute right-1 top-1/2 -translate-y-1/2  px-6 py-2 text-secondary-grey-text uppercase font-bold rounded">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
