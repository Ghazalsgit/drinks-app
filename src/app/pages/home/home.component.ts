import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { Category, Drink } from 'src/app/models/drink.model';
import { ApiService } from 'src/app/services/api.service';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  drinks$ = new BehaviorSubject<Drink[]>([]);
  categories$ = new BehaviorSubject<Category[]>([]);
  paginatedDrinks: Subject<Drink[]> = new BehaviorSubject<Drink[]>([]);
  pageSize = 10;
  totalItems = 0;
  configFile: any;

  constructor(
    private api: ApiService,
    private router: Router,
    private config: ConfigService
  ) {}

  ngOnInit(): void {
    this.api.getAlcoholicDrinks().subscribe((drinks) => {
      this.totalItems = drinks.length;
      this.paginateAndSet(drinks, 0);
    });

    this.config.getConfig().subscribe((config) => {
      console.log(config);

      this.configFile = config;
    });
  }

  onPageChanged(event: PageEvent) {
    this.api.getAlcoholicDrinks().subscribe((drinks) => {
      this.paginateAndSet(drinks, event.pageIndex);
    });
  }

  onShowDetails(id: string) {
    this.router.navigate([`details/${id}`]);
  }

  private paginateAndSet(drinks: Drink[], pageIndex: number) {
    const startIndex = pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    const currentDrinks = drinks.slice(startIndex, endIndex);
    this.paginatedDrinks.next(currentDrinks);
  }
}
