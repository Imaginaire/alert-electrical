import {NavbarProps} from '@/types'
import Desktop from './Desktop'

export default function Navbar({menuItems, companyInfo, contactPage}: NavbarProps) {
  return (
    <>
      <Desktop menuItems={menuItems} companyInfo={companyInfo} contactPage={contactPage} />
    </>
  )
}
