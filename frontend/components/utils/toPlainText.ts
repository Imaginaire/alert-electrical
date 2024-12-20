import type {PortableTextBlock} from '@portabletext/types'

export default function toPlainText(blocks: any = []) {
  return (
    blocks
      // loop through each block
      .map((block: PortableTextBlock) => {
        // if it's not a text block with children,
        // return nothing
        if (block._type !== 'customBlock' || !block.children) {
          return ''
        }
        // loop through the children spans, and join the
        // text strings
        return block.children.map((child) => child.text).join('')
      })
      // join the paragraphs leaving split by two linebreaks
      .join('\n\n')
  )
}
