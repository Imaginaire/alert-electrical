import {PortableTextBlock} from 'sanity'
import {CustomPortableText} from '../shared/CustomPortableText'
import Breadcrumbs from '../global/Breadcrumbs'
import {usePathname} from 'next/navigation'

interface TextWithBreadcrumbsType {
  content: any[]
}

export default function TextWithBreadcrumbs(data: TextWithBreadcrumbsType) {
  const {content} = data
  const pathname = usePathname()

  // Convert URL path to breadcrumbs
  const crumbs = pathname
    .split('/')
    .filter(Boolean)
    .map((crumb) => ({
      title: crumb.charAt(0).toUpperCase() + crumb.slice(1).replace(/-/g, ' '),
      href: '/' + crumb,
    }))

  return (
    <div className="text-with-breadcrumbs max-w-[1000px] mx-auto mt-11">
      <Breadcrumbs crumbs={crumbs} />
      <div className="text-center px-5 pt-7">
        <CustomPortableText
          value={content}
          headerClasses="text-sm font-bold mb-4 xl:text-lg"
          paragraphClasses="text-sm mb-4 xl:text-lg"
        />
      </div>
    </div>
  )
}
