import { Component } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {


  publications: Array<any> = [];

  service : ProfileService = new ProfileService();

  selectPublications(event: any) {

    if (event.index === 0) {
      this.publications = this.service.getPublications();
    }
    else if (event.index === 1) {
      this.publications = this.service.getFavorites();
    }
  }
}
