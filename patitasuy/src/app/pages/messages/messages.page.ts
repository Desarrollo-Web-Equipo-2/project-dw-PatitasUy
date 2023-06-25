import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  openChat(messageId: number): void {
    this.router.navigate(['/chat', messageId]);
  }

  chats = [
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
    },{
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

}
