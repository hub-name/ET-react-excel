import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import LeftTree from '../components/LeftTree.js'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

import MainTab from '../components/MainTab.js'


function IndexPage() {
  return (
  <Layout className={styles.content}>
    <Header className="header">
    </Header>
    <Layout>
      <Sider width={200} style={{ background: '#ddd' }}>
        <LeftTree></LeftTree>
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Breadcrumb style={{ margin: '12px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
          <MainTab></MainTab>
        </Content>
      </Layout>
    </Layout>
  </Layout>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
