import { Component, Input } from '@angular/core';
import { Location } from "@angular/common";

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss']
})
export class TopNavbarComponent {

    @Input() leftItem: 'logo' | 'back' | undefined;
    @Input() pageTitle: string = '';

    constructor(private location: Location) {
    }

    back() {
        this.location.back();
    }
}
