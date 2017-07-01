const ReactDataGrid = require('react-data-grid');
const React = require('react');
const { Map } = require('immutable')
const { Editors, Toolbar, Formatters } = require('react-data-grid-addons');

const Example = React.createClass({
  getInitialState() {
    this._columns = [
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
    ];

    return { rows: this.createRows(2000) };
  },

  createRows(numberOfRows) {
    let rows = [];
    for (let i = 0; i < numberOfRows; i++) {
      rows[i] = this.createFakeRowObjectData(i);
    }
    return rows;
  },

  createFakeRowObjectData(index) {
    return {
      id: 'id_' + index,
      email: faker.internet.email(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
    };
  },

  getColumns() {
    let clonedColumns = this._columns.slice();
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
      let rowToUpdate = rows[i];
      let updatedRow = React.addons.update(rowToUpdate, {$merge: updated});
      rows[i] = updatedRow;
    }

    this.setState({ rows });
  },

  handleAddRow({ newRowIndex }) {
    const newRow = {
      value: newRowIndex,
      userStory: '',
      developer: '',
      epic: ''
    };

    let rows = this.state.rows.slice();
    rows = React.addons.update(rows, {$push: [newRow]});
    this.setState({ rows });
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

  render() {
    return (
      <ReactDataGrid
        ref={ node => this.grid = node }
        enableCellSelect={true}
        columns={this.getColumns()}
        rowGetter={this.getRowAt}
        rowsCount={this.getSize()}
        onGridRowsUpdated={this.handleGridRowsUpdated}
        toolbar={<Toolbar onAddRow={this.handleAddRow}/>}
        enableRowSelect={true}
        rowHeight={50}
        minHeight={600}
        rowScrollTimeout={200} />);
  }
});
module.exports = Example