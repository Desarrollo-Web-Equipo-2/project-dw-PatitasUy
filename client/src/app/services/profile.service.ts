import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor() { }

  publications: Array<any> = [];

  getPublications() {
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

    return this.publications;

  }

  getFavorites() {
    this.publications = this.publications = [{
      imageURL: "https://c.files.bbci.co.uk/48DD/production/_107435681_perro1.jpg",
      title: "HeadlineFavoritos",
      state: "activo",
    }]

    return this.publications;
  }


}
