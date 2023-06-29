import { SentMessage } from "./sent-message";

export interface Chat {
    id: number;
    messages: SentMessage[];
}
