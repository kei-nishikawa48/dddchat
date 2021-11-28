import { onSnapshot } from "@firebase/firestore";
import { useCallback, useEffect, useState, useMemo } from "react";
import ChatRepository, { ChatData } from "../repository/chatRepository";
import UserService from "./userService";

const ChatService = () => {
  const [chats, setChats] = useState<ChatData[]>([]);
  const chatRepo = useMemo(() => new ChatRepository(), []);
  const user = UserService();
  useEffect(() => {
    return onSnapshot(chatRepo.chatQuery, (querySnapshot) => {
      const chats = querySnapshot.docs.map((doc) => {
        return doc.data();
      });
      setChats(chats);
    });
  }, [chatRepo]);

  const createChat = useCallback(
    async (message: string) => {
      if (!user) return;
      const chat = await chatRepo.save(message, user.uid);
      setChats([...chats, chat]);
    },
    [chatRepo, chats, user]
  );
  const deleteChat = useCallback(
    async (chatId: string) => {
      if (!user) return;
      await chatRepo.delete(chatId);
      setChats(chats.filter((chat) => chat.chatId !== chatId));
    },
    [chatRepo, chats, user]
  );
  const updateChat = useCallback(
    async (chatId: string, message: string) => {
      if (!user) return;
      const updatedChat = await chatRepo.update(chatId, message, user.uid);
      setChats(
        chats.map((chat) => (chat.chatId === chatId ? updatedChat : chat))
      );
    },
    [chatRepo, chats, user]
  );

  return { chats, createChat, deleteChat, updateChat };
};
export default ChatService;
