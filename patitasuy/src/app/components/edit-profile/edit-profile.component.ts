import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {

  name: string = "prueba";
  email: string = "prueba2";

  constructor(private modalController: ModalController) { }

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
