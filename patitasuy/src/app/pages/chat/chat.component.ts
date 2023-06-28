import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chat } from 'src/app/interfaces/chat';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {

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
