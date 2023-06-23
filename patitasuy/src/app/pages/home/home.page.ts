import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { BottomToolbarComponent } from '../../bottom-toolbar/bottom-toolbar.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    BottomToolbarComponent,
  ],
})
export class HomePage {
  constructor() {}
}
