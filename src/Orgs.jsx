var React = require('react');
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

var Orgs = React.createClass({
  render: function () {
    var {orgs} = this.props;
    const options = {
      page: 2,  // which page you want to show as default
      sizePerPageList: [ {
        text: '5', value: 5
      }, {
        text: '10', value: 10
      }, {
        text: 'All', value: orgs.length
      } ], // you can change the dropdown list for size per page
      sizePerPage: 5,  // which size per page you want to locate as default
      pageStartIndex: 0, // where to start counting the pages
      paginationSize: 3,  // the pagination bar size.
      prePage: 'Prev', // Previous page button text
      nextPage: 'Next', // Next page button text
      firstPage: 'First', // First page button text
      lastPage: 'Last', // Last page button text
      paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
      paginationPosition: 'top'  // default is bottom, top and both is all available
      // hideSizePerPage: true > You can hide the dropdown for sizePerPage
      // alwaysShowAllBtns: true // Always show next and previous button
      // withFirstAndLast: false > Hide the going to First and Last page button
    };

    function LinkFormatter(value, row, index) {
    return "<a href='"+row._id+"'>"+value+"</a>";
    }

    return (
      <BootstrapTable data={ orgs } pagination={true} options={ { noDataText: 'This is custom text for empty data' } }>
          <TableHeaderColumn dataField='_id' isKey={ true } data-formatter="LinkFormatter">ID</TableHeaderColumn>
          <TableHeaderColumn dataField='organisation' dataSort={ true } filter={ { type: 'TextFilter', delay: 1000 } }>Organisation</TableHeaderColumn>
          <TableHeaderColumn dataField='type' dataSort={ true }>Type</TableHeaderColumn>
          <TableHeaderColumn dataField='legal' dataSort={ true }>Legal</TableHeaderColumn>
          <TableHeaderColumn dataField='country' dataSort={ true }>Country</TableHeaderColumn>
      </BootstrapTable>
    );
  }
});

module.exports= Orgs;
