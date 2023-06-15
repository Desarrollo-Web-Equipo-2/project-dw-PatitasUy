import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `
      <mat-spinner color="primary"
                   diameter="70"
      ></mat-spinner>
  `,
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {

}
