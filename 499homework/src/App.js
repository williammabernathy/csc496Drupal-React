import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Card, CardImg, CardText, CardBody, CardTitle, Button } from 'reactstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

/*
  Variables/Constants
*/
const fetch = require("node-fetch");

//api url variables
const PATH_BASE = 'http://gtest.dev.wwbtc.com'; 
const PATH_JSON = '/json'; 
const PARAM_TYPE = '/rec';

//variables for changing url
const recURL = "#recipe";
const homeURL = "#home";

/*
  Components
*/
//display a basic card of individual recipes
const Recipe = ( { ID, title, field_images, field_summary, viewRecipeClick } ) =>
{
  //split images, only want the first of two
  const image = field_images.split(',').slice(0)[0].trim();

  return (
    <div className="recipeStyle">
      <Card className = "card" style={{ width: '18rem', border: "1px solid lightgrey" }}>
        <CardImg top width="25%" src={`${PATH_BASE}${image}`} alt="Food Image" />
        <CardBody>
          <CardTitle><b>{title}</b></CardTitle>
          <CardText><div dangerouslySetInnerHTML={{ __html: field_summary }}/></CardText>

          {/* whenever an element is clicked, get its ID */}
          <center>
            <Button href={`${recURL}/${ID}`} onClick={() => viewRecipeClick(ID)}>
              View Recipe
            </Button>
          </center>

        </CardBody>
      </Card>
    </div>
  );
}

//display a recipe's full details
const RecipeFull = ({ ID, title, field_images, field_ingredients, body, changeRecipe }) =>
{
  //split images, only want the first of two
  const image = field_images.split(',').slice(0)[0].trim();

  return(
    <div className="cardFull" >
      <div className="cardFullImage"><img src={`${PATH_BASE}${image}`} alt="Food" /></div>
      <div>
      <hr/>
        <div><b>{title}</b></div><br/>
        <div>{field_ingredients}</div><br/>
        <div><div dangerouslySetInnerHTML={{ __html: body }}/></div>
        <hr/>

        {/* buttons to cycle through recipes. change url when pressed*/}
        <Button href={`${recURL}/${ID}`} className="previous" onClick = {() => changeRecipe(ID-1)}>
          Previous
        </Button>
        <Button href={`${recURL}/${ID}`} className="next" onClick = {() => changeRecipe(ID+1)}>
          Next
        </Button>
      </div>
    </div>
  );
}

const HomeHeading = ( { body } ) =>
{
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: body }}/>
    </div>
  );
}

//loading screen
//currently only used when page is first loaded
const Loading = () =>
{
  return (
    <div className="error">
      Loading..
    </div>
  );
}

//our header containing the nav bar
const Header = ({ viewHome, viewRecipeNavClick }) => 
{
  return (
    <Navbar bg="light" expand="lg" className="mainMenu">
      <Navbar.Brand className="navBrand" href={homeURL} onClick={() => viewHome()}>CSC496</Navbar.Brand>
      <Nav>
        <Nav.Link className="navLink" href={homeURL} onClick={() => viewHome()}>Home</Nav.Link>
        <Nav.Link className="navLink" href={recURL} onClick={() => viewRecipeNavClick()}>Recipes</Nav.Link>
        <Nav.Link className="navLink" href="https://github.com/williammabernathy/csc496Drupal-React">Github</Nav.Link>
      </Nav>
    </Navbar>
  );
}

//general footer
const Footer = () =>
{
  return(
    <div className = "footer">
      <span>
        CSC 496 Project
      </span> <br/>
      <span>
        by William Abernathy
      </span>
    </div>
  );
}

/*
  Main
*/
class App extends Component 
{
  constructor(props) 
  {
    super(props);

    this.state = {
      results: null,            //data from fetching recipies
      page: "home",             //what page we're currently on
      currentRecipe: null,      //which recipe has been selected; the recipe ID
      homeHead: null,           //data from fetching home page
    }

    this.fetchRecipes = this.fetchRecipes.bind(this);
    this.fetchHome = this.fetchHome.bind(this);
    this.viewRecipeClick = this.viewRecipeClick.bind(this);
    this.viewHome = this.viewHome.bind(this);
    this.viewRecipeNavClick = this.viewRecipeNavClick.bind(this);
    this.changeRecipe = this.changeRecipe.bind(this);
  }

