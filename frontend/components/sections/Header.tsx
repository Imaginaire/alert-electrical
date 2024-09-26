import {Header as HeaderType} from '@/types'

export default function Header({header, headerTag, classes}: HeaderType & {classes?: string}) {
  console.log('Header:', classes)

  const validHeaderTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const

  const HeaderTag = validHeaderTags.includes(headerTag) ? headerTag : 'h1'

  return <>{header && <HeaderTag className={classes ? classes : ''}>{header}</HeaderTag>}</>
}
