import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chat } from 'src/app/interfaces/chat';
import { MessageService } from 'src/app/services/message.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  messageId!: number;
  constructor(private route: ActivatedRoute, private msgService: MessageService) { }

  chat: Chat | undefined;


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.messageId = params['id'];
      this.msgService.getChatById(Number(this.messageId)).subscribe(values => {
        this.chat = values;
      });
    });
  }




}
