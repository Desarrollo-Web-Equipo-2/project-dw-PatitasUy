import { Component } from '@angular/core';
import { Post } from 'src/app/models/post.interface';
import { PostsService } from 'src/app/services/posts.service';
import { ModalController } from '@ionic/angular';
import { EditProfileComponent } from 'src/app/components/edit-profile/edit-profile.component';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
    name: string = "prueba";
    email: string = "prueba2";

    publications: Post[] = [];

    constructor(private readonly postService: PostsService, private readonly modalController: ModalController) {
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
        this.postService.getAllFavoritePostsByUser(9).then((res) => {
            this.publications = res;
        }).catch(error => {
            console.log(error)
        });
    }

    getMyPublications() {
        // TODO: get MY posts instead of favorites
        this.postService.getAllFavoritePostsByUser(9).then((res) => {
            this.publications = res;
        }).catch(error => {
            console.log(error)
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

