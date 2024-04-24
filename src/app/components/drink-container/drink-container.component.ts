import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-drink-container',
  templateUrl: './drink-container.component.html',
  styleUrls: ['./drink-container.component.scss'],
})
export class DrinkContainerComponent {
  @Input() backgroundColor?: string;
  @Input() textColor?: string;
  @Input() img?: string;
  @Input() title?: string;
  @Input() buttonColor?: string;

  @Output() showdetails: EventEmitter<void> = new EventEmitter<void>();

  onShowDetails(): void {
    this.showdetails.emit();
  }
}
