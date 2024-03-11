import React, { Suspense, useState, } from 'react';
import { BrowserRouter, useNavigate, NavLink as Link } from 'react-router-dom'
import './App.css';
import Router from './router/routerBefore';
import { ConfigProvider, Spin, Layout, Menu, theme, Row, Col, Button } from 'antd'
import { MenuProps } from 'antd/es/menu';
import { HomeOutlined, UserOutlined, LogoutOutlined, PoweroffOutlined } from '@ant-design/icons';
import { tokenKey } from './utils/constants';

const { Header, Content, Sider } = Layout;
const items: MenuProps['items'] = [
  {
    // label: '首页',
    key: 'home',
    label: <Link to="/">首页</Link>,
    icon: <HomeOutlined />
  },
  {
    // label: '关于',
    key: 'about',
    label: <Link to="/about">关于</Link>,
    icon: <UserOutlined />
  },
  // {
  //   // label: '登录',
  //   key: 'login',
  //   label: <Link to="/login">登录</Link>,
  //   icon: <LogoutOutlined />,
  // },
]

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [current, setCurrent] = useState('home');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  const logout = (): void => {
    localStorage.removeItem(tokenKey)
  }
  return (
    <BrowserRouter>
      <ConfigProvider theme={{ token: { colorPrimary: '#00b96b' } }}>
        {/* <div className="App">
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
        <BrowserRouter>
          <div>
            <Suspense fallback={<Spin />}>
              <Router></Router>
            </Suspense>
          </div>
        </BrowserRouter>
      </div> */}
        <Layout>
          <Header style={{ display: 'flex', alignItems: 'center' }}>
            <div className="demo-logo" />
            {/* <Menu
            theme="dark"
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
            style={{ flex: 1, minWidth: 0 }}
          /> */}
            <Row style={{ flex: 1, minWidth: 0 }}>
              <Col xs={4} sm={8} md={12} lg={16} xl={20}>
                <Menu theme="dark" style={{ flex: 1, minWidth: 0 }} onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
              </Col>
              <Col xs={20} sm={16} md={12} lg={8} xl={4}>
                <Button
                  danger
                  type="text"
                  icon={<PoweroffOutlined />}
                  onClick={() => logout()}
                >
                  退出登录
                </Button>
              </Col>
            </Row>
          </Header>
          <Layout>
            <Sider width={200} style={{ background: colorBgContainer }}>
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 0 }}
                items={items}
              />
            </Sider>
            <Layout style={{ padding: '0 24px 24px' }}>
              {/* <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb> */}
              <Content
                style={{
                  padding: 24,
                  margin: 0,
                  minHeight: 280,
                  background: colorBgContainer,
                  borderRadius: borderRadiusLG,
                }}
              >
                <Suspense fallback={<Spin />}>
                  <Router></Router>
                </Suspense>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </ConfigProvider>
    </BrowserRouter>

  );
}

export default App;
