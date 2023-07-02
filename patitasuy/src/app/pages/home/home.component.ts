import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Post } from 'src/app/interfaces/post.interface';
import { PostsService } from 'src/app/services/posts.service';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  implements OnInit {
  allPosts: Post[] | undefined;
  filteredPosts: Post[] | undefined; 

  myForm: FormGroup;
  filterStr: string = '';

  constructor(private postsService: PostsService,private formBuilder: FormBuilder, private modalController: ModalController) { 
    this.myForm = this.formBuilder.group({
      age: '',
      sex: '',
      size: '',
    });
  }

  clearFilters() {
    this.myForm.reset();
    this.filterStr = '';
    this.filteredPosts = this.allPosts;
  }
  
  filteredView(posts: Post[]): Post[] {
      const ageFilter = this.myForm.value.age;
      const sizeFilter = this.myForm.value.size;
      const sexFilter = this.myForm.value.sex;

      this.filterStr = [ageFilter, sizeFilter, sexFilter].filter(x => x).join(' | ');

      return posts.filter((post: Post) => {
        const ageMatch = ageFilter === '' || post.age === ageFilter;
        const sizeMatch = sizeFilter === '' || post.size.toLowerCase() === sizeFilter.toLowerCase();
        const sexMatch = sexFilter === '' || post.sex?.toLowerCase() === sexFilter?.toLowerCase();

        return ageMatch && sizeMatch && sexMatch;
      });
  }

  ngOnInit() {
    this.postsService.getAllPosts().subscribe(posts => {
      this.allPosts = posts;
      this.filteredPosts = this.filteredView(posts);
    });
  }

  submitForm() {
    if (this.allPosts) {
      this.filteredPosts = this.filteredView(this.allPosts);
    } else {
      this.filteredPosts = undefined;
    }

    this.modalController.dismiss();
  }
}
