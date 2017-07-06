import React from 'react'
import _ from 'lodash'
import ReactDataGrid from 'react-data-grid'
import { Editors, Toolbar, Formatters } from 'react-data-grid-addons'
const { AutoComplete: AutoCompleteEditor, DropDownEditor } = Editors;
const { ImageFormatter } = Formatters;
import { Button, Input,Modal } from 'antd';
import CptStyle from './components.css'
import AddColModal from './AddColModal.js'
import ColTitleModal from './ColTitleModal.js'
import { ContextMenu, MenuItem, ContextMenuTrigger,SubMenu } from "react-contextmenu";

const Example = React.createClass({
  getInitialState() {
    return {
      columns: this.props.columns,
      rows: this.props.rows,
      thisTabKey: this.props.thisTabKey,
      savemsg: ''
    }
  },
  getColumns() {
    // console.log(this.state.columns);
    let clonedColumns = this.state.columns.slice();
    clonedColumns[2].events = {
      onClick: (ev, args) => {
        const idx = args.idx;
        const rowIdx = args.rowIdx;
        this.grid.openCellEditor(rowIdx, idx);
      }
    };
    return clonedColumns;
  },

  handleGridRowsUpdated({ fromRow, toRow, updated }) {
    let rows = this.state.rows.slice();

    for (let i = fromRow; i <= toRow; i++) {
      rows[i] = _.merge(rows[i], updated);
    }

    this.setState({ rows });
  },

  handleAddRow() {
    const newRow = {
      value: this.state.rows.length,
      id: 'id_' + this.state.rows.length,
      email: '',
      firstName: '',
      lastName: '',
    };

    let rows = this.state.rows.slice()
    rows.push(newRow)
    this.setState({ rows })
  },
  handleAddCol(val) {
    const newCol = {
      key: this.state.columns.length + 1,
      name: val,
      editable: true,
      width: 200,
      resizable: true
    }
    let cols = this.state.columns.slice()
    cols.push(newCol)
    this.setState({ columns: cols })
  },
  getRowAt(index) {
    if (index < 0 || index > this.getSize()) {
      return undefined;
    }

    return this.state.rows[index];
  },

  getSize() {
    return this.state.rows.length;
  },
  tbaleThChange(val) {
    this.setState({
      columns: val
    });
  },
  saveMsg(event) {
    this.setState({ savemsg: event.target.value })
  },
  success() {
    const modal = Modal.success({
      title: '提示',
      content: '保存成功',
    });
    setTimeout(() => modal.destroy(), 3000);
  },
  failure(){
    const modal = Modal.success({
      title: '提示',
      content: '描述修改信息未填写',
    });
    setTimeout(() => modal.destroy(), 3000);
  },
  saveTable() {
    fetch('http://10.0.0.80:3000/api/Assets?msg=' + this.state.savemsg + '&assetModelName=' + this.state.thisTabKey, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Collist: this.state.columns,
        rowData: this.state.rows,
      })
    })
    .then(res=>{
      console.log(res)
      if (res.statusText =='OK') {
        this.success()
      } else if(res.status == 400){
        this.failure()
      }
    })
  },
  CancelOff(){
    let currentTab = this.state.thisTabKey
    console.log(currentTab)
  },
  render() {


    return (
      <div>

        <div className={CptStyle.mainNav}>
          <div className={CptStyle.savemsg}><Input type="textarea" onChange={this.saveMsg} placeholder="简要描述修改信息" autosize={{ minRows: 1, maxRows: 1 }} /></div>
          <AddColModal show={this.state.ModalShow} AddCol={this.handleAddCol} ></AddColModal>
          <div className=""><Button type="primary" onClick={this.handleAddRow} >添加行</Button></div>
          <ColTitleModal ColState={this.state.columns} tbaleThChange={this.tbaleThChange}></ColTitleModal>
        </div>
        <ReactDataGrid
          
          ref={node => this.grid = node}
          enableCellSelect={true}
          columns={this.getColumns()}
          rowGetter={this.getRowAt}
          rowsCount={this.getSize()}
          onGridRowsUpdated={this.handleGridRowsUpdated}
          rowHeight={50}
          minHeight={600}
          rowScrollTimeout={200} />
        <div className={CptStyle.mainNav}>
          <div className={CptStyle.saveBtn}>
            <Button type="primary" onClick={this.saveTable}>确认保存</Button>
          </div>
        </div>

      </div>
    );
  }
});
const RowContextMenu = React.createClass({
  propTypes: {
    onRowDelete: React.PropTypes.func.isRequired,
    onRowInsertAbove: React.PropTypes.func.isRequired,
    onRowInsertBelow: React.PropTypes.func.isRequired,
    rowIdx: React.PropTypes.string.isRequired,
    idx: React.PropTypes.string.isRequired
  },
  onRowDelete(e, data) {
    if (typeof (this.props.onRowDelete) === 'function') {
      this.props.onRowDelete(e, data);
    }
  },
  onRowInsertAbove(e, data) {
    if (typeof (this.props.onRowInsertAbove) === 'function') {
      this.props.onRowInsertAbove(e, data);
    }
  },
  onRowInsertBelow(e, data) {
    if (typeof (this.props.onRowInsertBelow) === 'function') {
      this.props.onRowInsertBelow(e, data);
    }
  },
  render() {
    return (
      <div>
        <ContextMenu>
          <MenuItem data={{ rowIdx: this.props.rowIdx, idx: this.props.idx }} onClick={this.onRowDelete}>Delete Row</MenuItem>
          <SubMenu title="Insert Row">
            <MenuItem data={{ rowIdx: this.props.rowIdx, idx: this.props.idx }} onClick={this.onRowInsertAbove}>Above</MenuItem>
            <MenuItem data={{ rowIdx: this.props.rowIdx, idx: this.props.idx }} onClick={this.onRowInsertBelow}>Below</MenuItem>
          </SubMenu>
        </ContextMenu>
      </div>
    )
  }
})
module.exports = Example