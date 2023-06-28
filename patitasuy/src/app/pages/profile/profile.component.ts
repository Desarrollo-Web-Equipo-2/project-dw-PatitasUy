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

  constructor(private readonly postService: PostsService, private readonly modalController: ModalController, private router: Router) {

    this.publications = [{
      id: 0,
      title: 'Post Publicacion 1',
      photoUrls: [
        'https://images.pexels.com/photos/3687770/pexels-photo-3687770.jpeg'
      ],
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid autem cum eaque id incidunt iure libero, molestias nulla obcaecati odit provident quaerat quasi quidem reprehenderit repudiandae sequi temporibus velit voluptates. texto jaja hola buenas pedo culo caca pis',
      age: '1 year',
      gender: 'male',
      type: 'dog',
      size: 'medium',
      location: 'Montevideo, Uruguay',
      state: "Activo"
    },
    {
      id: 1,
      title: 'Post Publicacion 2',
      photoUrls: [
        'https://images.pexels.com/photos/3687770/pexels-photo-3687770.jpeg'
      ],
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid autem cum eaque id incidunt iure libero, molestias nulla obcaecati odit provident quaerat quasi quidem reprehenderit repudiandae sequi temporibus velit voluptates. texto jaja hola buenas pedo culo caca pis',
      age: '1 year',
      gender: 'male',
      type: 'dog',
      size: 'medium',
      location: 'Montevideo, Uruguay',
      state: "Activo"
    }]
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

