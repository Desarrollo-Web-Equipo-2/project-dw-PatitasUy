import { Injectable } from '@angular/core';
import { delay, Observable, of } from "rxjs";
import { Post } from "../models/post.interface";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PostsService {

    private apiUrl: string = environment.apiUrl


    fakePost: Post = {
        id: 0,
        title: 'Post de prueba',
        url: [
            'https://images.pexels.com/photos/3687770/pexels-photo-3687770.jpeg',
            'https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg',
            'https://images.pexels.com/photos/3687770/pexels-photo-3687770.jpeg',
            'https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg',
            'https://images.pexels.com/photos/3687770/pexels-photo-3687770.jpeg',
        ],
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid autem cum eaque id incidunt iure libero, molestias nulla obcaecati odit provident quaerat quasi quidem reprehenderit repudiandae sequi temporibus velit voluptates. texto jaja hola buenas pedo culo caca pis',
        age: 1,
        gender: 'Macho',
        type: 'dog',
        size: 'Mediano',
        location: 'Montevideo, Uruguay',
        state: "Activo"
    };

    constructor(private http: HttpClient) {
    }

    getAll(): Observable<Post[]> {
        return of([
            this.fakePost,
            this.fakePost,
            this.fakePost,
            this.fakePost,
            this.fakePost,
            this.fakePost,
            this.fakePost,
        ]).pipe(delay(1000));
    }

    getPostById(id: number): Observable<Post> {
        // TODO: return from server
        return of(this.fakePost).pipe(delay(1000));
    }

    isMarkedAsFavorite(postId: number) {
        return of(true).pipe(delay(1000));
    }

    markAsFavorite(postId: number, favorite: boolean) {
        return of(this.fakePost).pipe(delay(1000));
    }

    postPublication(data : string){
        return this.http.post('UrlPost',data)
    }
    getAllFavoritePostsByUser(id: number) {
        return this.http.get<Post[]>(`${this.apiUrl}/posts/user/${id}`);
    }
}
