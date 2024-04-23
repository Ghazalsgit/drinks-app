import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Config, Drink } from 'src/app/models/drink.model';
import { ApiService } from 'src/app/services/api.service';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent {
  drink$ = new BehaviorSubject<Drink[] | undefined>(undefined);
  selectedLanguage: string = 'en';
  description: string | undefined;
  configFile: Config | undefined;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router,
    private config: ConfigService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');

      if (id !== null) {
        this.api.getAlcoholicDrinkById(id).subscribe((drink) => {
          const newDrink = drink.drinks;
          console.log(newDrink);
          this.drink$.next(newDrink);
        });
      }
    });
    this.config.getConfig().subscribe((config) => {
      console.log(config);

      this.configFile = config;
    });
  }

  ingredientsWithMeasurements(drink: any): string[] {
    const ingredients = [];
    for (let i = 1; i <= 15; i++) {
      const ingredient = drink['strIngredient' + i];
      const measurement = drink['strMeasure' + i];
      if (ingredient && measurement) {
        ingredients.push(`${ingredient}: ${measurement}`);
      }
    }
    return ingredients;
  }

  goBack() {
    this.router.navigate(['/']);
  }
  onLanguageChange(event: any, drink: Drink): void {
    switch (event.target.value) {
      case 'de':
        this.description = drink.strInstructionsDE || drink.strInstructions;
        break;
      case 'es':
        this.description = drink.strInstructionsES || drink.strInstructions;
        break;
      case 'fr':
        this.description = drink.strInstructionsFR || drink.strInstructions;
        break;
      case 'it':
        this.description = drink.strInstructionsIT || drink.strInstructions;
        break;
      default:
        this.description = drink.strInstructions || drink.strInstructions;
    }
    console.log(event.target.value, drink);
  }
}
