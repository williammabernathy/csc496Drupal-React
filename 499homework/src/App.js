import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

/*
  Variables
*/
const PATH_BASE = 'http://gtest.dev.wwbtc.com'; 
const PATH_JSON = '/json'; 
const PARAM_REC = '/rec';

/*
  Components
*/
const Recipe = (recipesList) =>
{
  return (
    <div className="recipe">
      { recipesList.map(item =>
        <div key={item.title}>
          <span>
            {item.title}
          </span>
        </div>
      )}
    </div>
  );
}

const Error = () =>
{
  return (
    <div className="error">
      Something went wrong..
    </div>
  );
}

/*
  Main/Initial
*/
class App extends Component 
{
  constructor(props) 
  {
    super(props);

    this.state = {
      recipes: null,
    }

    this.fetchRecipes = this.fetchRecipes.bind(this);
    this.setRecipes = this.fetchRecipes.bind(this);
  }

  setRecipes(recipes)
  {
    this.setState({ recipes });
  }

  fetchRecipes(PARAM_REC)
  {
    fetch(`${PATH_BASE}${PATH_JSON}${PARAM_REC}`)
    .then(response => response.json())
    .then(recipes => this.setRecipes(recipes));
  }

  componentDidMount() 
  { 
    //const { searchTerm } = this.state; 
    this.fetchRecipes('/rec'); 
  }

  /*
    Functions
  */

  /*
    Rendered Elements
  */
  render() 
  {
    const { recipes } = this.state;

    if (!recipes) 
    {
      return (
        <div>
          <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Umami Replica</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
              <Nav className="mr-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#recipes">Recipes</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <Error />
        </div>
      );
    }

    return (
      <div className="App">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">Umami Replica</Navbar.Brand>
          <Navbar.Toggle/>
          <Navbar.Collapse>
            <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#recipes">Recipes</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Recipe
          recipesList = {recipes.hits}
        />
      </div>
    );
  }
}

export default App;