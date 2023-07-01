import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PostComponent } from './pages/post/post.component';
import { DetailsComponent } from './pages/details/details.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { ChatComponent } from './pages/chat/chat.component';
import { AuthenticationGuard } from './guards/authentication-guard.service';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'home', canActivate: [AuthenticationGuard], component: HomeComponent },
    { path: 'profile', canActivate: [AuthenticationGuard], component: ProfileComponent },
    { path: 'post', canActivate: [AuthenticationGuard], component: PostComponent },
    { path: 'details/:id', canActivate: [AuthenticationGuard], component: DetailsComponent },
    { path: 'messages', canActivate: [AuthenticationGuard], component: MessagesComponent },
    { path: 'chat/:id', canActivate: [AuthenticationGuard], component: ChatComponent },
    { path: '**', redirectTo: 'home' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
