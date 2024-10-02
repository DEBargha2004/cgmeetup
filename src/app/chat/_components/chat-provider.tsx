"use client";

import { createContext, useContext } from "react";

type TChatContext = {
  isLeftSidebarMandatory: boolean;
  chatInput: string;
  setChatInput: React.Dispatch<React.SetStateAction<TChatContext["chatInput"]>>;
  images: Record<string, { id: string; data: string }[]>;
  setImages: React.Dispatch<React.SetStateAction<TChatContext["images"]>>;
  currentChatId: string;
};

const ChatContext = createContext<TChatContext | null>(null);

const useChatContext = () => {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }

  return context;
};

const ChatProvider = ({
  children,
  values
}: {
  children: React.ReactNode;
  values: TChatContext;
}) => {
  return <ChatContext.Provider value={values}>{children}</ChatContext.Provider>;
};

export { ChatProvider, useChatContext, type TChatContext };
