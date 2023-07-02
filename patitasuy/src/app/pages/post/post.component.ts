import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @ViewChild("upload") upload!: ElementRef<HTMLInputElement>;

  myForm: FormGroup;
  ngOnInit() {}
  selectedFileName: string = '';
  selectedPhotos: File[] = [];
  
  constructor(private formBuilder: FormBuilder, private postService : PostsService) {
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
    this.selectedFileName = files[0].name;
  }

  submitForm() {
    const data = this.myForm.value;
    data.photos = this.selectedPhotos;
    console.log(data);
    this.postService.postPublication(data);
  }
}