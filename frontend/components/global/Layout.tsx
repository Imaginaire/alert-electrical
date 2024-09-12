import Navbar from '@/components/global/Navbar'
import {LayoutProps} from '@/types'
import Footer from '@/components/global/Footer'

export default function Layout({children, settings, preview, loading}: LayoutProps) {
  console.log('wwwwwwwsettings', settings)
  return (
    <>
      <Navbar
        menuItems={settings?.menuItems}
        companyInfo={settings?.companyInfo}
        contactPage={settings?.contactPage}
        navCta={settings?.navCta}
      />
      <div className="">{children}</div>
      <Footer
        footer={settings?.footer}
        companyInfo={settings?.companyInfo}
        socialMedia={settings?.socialMedia}
      />
    </>
  )
}
