import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';
import { iconTemplates } from 'src/assets/images/icon-templates';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [MatButtonModule, MatToolbarModule, MatIconModule]
})
export class MaterialModule { 
  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer){
    this.matIconRegistry.addSvgIconLiteral(
      'chat-icon',
      this.domSanitizer.bypassSecurityTrustHtml(iconTemplates.chat)
    );
    this.matIconRegistry.addSvgIconLiteral(
      'post-icon',
      this.domSanitizer.bypassSecurityTrustHtml(iconTemplates.post)
    );
    this.matIconRegistry.addSvgIconLiteral(
      'chat-color',
      this.domSanitizer.bypassSecurityTrustHtml(iconTemplates.chatColor)
    );
  }
}
