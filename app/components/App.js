const ReactDataGrid = require('react-data-grid');
const _ = require('lodash');
const React = require('react');
const { Editors, Toolbar, Formatters } = require('react-data-grid-addons');
var update = require('react-addons-update');
import bootstrap from 'bootstrap/dist/css/bootstrap.css';
const Example = React.createClass({
  getInitialState() {
    return { 
      _Popup:false,
      _columns: [
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
    const newCol = {
      key: this.state._columns.length,
      name: this.state._columns.length,
      editable: true
    }
    let cols = this.state._columns.slice();
    cols.push(newCol)
    this.setState({ _columns: cols });
  },
  handleChange: function(event,index,i) {
    this.setState({
      _columns: [
        ...this.state._columns.slice(0, index),
        { ...this.state._columns[index], name: event.target.value },
        ...this.state._columns.slice(index + 1)
      ]
    });
  },
  ModifyTh(){
    this.setState({_Popup: !this.state._Popup})
  }, 
  render() {
    let leftNav = {
      width:"15%",
      height:100,
      float:"left"
    }
    let rightMain = {
      width:"85%",
      height: "auto",
      float:"left",
      position: "relative"
    }
    let liStyle = {
      width:"40%",
      listStyle: "none",
      float: "left",
      margin: "5px"        
    }
    let PopupBox = {height:"300px",width:"400px",background:"#ddd",position: "absolute",top: "50%",left: "50%", margin: "-130px auto auto -200px"}
    let PopupShow = this.state._Popup ? {display:"block"}:{display:"none"}
  return (
    <div className="row">
      <div className="col-md-10" style={leftNav}>
        
      </div>
      <div className="col-md-2 " style={rightMain}>
        <div className="react-grid-Toolbar">
          <div className="tools">
            <button type="button" onClick={this.ModifyTh} className="btn">修改TH</button>
            <button type="button" onClick={this.handleAddCol} className="btn">Add Col</button>
          </div>
        </div>
        <ReactDataGrid
        enableCellSelect={true}
        columns={this.state._columns}
        rowGetter={this.rowGetter}
        rowsCount={this.state.rows.length}
        toolbar={<Toolbar onAddRow={this.handleAddRow} />}
        minHeight={800}
        onGridRowsUpdated={this.handleGridRowsUpdated} />
        <div className="" style={PopupShow}>
          <h3>修改th</h3>
          <ul>
            {
              this.state._columns.map((i,index) => {
                    return <li style={liStyle}><input type="text" key={index} value={i.name} onChange={(e)=>this.handleChange(e,index,i)} /></li>
              })
            }
          </ul>
        </div>
        
      </div>
      <div className="cesh"></div>
    </div>);

  }
});


module.exports = Example