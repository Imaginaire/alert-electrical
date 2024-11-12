import Navbar from '@/components/global/Navbar'
import {LayoutProps} from '@/types'
import Footer from '@/components/global/Footer'

export default function Layout({children, settings, preview, loading}: LayoutProps) {
  console.log(settings)
  return (
    <>
      <Navbar
        menuItems={settings?.menuItems}
        upperMenuItems={settings?.upperMenuItems}
        companyInfo={settings?.companyInfo}
        upperMenuCtaText={settings?.upperMenuCtaText}
        deliveryInfoBar={settings?.deliveryInfoBar}
        contactPage={settings?.contactPage}
        blogPage={settings?.blogPage}
        accountPage={settings?.accountPage}
      />
      <div className="">{children}</div>
      <Footer footer={settings?.footer} newsletter={settings?.newsletter} />
    </>
  )
}
