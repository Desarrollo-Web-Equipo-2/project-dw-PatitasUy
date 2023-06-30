import { Injectable } from '@angular/core';
import { Message } from '../interfaces/message';
import { BehaviorSubject, interval, Subscription, firstValueFrom } from "rxjs";
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

interface SubjectsMap {
  [ key: number ]: {
    subscription: Subscription,
    subject: BehaviorSubject<Message[]>
  }
}

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private readonly apiUrl = environment.apiUrl + '/messages';

  private readonly refreshIntervalMs = 2000;

  private updaters: SubjectsMap = {};

  constructor(private http: HttpClient) {}

  getMessagesForChat(chat_id: number): BehaviorSubject<Message[]> {
    if (chat_id in this.updaters) {
      return this.updaters[chat_id].subject;
    } else {
      const subject = new BehaviorSubject<Message[]>([]);
      const subscription = interval(this.refreshIntervalMs).subscribe(async () => {
        this.http.get<Message[]>(`${this.apiUrl}/${chat_id}`).subscribe(value => {
          subject.next(value);
        });
      });

      this.updaters[chat_id] = {
        subject,
        subscription,
      };

      return subject;
    }
  }
}
