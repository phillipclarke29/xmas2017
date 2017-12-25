var React = require('react');
var ReactDOM = require('react-dom');
var {Router, Route, IndexRoute, hashHistory} = require('react-router');
import Main from './Main.jsx';
var Orgs = require('Orgs');
var Underground = require('Underground');
var KingsOfEngland = require('KingsOfEngland');


ReactDOM.render(
  <Router history={hashHistory}>
  <Route path="/" component={Main}>
    <IndexRoute component={Orgs}/>
    <Route path="/underground" component={Underground}/>
    <Route path="/Kings" component={KingsOfEngland}/>
  </Route>
  </Router>,
  document.getElementById('contents')
);
