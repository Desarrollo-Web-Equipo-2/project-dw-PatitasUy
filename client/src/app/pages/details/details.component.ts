import { Component } from '@angular/core';
import { Post } from "../../models/post.interface";
import { PostsService } from "../../services/posts.service";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss']
})
export class DetailsComponent {

    post?: Post;
    error = false;
    isFavorite = false;

    constructor(private postsService: PostsService,
                private route: ActivatedRoute) {
        this.route.params.subscribe({
            next: (res) => {
                const postId = res['id'];
                this.postsService.getPostById(postId).subscribe({
                    next: (post) => {
                        this.post = post;
                    },
                    error: (err) => {
                        console.log(err);
                        this.error = true;
                    }
                });
            },
            error: (err) => {
                console.log(err);
                this.error = true;
            }
        });
    }


    setFavourite() {
        this.isFavorite = !this.isFavorite;
        // TODO
    }
}
