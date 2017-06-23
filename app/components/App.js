const ReactDataGrid = require('react-data-grid');
const _ = require('lodash');
const React = require('react');
const { Editors, Toolbar, Formatters } = require('react-data-grid-addons');
var update = require('react-addons-update');
import 'bootstrap/dist/css/bootstrap.css';
const Example = React.createClass({
  getInitialState() {

    return {
      _columns :[
        {
          key: 'id',
          name: 'ID',
          width: 80
        },
        {
          key: 'task',
          name: 'Title',
          editable: true
        },
        {
          key: 'priority',
          name: 'Priority',
          editable: true
        },
        {
          key: 'issueType',
          name: 'Issue Type',
          editable: true
        },
        {
          key: 'complete',
          name: '% Complete',
          editable: true
        },
        {
          key: 'startDate',
          name: 'Start Date',
          editable: true
        },
        {
          key: 'completeDate',
          name: 'Expected Complete',
          editable: true
        }
      ],
      rows: this.createRows(10)
    };
  },

  getRandomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
  },

  createRows(numberOfRows) {
    let rows = [];
    for (let i = 1; i < numberOfRows; i++) {
      rows.push({
        id: i,
        task: 'Task ' + i,
        complete: Math.min(100, Math.round(Math.random() * 110)),
        priority: ['Critical', 'High', 'Medium', 'Low'][Math.floor((Math.random() * 3) + 1)],
        issueType: ['Bug', 'Improvement', 'Epic', 'Story'][Math.floor((Math.random() * 3) + 1)],
        startDate: this.getRandomDate(new Date(2015, 3, 1), new Date()),
        completeDate: this.getRandomDate(new Date(), new Date(2016, 0, 1))
      });
    }
    return rows;
  },

  rowGetter(i) {
    return this.state.rows[i];
  },

  handleGridRowsUpdated({ fromRow, toRow, updated }) {
    let rows = this.state.rows;
    for (let i = fromRow; i <= toRow; i++) {
      rows[i] = _.merge(rows[i], updated);
    }

    this.setState({ rows });
  },
  handleAddRow({ newRowIndex }) {
    const newRow = {
      value: newRowIndex,
      id: newRowIndex + 1,
      task: "",
      complete: "",
      priority: "",
      issueType: "",
      startDate: "",
      completeDate: ""
    };
    let rows = this.state.rows.slice();
    rows.push(newRow);
    this.setState({ rows });
  },
  handleAddCol() {
    console.log(this.state._columns.length);
    const newCol = {
      key: this.state._columns.length,
      name: this.state._columns.length,
      editable: true
    }
    let cols = this.state._columns.slice();
    cols.push(newCol)
    this.setState({ _columns:cols });
    //console.log(a);
    console.log(this.state._columns);
  },
  render() {
    return (
      <div>
        <ReactDataGrid
          enableCellSelect={true}
          columns={this.state._columns}
          rowGetter={this.rowGetter}
          rowsCount={this.state.rows.length}
          toolbar={<Toolbar onAddRow={this.handleAddRow} />}
          minHeight={500}
          onGridRowsUpdated={this.handleGridRowsUpdated} />
        <div className="react-grid-Toolbar">
          <div className="tools">
            <button type="button" onClick={this.handleAddCol} className="btn">Add col</button>
          </div>
        </div>
      </div>);

  }
});


module.exports = Example