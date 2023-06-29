import { Injectable } from '@angular/core';
import { delay, Observable, of } from "rxjs";
import { Post } from "../models/post.interface";
import { ApiService } from './api/api.service';

@Injectable({
    providedIn: 'root'
})
export class PostsService {

    private apiUrl = '/posts'

    fakePost: Post = {
        id: 1,
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

    constructor(private apiService: ApiService) {
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

    isMarkedAsFavorite(postId: number, userId: number) {
        return this.apiService.get<boolean>(`${this.apiUrl}/isFavorite/post/${postId}/user/${userId}`);
    }

    markAsFavorite(postId: number, userId: number, favorite: boolean){
        return this.apiService.put<boolean>(`${this.apiUrl}/setFavorite/post/${postId}/user/${userId}`, {favorite: favorite});
    }

    postPublication(data : string){
        return this.apiService.post('UrlPost',data)
    }
    getAllFavoritePostsByUser(id: number) {
        return this.apiService.get<Post[]>(`${this.apiUrl}/user/${id}`);
    }
}
