import {Embed as EmbedProps} from '@/types'
import DOMPurify from 'dompurify'

const Embed = (data: EmbedProps) => {
  const {html} = data || {}

  return html && <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(html) || ''}} />
}

export default Embed
