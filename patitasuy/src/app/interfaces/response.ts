import { User } from "./user";

export interface UserResponse {
  ok: boolean;
  msg?: string;
  data?: User;
}