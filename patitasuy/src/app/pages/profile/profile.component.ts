import { Component, ViewChild } from '@angular/core';
import { Post } from 'src/app/models/post.interface';
import { PostsService } from 'src/app/services/posts.service';
import { ModalController } from '@ionic/angular';
import { EditProfileComponent } from 'src/app/components/edit-profile/edit-profile.component';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  name: string = "";
  email: string = "";

  publications: Post[] = [];

  constructor(private readonly postService: PostsService, private readonly modalController: ModalController, private readonly userService: UserService) {
    this.getUserData();
    this.getMyPublications();

  }

  async getUserData() {
    const result = await this.userService.getCurrentUser();
    const user: User = JSON.parse((result).value!);
    this.name = user.name;
    this.email = user.email;
    return user;
  }

  selectPublications(event: any) {
    const selected = event.detail.value

    if (selected === "mis-publicaciones") {
      this.getMyPublications();
    }
    else if (selected === "favoritos") {
      this.getFavoritePublications();
    }
  }

  async getFavoritePublications() {
    this.postService.getAllFavoritePostsByUser((await this.getUserData()).user_id).subscribe({
      next: (res) => {
        this.publications = res;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  async getMyPublications() {
    this.postService.getMyPosts((await this.getUserData()).user_id).subscribe({
      next: (res) => {
        this.publications = res;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: EditProfileComponent
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.name = data.name;
      this.email = data.email;
    }
  }
}

