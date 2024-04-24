import { Component, Input } from '@angular/core';
import { Config } from 'src/app/models/drink.model';

@Component({
  standalone: true,
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  @Input() config?: Config;
}
