import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent {
  currentUserSubscription: Subscription;

  formData = new FormGroup({
    nameControl: new FormControl('', Validators.required),
    emailControl: new FormControl('', [Validators.email, Validators.required])
  })

  constructor(private readonly modalController: ModalController, private readonly userService: UserService) {
    this.currentUserSubscription = this.userService.getCurrentUser().subscribe((userData) => {
      if (userData?.user_id) {
        this.formData.patchValue({
          nameControl: userData.name,
          emailControl: userData.email
        });
      }
    })
  }

  ngOnDestroy() {
    this.currentUserSubscription.unsubscribe();
  }

  cancel() {
    this.modalController.dismiss(null, 'cancel');
  }

  confirm() {
    const data = {
      name: this.formData.value.nameControl!,
      email: this.formData.value.emailControl!,

    };
    this.modalController.dismiss(data, 'confirm');
  }
}
