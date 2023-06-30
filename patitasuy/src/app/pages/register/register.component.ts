import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from 'src/app/services/validator.service';
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
    password: new FormControl('', Validators.required),
    confirmPass: new FormControl('', Validators.required)
  }, {
    validators: [this.vs.matchPasswords('password', 'confirmPass')]
  }
  );

  constructor(private userService: UserService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alert: AlertController,
    private vs: ValidatorService) {
  }

  async register() {
    const user: User = {
      name: this.formRegister.value.name!,
      surname: this.formRegister.value.surname!,
      email: this.formRegister.value.email!,
      password: this.formRegister.value.password!
    }
    const loading = await this.loadingCtrl.create({
      message: 'Creando cuenta...',
    });

    loading.present();
    this.userService.createUser(user).subscribe({
      next: async () => {
        loading.dismiss();
        this.formRegister.reset();
        this.router.navigate(['/login']);
        (await this.alert.create({
          header: '¡Bienvenido!',
          message: 'Se ha registrado exitosamente.',
          buttons: ['Cerrar']
        })).present();
      },
      error: async (error) => {
        loading.dismiss();
        console.log(error);
        (await this.alert.create({
          header: 'Error',
          message: error.error.msg,
          buttons: ['Cerrar']
        })).present();
      }
    })
  };
}
