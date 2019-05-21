//import the necessary files
import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { recipe, recipeState } from '../../../types/types';

interface EditRecipeProps {
  onEdit: any;
  currentlyEditing: any;
  onEditModal: any;
  onShow: any;
  recipe: recipe;
}

//create a class for displaying the modal for editing an existing recipe and export it
export class EditRecipe extends React.Component<EditRecipeProps, recipeState> {
  constructor(props:any) {//create a state to handle the recipe to be edited
    super(props);
    this.state = {name: "", difficulty: "", ingredients: "", instructions: ""};
    this.handleRecipeDifficultyChange = this.handleRecipeDifficultyChange.bind(this);
    this.handleRecipeNameChange = this.handleRecipeNameChange.bind(this);
    this.handleRecipeIngredientsChange = this.handleRecipeIngredientsChange.bind(this);
    this.handleRecipeInstructionsChange = this.handleRecipeInstructionsChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  static getDerivedStateFromProps(props:any, state:any) {//make the recipe prop a state
    const prevName = state.prevName;
    const prevIngredients = state.prevIngredients;
    const prevInstructions = state.prevInstructions;
    const name = prevName !== props.recipe.name ? props.recipe.name : state.name;
    const ingredients = prevIngredients !== props.recipe.ingredients.join(",") ? props.recipe.ingredients.join(",") : state.ingredients;
    const instructions = prevInstructions !== props.recipe.instructions.join(",") ? props.recipe.instructions.join(",") : state.instructions;
    return {
      prevDifficulty: props.recipe.difficulty,
      prevName: props.recipe.name, name,
      prevIngredients: props.recipe.ingredients.join(","), ingredients,
      prevInstructions: props.recipe.ingredients.join(","), instructions
    }
  }

  handleRecipeDifficultyChange(e: any) {
    this.setState({difficulty: e.target.value});
  }

  handleRecipeIngredientsChange(e:any) {//change the ingredients to reflect user input
    this.setState({ingredients: e.target.value});
  }

  handleRecipeInstructionsChange(e:any) {//change the ingredients to reflect user input
    this.setState({instructions: e.target.value});
  }

  handleRecipeNameChange(e:any) {//change the name to reflect user input
    this.setState({name: e.target.value});
  }

  handleEdit(e:any) {//get the recipe data, manipulate it and call the function for editing an existing recipe
    e.preventDefault();
    const onEdit = this.props.onEdit;
    const currentlyEditing = this.props.currentlyEditing;
    const regExp = /\s*,\s*/;
    var name = this.state.name;
    var difficulty = this.state.difficulty;
    var ingredients = this.state.ingredients.split(regExp);
    var instructions = this.state.instructions.split(regExp);
    onEdit(name, difficulty, ingredients, instructions, currentlyEditing);
  }

  handleCancel() {
    const onEditModal = this.props.onEditModal;
    this.setState({name: this.props.recipe.name, ingredients: this.props.recipe.ingredients.join(","), instructions: this.props.recipe.instructions.join(",")});
    onEditModal();
  }

  render() {
    const onShow = this.props.onShow;
    var regex1 = /^\S/;
    var regex2 = /^[^,\s]/;
    var regex3 = /[^,\s]$/;
    const validRecipe = regex1.test(this.state.name) && regex2.test(this.state.ingredients) && regex3.test(this.state.ingredients) && regex2.test(this.state.instructions) && regex3.test(this.state.instructions);;

    return(
      <Modal centered size="lg" show={onShow} onHide={this.handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formControlsName">
            <Form.Label>Recipe Name</Form.Label>
            <Form.Control type="text" required onChange={this.handleRecipeNameChange} value={this.state.name} placeholder="Enter Name" />
          </Form.Group>
          <Form.Group controlId="formControlsDifficulty">
            <Form.Label>Difficulty</Form.Label>
            <Form.Control as="select" type="text" required onChange={this.handleRecipeDifficultyChange} value={this.state.difficulty}>
              <option value="" disabled selected>Select your option</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formControlsIngredients">
            <Form.Label>Recipe Ingredients</Form.Label>
            <Form.Control as="textarea" type="text" required onChange={this.handleRecipeIngredientsChange} value={this.state.ingredients} placeholder="Enter Ingredients(separate by commas)" />
          </Form.Group>
          <Form.Group controlId="formControlsInstructions">
            <Form.Label>Recipe Instructions</Form.Label>
            <Form.Control as="textarea" type="text" required onChange={this.handleRecipeInstructionsChange} value={this.state.instructions} placeholder="Enter Instructions(separate by commas)" />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button disabled={!validRecipe} variant="success" onClick={this.handleEdit}>Save Recipe</Button>
        </Modal.Footer>
      </Modal>
    );
  }
};