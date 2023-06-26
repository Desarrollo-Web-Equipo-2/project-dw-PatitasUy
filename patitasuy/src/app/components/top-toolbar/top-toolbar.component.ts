import { Component, Input } from '@angular/core';
import { Location } from "@angular/common";

@Component({
  selector: 'app-top-toolbar',
  templateUrl: './top-toolbar.component.html',
  styleUrls: ['./top-toolbar.component.scss']
})
export class TopToolbarComponent {

    @Input() leftItem: 'logo' | 'back' | undefined;
    @Input() pageTitle: string = '';

    constructor(private location: Location) {
    }

    back() {
        this.location.back();
    }
}
