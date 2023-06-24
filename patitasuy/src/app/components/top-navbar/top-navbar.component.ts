import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss'],
})
export class TopNavbarComponent {

  @Input() leftItem: 'logo' | 'back' | undefined;
  @Input() pageTitle: string = '';

  constructor() {
  }

  back() {
    // this.location.back();
  }
}
