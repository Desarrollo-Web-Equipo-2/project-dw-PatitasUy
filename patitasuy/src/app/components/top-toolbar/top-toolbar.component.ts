import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-top-toolbar',
  templateUrl: './top-toolbar.component.html',
  styleUrls: ['./top-toolbar.component.scss']
})
export class TopToolbarComponent {

    @Input() leftItem: 'logo' | 'back' | undefined;
    @Input() pageTitle: string = '';

    constructor() {
    }
}
