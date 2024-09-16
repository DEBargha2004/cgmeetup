import { useState } from "react";
import LessionCreateButton from "./content-create-button";
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
  ContentType,
  CourseSchemaType,
  LessonContentSchemaType,
  LessonsSchemaType
} from "@/schema/tutorial";
import { v4 } from "uuid";
import { cn } from "@/lib/utils";
import { useFieldArray } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { useCurriculum } from "./curriculum-context";

export default function ContentCreateButtonsGroup({
  lessonId
}: {
  lessonId: string;
}) {
  const [tempInput, setTempInput] = useState("");
  const [dialogState, setDialogState] = useState({
    videoUrl: false
  });
  const { lessons } = useCurriculum();

  const generateNewLessonContentInstance = (
    type: ContentType,
    content?: string
  ): LessonContentSchemaType => {
    return {
      type,
      content_id: v4(),
      content: content || ""
    };
  };

  const addContent = (type: ContentType, content?: string) => {
    const lessonIndex = lessons.fields.findIndex(
      (l) => l.lesson_id === lessonId
    );
    lessons.update(lessonIndex, {
      ...lessons.fields[lessonIndex],
      contents: [
        ...lessons.fields[lessonIndex].contents,
        generateNewLessonContentInstance(type, content)
      ]
    });
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
          addContent("image", reader.result as string);
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
          addContent("video", reader.result as string);
        };
      });
    }
  });
  return (
    <div
      className={cn(
        "py-10 bg-darkAccent overflow-hidden rounded",
        "flex justify-center items-center gap-2"
      )}
    >
      <LessionCreateButton
        Icon={Title}
        label="Text"
        onClick={(e) => {
          e.stopPropagation();
          addContent("text");
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
                  addContent("iframe", tempInput);
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
