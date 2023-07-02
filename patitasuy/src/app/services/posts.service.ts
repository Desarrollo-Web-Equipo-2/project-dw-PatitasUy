import { Injectable } from '@angular/core';
import { delay, map, Observable, of } from "rxjs";
import { Post } from "../interfaces/post.interface";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class PostsService {

    private readonly apiUrl = environment.apiUrl + '/posts';


    constructor(private http: HttpClient) {
    }

    getAllPosts(): Observable<Post[]> {
        return this.http.get<Post[]>(this.apiUrl).pipe(
            map((res: any) => {
                const posts = res.posts;
                posts.map((post: any) => {
                    post.id = post.post_id
                });
                return posts;
            })
        );
    }

    getPostById(postId: number): Observable<Post> {
        // TODO: return from server
        return this.http.get<Post>(`${this.apiUrl}/details/${postId}`);
    
    }
    isMarkedAsFavorite(postId: number, userId: number) {
        return this.http.get<boolean>(`${this.apiUrl}/isFavorite/post/${postId}/user/${userId}`);
    }

    markAsFavorite(postId: number, userId: number, favorite: boolean) {
        return this.http.put<boolean>(`${this.apiUrl}/setFavorite/post/${postId}/user/${userId}`, { favorite: favorite });
    }

    postPublication(post : Post): Observable<any> {
        return this.http.post<any>(this.apiUrl, post)
    }

    getAllFavoritePostsByUser(id: number) {
        return this.http.get<Post[]>(`${this.apiUrl}/favorites/user/${id}`);
    }

    getMyPosts(id: number): Observable<Post[]> {
        return this.http.get<Post[]>(`${this.apiUrl}/user/${id}`);
    }

    updatePostImage(file: File, id: string): Observable<any> {
        const formData = new FormData();
        formData.append('file', file);
    
        return this.http.put<any>(`${environment.apiUrl}/uploads/posts/${id}`, formData)
      }
}

