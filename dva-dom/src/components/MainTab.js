import React from 'react';
import { Tabs, Button } from 'antd';
const TabPane = Tabs.TabPane;
import DatGrid from './DatGrid.js'


class MainTab extends React.Component {
  constructor(props) {
    super(props);
    this.newTabIndex = 0;
    const panes = [
    ];
    this.state = {
      columns: this.props.columns,
      rows: this.props.rows,
      tab: this.props.selectedKeys,
      thisTabKey: this.props.thisTabKey,
      activeKey: 0,
      panes,
    };
  }
  onChange = (activeKey) => {
    this.setState({ activeKey });
  }
  onEdit = (targetKey, action) => {
    this[action](targetKey);
  }
  componentWillReceiveProps(nextProps) {
    console.log(this.state.thisTabKey, nextProps.thisTabKey)
    if (this.state.thisTabKey[0] != nextProps.thisTabKey[0]) {
      const panes = this.state.panes;
      const activeKey = `newTab${this.newTabIndex++}`;
      panes.push({ title: nextProps.thisTabKey, columns: nextProps.columns, rows: nextProps.rows, thisTabKey: nextProps.thisTabKey, key: activeKey });
      this.setState({
        columns: nextProps.columns,
        rows: nextProps.rows,
        tab: nextProps.selectedKeys,
        thisTabKey: nextProps.thisTabKey,
        panes, activeKey
      })
    }


  }
  remove = (targetKey) => {
    let activeKey = this.state.activeKey;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (lastIndex >= 0 && activeKey === targetKey) {
      activeKey = panes[lastIndex].key;
    }
    this.setState({ panes, activeKey });
  }
  render() {
    return (
      <div>
        <Tabs
          hideAdd
          onChange={this.onChange}
          activeKey={this.state.activeKey}
          type="editable-card"
          onEdit={this.onEdit}
        >
          {this.state.panes.map(pane => <TabPane tab={pane.title} key={pane.key}><DatGrid columns={pane.columns} rows={pane.rows} tab={pane.thisTabKey} thisTabKey={pane.thisTabKey}></DatGrid></TabPane>)}
        </Tabs>
      </div>
    );
  }
}


export default MainTab;