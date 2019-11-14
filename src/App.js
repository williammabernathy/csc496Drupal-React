import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Card, CardImg, CardText, CardBody, CardTitle, Button } from 'reactstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetch, PATH_BASE, PATH_JSON, PARAM_TYPE, recURL, homeURL } from './constants/index.js'

//display a basic card of individual recipes
const Recipe = ( { ID, title, field_images, field_summary, viewRecipeClick } ) =>
{
  //split images, only want the first of two
  if(field_images)
  {
    var image = field_images.split(',').slice(0)[0].trim();
  }

  return (
    <div className="recipeStyle">
      <Card className = "card" style={{ width: '18rem', border: "1px solid lightgrey" }}>
        <CardImg top width="25%" src={`${PATH_BASE}${image}`} alt="Food Image" />
        <CardBody>
          <CardTitle><b>{title}</b></CardTitle>
          <CardText><div dangerouslySetInnerHTML={{ __html: field_summary }}/></CardText>

          {/* whenever an element is clicked, get its ID */}
          <center>
            <Button id="full" href={`${recURL}/${ID}`} onClick={() => viewRecipeClick(ID)}>
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
  if(field_images)
  {
    var image = field_images.split(',').slice(0)[0].trim();
  }

  return(
    <div className="cardFull" >
      <div className="cardFullImage"><img src={`${PATH_BASE}${image}`} alt="Food" /></div>
      <div>
      <hr/>
        <div><b>{title}</b></div><br/>
        <div>{field_ingredients}</div><br/>
        <div><div dangerouslySetInnerHTML={{ __html: body }}/></div>
        <hr/>

        {/* buttons to cycle through recipes. change url when pressed
            increment or decrement ID to cycle recipes */}
        <Button id="previous" href={`${recURL}/${ID}`} className="previous" onClick = {() => changeRecipe(ID-1)}>
          Previous
        </Button>
        <Button id="next" href={`${recURL}/${ID}`} className="next" onClick = {() => changeRecipe(ID+1)}>
          Next
        </Button>
      </div>
    </div>
  );
}

//Head component used to display data from fetching the home page
//info from the test drupal site
//renders the html within the json data
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
      <Navbar.Brand id="brand" className="navBrand" href={homeURL} onClick={() => viewHome()}>CSC496</Navbar.Brand>
      <Nav>
        <Nav.Link id="viewHome" className="navLink" href={homeURL} onClick={() => viewHome()}>Home</Nav.Link>
        <Nav.Link id="viewRecList" className="navLink" href={recURL} onClick={() => viewRecipeNavClick()}>Recipes</Nav.Link>
        <Nav.Link id="viewGit" className="navLink" href="https://github.com/williammabernathy/csc496Drupal-React">Github</Nav.Link>
      </Nav>
    </Navbar>
  );
}

//general footer component
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

    //binding functions
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
 //fetch recipes from test drupal site
  fetchRecipes()
  {
    fetch(`${PATH_BASE}${PATH_JSON}${PARAM_TYPE}`).then(response => response.json()).then(results => this.setState({ results }))
  }

  //fetch home page information from drupal test site
  fetchHome()
  {
    fetch(`http://gtest.dev.wwbtc.com/json/page?_format=json`).then(response => response.json()).then(homeHead => this.setState({ homeHead }))
  }

  //once component mounts on second pass, fetch data
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
  //return statements added for testing purposes
  changeRecipe(ID)
  {
    const { results, currentRecipe } = this.state;

    //if -1, means previous was pressed while at first index. 
    //start over from last element in results
    if(results && ID === -1)
    {
      this.setState({ currentRecipe: results.length - 1 });
      return this.state.currentRecipe;
    }
    //if we're at max and the length is reached, start over from beginning
    else if (results && ID === results.length)
    {
      this.setState({ currentRecipe: 0 })
      return this.state.currentRecipe;
    }
    else
    {
      this.setState({ currentRecipe: ID })
      return this.state.currentRecipe;
    }
  }

  /*
    Rendered Elements
  */
  render() 
  {
    //get our data from props to use for rendering
    const { results, page, currentRecipe, homeHead} = this.state;

    //slice up the results and only take first 2 to display on the homepage
    if(results)
    {
      var resultsRecHome = results.slice(0, 2);
    }

    //only want first homepage message
    if(homeHead)
    {
      var homeHeadSlice = homeHead.slice(0, 1);
    }

    //if results null, show loading
    //first pass always returns null as App component not mounted
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
      //show home page; default 
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
                {homeHeadSlice.map((homeHeading, index) => (
                  <HomeHeading 
                    key={index}
                    body={homeHeading["body"]} 
                  />
                ))}
              </div>

              <hr />

              <h1>Recipes</h1>

              <div className="sepCol">
                {resultsRecHome.map((recipes, index) => (
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
      //page change occurs when navbar viewRecipe button is clicked
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
      //page change occurs when viewRecipeDetail is clicked
      //from homepage recipes or recipe lists
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

//export custom components for reference elsewhere
//ie testing
export { Recipe, RecipeFull, HomeHeading, Footer, Header, Loading, };