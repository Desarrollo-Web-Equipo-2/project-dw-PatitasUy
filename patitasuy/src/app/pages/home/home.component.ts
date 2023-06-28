import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Post } from 'src/app/models/post.interface';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  implements OnInit {
  allPosts: Post[] | undefined;
  myForm: FormGroup;
  filteredPosts?: Post[]; 
  constructor(private postsService: PostsService,private formBuilder: FormBuilder) { 
    this.myForm = this.formBuilder.group({
      age: '',
      sex: '',
      size: '',
    });
  }

  ngOnInit() {
    this.postsService.getAll().subscribe(posts => {
      this.allPosts = posts;
      this.filteredPosts = posts;
    });
  }
  submitForm() {
    const ageValue = this.myForm.value.age;
    const sizeValue = this.myForm.value.size;
    const sexValue = this.myForm.value.sex;
  
    this.allPosts = this.filteredPosts?.filter((post: Post) => {
      const ageMatch = ageValue === '' || post.age === ageValue;
      const sizeMatch = sizeValue === '' || post.size === sizeValue;
      const sexMatch = sexValue === '' || post.gender === sexValue;
      
      return ageMatch && sizeMatch && sexMatch;
    });
    console.log(this.filteredPosts)
  }

  ageFilter(){
    const ageValue = this.myForm.value.age;
    switch(ageValue){
      
    }
    
  }
}
