"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FieldType } from "@/types/field-type";
import { IconType } from "@/types/icon";
import {
  Bookmark,
  Close,
  EmojiEmotions,
  InsertDriveFile,
  MoreVert,
  PersonAdd,
  Phone,
  PhotoLibrary,
  SlowMotionVideo
} from "@mui/icons-material";
import { format } from "date-fns";
import _ from "lodash";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ChatInput from "../_components/chat-input";
import { useRouter } from "next/navigation";
import { useChatContext } from "../_components/chat-provider";
import Message, { TMessage } from "../_components/message";

const defaultmessages: TMessage[] = [
  {
    id: 1,
    message: "Hello, how are you?",
    time: "2024-05-29T10:00:00Z",
    user_id: 1
  },
  {
    id: 2,
    message: "I'm doing great, thanks!",
    time: "2024-05-29T10:05:00Z",
    user_id: 2
  },
  {
    id: 3,
    message: "Are we still on for the meeting later?",
    time: "2024-05-29T10:10:00Z",
    user_id: 1
  },
  {
    id: 4,
    message: "Yes, I'll see you at 3 PM.",
    time: "2024-05-29T10:15:00Z",
    user_id: 3
  },
  {
    id: 5,
    message: "Great, looking forward to it.",
    time: "2024-05-29T10:20:00Z",
    user_id: 1
  },
  {
    id: 6,
    message: "Don't forget to bring the reports.",
    time: "2024-05-29T10:25:00Z",
    user_id: 2
  },
  {
    id: 7,
    message: "Will do, see you soon.",
    time: "2024-05-29T10:30:00Z",
    user_id: 1
  },
  {
    id: 8,
    message: "Just sent you the documents.",
    time: "2024-05-29T10:35:00Z",
    user_id: 3
  },
  {
    id: 9,
    message: "Received them, thanks!",
    time: "2024-05-29T10:40:00Z",
    user_id: 1
  },
  {
    id: 10,
    message:
      "No problem, let me know if you need anything else. No problem, let me know if you need anything else. No problem, let me know if you need anything else.",
    time: "2024-05-29T10:45:00Z",
    user_id: 2
  },
  {
    id: 11,
    message:
      "No problem, let me know if you need anything else. No problem, let me know if you need anything else. No problem, let me know if you need anything else.",
    time: "2024-05-29T10:45:00Z",
    user_id: 3
  },
  {
    id: 12,
    message:
      "No problem, let me know if you need anything else. No problem, let me know if you need anything else. No problem, let me know if you need anything else.",
    time: "2024-05-29T10:45:00Z",
    user_id: 1
  }
];

export default function ChatPage() {
  const [showInfo, setShowInfo] = useState(false);
  const [messages, setMessages] = useState(defaultmessages);

  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const { setChatInput } = useChatContext();

  useEffect(() => {
    messagesContainerRef.current?.scrollTo({
      top: messagesContainerRef.current.scrollHeight,
      behavior: "instant"
    });
  }, [messages.length]);

  useEffect(() => {
    setChatInput("");
  }, []);
  return (
    <div
      id="chat"
      className={cn(
        "w-full sm:w-3/5 lg:w-2/3 xl:w-3/4 h-full flex overflow-hidden absolute sm:relative",
        "left-0"
      )}
    >
      <div
        id="chat-container"
        className={cn(
          `shrink-0 h-full bg-slate-400 flex flex-col justify-between items-center
       bg-darkAccent w-full`,
          showInfo ? "xl:w-2/3 lg:w-1/2 w-full" : "w-full"
        )}
      >
        <div
          id="nav"
          className="h-[8%] w-full bg-lightAccent flex justify-between items-center px-2 gap-4"
        >
          <div
            className="flex justify-start items-center gap-2 w-full"
            onClick={() => setShowInfo(true)}
          >
            <Image
              src={
                "https://cdnb.artstation.com/p/assets/images/images/000/424/193/smaller_square/glenn-melenhorst-car0001.jpg?1443927098"
              }
              alt="profile"
              height={40}
              width={40}
              className="rounded-full h-10 w-10 border-2 border-white object-contain"
            />
            <div>
              <h1 className="text-lg">Alibaba Salmon</h1>
              <p className="text-xs text-primary ">
                3D Animator<i className="text-success ml-2">typing...</i>
              </p>
            </div>
          </div>
          <div className="flex justify-between items-center gap-2">
            <MoreVert />
            <Close
              className="cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                router.back();
              }}
            />
          </div>
        </div>
        <div
          id="messages"
          className="h-[82%] w-full  overflow-y-auto scroller space-y-2 p-2"
          ref={messagesContainerRef}
        >
          {messages.map((message) => (
            <Message
              key={message.id}
              message={message}
              isUserMessage={message.user_id === 1}
            />
          ))}
        </div>
        <ChatInput className="h-[10%] " />
      </div>

      <div
        id="info"
        className={cn(
          "xl:w-1/3 lg:w-1/2 h-full w-full",
          "bg-lightAccent  duration-300 p-4 space-y-6",
          "shrink-0 overflow-y-auto scroller",
          showInfo ? "-translate-x-full lg:translate-x-0" : "translate-x-0"
        )}
      >
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Profile</h1>
          <Close
            className="cursor-pointer"
            onClick={() => setShowInfo(false)}
          />
        </div>
        <div className="flex flex-col justify-between items-center gap-4">
          <Image
            src={
              "https://cdnb.artstation.com/p/assets/images/images/000/424/193/smaller_square/glenn-melenhorst-car0001.jpg?1443927098"
            }
            alt="profile"
            height={100}
            width={100}
            className="rounded-full h-[120px] w-[120px] border-2 border-white"
          />
          <div className="text-center  w-full">
            <h1 className="text-2xl font-semibold">Sarah Smith</h1>
            <h2 className="w-4/5 truncate mx-auto text-primary">sarah.smith</h2>
          </div>
          <div className="w-full flex justify-center items-center gap-2">
            <Button className="w-[35%] flex justify-center gap-2 items-center">
              <PersonAdd />
              <span>Follow</span>
            </Button>
            <Button
              variant={"outline"}
              className="w-[35%] flex justify-center gap-2 items-center"
            >
              <Bookmark
                className={cn("", true ? "text-primary" : "text-white")}
              />

              <span>Bookmark</span>
            </Button>
          </div>
          <div className="space-y-2 w-full">
            <h1 className="text-xl">About</h1>
            <p className="text-sm">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum
            </p>
          </div>
          <div className="space-y-2 w-full">
            <h1 className="text-xl">Portfolio</h1>
            <div className="grid grid-cols-3 gap-1">
              {Array.from({ length: 6 }, (_, i) => i).map((_, i) => (
                <Image
                  key={i}
                  src={
                    "https://cdnb.artstation.com/p/assets/images/images/000/424/193/smaller_square/glenn-melenhorst-car0001.jpg?1443927098"
                  }
                  height={100}
                  width={100}
                  alt="post"
                  className="rounded-sm w-full aspect-square object-cover"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
