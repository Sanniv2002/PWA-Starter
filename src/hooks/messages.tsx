import { useState, useEffect } from "react";

export interface APIResponse {
  id: string;
  message: string;
  sender: {
    image: string;
    is_kyc_verified: boolean;
    self: boolean;
    user_id: string;
  };
  time: string;
}

export function useMessages() {
  const [messages, setMessages] = useState<APIResponse[]>([]);
  const [pageNum, setPageNum] = useState(0);

  const loadMessages = async () => {
    const res = await fetch(
      `https://qa.corider.in/assignment/chat?page=${pageNum}`
    );
    const data = await res.json();
    setMessages((prevMsgs) => [...prevMsgs, ...data.chats]);
    setPageNum((prevVal) => prevVal + 1);
  };

  useEffect(() => {
    loadMessages();
  }, []);

  return { messages, loadMessages };
}