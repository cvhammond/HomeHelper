import { Layout, ConfigProvider } from "antd"
import { Content, Footer, Header } from "antd/es/layout/layout"
import Menu from "src/components/Menu/Menu"
import FloatingMenu from "src/components/FloatingMenu/FloatingMenu"

const MainLayout = ({ children }) => {
  return (
    <ConfigProvider
      theme={
        {
          token: {
            "colorPrimary": "#493657",
            "colorBgBase": "#f8f6f0",
            "colorError": "#e65f5c",
            "colorWarning": "#f5cb5c",
            "colorSuccess": "#297045",
            "colorSuccessActive": "#1d4e30",
            "colorSuccessTextActive": "#1d4e30",
            "colorSuccessBg": "#e5f5eb",
            "colorSuccessBgHover": "#cbecd8",
            "colorSuccessBorder": "#b1e2c4",
            "colorSuccessBorderHover": "#3ca465",
            "colorSuccessHover": "#3ca465",
            "colorWarningBg": "#fdf5de",
            "colorWarningBgHover": "#fcefce",
            "colorWarningBorder": "#fbeabe",
            "colorWarningBorderHover": "#f7d57d",
            "colorWarningHover": "#f7d57d",
            "colorErrorBg": "#fadfe2",
            "colorErrorBgHover": "#f8cfd3",
            "colorErrorBorder": "#f5bfc4",
            "colorErrorBorderHover": "#f09fa7",
            "colorErrorHover": "#eb7f89",
            "colorErrorTextHover": "#eb7f89",
            "colorPrimaryBg": "#dbd1e3",
            "colorPrimaryBgHover": "#cabbd5",
            "colorPrimaryBorder": "#b8a4c6",
            "colorPrimaryBorderHover": "#9476aa",
            "colorPrimaryHover": "#6f5285",
            "colorPrimaryTextHover": "#6f5285",
            "colorInfo": "#5c446e",
            "colorInfoBg": "#dbd1e3",
            "colorInfoBgHover": "#cabbd5",
            "colorInfoBorder": "#b8a4c6",
            "colorInfoBorderHover": "#9476aa",
            "colorInfoHover": "#6f5285",
            "colorInfoTextHover": "#6f5285",
            "fontSize": 16,
            "borderRadius": 8,
            "colorPrimaryActive": "#271c30",
            "colorInfoText": "#5c446e"
          }
        }}>
      <div style={{ backgroundColor: '#493657' }}><img src="/Title.svg" style={{ width: '200px', margin: 'auto', display: 'block', backgroundColor: '#493657' }} /></div>
      <Menu />
      <Layout style={{ margin: 'auto', maxWidth: '900px', padding: '24px' }}>
        <FloatingMenu />
        <Content>
          {children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          <div>HomeHelper ©2023</div>
          <div>Created by <a href="https://cvhammond.com">Claire V. Hammond</a></div>
        </Footer>
      </Layout>
    </ConfigProvider>
  )
}

export default MainLayout
