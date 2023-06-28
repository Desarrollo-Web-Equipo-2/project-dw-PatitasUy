import { Injectable } from '@angular/core';
import { Post } from '../models/post.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor() { }

  publications: Array<Post> = [];

  getPublications() {
    this.publications = [{
      id: 0,
      title: 'Post Publicacion 1',
      photoUrls: [
        'https://images.pexels.com/photos/3687770/pexels-photo-3687770.jpeg'
      ],
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid autem cum eaque id incidunt iure libero, molestias nulla obcaecati odit provident quaerat quasi quidem reprehenderit repudiandae sequi temporibus velit voluptates. texto jaja hola buenas pedo culo caca pis',
      age: '1 year',
      gender: 'male',
      type: 'dog',
      size: 'medium',
      location: 'Montevideo, Uruguay',
      state: "Activo"
    },
    {
      id: 1,
      title: 'Post Publicacion 2',
      photoUrls: [
        'https://images.pexels.com/photos/3687770/pexels-photo-3687770.jpeg'
      ],
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid autem cum eaque id incidunt iure libero, molestias nulla obcaecati odit provident quaerat quasi quidem reprehenderit repudiandae sequi temporibus velit voluptates. texto jaja hola buenas pedo culo caca pis',
      age: '1 year',
      gender: 'male',
      type: 'dog',
      size: 'medium',
      location: 'Montevideo, Uruguay',
      state: "Activo"
    }]

    return this.publications;

  }

  getFavorites() {
    this.publications = this.publications = [{
      id: 2,
      title: 'Post Favorito',
      photoUrls: [
        'https://images.pexels.com/photos/3687770/pexels-photo-3687770.jpeg'
      ],
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid autem cum eaque id incidunt iure libero, molestias nulla obcaecati odit provident quaerat quasi quidem reprehenderit repudiandae sequi temporibus velit voluptates. texto jaja hola buenas pedo culo caca pis',
      age: '1 year',
      gender: 'male',
      type: 'dog',
      size: 'medium',
      location: 'Montevideo, Uruguay',
      state: "Activo"
    }]

    return this.publications;
  }

  /*TODO

    getAllPublicationsPerson(id: number) id usuario
    {

    }

    getFavoritePublications(id : number) id usuario
  */


}