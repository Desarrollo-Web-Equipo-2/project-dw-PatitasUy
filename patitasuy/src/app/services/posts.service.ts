import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, map, Observable, of } from "rxjs";
import { Post } from "../interfaces/post.interface";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class PostsService {

    private readonly apiUrl = environment.apiUrl + '/posts';

    private allPosts$ = new BehaviorSubject<Post[]>([]);

    constructor(private http: HttpClient) {
    }

    getAllPosts(): BehaviorSubject<Post[]> {
        this.http.get<Post[]>(this.apiUrl).subscribe(posts => {
            this.allPosts$.next(posts);
        });

        return this.allPosts$;
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

    postPublication(post : Post): Observable<Post> {
        return this.http.post<Post>(this.apiUrl,post).pipe(map(post => {
            this.allPosts$.next([
                ...this.allPosts$.getValue(),
                post,
            ]);
            return post;
        }));
    }

    getAllFavoritePostsByUser(id: number) {
        return this.http.get<Post[]>(`${this.apiUrl}/favorites/user/${id}`);
    }

    getMyPosts(id: number): Observable<Post[]> {
        return this.http.get<Post[]>(`${this.apiUrl}/my-user/${id}`);
    }

    updatePostImage(files: File[], id: number): Observable<any> {
        const formData = new FormData();
        for (const file of files) {
            formData.append('file', file);
        }
    
        return this.http.put<any>(`${environment.apiUrl}/uploads/posts/${id}`, formData).pipe(map(urls => {
            this.allPosts$.next(this.allPosts$.getValue().map(x => {
                if (x.post_id === id) {
                    return { ...x, url: urls.joinedUrls };
                } else {
                    return x;
                }
            }));

            return urls;
        }));
      }
}

