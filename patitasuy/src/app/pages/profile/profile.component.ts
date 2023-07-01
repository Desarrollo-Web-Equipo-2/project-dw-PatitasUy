import { Component } from '@angular/core';
import { Post } from 'src/app/models/post.interface';
import { PostsService } from 'src/app/services/posts.service';
import { ModalController } from '@ionic/angular';
import { EditProfileComponent } from 'src/app/components/edit-profile/edit-profile.component';
import { UserService } from 'src/app/services/user.service';

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
    this.getMyPublications();
    this.userService.getCurrentUser().subscribe((userData) => {
      if (userData?.user_id) {
        this.name = userData.name;
        this.email = userData.email;
      }
    }
    )
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
    var id = 0;
    this.userService.getCurrentUser().subscribe((userData) => {
      if (userData?.user_id) {
        id = userData.user_id;
      }
    })
    this.postService.getAllFavoritePostsByUser(id).subscribe({
      next: (res) => {
        this.publications = res;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  async getMyPublications() {
    var id = 0;
    this.userService.getCurrentUser().subscribe((userData) => {
      if (userData?.user_id) {
        id = userData.user_id;
      }
      this.postService.getMyPosts(id).subscribe({
        next: (res) => {
          this.publications = res;
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
    )
  }

  logout() {
    this.userService.logout();
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: EditProfileComponent
    });
    modal.present();
    modal.onDidDismiss().then(async ({ data, role }) => {
      if (role === 'confirm') {
        var id = 0;
        this.userService.getCurrentUser().subscribe((userData) => {
          if (userData?.user_id) {
            id = userData.user_id;
          }
        })
        this.userService.setNewUserData(data.name, data.email, id).subscribe({
          next: (res) => {
            this.name = res.name;
            this.email = res.email;
          },
          error: (error) => {
            console.log(error);
          }
        })
      }
    })
  }
}

