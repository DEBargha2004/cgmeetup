import { getShortendName } from "@/functions";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import projects from "../../../public/data/projects.json";
import { cn } from "@/lib/utils";

export default function ProfileInfoOverView({
  children,
  className,
  height = 80,
  width = 80,
  image,
  description,
  heading,
  textContainer,
  descriptionValue,
  titleValue,
  profileInfo,
  content,
}: {
  children?: React.ReactNode;
  className?: string;
  height?: number;
  width?: number;
  image?: string;
  heading?: string;
  description?: string;
  textContainer?: string;
  titleValue?: string;
  descriptionValue?: string;
  profileInfo?: string;
  content?: React.ReactNode;
}) {
  return (
    <div className={cn("flex justify-between items-start w-full", className)}>
      <div className={cn("flex gap-3 w-full", profileInfo)}>
        <Avatar
          className={cn("border-2 border-white h-full aspect-square", image)}
        >
          <AvatarImage
            src={
              "https://cdna.artstation.com/p/users/avatars/000/078/930/large/99d98b9db85095a32a74190b5b4be7d1.jpg?1669152204"
            }
            height={height}
            width={width}
          />
          <AvatarFallback className="uppercase">
            {getShortendName("Ramaya Vastavaiya")}
          </AvatarFallback>
        </Avatar>
        <div
          className={cn(
            "flex flex-col justify-between items-start w-fit",
            textContainer,
          )}
        >
          <h1 className={cn("text-sm font-semibold ", heading)}>
            {titleValue || "Ramaya Vastavaiya"}
          </h1>
          <p
            className={cn(
              "text-sm text-lightAccent-foreground line-clamp-1",
              description,
            )}
          >
            {descriptionValue || "VFX artist"}
          </p>

          {content}
        </div>
      </div>

      {children}
    </div>
  );
}
