import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.interface';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  implements OnInit {
  allPosts: Post[] | undefined;

  constructor(private postsService: PostsService) { }

  ngOnInit() {
    this.postsService.getAllPosts().subscribe(posts => {
      this.allPosts = posts;
    });
  }
}
