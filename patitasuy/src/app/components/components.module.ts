import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { TopToolbarComponent } from "./top-toolbar/top-toolbar.component";

@NgModule({
    declarations: [
        TopToolbarComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        RouterModule
    ],
    exports: [
        TopToolbarComponent
    ]
})
export class ComponentsModule {
}
