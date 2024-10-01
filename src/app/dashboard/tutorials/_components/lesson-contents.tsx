import { ContentType, LessonsSchemaType } from "@/schema/tutorial";
import Content from "./content";
import { useCurriculum } from "./curriculum-context";
import { v4 } from "uuid";
import ContentCreateButtonsGroup from "./content-create-buttons-group";
import { cn } from "@/lib/utils";
import { AddCircleOutline, Delete } from "@mui/icons-material";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { formatTimeFromMinutes } from "@/functions/format-time-from-minutes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LessonContents({
  lesson,
  lessonIndex
}: {
  lesson: LessonsSchemaType;
  lessonIndex: number;
}) {
  const { form, lessons } = useCurriculum();

  const removeContent = (contentIndex: number, lessonIndex: number) => () => {
    lessons.update(lessonIndex, {
      ...lessons.fields[lessonIndex],
      contents: lessons.fields[lessonIndex].contents.filter(
        (content, index) => index !== contentIndex
      )
    });
  };

  const thumbnailDropzone = useDropzone({
    accept: {
      "image/*": []
    },
    onDrop(acceptedFiles, fileRejections, event) {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => {
          lessons.update(lessonIndex, {
            ...lessons.fields[lessonIndex],
            thumbnail: reader.result as string
          });
        };
      });
    }
  });

  const getOriginalLessonIndex = (lessonId: string) => {
    return lessons.fields.findIndex((lesson) => lesson.lesson_id === lessonId);
  };

  const handleContentCreate =
    (lessonId: string) => (contentType: ContentType, data: string) => {
      const id = v4();
      const lessonIndex = getOriginalLessonIndex(lessonId);
      const lessonInfo = form.getValues("lessons")[lessonIndex];

      lessons.update(lessonIndex, {
        ...lessonInfo,
        contents: [
          ...lessonInfo.contents,
          { content_id: id, type: contentType, content: data }
        ]
      });
    };

  const deleteThumbnail = (e: React.MouseEvent) => {
    e.stopPropagation();
    lessons.update(lessonIndex, {
      ...lessons.fields[lessonIndex],
      thumbnail: ""
    });
  };
  return (
    <div className="@container">
      {lesson.contents.map((content, index) => (
        <Content
          key={content.content_id}
          form={form}
          contentType={content.type}
          className="p-3"
          removeContent={removeContent(index, lessonIndex)}
          contentPath={`lessons.${getOriginalLessonIndex(lesson.lesson_id)}.contents.${index}.content`}
        />
      ))}
      {lesson.contents.length ? (
        <div className="p-2 w-full flex justify-center items-center">
          <div
            className={cn(
              "@2xl:w-4/5 w-full shrink-0",
              "grid grid-cols-1 @lg:grid-cols-[auto_1fr] gap-x-4 gap-y-2"
            )}
          >
            <input {...thumbnailDropzone.getInputProps()} />
            <div
              className={cn(
                "min-w-20 @lg:w-[150px] @xl:w-[200px] shrink-0 aspect-video border",
                "flex justify-center items-center cursor-pointer"
              )}
              {...thumbnailDropzone.getRootProps()}
            >
              {lesson.thumbnail ? (
                <div className="w-full h-full relative">
                  <Image
                    src={lesson.thumbnail}
                    alt={lesson.title}
                    height={200}
                    width={200}
                    className="w-full h-full object-cover"
                  />
                  <Button
                    type="button"
                    variant={"destructive"}
                    className={cn(
                      "h-8 w-8 rounded-full p-0 opacity-60 hover:opacity-100",
                      "absolute top-1 right-1"
                    )}
                    onClick={deleteThumbnail}
                  >
                    <Delete fontSize="small" />
                  </Button>
                </div>
              ) : (
                <AddCircleOutline />
              )}
            </div>

            <FormField
              control={form.control}
              name={`lessons.${lessonIndex}.description`}
              render={({ field }) => (
                <FormItem className="h-full">
                  <FormControl>
                    <Textarea
                      {...field}
                      className="w-full h-full"
                      placeholder="Description about lesson"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`lessons.${lessonIndex}.duration`}
              render={({ field }) => (
                <FormItem className="@lg:col-start-2">
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      className="w-full hide-input-inner-buttons"
                      placeholder="Duration in minutes"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
      ) : null}
      <div className="p-2">
        <ContentCreateButtonsGroup
          actions={handleContentCreate(lesson.lesson_id)}
          className="grid grid-cols-2 @xl:grid-cols-3 @4xl:grid-cols-4 gap-2 p-2"
        />
      </div>
    </div>
  );
}
