import {ChevronRightIcon, HomeIcon} from '@heroicons/react/20/solid'
import Link from 'next/link'

export type BreadcrumbType = {title: string; path?: string}

interface BreadcrumbsProps {
  crumbs: BreadcrumbType[]
}

export default function Breadcrumbs({crumbs}: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex">
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <div>
            <Link href="/" className="hover:text-secondary-grey-text text-sm font-bold">
              Home
            </Link>
          </div>
        </li>
        {crumbs &&
          crumbs.map((crumb) => (
            <li key={crumb.title}>
              <div className="flex items-center">
                <ChevronRightIcon aria-hidden="true" className="h-5 w-5 flex-shrink-0 " />
                {crumb.path ? (
                  <Link
                    href={crumb.path}
                    className="ml-4 text-sm font-medium  hover:text-secondary-grey-text font-bold"
                  >
                    {crumb.title}
                  </Link>
                ) : (
                  <span className="ml-4 text-sm font-medium ">{crumb.title}</span>
                )}
              </div>
            </li>
          ))}
      </ol>
    </nav>
  )
}
