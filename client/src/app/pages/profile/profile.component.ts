import { Component } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { Post } from 'src/app/models/post.interface';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  service: ProfileService = new ProfileService();

  publications: Array<Post> = this.service.getPublications();


  selectPublications(event: any) {

    if (event.index === 0) {
      this.publications = this.service.getPublications();
    }
    else if (event.index === 1) {
      this.publications = this.service.getFavorites();
    }
  }
}
