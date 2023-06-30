import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user/user.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {

  hidePassword: boolean = true;
  formRegister = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required)
  });

  constructor(private userService: UserService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alert: AlertController) {
  }

  async register() {
    const user: User = {
      name: this.formRegister.value.name!,
      surname: this.formRegister.value.surname!,
      email: this.formRegister.value.email!,
      password: this.formRegister.value.password!
    }
    const loading = await this.loadingCtrl.create({
      message: 'Registration in progress',
    });

    loading.present();
    this.userService.createUser(user).subscribe({
      next: async () => {
        loading.dismiss();
        this.formRegister.reset();
        this.router.navigate(['/login']);
        (await this.alert.create({
          header: 'Success',
          message: 'Registered Successfully',
          buttons: ['Dismiss']
        })).present();
      },
      error: async (error) => {
        loading.dismiss();
        console.log(error);
        (await this.alert.create({
          header: 'Error',
          message: error.error.msg,
          buttons: ['Dismiss']
        })).present();
      }
    })
  };
}
