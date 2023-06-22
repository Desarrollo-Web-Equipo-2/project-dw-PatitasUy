import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {

  myForm: FormGroup;
 //http: any;


  constructor(private formBuilder: FormBuilder) {
    this.myForm = this.formBuilder.group({
      name: '',
      description: '',
      location: '',
      specie: '',
      age: '',
      sex: '',
      size: '',
    });
  }

  selectedPhotos: File[] = [];
  savePhotos(event: any) {
    const files: FileList = event.target.files;

    this.selectedPhotos = [];
    for (let i = 0; i < files.length; i++) {
      const file: File = files[i];
      this.selectedPhotos.push(file);
    }
  }

  submitForm() {
    const data = this.myForm.value;
    data.photos = this.selectedPhotos;
    console.log(data);

    //this.http.post('URL_DEL_BACKEND', data)
  }
}