import { Post } from 'src/app/interfaces/post.interface';
import { UserService } from 'src/app/services/user.service';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild("upload") upload!: ElementRef<HTMLInputElement>;

  myForm: FormGroup;
  ngOnInit() {}
  selectedPhotos: File[] = [];
  constructor(private formBuilder: FormBuilder,
    private postService: PostsService,
    private userService: UserService,
    private loadingCtrl: LoadingController,
    private alert: AlertController,
    private router: Router,) {
    this.myForm = this.formBuilder.group({
      user_id: this.userService.getCurrentUser().value?.user_id,
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

  openFileDialog() {
    this.upload.nativeElement.click();
  }
  
  savePhotos(event: any) {
    const files: FileList = event.target.files;
    this.selectedPhotos = [];
    for (let i = 0; i < files.length; i++) {
      const file: File = files[i];
      this.selectedPhotos.push(file);
    }
  }

  async submitForm() {
    if (this.myForm.invalid) {
      return 
    }
    const files: File[] = this.selectedPhotos;
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
      post_id: 0
    }
    const loading = await this.loadingCtrl.create({
      message: 'Creando post...',
    });
    loading.present();
    this.postService.postPublication(post).subscribe({
      next: async (aPost) => {
        this.postService.updatePostImage(files, aPost.post_id).subscribe({
          next: async (response: { joinedUrls: string }) => {
            console.log(response)
            const { joinedUrls } = response;
            post.url = joinedUrls;
            console.log(post);
            loading.dismiss();
            this.myForm.reset();
            this.router.navigate(['/home']);

            (await this.alert.create({
              header: '¡Post Creado!',
              message: 'El post ha sido exitoso',
              buttons: ['Cerrar']
            })).present();
          }
        })
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