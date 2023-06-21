import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  constructor(private http: HttpClient) {}

  publicarDatos(): void {
    
    const data = {
      name: (document.getElementById('name') as HTMLInputElement).value,
      description: (document.getElementById('description') as HTMLInputElement).value,
      location: (document.getElementById('location') as HTMLInputElement).value,
      age: (document.getElementById('age') as HTMLInputElement).value,
      sex: (document.getElementById('sex') as HTMLInputElement).value,
      size: (document.getElementById('size') as HTMLInputElement).value,
      cat: (document.getElementById('cat') as HTMLInputElement).value,
      dog: (document.getElementById('dog') as HTMLInputElement).value,
    };

    this.http.post('url_del_backend', data)
      .subscribe(
        response => {
          console.log('Datos enviados correctamente');
        },
        error => {
          console.error('Error al enviar los datos', error);
        }
      );
  }
}

