import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  publications: Array<any> = [];
  
  selectPublications(event: any) {

    if (event.index === 0) {
      this.publications = [{
        imageURL: "https://c.files.bbci.co.uk/48DD/production/_107435681_perro1.jpg",
        title: "HeadlinePublications",
        state: "activo",
      },
      {
        imageURL: "https://c.files.bbci.co.uk/48DD/production/_107435681_perro1.jpg",
        title: "HeadlineFavoritos",
        state: "activo",
      }]
    }
    else if (event.index === 1) {
      this.publications = [{
        imageURL: "https://c.files.bbci.co.uk/48DD/production/_107435681_perro1.jpg",
        title: "HeadlineFavoritos",
        state: "activo",
      }]
    }
  }
}
