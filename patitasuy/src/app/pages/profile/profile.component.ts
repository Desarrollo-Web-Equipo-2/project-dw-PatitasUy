import { Component, OnInit, ViewChild } from '@angular/core';
import { Post } from 'src/app/models/post.interface';
import { PostsService } from 'src/app/services/posts.service';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { FormsModule } from '@angular/forms';

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

  constructor(private readonly postService: PostsService) {
    /*
        this.postService.getAllPublicationsPerson(9).subscribe({
          next: (res) => {
            this.publications = res;
          },
          error: (error) => {
            console.log(error);
          }
        });
        */
  }

  selectPublications(event: any) {
    const selected = event.detail.value
    if (selected === "mis-publicaciones") {
      this.getFavoritePublications();
    }
    else if (selected === "favoritos") {
      this.getFavoritePublications();
    }
  }

  async getFavoritePublications() {
    this.postService.getFavoritePosts(9).subscribe({
      next: (res) => {
        this.publications = res;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
    this.modal.dismiss(this.email, 'confirm');

  }
}

