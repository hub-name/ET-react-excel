import React from 'react'
import _ from 'lodash'
import ReactDataGrid from 'react-data-grid'
import { Editors, Toolbar, Formatters } from 'react-data-grid-addons'
const { AutoComplete: AutoCompleteEditor, DropDownEditor } = Editors;
const { ImageFormatter } = Formatters;
import { Button } from 'antd';
import CptStyle from './components.css'
import AddColModal from './AddColModal.js'
import ColTitleModal from './ColTitleModal.js'


const Example = React.createClass({
  getInitialState() {
    return {
      _columns: [
        {
          key: 'id',
          name: 'ID',
          width: 80,
          resizable: true
        },
        {
          key: 'firstName',
          name: 'First Name',
          editable: true,
          width: 200,
          resizable: true
        },
        {
          key: 'lastName',
          name: 'Last Name',
          editable: true,
          width: 200,
          resizable: true
        },
        {
          key: 'email',
          name: 'Email',
          editable: true,
          width: 200,
          resizable: true
        }
      ],
      rows: [
        {
          id: 'id_',
          email: 'email_',
          firstName: 'firstName_',
          lastName: 'lastName_',
        }
      ],
      ModalShow:"dfdf"
    }
  },

  // createRows(numberOfRows) {
  //   let rows = [];
  //   for (let i = 0; i < numberOfRows; i++) {
  //     rows[i] = this.createFakeRowObjectData(i);
  //   }
  //   console.log(rows);
  //   return rows;
  // },

  // createFakeRowObjectData(index) {
  //   return {
  //     id: 'id_' + index,
  //     email: 'email_' + index,
  //     firstName: 'firstName_' + index,
  //     lastName: 'lastName_' + index,

  //   };
  // },
  getColumns() {
   // console.log(this.state._columns);
    let clonedColumns = this.state._columns.slice();
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

    let rows = this.state.rows.slice();
    rows.push(newRow);
    this.setState({ rows });
  },
  handleAddCol(val) {
    const newCol = {
      key: this.state._columns.length,
      name: val,
      editable: true,
      width: 200,
      resizable: true
    }
    let cols = this.state._columns.slice();
    cols.push(newCol)
    this.setState({ _columns: cols });
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
      _columns:val
    });
  },
  render() {
    return (
      <div>
        <div className={CptStyle.mainNav}>
          <AddColModal show={this.state.ModalShow}  AddCol= {this.handleAddCol} ></AddColModal>
          <div  className=""><Button  type="primary" onClick={this.handleAddRow} >添加行</Button></div>
          <ColTitleModal ColState = {this.state._columns}  tbaleThChange = {this.tbaleThChange}></ColTitleModal>
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
          
      </div>
    );
  }
});

module.exports = Example