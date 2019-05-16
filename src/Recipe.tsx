import './Recipe.scss';
import React from 'react';
import { AddRecipe } from './components/AddRecipe';
import { EditRecipe } from './components/EditRecipe';

interface RecipeState {
	recipes: [{
    name: string;
    ingredients: string[];
    instructions: string[];
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
    var recipes = (typeof localStorage["recipes"] !== "undefined") ? JSON.parse(localStorage.getItem('recipes') || '{}') : [
      {
        name: "Banana Smoothie", 
        ingredients: ["2 bananas", "1/2 cup vanilla yogurt", "1/2 cup skim milk", "2 teaspoons honey", "pinch of cinnamon"],
        instructions: ["put in oven", "do a star jump", "dab"]
      },
      {
        name: "Spaghetti",
        ingredients: ["Noodles", "Tomato Sauce", "Meatballs"],
        instructions: ["put in oven", "do a star jump", "dab"]
      },
      {
        name: "Split Pea Soup", 
        ingredients: ["1 pound split peas", "1 onion", "6 carrots", "4 ounces of ham"],
        instructions: ["put in oven", "do a star jump", "dab"]
      }
    ];
    this.setState({recipes: recipes});
  }

  showAddModal() {
    this.setState({ showAdd: !this.state.showAdd });
  }

  showEditModal(index: number) {
    this.setState({showEdit: !this.state.showEdit, currentlyEditing: index});
  }

  addRecipe(recipe: {name: string; ingredients: string[]; instructions:string[]}) {
    let recipes = this.state.recipes;
    recipes.push(recipe);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    this.setState({recipes: recipes});
    this.showAddModal();
  }

  editRecipe(newName: string, newIngredients: string[], newInstructions: string[], currentlyEditing: number) {
    let recipes = this.state.recipes;
    recipes[currentlyEditing] = {name: newName, ingredients: newIngredients, instructions: newInstructions};
    localStorage.setItem('recipes', JSON.stringify(recipes));
    this.setState({recipes: recipes});
    this.showEditModal(currentlyEditing);
  }

  deleteRecipe(index:any) {
    let recipes = this.state.recipes;
    recipes.splice(index, 1);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    this.setState({recipes: recipes, currentlyEditing: 0});
  }

  public render() {
    const recipes = this.state.recipes;
    var currentlyEditing = this.state.currentlyEditing;
    return (
      <div className="">
        <h1>RECIPE BOX</h1>
          <div id="recipes">
            {this.state.recipes.map((recipe, index) => (
              <div key={index}>
                <div>
                  <div className="title">{recipe.name}</div>
                </div>
                <div>
                  <div>
                    <h2>Ingredients</h2>
                    {recipe.ingredients.map((ingredient, index) => (
                      <div key={index}>{ingredient}</div>
                    ))}
                  </div>
                  <div>
                    <h2>Instructions</h2>
                    <ul className="recipe">
                      {recipe.instructions.map((instruction, index) => (
                        <li className="recipe__numeric-list" key={index}>{instruction}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <button onClick={() => {this.showEditModal(index)}}>Edit</button>
                    <button onClick={() => {this.deleteRecipe(index)}}>Delete</button>
                  </div>
                </div>
                <EditRecipe 
                  onShow={this.state.showEdit} 
                  onEdit={this.editRecipe} 
                  onEditModal={() => {this.showEditModal(currentlyEditing)}} 
                  currentlyEditing={currentlyEditing} 
                  recipe={recipes[currentlyEditing]} 
                />
              </div>
            ))}
          </div>
        <button onClick={this.showAddModal}>Add Recipe</button>
        <AddRecipe 
          onShow={this.state.showAdd} 
          onAdd={this.addRecipe} 
          onAddModal={this.showAddModal} 
        />
      </div>
    );
  };
}

export default Recipe;