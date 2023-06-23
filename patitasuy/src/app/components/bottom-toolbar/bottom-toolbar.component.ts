import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-bottom-toolbar',
  templateUrl: './bottom-toolbar.component.html',
  styleUrls: ['./bottom-toolbar.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
  ],
})
export class BottomToolbarComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
