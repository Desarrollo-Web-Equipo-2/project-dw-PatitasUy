import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chat } from 'src/app/interfaces/chat';
import { Message } from 'src/app/interfaces/message';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {

  messages: Message[] = [];

  constructor(private route: ActivatedRoute, private messagesService: MessagesService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const chatId = params['id'];

      this.messagesService.getMessagesForChat(chatId).subscribe(msgs => {
        this.messages = msgs;
      });
    });
  }

  // FIXME: This should not be repeated here!
  getDefaultImgUrl(user_id: number | undefined) {
    return `https://picsum.photos/${100 + (user_id || 0)}`;
  }
}
