import React from 'react';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

import DatGrid from './DatGrid.js'


class MainTab extends React.Component {
  state = {
    columns: this.props.columns,
    rows: this.props.rows,
    tab:this.props.selectedKeys,
    thisTabKey:this.props.thisTabKey
  }
  componentWillReceiveProps(nextProps){
      //console.log(nextProps)
      this.setState({
          columns:nextProps.columns,
          rows:nextProps.rows,
          tab:nextProps.selectedKeys,
          thisTabKey:nextProps.thisTabKey
      })
  }
  callback(key) {
    let _this = this
    console.log(_this.state)
    let cancelOff =  _this.state.tab.splice(key,1)
    console.log(cancelOff)
  }
  render() {
    console.log("tab", this.state.tab)
    return (
      <Tabs defaultActiveKey="1" onTabClick={this.callback}>
        {
          this.state.tab.map((i,key)=>{
            return <TabPane tab={i} key={key}><DatGrid columns={this.state.columns} rows={this.state.rows} tab={this.state.thisTabKey} thisTabKey={this.state.thisTabKey}></DatGrid></TabPane>
          })
        }
      </Tabs>
    );
  }
}


export default MainTab;