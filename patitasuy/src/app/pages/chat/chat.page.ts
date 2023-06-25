import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  messageId!: number;
  constructor(private route: ActivatedRoute) { }
  

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.messageId = params['id'];
      // Use the message ID to load the chat data or perform other operations
    });
  }




}
