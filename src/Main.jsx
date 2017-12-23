var React = require('react');
var Nav = require('Nav');
var Orgs = require('Orgs');


var Main = React.createClass({
   getInitialState: function(){
     return {issues: []};
   },

  componentDidMount() {
  this.loadData();
  },

  loadData() {
    fetch(`/api/issues`).then(response =>
      response.json()).then((data) => {
      data.records.forEach((issue) => {
        issue.created = new Date(issue.created);
        if (issue.completionDate) { issue.completionDate = new Date(issue.completionDate); }
      });
      this.setState({ issues: data.records });
    }).catch((err) => {
      console.log(err);
    });
  },

  render: function () {
    return(
      <div className = "container">
      <Nav/>
      <h2>Main</h2>
      <Orgs orgs={this.state.issues}/>
      </div>
    )
  }
});

module.exports= Main;
