export interface Drink {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  strInstructions: string;
  strCategory: string;
  strInstructionsDE?: string;
  strInstructionsES?: string;
  strInstructionsFR?: string;
  strInstructionsIT?: string;
}
export interface ApiResponse {
  drinks: Drink[]; // Array of drinks
}
export interface Category {
  strCategory: string;
}

export interface ApiResponseCategory {
  drinks: Category[]; // Array of categories
}
