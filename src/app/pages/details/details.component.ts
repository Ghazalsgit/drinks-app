import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Config, Drink } from 'src/app/models/drink.model';
import { ApiService } from 'src/app/services/api.service';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent {
  drink$ = new BehaviorSubject<Drink[]>([]);
  configFile$: Observable<Config>;
  selectedLanguage: string = 'en';
  description?: string;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router,
    private config: ConfigService
  ) {
    this.configFile$ = this.config.getConfig();
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');

      if (id !== null) {
        this.api.getAlcoholicDrinkById(id).subscribe((drink) => {
          const newDrink = drink.drinks;
          this.drink$.next(newDrink);
        });
      }
    });
  }

  ingredientsWithMeasurements(drink: any): string[] {
    let ingredients: string[] = [];
    let i = 1;
    while (drink[`strIngredient${i}`]) {
      const ingredient = drink[`strIngredient${i}`];
      let measurement = drink[`strMeasure${i}`];

      if (ingredient) {
        if (!measurement) {
          measurement = 'not available';
        }
        ingredients = [...ingredients, `${ingredient}: ${measurement}`];
      }
      i++;
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
        this.description = drink.strInstructions;
    }
  }
}
