import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { FieldType } from "@/types/field-type";
import { IconType } from "@/types/icon";
import {
  AttachFile,
  EmojiEmotions,
  InsertDriveFile,
  Phone,
  PhotoLibrary,
  Send,
  SlowMotionVideo
} from "@mui/icons-material";
import EmojiPicker from "emoji-picker-react";
import { forwardRef, HTMLProps } from "react";
import { useChatContext } from "./chat-provider";

const attachments: (Omit<FieldType, "icon"> & {
  Icon: IconType;
})[] = [
  { label: "Images", value: "gallery", Icon: PhotoLibrary },
  { label: "Resume", value: "resume", Icon: InsertDriveFile },
  { label: "Share Number", value: "contacts", Icon: Phone },
  { label: "Demo Reel", value: "videos", Icon: SlowMotionVideo }
];

const ChatInput = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { chatInput, setChatInput } = useChatContext();
    return (
      <div
        id="input"
        className={cn(
          "w-full flex justify-between items-center gap-4 border-t px-4 bg-lightAccent",
          className
        )}
        {...props}
        ref={ref}
      >
        <div className="flex justify-start items-center gap-4 shrink-0 h-10">
          <Popover>
            <PopoverTrigger asChild>
              <div className="cursor-pointer">
                <EmojiEmotions className="h-8" />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-fit">
              <EmojiPicker
                //@ts-ignore
                theme={"dark"}
                style={{ backgroundColor: "transparent" }}
                onEmojiClick={(e) => setChatInput(chatInput + e.emoji)}
              />
            </PopoverContent>
          </Popover>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="cursor-pointer">
                <AttachFile className="h-8" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" className="-translate-y-5">
              {attachments.map((attachment) => (
                <DropdownMenuItem key={attachment.value}>
                  <attachment.Icon className="h-7 mr-2" />

                  <span>{attachment.label}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Input
          className="w-full"
          onChange={(e) => setChatInput(e.target.value)}
          value={chatInput}
        />
        <div>
          <div className="h-10 w-10 flex justify-center items-center bg-primary rounded-full">
            <Send className="h-7" />
          </div>
        </div>
      </div>
    );
  }
);

ChatInput.displayName = "ChatInput";

export default ChatInput;
