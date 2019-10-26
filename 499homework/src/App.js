import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

/*
  Variables/Constants
*/
const PATH_BASE = 'http://gtest.dev.wwbtc.com'; 
const PATH_JSON = '/json'; 
const PARAM_TYPE = '/rec';

/*
  Components
*/
const Recipe = ( {title, field_images, body, field_ingredients, field_summary} ) =>
{
  const image = field_images.split(',').slice(0)[0].trim();
  return (
    <div className="recipeStyle">
        <div>
          <div>
            <img src = {`${PATH_BASE}${image}`} alt = "here"></img>
          </div>
          <span>
            {title}
          </span>
          <table>
            <tbody>
              <tr>
                <td dangerouslySetInnerHTML={{__html: field_summary}} />
              </tr>
            </tbody>
          </table>
        </div>
    </div>
  );
}

const Loading = () =>
{
  return (
    <div className="error">
      Loading..
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
      results: null,
    }

    this.fetchRecipes = this.fetchRecipes.bind(this);
  }

  /*
    Functions
  */
  fetchRecipes()
  {
    fetch(`${PATH_BASE}${PATH_JSON}${PARAM_TYPE}`)
    .then(response => {
      console.log(response);
      return response.json()  
    }).then(results => this.setState({ results }))
  }

  componentDidMount() 
  { 
    this.fetchRecipes(); 
  }

  /*
    Rendered Elements
  */
  render() 
  {
    const { results } = this.state;

    if (!results) 
    {
      return (
        <div>
          <Loading />
        </div>
      );
    }
    else 
    {
      return (
        <div className="App">
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

          {results.map(recipes =>
            <Recipe
              title = {recipes['title']}
              field_images = {recipes['field_images']}
              body = {recipes['body']}
              field_ingredients = {recipes['field_ingredients']}
              field_summary = {recipes['field_summary']}
            />
          )}
        </div>
      );
    }
  }
}

export default App;