import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HomeComponent } from './pages/home/home.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { BottomToolbarComponent } from './components/bottom-toolbar/bottom-toolbar.component';
import { PostComponent } from './pages/post/post.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DetailsComponent } from './pages/details/details.component';
import { ChatComponent } from './pages/chat/chat.component';
import { NgForOf, NgIf } from "@angular/common";
import { ComponentsModule } from "./components/components.module";


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        MessagesComponent,
        PostComponent,
        ProfileComponent,
        LoginComponent,
        RegisterComponent,
        DetailsComponent,
        ChatComponent,
        BottomToolbarComponent,
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        NgIf,
        ComponentsModule,
        NgForOf,
    ],
    providers: [{provide: RouteReuseStrategy, useClass: IonicRouteStrategy}],
    bootstrap: [AppComponent],
})
export class AppModule {
}
