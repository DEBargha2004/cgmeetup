import { Badge } from "@/components/ui/badge";
import Image, { StaticImageData } from "next/image";

export default function ImageTag({
  title,
  image,
}: {
  title: string;
  image: string | StaticImageData;
}) {
  return (
    <Badge className="text-md border flex justify-start items-center gap-1 pl-0 py-0">
      <Image src={image} alt="profile" height={30} width={30} className="" />
      <span className="opacity-70 text-sm inline-block max-w-[100px] truncate">
        {title}
      </span>
    </Badge>
  );
}
