import { Layout } from "antd"
import { Content, Footer, Header } from "antd/es/layout/layout"
import Menu from "src/components/Menu/Menu"
import FloatingMenu from "src/components/FloatingMenu/FloatingMenu"

const MainLayout = ({ children }) => {
  return (
    <>
      <Header style={{ paddingInline: '16px' }}>
        <Menu />
      </Header>
      <Layout style={{ margin: 'auto', maxWidth: '900px', padding: '24px' }}>
        <FloatingMenu />
        <Content>
          {children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          HomeHelper ©2023 Created by <a href="https://cvhammond.com">Claire V. Hammond</a>
        </Footer>
      </Layout>
    </>
  )
}

export default MainLayout