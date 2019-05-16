//import the necessary files
import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

interface AddRecipeProps {
  onAdd: any;
  onAddModal: () => void;
  onShow: boolean;
}

interface AddRecipeState {
  name: string;
  ingredients: string;
  instructions: string;
  // difficulty: string
}

export class AddRecipe extends React.Component<AddRecipeProps ,AddRecipeState> {
  constructor(props:any) {
    super(props);
    this.state = {name: "", ingredients: "", instructions: ""};

    this.handleRecipeInstructionsChange = this.handleRecipeInstructionsChange.bind(this);
    this.handleRecipeNameChange = this.handleRecipeNameChange.bind(this);
    this.handleRecipeIngredientsChange = this.handleRecipeIngredientsChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleRecipeNameChange(e: any) {
    this.setState({name: e.target.value});
  }

  handleRecipeIngredientsChange(e: any) {
    this.setState({ingredients: e.target.value});
  }

  handleRecipeInstructionsChange(e: any) {
    this.setState({instructions: e.target.value});
  }

  handleSubmit(e: (any)) {
    e.preventDefault();
    const onAdd = this.props.onAdd;
    const regExp = /\s*,\s*/;
    var newName = this.state.name;
    var newIngredients = this.state.ingredients.split(regExp);
    var newItemInstructions = this.state.instructions.split(regExp);
    var newRecipe = {name: newName, ingredients: newIngredients, instructions: newItemInstructions};
    onAdd(newRecipe);
    this.setState({name: "", ingredients: "", instructions: ""});
  }

  handleCancel() {
    const onAddModal = this.props.onAddModal;
    this.setState({name: "", ingredients: "", instructions: ""});
    onAddModal();
  }
  
  render() {
    const onShow = this.props.onShow;
    var regex1 = /^\S/;
    var regex2 = /^[^,\s]/;
    var regex3 = /[^,\s]$/;
    const validRecipe = regex1.test(this.state.name) && regex2.test(this.state.ingredients) && regex3.test(this.state.ingredients);

    return(
      <Modal centered size="lg" show={onShow} onHide={this.handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>New Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formControlsName">
            <Form.Label>Recipe Name</Form.Label>
            <Form.Control type="text" required onChange={this.handleRecipeNameChange} value={this.state.name} placeholder="Enter Name" />
          </Form.Group>
          <Form.Group controlId="formControlsIngredients">
            <Form.Label>Recipe Ingredients</Form.Label>
            <Form.Control as="textarea" type="text" required onChange={this.handleRecipeIngredientsChange} value={this.state.ingredients} placeholder="Enter Ingredients (separate by commas)" />
          </Form.Group>
          <Form.Group controlId="formControlsInscructions">
            <Form.Label>Recipe instructions</Form.Label>
            <Form.Control as="textarea" type="text" required onChange={this.handleRecipeInstructionsChange} value={this.state.instructions} placeholder="Enter instructions (separate by commas)" />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button disabled={!validRecipe} variant="success" onClick={this.handleSubmit}>Save Recipe</Button>
        </Modal.Footer>
      </Modal>
    );
  }
};