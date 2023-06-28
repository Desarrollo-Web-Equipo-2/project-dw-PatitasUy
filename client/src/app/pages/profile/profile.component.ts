import { Component } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { Post } from 'src/app/models/post.interface';
import { PostsService } from 'src/app/services/posts.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  publications: Post[] = [];

  constructor(private readonly postService: PostsService) {
    this.postService.getAllPublicationsPerson(9).subscribe({
      next: (res) => {
        this.publications = res;
      },
      error: (error) => {
        console.log(error);
      }
    });
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
