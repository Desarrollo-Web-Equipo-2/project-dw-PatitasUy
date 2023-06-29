import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user/user.service';
import { environment } from './../../../environments/environment.prod';
import { Component} from '@angular/core';
import {FormControl,  FormGroup, Validators} from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {

  hidePassword: boolean = true;
  user: any;
  formRegister = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    email: new FormControl('', Validators.email),
    password: new FormControl('')
  });
  private apiUrl = environment;
  


  constructor(private userService: UserService,private router: Router) { 
    
  }

  register(user:User):Observable<any> {
    const url = `${this.apiUrl}/register`;
    return this.userService.createUser(user)
  };

  

}
