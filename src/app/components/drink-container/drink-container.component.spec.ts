import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrinkContainerComponent } from './drink-container.component';

describe('DrinkContainerComponent', () => {
  let component: DrinkContainerComponent;
  let fixture: ComponentFixture<DrinkContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrinkContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrinkContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
