import {
  collection,
  CollectionReference,
  Firestore,
  getFirestore,
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
  getDocs,
  setDoc,
  doc,
  addDoc,
  query,
  orderBy,
  deleteDoc,
  Query,
} from "@firebase/firestore";
import Chat from "../entity/chat";
import { Message } from "../valueobject/message";

interface IChatRepository {
  getAllChat(): Promise<ChatData[]>;
  // getChat(): Promise<Chat>;
  // saveChat(chat: Chat): Promise<void>;
  // updateChat(chat: Chat): Promise<void>;
  // deleteChat(chat: Chat): Promise<void>;
}

export class ChatData {
  userId: string;
  message: Message;
  chatId: string;
  createdAt: Date;
  constructor(chat: Chat) {
    this.userId = chat.userId;
    this.message = chat.message;
    this.chatId = chat.chatId;
    this.createdAt = chat.createdAt;
  }
}
const converter = {
  toFirestore(data: Chat): DocumentData {
    return {
      message: data.message.value,
      userId: data.userId,
      createdAt: data.createdAt,
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): ChatData {
    const data = snapshot.data(options);
    const chat = new Chat(
      data.userId,
      data.message,
      snapshot.id,
      data.createdAt
    );
    return new ChatData(chat);
  },
};

export default class ChatRepository implements IChatRepository {
  db: Firestore;
  chatCollection: CollectionReference<ChatData>;
  chatQuery: Query<ChatData>;
  constructor() {
    this.db = getFirestore();
    this.chatCollection = collection(this.db, "chats").withConverter(converter);
    this.chatQuery = query(this.chatCollection, orderBy("createdAt", "desc"));
  }
  getAllChat(): Promise<ChatData[]> {
    return getDocs(this.chatQuery).then((querySnapshot) => {
      return querySnapshot.docs.map((doc) => doc.data());
    });
  }
  async save(message: string, uid: string): Promise<ChatData> {
    const chat = new Chat(uid, message);
    await addDoc(this.chatCollection, chat);
    return new ChatData(chat);
  }
  async update(
    chatId: string,
    message: string,
    uid: string
  ): Promise<ChatData> {
    const chat = new Chat(uid, message, chatId, new Date());
    await setDoc(doc(this.chatCollection, chatId), chat);
    return new ChatData(chat);
  }
  async delete(chatId: string): Promise<void> {
    await deleteDoc(doc(this.chatCollection, chatId));
  }
}
