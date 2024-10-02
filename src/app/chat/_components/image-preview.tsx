import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Add, Delete } from "@mui/icons-material";
import Image from "next/image";
import { HTMLProps, useEffect, useState } from "react";
import { TChatContext, useChatContext } from "./chat-provider";
import { useDropzone } from "react-dropzone";
import { v4 } from "uuid";

export default function ImagePreview({
  className,
  images,
  ...props
}: HTMLProps<HTMLDivElement> & {
  images?: TChatContext["images"][string] | undefined;
}) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { currentChatId, setImages } = useChatContext();

  const imageDropZone = useDropzone({
    accept: {
      "image/*": []
    },
    onDrop(acceptedFiles, fileRejections, event) {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
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
        };
      });
    }
  });

  const deleteImage = (index: number) => {
    setImages((prev) => ({
      ...prev,
      [currentChatId]: prev[currentChatId]?.filter((_, i) => i !== index)
    }));
  };

  useEffect(() => {
    if (!images) return;
    setSelectedImageIndex((prev) => {
      if (prev >= images.length) return prev - 1;
      return prev;
    });
  }, [images]);
  return (
    <div className={cn("h-full w-full ", className)} {...props}>
      <div className="h-[85%] flex items-center justify-center">
        <Image
          src={images?.[selectedImageIndex]?.data || ""}
          alt="image"
          height={300}
          width={300}
          className="h-full w-auto"
        />
      </div>
      <div className="h-[15%] flex items-center px-4">
        <Carousel className="w-full">
          <CarouselContent>
            {images?.map((image, index) => (
              <CarouselItem key={image.id} className="basis-auto">
                <div
                  className={cn(
                    "w-20 aspect-square border-2 relative group",
                    selectedImageIndex === index
                      ? "border-primary"
                      : "border-transparent"
                  )}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <Image
                    src={image.data}
                    alt=""
                    height={100}
                    width={100}
                    className={cn("w-full h-full object-cover cursor-pointer")}
                  />
                  <Button
                    className={cn(
                      "p-0 h-8 w-8 rounded-full bg-destructive/60",
                      "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                      "hidden place-content-center",
                      selectedImageIndex === index
                        ? "group-hover:grid "
                        : "hidden"
                    )}
                    variant={"destructive"}
                    onClick={() => deleteImage(index)}
                  >
                    <Delete fontSize="small" />
                  </Button>
                </div>
              </CarouselItem>
            ))}
            <CarouselItem className="basis-auto">
              <div
                className={cn(
                  "w-20 aspect-square cursor-pointer transition-all",
                  "bg-lightAccent/40 hover:bg-lightAccent/70",
                  "grid place-content-center"
                )}
              >
                <input {...imageDropZone.getInputProps()} />
                <Button
                  type="button"
                  className={cn(
                    "p-0 h-8 w-8 rounded-full border",
                    "grid place-content-center"
                  )}
                  variant={"secondary"}
                  {...imageDropZone.getRootProps()}
                >
                  <Add fontSize="small" />
                </Button>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselNext
            className="right-3"
            appearanceHandler={(canscroll) =>
              canscroll ? "visible" : "hidden"
            }
          />
          <CarouselPrevious
            className="left-3"
            appearanceHandler={(canscroll) =>
              canscroll ? "visible" : "hidden"
            }
          />
        </Carousel>
      </div>
    </div>
  );
}
