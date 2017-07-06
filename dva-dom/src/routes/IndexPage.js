import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import LeftTree from '../components/LeftTree.js'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

import MainTab from '../components/MainTab.js'

class IndexPage extends React.Component {
  state = {
    columns: [],
    rows: [],
    selectedKeys:[],
    thisTabKey:''
  }
  rtreeData = (columns, rows,selectedKeys) => {
    console.log(this.state.selectedKeys,selectedKeys)
    if (typeof(selectedKeys)!='undefined') {
      let newSelectedKeys = _.union(this.state.selectedKeys,selectedKeys)
      this.setState({ 
        columns: columns, 
        rows: rows, 
        thisTabKey:selectedKeys,
        selectedKeys: newSelectedKeys     
      })
    }
    
  }
  componentWillReceiveProps(nextProps){
      this.setState({
          columns:nextProps.columns,
          thisTabKey:nextProps.thisTabKey,
          selectedKeys:nextProps.selectedKeys,
      })
  }
  render() {
    
    return (
      
      <Layout className={styles.content}>
        <Header className="header">
        </Header>
        <Layout>
          <Sider width={200} style={{ background: '#ddd' }}>
            <LeftTree rtreeData={this.rtreeData} selectedKeys={this.selectedKeys}></LeftTree>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '12px 0' }}>
            </Breadcrumb>
            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
              <MainTab columns={this.state.columns} rows={this.state.rows} selectedKeys = {this.state.selectedKeys} thisTabKey={this.state.thisTabKey}></MainTab>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default IndexPage
