import React, { Component } from 'react';
//import MyNavbar from './MyNav/MyNavbar.js';
import { Navbar, Nav } from 'react-bootstrap';

/*
  Variables
*/
const DEFAULT_QUERY = 'redux';
const DEFAULT_PAGE = 0;
const DEFAULT_HPP = '100';

const PATH_BASE = 'https://hn.algolia.com/api/v1'; 
const PATH_SEARCH = '/search'; 
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';

/*
  Components
  TODO: Organize to folder space
*/

/*
  Main/Initial
*/
class App extends Component {
  // constructor of properties
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    }

  }

  /*
    Functions
  */

  /*
    Rendered Elements
  */
  render() {
    const {
      isLoading
    } = this.state;

    return (
      <div className="App">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">Umami Replica</Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#recipes">Recipes</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default App;