var React = require('react');
var Nav = require('Nav');
var Orgs = require('Orgs');
var Underground = require('Underground');
var KingsOfEngland = require('KingsOfEngland');

var Main = React.createClass({
  render: function () {
    return(
      <div className = "container">
      <h1>Clarke Christmas Quiz</h1>
      {this.props.children}
      </div>
    )
  }
});

module.exports= Main;
