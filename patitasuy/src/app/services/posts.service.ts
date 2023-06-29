import { Injectable } from '@angular/core';
import { delay, map, Observable, of } from "rxjs";
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
        gender: 'male',
        type: 'dog',
        size: 'medium',
        location: 'Montevideo, Uruguay',
        state: "Activo"
    };

    constructor(private http: HttpClient) {
    }

    getAllPosts(): Observable<Post[]> {
        return this.http.get<Post[]>(`${this.apiUrl}/posts`).pipe(
            map((res: any) => {
                const posts = res.posts;
                posts.map((post: any) => {
                    post.id = post.post_id
                });
                return posts;
            })
        );
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

    getAllFavoritePostsByUser(id: number) {
        return this.http.get<Post[]>(`${this.apiUrl}/posts/user/${id}`);
    }
}
