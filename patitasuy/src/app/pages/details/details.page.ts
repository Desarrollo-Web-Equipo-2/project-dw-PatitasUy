import { Component, OnInit } from '@angular/core';
import { Post } from "../../models/post.interface";
import { PostsService } from "../../services/posts.service";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-details',
    templateUrl: './details.page.html',
    styleUrls: ['./details.page.scss'],
})
export class DetailsPage {

    post?: Post;
    error = false;
    isFavorite = false;

    constructor(private postsService: PostsService,
                private route: ActivatedRoute) {
        this.route.params.subscribe({
            next: (params) => {
                const postId = params['id'];
                this.postsService.getPostById(postId).subscribe({
                    next: (post) => {
                        this.post = post;
                        this.postsService.isMarkedAsFavorite(post.id).subscribe({
                            next: (fav) => {
                                // TODO: consider using "loading" boolean to wait for all observables to complete
                                this.isFavorite = fav;
                            },
                            error: this.handleError
                        });
                    },
                    error: this.handleError
                });
            },
            error: this.handleError
        });
    }

    handleError(error: Error) {
        this.error = true;
        console.log(error);
    }


    setFavourite() {
        this.postsService.markAsFavorite(this.post!.id, this.isFavorite)
            .subscribe({
                next: () => {
                    this.isFavorite = !this.isFavorite;
                }
            });
    }

    sendMessage() {
        // TODO
        alert('Not implemented yet');
    }

}
