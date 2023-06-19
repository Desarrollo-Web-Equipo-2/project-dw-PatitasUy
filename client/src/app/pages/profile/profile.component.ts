import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  publications: Array<any> = [];

  activeButton: string = 'publications';
  setActiveButton(button: string) {
    this.activeButton = button;
  }

  selectPublications(button: string) {

    this.setActiveButton(button);

    if (button === 'myPublications') {
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
    else if (button === 'myFavorites') {
      this.publications = [{
        imageURL: "https://c.files.bbci.co.uk/48DD/production/_107435681_perro1.jpg",
        title: "HeadlineFavoritos",
        state: "activo",
      }]
    }
  }
}
