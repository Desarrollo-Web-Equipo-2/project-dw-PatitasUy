import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopNavbarComponent } from "./top-navbar/top-navbar.component";
import { IonicModule } from "@ionic/angular";

@NgModule({
    declarations: [
        TopNavbarComponent
    ],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [
        TopNavbarComponent
    ]
})
export class ComponentsModule {
}
