import React from 'react'
import { Layout, Divider } from 'antd'
import DashboardFooter from '@/components/dashboard/footer'
import DashboardHeader from '@/components/dashboard/header'
import MenuComponent from '@/components/dashboard/menu'
import { BrandText, Logo, LogoContainer } from './style'
import { SpanLogo } from '@/components/title'

const theme = 'light'

const { Header, Footer, Sider, Content } = Layout;

type DashboardProps = {
  children: React.ReactNode;
}

const Dashboard: React.FC<DashboardProps> = ({ children }) => {
  return (
    <div>
      <Layout>
        <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, textAlign: "center" }}
          theme={theme}
        >
          <LogoContainer>
            <Logo src="https://libra-novel.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flibra.9f3498a1.png&w=640&q=75" alt='logo' />
            <BrandText>Libra<SpanLogo>Restaurant</SpanLogo></BrandText>
          </LogoContainer>
          <Divider />
          <MenuComponent />
        </Sider>
        <Layout style={{ marginLeft: 200 }}>
          <Header style={{ padding: 0 }}>
            <DashboardHeader />
          </Header>
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            {children}
          </Content>
          <Footer>
            <DashboardFooter />
          </Footer>
        </Layout>
      </Layout>
    </div>
  )
}

export default Dashboard;