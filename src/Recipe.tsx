import './Recipe.scss';
import React from 'react';
import {PanelGroup,Panel,Button,ButtonToolbar,ListGroup,ListGroupItem} from 'react-bootstrap';
import { AddRecipe } from './components/AddRecipe';
import { EditRecipe } from './components/EditRecipe';

interface RecipeState {
	recipes: [{
    name: string;
    ingredients: string[];
  }];
  showAdd: boolean;
  showEdit: boolean;
  currentlyEditing: number;
}

export class Recipe extends React.Component<any, RecipeState> {
  constructor(props: any) {
		super(props);
		this.state = {
			recipes: [{
        name: '',
        ingredients: [''],
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

  componentDidMount() {//load the local storage data after the component renders
    var recipes = (typeof localStorage["recipes"] !== "undefined") ? JSON.parse(localStorage.getItem('recipes') || '{}') : [
      {name: "Banana Smoothie", ingredients: ["2 bananas", "1/2 cup vanilla yogurt", "1/2 cup skim milk", "2 teaspoons honey", "pinch of cinnamon"]},
      {name: "Spaghetti", ingredients: ["Noodles", "Tomato Sauce", "Meatballs"]},
      {name: "Split Pea Soup", ingredients: ["1 pound split peas", "1 onion", "6 carrots", "4 ounces of ham"]}
    ];
    this.setState({recipes: recipes});
  }

  showAddModal() {
    this.setState({ showAdd: !this.state.showAdd });
  }

  showEditModal(index: number) {
    this.setState({showEdit: !this.state.showEdit, currentlyEditing: index});
  }

  addRecipe(recipe: {name: string; ingredients: string[]}) {
    let recipes = this.state.recipes;
    recipes.push(recipe);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    this.setState({recipes: recipes});
    this.showAddModal();
  }

  editRecipe(newName: string, newIngredients: string[], currentlyEditing: number) {
    let recipes = this.state.recipes;
    recipes[currentlyEditing] = {name: newName, ingredients: newIngredients};
    localStorage.setItem('recipes', JSON.stringify(recipes));
    this.setState({recipes: recipes});
    this.showEditModal(currentlyEditing);
  }

  deleteRecipe(index:any) {//delete an existing recipe
    let recipes = this.state.recipes;
    recipes.splice(index, 1);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    this.setState({recipes: recipes, currentlyEditing: 0});
  }

  public render() {
    const recipes = this.state.recipes;
    var currentlyEditing = this.state.currentlyEditing;
    return (
      <div className="jumbotron">
        <h1>RECIPE BOX</h1>
        <PanelGroup accordion id="recipes">
          {this.state.recipes.map((recipe, index) => (
            <Panel eventKey={index} key={index}>
              <Panel.Heading>
                <Panel.Title className="title" toggle>{recipe.name}</Panel.Title>
              </Panel.Heading>
              <Panel.Body collapsible>
                <ListGroup>
                  {recipe.ingredients.map((ingredient, index) => (
                    <ListGroupItem key={index}>{ingredient}</ListGroupItem>
                  ))}
                </ListGroup>
                <ButtonToolbar>
                  <Button bsStyle="warning" onClick={() => {this.showEditModal(index)}}>Edit</Button>
                  <Button bsStyle="danger" onClick={() => {this.deleteRecipe(index)}}>Delete</Button>
                </ButtonToolbar>
              </Panel.Body>
              <EditRecipe onShow={this.state.showEdit} onEdit={this.editRecipe} onEditModal={() => {this.showEditModal(currentlyEditing)}} currentlyEditing={currentlyEditing} recipe={recipes[currentlyEditing]} />
            </Panel>
          ))}
        </PanelGroup>
        
        <Button bsStyle="primary" onClick={this.showAddModal}>Add Recipe</Button>
        <AddRecipe onShow={this.state.showAdd} onAdd={this.addRecipe} onAddModal={this.showAddModal} />
        
      </div>
    );
  };
}

export default Recipe;