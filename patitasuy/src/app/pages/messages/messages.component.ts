import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chat } from 'src/app/interfaces/chat';
import { ChatsService } from 'src/app/services/chats.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {

  chats: Chat[] = []

  constructor(private router: Router, private chatsService: ChatsService) { }

  ngOnInit() {
    this.chatsService.getChatsForCurrentUser().subscribe(chats => {
      this.chats = chats;
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
