import Navbar from '@/components/global/Navbar'
import {LayoutProps} from '@/types'

export default function Layout({children, settings, preview, loading}: LayoutProps) {
  return (
    <>
      <Navbar
        menuItems={settings?.menuItems}
        companyInfo={settings?.companyInfo}
        contactPage={settings?.contactPage}
        settings={settings}
      />
      <div className="">{children}</div>
    </>
  )
}
