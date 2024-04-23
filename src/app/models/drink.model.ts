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
export interface DrinkList {
  drinks: Drink[]; // Array of drinks
}
export interface Config {
  appName: string;
  backgroundColor: string;
  logoUrl: string;
  titleColor: string;
  footerText: string;
  textColor: string;
  fontStyle: string;
  apiUrl: string;
  apiUrlWithId: string;
  buttonColor: string;
  containerColor: string;
}
