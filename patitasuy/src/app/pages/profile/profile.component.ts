import { Component } from '@angular/core';
import { Post } from 'src/app/models/post.interface';
import { PostsService } from 'src/app/services/posts.service';
import { ModalController } from '@ionic/angular';
import { EditProfileComponent } from 'src/app/components/edit-profile/edit-profile.component';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
    name: string = "prueba";
    email: string = "prueba2";

    publications: Post[] = [];

  constructor(private readonly postService: PostsService, private readonly modalController: ModalController, private auth: AuthService, private router: Router) { 
    this.getMyPublications();
  }

    selectPublications(event: any) {
        const selected = event.detail.value

        if (selected === "mis-publicaciones") {
            this.getFavoritePublications();
        } else if (selected === "favoritos") {
            this.getFavoritePublications();
        }
    }

    getFavoritePublications() {
        this.postService.getAllFavoritePostsByUser(9).subscribe({
            next: (res) => {
                this.publications = res;
            },
            error: (error) => {
                console.log(error);
            }
        });
    }

    getMyPublications() {
        // TODO: get MY posts instead of favorites
        this.postService.getAllFavoritePostsByUser(9).subscribe({
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

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}

