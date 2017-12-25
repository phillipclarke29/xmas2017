var React = require('react');


var Result = React.createClass({
  render: function () {
    return(
      <div>
      <h2>{this.props.result}</h2>

      </div>
    )
  }
});

module.exports= Result;
