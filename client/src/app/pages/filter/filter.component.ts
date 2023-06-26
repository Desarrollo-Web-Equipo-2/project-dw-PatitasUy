import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  myForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.myForm = this.formBuilder.group({
      age: '',
      sex: '',
      size: '',
    });
  }
  submitForm() { 
    const data = this.myForm.value;
    //this.http.get('URL_DEL_BACKEND', data)
  }
}



