import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Chat } from 'src/app/interfaces/chat';
import { Message } from 'src/app/interfaces/message';
import { ChatsService } from 'src/app/services/chats.service';
import { MessagesService } from 'src/app/services/messages.service';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {

	messages: Message[] = [];
	full_name = { name: '', surname: '' };
	currentMessage: string = '';
	currentUser = 0;

	constructor(private route: ActivatedRoute, private messagesService: MessagesService, private chatService: ChatsService, private userService: UserService) { }

	ngOnInit() {
		this.route.params.subscribe(params => {
			const chatId = params['id'];

			this.messagesService.getMessagesForChat(chatId).subscribe(msgs => {
				this.messages = msgs;
			});
		});

		this.full_name = { name: this.route.snapshot.queryParams['name'], surname: this.route.snapshot.queryParams['surname'] };
		this.userService.getCurrentUser().subscribe(user => {
			if (user?.user_id) {
				this.currentUser = user.user_id;
			}
		});
	}

	sendMessage(): void {
		this.chatService.sendMessage(this.route.snapshot.params['id'], this.currentUser, this.currentMessage).subscribe()
		this.currentMessage = '';
	}

	// FIXME: This should not be repeated here!
	getDefaultImgUrl(user_id: number | undefined) {
		return `https://picsum.photos/${100 + (user_id || 0)}`;
	}
}
