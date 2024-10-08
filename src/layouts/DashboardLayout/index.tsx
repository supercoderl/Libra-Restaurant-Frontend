import { Layout, Divider, Button } from 'antd'
import DashboardFooter from '@/components/dashboard/footer'
import DashboardHeader from '@/components/dashboard/header'
import MenuComponent from '@/components/dashboard/menu'
import { BrandText, Logo, LogoContainer } from './style'
import { SpanLogo } from '@/components/title'
import useWindowDimensions from '@/hooks/use-window-dimensions'
import { MenuOutlined } from '@ant-design/icons'
import { useState } from 'react'

const theme = 'light'

const { Header, Footer, Sider, Content } = Layout;

type DashboardProps = {
    children?: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardProps> = ({ children }) => {

    const { width } = useWindowDimensions();
    const [posLeft, setPosLeft] = useState('-100%');

    return (
        <Layout>
            <Sider
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: width > 767 ? 'fixed' : 'absolute',
                    left: width > 767 ? 0 : posLeft,
                    textAlign: "center",
                    zIndex: 10
                }}
                collapsible={width <= 767}
                collapsed={false}
                onCollapse={() => setPosLeft('-100%')}
                theme={theme}
            >
                <LogoContainer>
                    <Logo src="https://libra-novel.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flibra.9f3498a1.png&w=640&q=75" alt='logo' />
                    <BrandText>Libra<SpanLogo>Restaurant</SpanLogo></BrandText>
                </LogoContainer>
                <Divider />
                <MenuComponent />
            </Sider>
            <Layout style={{ marginLeft: width > 767 ? 200 : 0 }}>
                <Header style={{ padding: 0 }}>
                    <DashboardHeader isShowButton={width <= 767} onMenuClick={() => setPosLeft('0')} />
                </Header>
                <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                    {children}
                </Content>
                <Footer style={{ padding: 15 }}>
                    <DashboardFooter />
                </Footer>
            </Layout>
        </Layout>
    )
}