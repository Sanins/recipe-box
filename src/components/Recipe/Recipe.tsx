import './Recipe.scss';
import React from 'react';
import { AddRecipe } from '../AddRecipe/AddRecipe';
import { EditRecipe } from '../EditRecipe/EditRecipe';
import { Container, Row, Col, Button, ButtonToolbar } from 'react-bootstrap';
import { recipe } from './../../../types/types'
import firebase from 'firebase';

interface RecipeState {
	recipes: recipe[];
  showAdd: boolean;
  showEdit: boolean;
  currentlyEditing: number;
}

export class Recipe extends React.Component<any, RecipeState> {
  constructor(props: any) {
		super(props);
		this.state = {
			recipes: [{
        difficulty: '',
        name: '',
        ingredients: [''],
        instructions: [''],
      }],
      showAdd: false,
      showEdit: false,
      currentlyEditing: 0,
    };

    this.showAddModal = this.showAddModal.bind(this);
    this.showEditModal = this.showEditModal.bind(this);
    this.addRecipe = this.addRecipe.bind(this);
    this.editRecipe = this.editRecipe.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
  }

  componentDidMount() {
    const recipesRef = firebase.database().ref('recipes');
    recipesRef.on('value', (snapshot) => {
      let recipes = snapshot.val();
      let newState = [{
        difficulty: '',
        name: '',
        ingredients: [''],
        instructions: [''],
      }];
      for (let recipe in recipes) {
        newState.push({
          difficulty: recipes[recipe].difficulty,
          name: recipes[recipe].name,
          ingredients: recipes[recipe].ingredients,
          instructions: recipes[recipe].instructions
        });
      }
      this.setState({
        recipes: newState
      });
    });
  }

  showAddModal() {
    this.setState({ showAdd: !this.state.showAdd });
  }

  showEditModal(index: number) {
    this.setState({showEdit: !this.state.showEdit, currentlyEditing: index});
  }

  addRecipe(recipe: {name: string; difficulty:string; ingredients: string[]; instructions:string[]}) {
    let recipes = this.state.recipes;
    recipes.push(recipe);
    this.setState({recipes: recipes});
    this.showAddModal();
  }

  editRecipe(newName: string, newDifficulty:string, newIngredients: string[], newInstructions: string[], currentlyEditing: number) {
    let recipes = this.state.recipes;
    recipes[currentlyEditing] = {name: newName, difficulty: newDifficulty, ingredients: newIngredients, instructions: newInstructions};
    this.setState({recipes: recipes});
    this.showEditModal(currentlyEditing);
  }

  deleteRecipe(index:any) {
    let recipes = this.state.recipes;
    recipes.splice(index, 1);
    this.setState({recipes: recipes, currentlyEditing: 0});
  }

  public render() {
    const recipes = this.state.recipes;
    var currentlyEditing = this.state.currentlyEditing;

    return (
      <Container className='recipes' >
        <Row className="justify-content-md-center">
          <Col md="auto">
            <h1>RECIPE BOX</h1>
          </Col>
          <Col md="auto">
            <Button className="recipe__add-recipe--btn" variant="primary" onClick={this.showAddModal}>Add Recipe</Button>
          </Col>
            <Container id="recipes">
              {this.state.recipes.map((recipe, index) => (
                <Row className="recipe" key={index}>
                  <Col className="title">{recipe.name}</Col>
                    <Container>
                      <Row>
                        <Col>
                          <h2 className='recipe__subheading'>Difficulty</h2>
                          <p>{recipe.difficulty}</p>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={6} md={4}>
                          <h2 className='recipe__subheading'>Ingredients</h2>
                          <ul className="recipe__list">
                            <li className="recipe__list__ingredients" key={index}>{recipe.ingredients}</li>
                          </ul>
                        </Col>
                        <Col xs={12} md={8}>
                          <h2 className='recipe__subheading'>Instructions</h2>
                          <ul className="recipe__list">
                            <li className="recipe__numeric-list" key={index}>{index +1}. {recipe.instructions}</li>
                          </ul>
                        </Col>
                      </Row>
                      <Row className='recipes__edit-delete-btns'>
                        <Col>
                          <ButtonToolbar>
                            <Button className="button__right-margin" variant="info" onClick={() => {this.showEditModal(index)}}>Edit</Button>
                            <Button variant="danger" onClick={() => {this.deleteRecipe(index)}}>Delete</Button>
                          </ButtonToolbar>
                        </Col>
                      </Row>
                    </Container>
                    <EditRecipe 
                      onShow={this.state.showEdit} 
                      onEdit={this.editRecipe} 
                      onEditModal={() => {this.showEditModal(currentlyEditing)}} 
                      currentlyEditing={currentlyEditing} 
                      recipe={recipes[currentlyEditing]} 
                    />
                  </Row>
                ))}
              </Container>
            <AddRecipe 
              onShow={this.state.showAdd} 
              onAdd={this.addRecipe} 
              onAddModal={this.showAddModal} 
            />
        </Row>
      </Container>
    );
  };
}

export default Recipe;