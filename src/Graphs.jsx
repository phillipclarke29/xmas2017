var React = require('react');
var {Link, IndexLink} = require('react-router');
var { Navbar, Nav, NavItem } = require('react-bootstrap');

const Header = () => (
  <Navbar fluid>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="/issues">NCSC Gov Orgs</a>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <LinkContainer to="/issues?country=Scotland">
        <NavItem>Scotland</NavItem>
      </LinkContainer>
      <LinkContainer to="/issues?country=Wales">
        <NavItem>Wales</NavItem>
      </LinkContainer>
      <LinkContainer to="/issues?country=England">
        <NavItem>England</NavItem>
      </LinkContainer>
     <LinkContainer to="/organisations">
      <NavItem>Organisations</NavItem>
      </LinkContainer>
  </Nav>
  <Nav pullRight>
  <IssueAddItem />
  </Nav>
  </Navbar>
);

const App = props => (

  <div>
    <Header />
    <div className="contents container-fluid">
      {props.children}
    </div>
    <div className="footer">
      NCSC
    </div>
  </div>

);

var Graphs = React.createClass({


  render: function () {
    return(
      <div>
      <h2>Nav</h2>
      <IndexLink to="/" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Home</IndexLink>
      <Link to="/about" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>About</Link>
      <Link to="/graphs" activeClassName="active" activeStyle={{fontWeight: 'bold'}}>Graphs</Link>
      </div>
    )
  }
});

module.exports= Graphs;
