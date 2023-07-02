import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chat } from 'src/app/interfaces/chat';
import { Message } from 'src/app/interfaces/message';
import { ChatsService } from 'src/app/services/chats.service';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
	selector: 'app-messages',
	templateUrl: './messages.component.html',
	styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {

  chats: Chat[] = []
  lastMessages: {[chatId: number]: string} = {};

  constructor(private router: Router, 
              private chatsService: ChatsService, 
              private messagesService: MessagesService) { }

  ngOnInit() {
    this.chatsService.getChatsForCurrentUser().subscribe(chats => {
      this.chats = chats;

      this.chats.forEach(chat => {
        this.messagesService.getMessagesForChat(chat.chat_id).subscribe(msgs => {
          if (msgs.length) {
            this.lastMessages[chat.chat_id] = msgs[msgs.length - 1].content;
          }
        });
      });
    });
  }

	openChat(chat: Chat): void {
		const queryParams = {
			name: chat.to.name,
			surname: chat.to.surname,
		};
		this.router.navigate(['/chat', chat.chat_id], { queryParams });
	}

	getDefaultImgUrl(user_id: number | undefined) {
		return `https://picsum.photos/${100 + (user_id || 0)}`;
	}
}
