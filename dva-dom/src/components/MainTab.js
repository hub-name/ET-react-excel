import React from 'react';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

import DatGrid from './DatGrid.js'


function callback(key) {
  console.log(key);
}
class MainTab extends React.Component {
  
  render() {
    
    return (
        <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="Tab 1" key="1"><DatGrid></DatGrid></TabPane>
            <TabPane tab="Tab 2" key="2"><DatGrid></DatGrid></TabPane>
            <TabPane tab="Tab 3" key="3"><DatGrid></DatGrid></TabPane>
        </Tabs>
    );
  }
}


export default MainTab;