  /*
    Functions
  */
 //api call
  fetchRecipes()
  {
    fetch(`${PATH_BASE}${PATH_JSON}${PARAM_TYPE}`)
    .then(response => response.json())  
    .then(results => this.setState({ results }))
  }

  fetchHome()
  {
    fetch(`http://gtest.dev.wwbtc.com/json/page?_format=json`)
    .then(response => response.json())
    .then(homeHead => this.setState({ homeHead }))
  }

  componentDidMount() 
  { 
    this.fetchRecipes(); 
    this.fetchHome();
  }

  //the view more details on a recipe card was pressed, show that recipe's
  //full detailed page
  viewRecipeClick(index)
  {
    this.setState({ page: "recipeDetailed", currentRecipe: index })
  }

  //nav bar home button was pressed, show home page
  viewHome()
  {
    this.setState({ page: "home", currentRecipe: null });
  }

  //nav bar recipe button was pressed, show full list of recipes
  viewRecipeNavClick()
  {
    this.setState({ page: "recipes", currentRecipe: null });
  }

  //update the currentRecipe we're currently viewing once previous or next is pressed
  changeRecipe(ID)
  {
    const { results } = this.state;

    //if -1, means previous was pressed. start over from last element in results
    if(ID === -1)
    {
      this.setState({ currentRecipe: results.length - 1 });
    }
    //if we're at max and the length is reached, start over from beginning
    else if (ID === results.length)
    {
      this.setState({ currentRecipe: 0 })
    }
    else
    {
      this.setState({ currentRecipe: ID })
    }
  }

  /*
    Rendered Elements
  */
  render() 
  {
    const { results, page, currentRecipe, homeHead} = this.state;

    //if results null, show loading
    //first pass always returns null
    if (!results || !homeHead) 
    {
      return (
        <div className="App">
          <div className="content">
            <Header
              viewHome={this.viewHome}
              viewRecipeNavClick={this.viewRecipeNavClick}
            />

            <Loading />

            <Footer />
          </div>
        </div>
      );
    }
    else 
    {
      //show home page
      if (page === "home") 
      {
        return (
          <div className="App">
            <div className="content">
              <Header
                viewHome={this.viewHome}
                viewRecipeNavClick={this.viewRecipeNavClick}
              />
              <div className="homeHeader">
                {homeHead.map((homeHeading, index) => (
                  <HomeHeading 
                    key={index}
                    body={homeHeading["body"]} 
                  />
                ))}
              </div>

              <hr />

              <h1>Recipes</h1>

              <div className="sepCol">
                {results.map((recipes, index) => (
                  <Recipe
                    key={index}
                    ID={index}
                    title={recipes["title"]}
                    field_images={recipes["field_images"]}
                    field_summary={recipes["field_summary"]}
                    viewRecipeClick={this.viewRecipeClick}
                  />
                ))}
              </div>

              <hr />

              <h1>Articles</h1>
              ToDo
              <br />
              <br />
              <br />

              <Footer />
            </div>
          </div>
        );
      }
      //show recipes page
      else if (page === "recipes") 
      {
        return (
          <div className="App">
            <div className="content">
              <Header
                viewHome={this.viewHome}
                viewRecipeNavClick={this.viewRecipeNavClick}
              />

              <h1>All Our Recipes</h1>

              <div className='sepCol'>
                {results.map((recipes, index) =>
                  <Recipe key={index}
                    ID={index}
                    title={recipes['title']}
                    field_images={recipes['field_images']}
                    field_summary={recipes['field_summary']}
                    viewRecipeClick={this.viewRecipeClick}
                  />
                )}
              </div>

              <Footer />
            </div>
          </div>
        );
      }
      //show detailed individual recipe page
      else if (page === "recipeDetailed") 
      {
        return (
          <div className="App">
            <div className="content">
              <Header
                viewHome={this.viewHome}
                viewRecipeNavClick={this.viewRecipeNavClick}
              />

              {results.slice(currentRecipe, currentRecipe + 1).map((recipes) =>
                <RecipeFull 
                  ID={currentRecipe}
                  title={recipes['title']}
                  field_images={recipes['field_images']}
                  field_ingredients={recipes['field_ingredients']}
                  body={recipes['body']}
                  changeRecipe={this.changeRecipe}
                />
              )}

              <Footer />
            </div>
          </div>
        );
      }
    }
  }
}

export default App;