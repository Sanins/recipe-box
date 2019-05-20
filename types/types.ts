export interface recipe {
	difficulty: string;
    ingredients: string[];
    instructions: string[];
    name: string;
}

export interface recipeState {
    difficulty: string;
    ingredients: string;
    instructions: string;
    name: string;
}