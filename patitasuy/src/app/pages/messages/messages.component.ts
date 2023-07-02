import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Chat } from 'src/app/interfaces/chat';
import { ChatsService } from 'src/app/services/chats.service';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {

    chats: Chat[] = []
    lastMessages: { [chatId: number]: string } = {};
    chatsSubscription: Subscription | undefined;
    messageSubscriptions: Subscription[] = [];

    constructor(private router: Router,
        private chatsService: ChatsService,
        private messagesService: MessagesService) { }

    ngOnInit() {
        this.chatsSubscription = this.chatsService.getChatsForCurrentUser().subscribe(chats => {
            this.chats = chats;

            this.chats.forEach(chat => {
                if (!this.lastMessages[chat.chat_id]) {
                    const subscription = this.messagesService.getMessagesForChat(chat.chat_id).subscribe(msgs => {
                        if (msgs.length) {
                            this.lastMessages[chat.chat_id] = msgs[msgs.length - 1].content;
                        }
                    });
                    this.messageSubscriptions.push(subscription);
                }
            });
        });
    }

  ngOnDestroy() {
    this.chatsSubscription?.unsubscribe();
    for (const v of this.messageSubscriptions) {
      v.unsubscribe();
    }
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

    getLastMessage(chat_id: number) {
        return this.lastMessages[chat_id] || '...';
    }
}
