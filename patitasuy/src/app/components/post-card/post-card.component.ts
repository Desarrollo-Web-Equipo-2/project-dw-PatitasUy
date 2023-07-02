import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces/post.interface';
import { PostsService } from 'src/app/services/posts.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
})
export class PostCardComponent implements OnInit {

  @Input() post!: Post;

  constructor(public userService: UserService) { }

  getCurrentUserId() {
    let id = 0;
    this.userService.getCurrentUser().subscribe((userData) => {
      if (userData?.user_id) {
        id = userData.user_id;
      }
    }
    )
    return id;
  }

  ngOnInit() { }
}
