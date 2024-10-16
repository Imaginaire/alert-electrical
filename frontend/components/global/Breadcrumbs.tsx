import {ChevronRightIcon, HomeIcon} from '@heroicons/react/20/solid'
import Link from 'next/link'

interface BreadcrumbsProps {
  pages: {title?: string; path?: string}[]
}

export default function Breadcrumbs({pages}: BreadcrumbsProps) {
  const breadcrumbs = pages

  return (
    <nav aria-label="Breadcrumb" className="flex">
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <div>
            <Link href="/" className="text-primary hover:text-secondary">
              <HomeIcon aria-hidden="true" className="h-5 w-5 flex-shrink-0" />
              <span className="sr-only">Home</span>
            </Link>
          </div>
        </li>
        {breadcrumbs &&
          breadcrumbs.map((breadcrumb) => (
            <li key={breadcrumb.title}>
              <div className="flex items-center">
                <ChevronRightIcon
                  aria-hidden="true"
                  className="h-5 w-5 flex-shrink-0 text-primary"
                />
                <a
                  href={breadcrumb.path}
                  className="ml-4 text-sm font-medium text-primary hover:text-secondary"
                >
                  {breadcrumb.title}
                </a>
              </div>
            </li>
          ))}
      </ol>
    </nav>
  )
}
