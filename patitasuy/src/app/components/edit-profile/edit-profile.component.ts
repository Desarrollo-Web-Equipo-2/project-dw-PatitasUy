import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {

  name: string = "";
  email: string = "";

  constructor(private readonly modalController: ModalController, private readonly userService: UserService) { }

  ngOnInit() { }

  cancel() {
    this.modalController.dismiss(null, 'cancel');
  }

  confirm() {
    const data = {
      name: this.name,
      email: this.email
    };
    
    this.modalController.dismiss(data, 'confirm');


  }
}
