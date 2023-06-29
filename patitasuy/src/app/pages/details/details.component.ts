import { Component } from '@angular/core';
import { Post } from "../../models/post.interface";
import { PostsService } from "../../services/posts.service";
import { ActivatedRoute } from "@angular/router";
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent {

    post?: Post;
    error = false;
    isFavorite = false;
    favoriteLoading = true;

    constructor(private postsService: PostsService,
                private route: ActivatedRoute,
                private userService: UserService) {
        this.route.params.subscribe({
            next: (params) => {
                const postId = params['id'];
                this.postsService.getPostById(postId).subscribe({
                    next: (post) => {
                        this.post = post;
                    },
                    error: this.handleError
                });
                this.userService.getCurrentUser().then((userData) => {
                    const user: User = JSON.parse(userData.value!);
                    this.postsService.isMarkedAsFavorite(postId, user.user_id).subscribe({
                        next: (fav) => {
                            this.isFavorite = fav;
                        },
                        error: this.handleError,
                        complete: () => {
                            this.favoriteLoading = false;
                        }
                    });
                });
            },
            error: this.handleError
        });
    }

    handleError(error: Error) {
        this.error = true;
        console.log(error);
    }


    async setFavourite() {
        if (!this.post || this.error) {
            return;
        }
        this.favoriteLoading = true;

        const userData = (await this.userService.getCurrentUser()).value;
        if(!userData) {
            this.favoriteLoading = false;
            return;
        }

        const user_id = JSON.parse(userData!).user_id;

        this.postsService.markAsFavorite(this.post!.id, user_id, !this.isFavorite)
            .subscribe({
                next: (res) => {
                    this.isFavorite = res;
                },
                error: (error) => {
                    if(error.status !== 304){
                        alert(error.error.msg || error.error.error);
                    }
                    console.log(error);
                    this.favoriteLoading = false;
                },
                complete: () => {
                    this.favoriteLoading = false;
                }
            });
    }

    sendMessage() {
        // TODO
        alert('Not implemented yet');
    }


}
