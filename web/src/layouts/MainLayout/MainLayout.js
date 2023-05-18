import { Footer, Space } from 'antd-mobile'
import Menu from "src/components/Menu/Menu"

const MainLayout = ({ children }) => {
  return (
    <>
      <div style={{ backgroundColor: '#493657' }}><img src="/Title.svg" style={{ width: '200px', margin: 'auto', display: 'block', backgroundColor: '#493657' }} /></div>
      {children}
      <Footer
        style={{ marginBottom: '49px' }}
        label="HomeHelper"
        chips={[
          {
            text: <a href="https://github.com/cvhammond/HomeHelper" target="_blank"><Space><img src="/github-mark.svg" /><span>GitHub</span></Space></a>,
          },
        ]} />
      <Menu />
    </>
  )
}

export default MainLayout
