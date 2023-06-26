import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Messages } from 'src/app/interfaces/messages';
import { MessageService } from 'src/app/services/message.service';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {

  //Create an empty array of chats
  chats: Messages[] = [];

  constructor(private router: Router, private msgService: MessageService) { }

  ngOnInit() {
    this.msgService.getMessages().subscribe(values => {
      this.chats = values;});
  }

  openChat(messageId: number): void {
    this.router.navigate(['/chat', messageId]);
  }
}
