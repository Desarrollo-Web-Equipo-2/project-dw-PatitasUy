import { Component } from '@angular/core';
import { Post } from 'src/app/interfaces/post.interface';
import { PostsService } from 'src/app/services/posts.service';
import { EditProfileComponent } from 'src/app/components/edit-profile/edit-profile.component';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  name: string = "";
  email: string = "";
  publications: Post[] = [];

  constructor(private readonly postService: PostsService, private modalController: ModalController, private auth: AuthService, private router: Router, private readonly userService: UserService) {
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
    let id = 0;
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
    let id = 0;
    this.userService.getCurrentUser().subscribe((userData) => {
      if (userData?.user_id) {
        id = userData.user_id;
      }
    })
    this.postService.getMyPosts(id).subscribe({
      next: (posts) => {
        this.publications = posts
      },
      error: (error) => {
        console.log(error);
      }
    }
    )
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }


  async openModal() {
    const modal = await this.modalController.create({
      component: EditProfileComponent
    });
    modal.present();
    modal.onDidDismiss().then(async ({ data, role }) => {
      if (role === 'confirm') {
        let id = 0;
        this.userService.getCurrentUser().subscribe((userData) => {
          if (userData?.user_id) {
            id = userData.user_id;
          }
          this.userService.setNewUserData(data.name, data.email, id).subscribe({
            next: (res) => {
              this.name = res.name;
              this.email = res.email;
            },
            error: (error: any) => {
              alert(error.error.msg);
            }
          })
        })
      }
    })
  }
}
