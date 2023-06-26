import { Injectable } from '@angular/core';
import { delay, Observable, of } from "rxjs";
import { Post } from "../models/post.interface";

@Injectable({
    providedIn: 'root'
})
export class PostsService {

    fakePost: Post = {
        id: 0,
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
        location: 'Montevideo, Uruguay',
        state: "Activo"
    };

    constructor() {
    }

    getPostById(id: number): Observable<Post> {
        // TODO: return from server
        return of(this.fakePost).pipe(delay(1000));
    }

    isMarkedAsFavorite(postId: number) {
        return of(true).pipe(delay(1000));
    }

    markAsFavorite(postId: number, favorite: boolean){
        return of(this.fakePost).pipe(delay(1000));
    }

}
