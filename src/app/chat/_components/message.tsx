import { cn } from "@/lib/utils";
import { EmojiEmotions } from "@mui/icons-material";
import { format } from "date-fns";

export type TMessage = {
  id: number;
  message: string;
  time: string;
  user_id: number;
};

export default function Message({
  message,
  isUserMessage
}: {
  message: TMessage;
  isUserMessage: boolean;
}) {
  return (
    <div
      className={cn(
        "flex group relative",
        isUserMessage ? "justify-end " : "justify-start"
      )}
      key={message.id}
    >
      <div
        className={cn(
          "flex max-w-[60%] gap-6 items-center relative",
          isUserMessage ? "justify-end flex-row-reverse" : "justify-start"
        )}
      >
        <div
          className={cn(
            "relative flex justify-start items-start",
            isUserMessage && "flex-row-reverse"
          )}
        >
          <MessagePointer
            className="shrink-0"
            user={isUserMessage}
            width={10}
          />
          <div
            className={cn(
              "p-4 pb-1  flex flex-col justify-between items-end",
              isUserMessage
                ? "bg-white text-black rounded-lg rounded-tr-none"
                : "bg-primary rounded-lg rounded-tl-none"
            )}
          >
            <p>{message.message}</p>
            <p className="text-xs opacity-70">
              {format(message.time, "h:mm a")}
            </p>
          </div>
          {/* <div
            className={cn(
              "group-hover:visible invisible absolute top-1/2 -translate-y-1/2  cursor-pointer",
              isUserMessage ? "-left-10" : "-right-10"
            )}
          >
            <EmojiEmotions />
          </div> */}
        </div>
      </div>
    </div>
  );
}

function MessagePointer({
  className,
  height = 10,
  width = 10,
  ...props
}: React.SVGProps<SVGSVGElement> & { user: boolean }) {
  const userPoint = `0,0 ${width},0 0,${height} 0,0`;
  const otherPoint = `0,0 ${width},0 ${width},${height} 0,0`;

  const point = props.user ? userPoint : otherPoint;
  const fill = props.user ? "white" : "hsl(var(--primary))";
  return (
    <svg height={height} width={width} {...props} className={cn("", className)}>
      <polygon points={point} fill={fill} />
    </svg>
  );
}
