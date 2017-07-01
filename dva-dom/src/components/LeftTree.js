import React from 'react';
import { Tree } from 'antd';
import 'whatwg-fetch';
const TreeNode = Tree.TreeNode;

// let func = (json)=>{
//   json.assetTypes.map(
//     (i)=>{

//     }
//     )
// }
const Node = ( nodeName ) => (
  Object.keys(cells).filter(key => cells[key].parent == nodeName).map(key =>{
    const cell = cells[key]
    const children = Node(key)
    const Widget = widgets[cell.type] || {}
    const title = (cell.name ? <span>{cell.name} <span style={{ fontSize: '0.6em', color: '#BBB' }}>[{Widget.Title}]</span></span> : Widget.Title)
    const cellTitle = <NodeTitle cellKey={key} title={title} />
    if(children && children.length > 0) {
      return (
        <TreeNode title={cellTitle} key={key}>
          { children }
        </TreeNode>
      )
    } else {
      return <TreeNode title={cellTitle} key={key} />
    }
  })
)
class LeftTree extends React.Component {
  state = {
    gData:[],
  }
  componentDidMount() {
    let treeData = []
    let _this = this
    fetch('http://10.0.0.80:3000/api/AssetModels')
      .then(function (response) {
        return response.json()
      }).then(function (json) {
        json.assetTypes.map((i,index)=>{
          if(i.assetTypePId==0){
              treeData.push(
                {
                  "title": i.assetTypeDisplayName,
                  "tpID": i.assetTypeId,
                  'children':[]
                }
              )
          }else{
            treeData.map((j)=>{
              if(j.tpID==i.assetTypePId){
                j.children.push(
                  {
                    "title": i.assetTypeDisplayName,
                    "tpID": i.assetTypeId,
                    'children':[]
                  }
                )
              }
            })
          }
        })
        json.assetModels.map(i=>{
          console.log(i)
            treeData.map((k)=>{
              console.log(k);
            })
        })
        
        _this.setState({gData:treeData})
      }).catch(function (ex) {
        console.log('parsing failed', ex)
      })
    //console.log(treeData)
    
  }
  
  render() {
    console.log(this.state.gData)
    const loop = data => data.map((item) => {
      if (item.children && item.children.length) {
        return <TreeNode key={item.tpID} title={item.title}>{loop(item.children)}</TreeNode>;
      }
      return <TreeNode key={item.tpID} title={item.title} />;
    });
    return (
      <Tree
        className="draggable-tree"
      >
        {loop(this.state.gData)}
      </Tree>
    );
  }
}

export default LeftTree;