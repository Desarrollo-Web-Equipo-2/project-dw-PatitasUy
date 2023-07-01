import { User } from "./user";

export interface Message {
    message_id: number;
    chat_id: number;
    sender: User;
    content: string;
}
