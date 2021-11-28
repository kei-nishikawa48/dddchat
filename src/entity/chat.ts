import { Message } from "../valueobject/message";
import { collection, doc,  getFirestore } from "@firebase/firestore";
import app from "../firebase/config";

export default class Chat {
  userId: string;
  message: Message;
  chatId: string;
  createdAt: Date;
  constructor(
    userId: string,
    message: string,
    chatId?: string,
    createdAt?: Date
  ) {
    //再構築用
    this.userId = userId;
    this.message = new Message(message);
    if (chatId && createdAt) {
      this.chatId = chatId;
      this.createdAt = createdAt;
    } else {
      this.chatId = doc(collection(getFirestore(app), "_")).id;
      this.createdAt = new Date();
    }
  }
  changeMessage(message: string) {
    this.message = new Message(message);
  }
}
