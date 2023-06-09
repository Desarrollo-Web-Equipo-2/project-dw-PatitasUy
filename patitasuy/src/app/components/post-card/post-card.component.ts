import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces/post.interface';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
})
export class PostCardComponent  implements OnInit {

  @Input() post!: Post;

  constructor() { }

  ngOnInit() {}

  getImageUrl() {
    return (this.post?.url || '').split(',')[0] || 'assets/no-img.jpeg';
  }
}
