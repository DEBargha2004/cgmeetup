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
import { forwardRef, HTMLProps, useState } from "react";
import { useChatContext } from "./chat-provider";
import { useDropzone } from "react-dropzone";
import { v4 } from "uuid";

const ChatInput = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { chatInput, setChatInput, setImages, currentChatId } =
      useChatContext();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const imageDropZone = useDropzone({
      accept: {
        "image/*": []
      },
      async onDrop(acceptedFiles, fileRejections, event) {
        await Promise.all(
          acceptedFiles.map(async (f) => {
            return new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.readAsDataURL(f);
              reader.onloadend = () => {
                setImages((prev) => ({
                  ...prev,
                  [currentChatId]: [
                    ...(prev[currentChatId] || []),
                    {
                      id: v4(),
                      data: reader.result as string
                    }
                  ]
                }));
                resolve(null);
              };
            });
          })
        );
        setDropdownOpen(false);
      }
    });
    return (
      <div
        id="input"
        className={cn(
          "w-full flex justify-between items-center gap-4 border-t px-4 bg-lightAccent shrink-0",
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

          <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <div className="cursor-pointer">
                <AttachFile className="h-8" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" className="-translate-y-5">
              <input type="file" {...imageDropZone.getInputProps()} />
              {/* @ts-ignore */}
              <DropdownMenuItem
                {...imageDropZone.getRootProps({
                  onSelect: (e) => e.preventDefault()
                })}
              >
                <PhotoLibrary className="h-7 mr-2" />
                <span>Image</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <InsertDriveFile className="h-7 mr-2" />
                <span>Resume</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Phone className="h-7 mr-2" />
                <span>Share Number</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SlowMotionVideo className="h-7 mr-2" />
                <span>Demo Reel</span>
              </DropdownMenuItem>
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
