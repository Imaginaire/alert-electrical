import Link from 'next/link'
import Image from 'next/image'
import urlForImage from '@/shared/utils/urlForImage'

type ServiceAreasProps = {
  services: ServiceAreasType[]
}

type ServiceAreasType = {
  heading: string
  icon: {asset: {url: string}}
  mainLink: {text: string; slug: {current: string}}
  textLinks: {text: string; slug: {current: string}}[]
}

export default function ServiceAreas({services}: ServiceAreasProps) {
  return (
    <div className="my-3 mx-2 lg:mt-10 lg:mx-7">
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[10px]">
        {services.map((service) => (
          <div
            key={service.heading}
            className="bg-secondary-grey rounded-md px-2 pt-4 pb-2 lg:p-8 h-[300px] lg:h-[400px] flex flex-col"
          >
            <div className="relative mb-2 w-[30px] h-[32px] lg:w-[56px] lg:h-[64px]">
              <Image
                src={urlForImage(service.icon.asset).url()}
                alt={service.heading}
                fill
                className="object-contain"
                quality={100}
              />
            </div>
            <h2 className="uppercase font-medium">{service.heading}</h2>
            {service.textLinks.map((textLink) => (
              <Link
                href={textLink.slug.current}
                key={textLink.text}
                className="uppercase underline text-secondary-grey-text hover:text-stone-500  mt-[10px]"
              >
                {textLink.text}
              </Link>
            ))}
            <div className="mt-auto">
              <Link
                href={service.mainLink.slug.current}
                className="uppercase text-primary underline font-medium hover:text-secondary-blue"
              >
                {service.mainLink.text}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
