import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, combineLatest, map } from 'rxjs';
import { DrinkContainerComponent } from 'src/app/components/drink-container/drink-container.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { PaginatorComponent } from 'src/app/components/paginator/paginator.component';
import { Config, Drink } from 'src/app/models/drink.model';
import { ApiService } from 'src/app/services/api.service';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    PaginatorComponent,
    FooterComponent,
    DrinkContainerComponent,
    CommonModule,
  ],
})
export class HomeComponent implements OnInit {
  drinks$: Observable<Drink[]>;
  pageSize$: Subject<number> = new BehaviorSubject<number>(10);
  pageNumber$: Subject<number> = new BehaviorSubject<number>(0);
  totalItems$: Observable<number>;
  configFile$: Observable<Config>;
  paginatedDrinks$: Observable<Drink[]>;

  constructor(
    private api: ApiService,
    private router: Router,
    private config: ConfigService
  ) {
    this.drinks$ = this.api.getAlcoholicDrinks();
    this.configFile$ = this.config.getConfig();

    this.totalItems$ = this.drinks$.pipe(map((value) => value.length));

    this.paginatedDrinks$ = combineLatest([
      this.drinks$,
      this.pageSize$,
      this.pageNumber$,
    ]).pipe(
      map(([drinks, pageSize, pageNumber]) => {
        const startIndex = pageNumber * pageSize;
        const endIndex = startIndex + pageSize;
        const currentDrinks = drinks.slice(startIndex, endIndex);
        return currentDrinks;
      })
    );
  }

  ngOnInit(): void {}

  onPageChanged(event: PageEvent) {
    this.pageNumber$.next(event.pageIndex);
  }

  onShowDetails(id: string) {
    this.router.navigate([`details/${id}`]);
  }
}
