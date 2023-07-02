import { Post } from 'src/app/interfaces/post.interface';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PostsService } from 'src/app/services/posts.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  myForm: FormGroup;
  ngOnInit() {}
  selectedFileName: string = '';
  selectedPhotos: File[] = [];
  constructor(private formBuilder: FormBuilder,
    private postService: PostsService,
    private UserService: UserService,
    private loadingCtrl: LoadingController,
    private alert: AlertController,
    private router: Router,) {
    this.myForm = this.formBuilder.group({
      user_id: UserService.getCurrentUser().value?.user_id,
      url: '',
      description: '',
      age: '',
      sex: '',
      specie: '',
      location: '',
      size: '',
      state: '',
      name: '',
      type: '',
    });
  }
  
  savePhotos(event: any) {
    const files: FileList = event.target.files;
    this.selectedPhotos = [];
    for (let i = 0; i < files.length; i++) {
      const file: File = files[i];
      this.selectedPhotos.push(file);
    }
    this.selectedFileName = files[0].name;
  }

  async submitForm() {

    const post: Post = {
      user_id: this.myForm.value.user_id,
      url:'',
      description: this.myForm.value.description,
      age: this.myForm.value.age,
      sex: this.myForm.value.sex,
      specie: this.myForm.value.specie,
      location: this.myForm.value.location,
      size: this.myForm.value.size,
      state: 'Activo',
      title: this.myForm.value.name,
      type: this.myForm.value.type,
      post_id: 0
    }
    const loading = await this.loadingCtrl.create({
      message: 'Creando post...',
    });
    loading.present();
    this.postService.postPublication(post).subscribe({
      next: async () => {
        loading.dismiss();
        this.myForm.reset();
        this.router.navigate(['/home']);
        (await this.alert.create({
          header: '¡Post Creado!',
          message: 'El post ha sido exitoso',
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
    
  }
}