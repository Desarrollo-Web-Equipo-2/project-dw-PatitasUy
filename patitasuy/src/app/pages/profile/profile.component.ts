import { Component, ViewChild } from '@angular/core';
import { Post } from 'src/app/models/post.interface';
import { PostsService } from 'src/app/services/posts.service';
import { IonModal } from '@ionic/angular';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { EditProfileComponent } from 'src/app/components/edit-profile/edit-profile.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  ngOnInit() { }
  @ViewChild(IonModal) modal!: IonModal;
  name: string = "prueba";
  email: string = "prueba2";


  publications: Post[] = [];

  constructor(private readonly postService: PostsService, private readonly modalController: ModalController) {
  }

  selectPublications(event: any) {
    //TODO change the parameter id

    if (event.index === 0) {
      this.postService.getAllFavoritePostsByUser(9);
    }
    else if (event.index === 1) {
      //this.publications = this.profileService.getFavorites();
    }
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

