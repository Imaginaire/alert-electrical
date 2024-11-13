import {Header as HeaderType} from '@/types'
import Header from './Header'

interface HeaderStrapProps {
  header: HeaderType
}

export default function HeaderStrap(data: HeaderStrapProps) {
  const {header} = data

  return (
    <section className="bg-primary ">
      <Header
        header={header.header}
        headerTag={header.headerTag}
        classes="text-white text-center text-4xl font-semibold uppercase py-6"
      />
    </section>
  )
}
