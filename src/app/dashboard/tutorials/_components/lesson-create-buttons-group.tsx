import { useState } from "react";
import LessionCreateButton from "./lession-create-button";
import {
  AddLinkOutlined,
  ImageOutlined,
  PlayCircleOutline,
  Title
} from "@mui/icons-material";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  CourseSchemaType,
  LessonsSchemaType,
  LessonType
} from "@/schema/tutorial";
import { v4 } from "uuid";
import { cn } from "@/lib/utils";
import { useFieldArray } from "react-hook-form";
import { useDropzone } from "react-dropzone";

export default function LessonCreateButtonsGroup({
  lessons,
  chapterId
}: {
  lessons: ReturnType<typeof useFieldArray<CourseSchemaType, "lessons", "id">>;
  chapterId: string;
}) {
  const [tempInput, setTempInput] = useState("");
  const [dialogState, setDialogState] = useState({
    videoUrl: false
  });

  const generateNewLessonInstance = (
    chapterId: string,
    type: LessonType,
    content?: string
  ): LessonsSchemaType[number] => {
    return {
      chapter_id: chapterId,
      lesson_id: v4(),
      title: "",
      type,
      content: content || "",
      saved: false
    };
  };

  const createLesson = (
    chapterId: string,
    type: LessonType,
    content?: string
  ) => {
    lessons.append(generateNewLessonInstance(chapterId, type, content));
  };

  const imageDropzone = useDropzone({
    accept: {
      "image/*": []
    },
    multiple: false,
    onDrop: (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          createLesson(chapterId, "image", reader.result as string);
        };
      });
    }
  });

  const videDropzone = useDropzone({
    accept: {
      "video/*": []
    },
    multiple: false,
    onDrop: (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          createLesson(chapterId, "video", reader.result as string);
        };
      });
    }
  });
  return (
    <div
      className={cn(
        "py-10 bg-darkAccent",
        "flex justify-center items-center gap-2"
      )}
    >
      <LessionCreateButton
        Icon={Title}
        label="Text"
        onClick={(e) => {
          e.stopPropagation();
          createLesson(chapterId, "text");
        }}
      />
      <input type="file" {...imageDropzone.getInputProps()} />
      <LessionCreateButton
        {...imageDropzone.getRootProps({
          Icon: ImageOutlined,
          label: "Image"
        })}
      />

      <input type="file" {...videDropzone.getInputProps()} />
      <LessionCreateButton
        {...videDropzone.getRootProps({
          Icon: PlayCircleOutline,
          label: "Video"
        })}
      />
      <Dialog
        open={dialogState.videoUrl}
        onOpenChange={(e) =>
          setDialogState((prev) => ({ ...prev, videoUrl: e }))
        }
      >
        <DialogTrigger>
          <LessionCreateButton Icon={AddLinkOutlined} label="Video Url" />
        </DialogTrigger>
        <DialogContent className="p-0 space-y-0 bg-darkAccent max-w-[600px]">
          <DialogHeader className="p-2 px-4 md:text-lg text-base bg-lightAccent">
            Video
          </DialogHeader>
          <div className="px-4 py-2 space-y-4">
            <div className="space-y-2">
              <p>Paste a YouTube or Vimeo video URL here</p>
              <Input
                placeholder="Example: https://www.youtube.com/watch?v=doPV-Shqm7k"
                className="placeholder:text-gray-500"
                value={tempInput}
                onChange={(e) => setTempInput(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter className="p-4 pt-0">
            <DialogClose>
              <Button
                className="h-8"
                onClick={(e) => {
                  e.stopPropagation();
                  createLesson(chapterId, "iframe", tempInput);
                  setTempInput("");
                  setDialogState((prev) => ({
                    ...prev,
                    videoUrl: false
                  }));
                }}
              >
                Save
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
