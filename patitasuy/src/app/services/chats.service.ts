import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription, firstValueFrom, interval } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { Chat } from '../interfaces/chat';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  private readonly apiUrl = environment.apiUrl + '/chats';

  private readonly refreshIntervalMs = 5000;

  private currentUserChats$ = new BehaviorSubject<Chat[]>([])

  private updaterSubscription: Subscription | undefined;

  constructor(private http: HttpClient, private userService: UserService) { 
    this.userService.getCurrentUser().subscribe(user => {
      console.log("NEW USER:", user);

      if (this.updaterSubscription) {
        this.updaterSubscription.unsubscribe();
      }

      this.updaterSubscription = interval(this.refreshIntervalMs).subscribe(async () => {
        if (user?.user_id) {
          const chats = await this.fetchChatsForUser(user.user_id);
          this.currentUserChats$.next(chats);
        }
      });
    });
  }

  getChatsForCurrentUser(): BehaviorSubject<Chat[]> {
    return this.currentUserChats$;
  }

  createChatFromCurrentUserTo(user_id: number): Promise<Chat> {
    return new Promise(resolve => {
      this.userService.getCurrentUser().asObservable().subscribe(user => {
        if (user?.user_id) {
          this.http.post<Chat>(this.apiUrl, {
            user_id_1: user.user_id,
            user_id_2: user_id,
          }).subscribe(resolve);
        }
      });
    });
  }

  private fetchChatsForUser(user_id: number): Promise<Chat[]> {
      return firstValueFrom(this.http.get<Chat[]>(`${this.apiUrl}/${user_id}`));
  }
}
