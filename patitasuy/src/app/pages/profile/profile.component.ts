import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.interface';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  ngOnInit() { }

  publications: Post[] = [];

  constructor(private readonly postService: PostsService) {
    /*
        this.postService.getAllPublicationsPerson(9).subscribe({
          next: (res) => {
            this.publications = res;
          },
          error: (error) => {
            console.log(error);
          }
        });
        */

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
  }

  selectPublications(event: any) {

    if (event.index === 0) {
      this.postService.getAllPublicationsPerson(9);
    }
    else if (event.index === 1) {
      //this.publications = this.profileService.getFavorites();
    }
  }
}

