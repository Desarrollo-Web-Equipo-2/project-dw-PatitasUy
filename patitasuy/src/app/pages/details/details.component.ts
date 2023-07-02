import { Component, OnInit } from '@angular/core';
import { Post } from "../../interfaces/post.interface";
import { PostsService } from "../../services/posts.service";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from '../../services/user.service';
import { firstValueFrom } from 'rxjs';
import { ChatsService } from 'src/app/services/chats.service';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss'],
})
export class DetailsComponent{

    post!: Post;
    error = false;
    isFavorite = false;
    favoriteLoading = true;

    constructor(private postsService: PostsService,
                private route: ActivatedRoute,
                private router: Router,
                private userService: UserService,
                private chatsService: ChatsService,
                ) {
        this.loadInitialData();
    }

    private loadInitialData(){
        this.route.params.subscribe({
            next: (params) => {
                const postId = params['id'];
                console.log(postId);
                this.postsService.getPostById(postId).subscribe({
                    next: (post) => {
                        this.post = post;
                    },
                    error: this.handleError
                });                  
                this.userService.getCurrentUser().subscribe((userData) => {
                    if (userData?.user_id) {
                        this.postsService.isMarkedAsFavorite(postId, userData.user_id).subscribe({
                            next: (res) => {
                                this.isFavorite = res;
                                this.favoriteLoading = false;
                            },
                            error: (err) => {
                                this.handleError(err);
                                this.favoriteLoading = false;
                            }
                        });
                    }
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

        const user = await firstValueFrom(this.userService.getCurrentUser());
        if (!user?.user_id) {
            this.favoriteLoading = false;
            return;
        } else {
            this.postsService.markAsFavorite(this.post!.user_id, user.user_id, !this.isFavorite).subscribe({
                next: (res) => {
                    this.isFavorite = res;
                    this.favoriteLoading = false;
                },
                error: (error) => {
                    console.log(error);
                    if (error.status !== 304) {
                        alert(error.error.msg || error.error.error);
                    }
                    this.favoriteLoading = false;
                }
            });
        }
    }

    async sendMessage() {
        const chat = await this.chatsService.createChatFromCurrentUserTo(this.post.user_id);
        this.userService.getUser(this.post.user_id).subscribe((user) => {
            const queryParams = {
                name: user.name,
                surname: user.surname,
            };
            this.router.navigate(['/chat', chat.chat_id], { queryParams });
        });
    }
}
