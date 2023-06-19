import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  publications: Array<any> = [
    {
      imageURL: "https://c.files.bbci.co.uk/48DD/production/_107435681_perro1.jpg",
      title: "Headline 6",
      state: "activo",
    },
    {
      imageURL: "https://c.files.bbci.co.uk/48DD/production/_107435681_perro1.jpg",
      title: "Headline 6",
      state: "activo",
    },
    {
      imageURL: "https://c.files.bbci.co.uk/48DD/production/_107435681_perro1.jpg",
      title: "Headline 6",
      state: "activo",
    },
    {
      imageURL: "https://c.files.bbci.co.uk/48DD/production/_107435681_perro1.jpg",
      title: "Headline 6",
      state: "activo",
    },
    {
      imageURL: "https://c.files.bbci.co.uk/48DD/production/_107435681_perro1.jpg",
      title: "Headline 6",
      state: "activo",
    },
  ];


}
