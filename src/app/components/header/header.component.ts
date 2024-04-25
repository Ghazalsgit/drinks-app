import { Component, Input } from '@angular/core';
import { Config } from 'src/app/models/drink.model';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() config?: Config;
}
