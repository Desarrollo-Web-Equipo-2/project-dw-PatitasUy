import { Injectable } from '@angular/core';
import { Messages } from '../interfaces/messages';
import { delay, Observable, of } from "rxjs";
import { Chat } from '../interfaces/chat';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages = [
    {
      id: 1,
      lastMessage: "Be there in 5! Can't wait to see you!",
      username: "Brad Pitt",
      profilePicture: "https://picsum.photos/200"
    },
    {
      id: 2,
      lastMessage: "I'm on my way!",
      username: "Tom Hanks",
      profilePicture: "https://picsum.photos/201"
    },
    {
      id: 3,
      lastMessage: "I thought it was a fart...",
      username: "Emma Watson",
      profilePicture: "https://picsum.photos/202"
    }, {
      id: 4,
      lastMessage: "You",
      username: "Jane Smith",
      profilePicture: "https://picsum.photos/203"
    },
    {
      id: 5,
      lastMessage: "Up",
      username: "John Clark",
      profilePicture: "https://picsum.photos/204"
    },
    {
      id: 6,
      lastMessage: "You",
      username: "Jane Smith",
      profilePicture: "https://picsum.photos/203"
    },
    {
      id: 7,
      lastMessage: "You",
      username: "Jane Smith",
      profilePicture: "https://picsum.photos/203"
    },
    {
      id: 8,
      lastMessage: "You",
      username: "Jane Smith",
      profilePicture: "https://picsum.photos/203"
    },
    {
      id: 9,
      lastMessage: "You",
      username: "Jane Smith",
      profilePicture: "https://picsum.photos/203"
    },
    {
      id: 10,
      lastMessage: "You",
      username: "Jane Smith",
      profilePicture: "https://picsum.photos/203"
    },
  ];

  chats = [
    {
      id: 1,
      messages: [
        {
          message: "Hey, how's it going?",
          username: "Brad Pitt",
          profilePicture: "https://picsum.photos/200"
        },
        {
          message: "Pretty good, you?",
          username: "You",
          profilePicture: "https://picsum.photos/1"
        }
      ]
    }
  ]
  constructor() { }

  // getLastMessage(): Observable<Messages[]> {
  //   return of(this.chats.messages[1]).pipe(delay(1000));
  // }

  getMessages(): Observable<Messages[]> {
    return of(this.messages).pipe(delay(1000));
  }

  getChatById(id: number): Observable<Chat | undefined> {
    return of(this.chats.find(chat => chat.id === id)).pipe(delay(1000));
  }

}
