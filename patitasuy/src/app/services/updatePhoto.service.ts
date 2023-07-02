import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UpdatePhotoService {
  [x: string]: any;

  constructor(private http: HttpClient) { }

  private readonly apiUrl = environment.apiUrl; 
  updatePhotos(postId:number, file:File[]){
    console.log(postId,file);
    return this.http.put(`${this.apiUrl}/${file}/`,`${postId}`)


  }

}
