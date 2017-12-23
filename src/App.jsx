var React = require('react');
var ReactDOM = require('react-dom');
var {Router, Route, IndexRoute, hashHistory} = require('react-router');
import Main from './Main.jsx';
var Orgs = require('Orgs');
var About = require('About');
var Nav = require('Nav');
var Graphs = require('Graphs');

ReactDOM.render(
  <Router history={hashHistory}>
  <Route path="/" component={Main}>
    <Route path="about" component={About}/>
    <Route path="graphs" component={Graphs}/>
    <IndexRoute component={Orgs}/>
  </Route>
  </Router>,
  document.getElementById('contents')
);
