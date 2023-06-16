import { Component } from '@angular/core';
import { Post } from "../../models/post.interface";

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss']
})
export class DetailsComponent {

    post?: Post;
    isFavorite = false;

    constructor() {
        setTimeout(() => {
            this.post = {
                title: 'Post de prueba',
                photoUrls: [
                    'https://images.pexels.com/photos/3687770/pexels-photo-3687770.jpeg',
                    'https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg',
                    'https://images.pexels.com/photos/3687770/pexels-photo-3687770.jpeg',
                    'https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg',
                    'https://images.pexels.com/photos/3687770/pexels-photo-3687770.jpeg',
                ],
                description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid autem cum eaque id incidunt iure libero, molestias nulla obcaecati odit provident quaerat quasi quidem reprehenderit repudiandae sequi temporibus velit voluptates. texto jaja hola buenas pedo culo caca pis',
                age: '1 year',
                gender: 'male',
                type: 'dog',
                size: 'medium',
                location: 'Montevideo, Uruguay'
            }
        }, 1000);

    }


    setFavourite() {
        this.isFavorite = !this.isFavorite;
        // TODO
    }
}
