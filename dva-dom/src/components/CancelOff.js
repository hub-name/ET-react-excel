import React from 'react';
import { Button  } from 'antd';

class CancelOff extends React.Component {
  state = {
  }
  render() {
    //console.log("tab", this.state.thisTabKey)
    return (
        <Button type="primary" onClick={this.CancelOff}>取消关闭</Button>
    );
  }
}

export default MainTab;