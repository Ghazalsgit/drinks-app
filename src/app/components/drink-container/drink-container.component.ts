import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-drink-container',
  templateUrl: './drink-container.component.html',
  styleUrls: ['./drink-container.component.scss'],
})
export class DrinkContainerComponent {
  @Input() backgroundColor: string | undefined;
  @Input() textColor: string | undefined;
  @Input() img: string | undefined;
  @Input() title: string | undefined;
  @Input() buttonColor: string | undefined;

  @Output() showdetails: EventEmitter<void> = new EventEmitter<void>();

  onShowDetails(): void {
    this.showdetails.emit();
  }
}
