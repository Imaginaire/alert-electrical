import {Footer} from '@/types'

interface MobileProps {
  footer: Footer
}

export default function Mobile({footer}: MobileProps) {
  console.log('footer', footer)
  return <footer></footer>
}
