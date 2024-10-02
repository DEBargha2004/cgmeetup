"use client";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search } from "@mui/icons-material";
import Link from "next/link";
import ChatUserItem from "./_components/chat-user-item";
import { v4 } from "uuid";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { ChatProvider, TChatContext } from "./_components/chat-provider";

const badges = ["All", "Unread", "Groups"];
const users = Array.from({ length: 81 }, (_, i) => v4());

export default function ChatLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLeftSidebarMandatory = useMemo(() => {
    const chatId = pathname.split("/")[2];
    return !Boolean(chatId);
  }, [pathname]);

  const [chatInput, setChatInput] = useState("");
  const [images, setImages] = useState<TChatContext["images"]>({});
  const currentChatId = useMemo(() => {
    const chatId = pathname.split("/")[2];
    return chatId;
  }, [pathname]);

  return (
    <ChatProvider
      values={{
        isLeftSidebarMandatory,
        chatInput,
        setChatInput,
        images,
        setImages,
        currentChatId
      }}
    >
      <div className="flex justify-start items-start h-full relative overflow-hidden">
        <div
          id="list"
          className={cn(
            "w-full sm:w-2/5 lg:w-1/3 xl:w-1/4 h-full",
            "shrink-0 bg-lightAccent border-r p-5 space-y-4",
            "flex flex-col justify-between items-start",
            isLeftSidebarMandatory ? "" : "hidden sm:flex"
          )}
        >
          <div className="text-2xl flex justify-between items-center w-full">
            Chats
            <div className="flex gap-1">
              {badges.map((badge) => (
                <Badge
                  variant={badge === "All" ? "default" : "outline"}
                  key={badge}
                >
                  {badge}
                </Badge>
              ))}
            </div>
          </div>
          <div className="relative w-full">
            <Input className="pl-10" placeholder="Search.." />
            <Search className="absolute top-1/2 -translate-y-1/2 left-3" />
          </div>
          <div className="space-y-1 h-full w-full overflow-y-auto scroller">
            {users.map((user) => (
              <Link
                replace={pathname === "/chat" ? false : true}
                key={user}
                href={"/chat/" + user}
                className="inline-block w-full"
              >
                <ChatUserItem userId={user} />
              </Link>
            ))}
          </div>
        </div>
        {children}
      </div>
    </ChatProvider>
  );
}
