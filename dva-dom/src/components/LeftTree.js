import React from 'react';
import { Tree } from 'antd';
import 'whatwg-fetch';
import _ from 'lodash'
const TreeNode = Tree.TreeNode;
class LeftTree extends React.Component {
  state = {
    gData: [],
    tabList:this.props.selectedKeys,
    rDAta: this.props.rtreeData()
  }
  componentWillReceiveProps(nextProps){
      this.setState({
          rDAta:nextProps.rtreeData,
          tabList:nextProps.selectedKeys
      })
  }
  componentDidMount() {
    let _this = this
    fetch('http://10.0.0.80:3000/api/AssetModels')
      .then(function (response) {
        return response.json()
      }).then(function (json) {
        const types = json.assetTypes

        const treeLoop = (pid) => types.filter(t => t.assetTypePId == pid).map(i => ({
          title: i.assetTypeDisplayName,
          tpID: i.assetTypeId,
          children: treeLoop(i.assetTypeId)
        }))
        let treeData = treeLoop(0)
        const assetModels = json.assetModels
        const Mnameloop = (data, obj) => data.map((i) => {
          if (i.tpID == obj.assetTypeId) {
            i.children.push({
              title: obj.assetModelDisplayName,
              tpID: obj.assetModelName,
              children: []
            })
            return
          }
          else if (i.children.length != 0) {
            Mnameloop(i.children, obj)
          } else {
            return
          }
        })
        assetModels.map((item) => {
          Mnameloop(treeData, item)
        })
        _this.setState({ gData: treeData })
      }).catch(function (ex) {
        console.log('parsing failed', ex)
      })
  }
  onSelect = (selectedKeys) => {
    let _this = this
    //console.log(aaa,bbb)
    if (_.indexOf(_this.state.tabList,selectedKeys[0]) != -1) {
      alert("sdf")
    }
    if (isNaN(parseInt(selectedKeys[0])) && typeof(selectedKeys[0])!='undefined') {
      fetch('http://10.0.0.80:3000/api/AssetModelAttributes/' + selectedKeys[0])
        .then(function (response) {
          return response.json()
        }).then(function (json) {
          //console.log('parsed json', json)
          _this.props.rtreeData(json.Collist, json.rowData, selectedKeys)
        }).catch(function (ex) {
          console.log('parsing failed', ex)
        })
    }
  }
  render() {
    //console.log(this.state.tabList)
    const loop = data => data.map((item) => {
      if (item.children && item.children.length) {
        return <TreeNode key={item.tpID} title={item.title} dataType={"dfdf"}>{loop(item.children)}</TreeNode>;
      }
      return <TreeNode key={item.tpID} title={item.title} dataType={"dfdf"} />;
    });
    return (
      <Tree
        className="draggable-tree"
        onSelect={this.onSelect}
      >
        {loop(this.state.gData)}
      </Tree>
    );
  }
}

export default LeftTree;