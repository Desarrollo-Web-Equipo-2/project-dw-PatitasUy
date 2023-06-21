import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PostComponent } from './pages/post/post.component';
import { DetailsComponent } from './pages/details/details.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { ChatComponent } from './pages/chat/chat.component';
import { filter } from 'rxjs';
import { FilterComponent } from './pages/filter/filter.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'post', component: PostComponent },
  { path: 'details/:id', component: DetailsComponent },
  { path: 'messages', component: MessagesComponent },
  { path: 'chat/:id', component: ChatComponent },
  { path: 'filter', component: FilterComponent},
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
