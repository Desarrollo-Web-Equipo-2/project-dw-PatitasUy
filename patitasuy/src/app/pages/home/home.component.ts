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
      let ageMatch = true;
  
      // Verificar cada edad de la franja utilizando un switch
      switch (ageValue) {
        case '< 1':
          ageMatch = ageMatch && (post.age < 1);
          break;
        case '1 - 4':
          ageMatch = ageMatch && (post.age >= 1 && post.age <= 4);
          break;
        case '5 - 10':
          ageMatch = ageMatch && (post.age >= 5 && post.age <= 10);
          break;
        case '+ 10':
          ageMatch = ageMatch && (post.age > 10);
          break;
        default:
          ageMatch = true; // Si no se selecciona una franja de edades, se considera una coincidencia
          break;
      }
  
      const sizeMatch = sizeValue === '' || post.size === sizeValue;
      const sexMatch = sexValue === '' || post.gender === sexValue;
  
      return ageMatch && sizeMatch && sexMatch;
    });
  
    console.log(this.filteredPosts);
  }
}
