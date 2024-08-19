import {Header as HeaderType} from '@/types'

export default function Header(data: HeaderType) {
  const {header, headerTag} = data || {}

  const validHeaderTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const

  const HeaderTag = validHeaderTags.includes(headerTag) ? headerTag : 'h1'

  return <>{data && <HeaderTag>{header}</HeaderTag>}</>
}
