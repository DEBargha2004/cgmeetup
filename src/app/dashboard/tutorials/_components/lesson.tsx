import { RichTextEditor } from "@/components/custom/editor";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { generateVideoEmbedUrl } from "@/functions/url-format";
import { CourseSchemaType } from "@/schema/tutorial";
import { MoreVert } from "@mui/icons-material";
import Image from "next/image";
import { useFieldArray, useForm } from "react-hook-form";
import Content from "./content";
import { HTMLProps } from "react";
import { useCurriculum } from "./curriculum-context";

export default function Lesson({
  lessonId,
  chapterIndex,
  dragHandler
}: HTMLProps<HTMLDivElement> & {
  lessonId: string;
  chapterIndex: number;
  dragHandler?: React.ReactNode;
}) {
  const { form, lessons } = useCurriculum();
  const lessonIndex = lessons.fields.findIndex((l) => l.lesson_id === lessonId);
  const lesson = lessons.fields[lessonIndex];

  const saveLesson = () => {
    const lessonData = form.getValues(`lessons.${lessonIndex}`);
    lessons.update(lessonIndex, { ...lessonData, saved: true });
  };

  const deleteLesson = () => {
    lessons.remove(lessonIndex);
  };

  const editLesson = () => {
    const lessonData = form.getValues(`lessons.${lessonIndex}`);
    lessons.update(lessonIndex, { ...lessonData, saved: false });
  };

  return (
    <section className="divide-y-2">
      <div className="flex justify-between items-center p-3">
        {lesson.saved ? (
          <>
            <p className="text-base flex justify-start items-center gap-2">
              {dragHandler}
              <span>{lesson.title}</span>
            </p>
            {/* <FormField
              control={form.control}
              name={`lessons.${lessonIndex}.is_free`}
              render={({ field }) => (
                <FormItem className="flex justify-start items-center gap-4">
                  <FormLabel>Free Lesson</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            /> */}
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button
                  variant={"ghost"}
                  className="h-8 w-8 rounded-full hover:bg-card/70"
                >
                  <MoreVert />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={editLesson}>Edit</DropdownMenuItem>
                <DropdownMenuItem onClick={deleteLesson}>
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <div className="flex justify-between items-center w-full">
            <Input
              className="max-w-[350px]"
              onClick={(e) => e.stopPropagation()}
              {...form.register(`lessons.${lessonIndex}.title`)}
            />

            <div className="flex items-center gap-4">
              <Button className="h-8" type="button" onClick={saveLesson}>
                Save
              </Button>
              <Button
                variant={"destructive"}
                className="h-8"
                type="button"
                onClick={deleteLesson}
              >
                Delete
              </Button>
            </div>
          </div>
        )}
      </div>

      {lesson.contents.map((content, index) => (
        <Content
          key={content.content_id}
          content={content}
          form={form}
          index={index}
          lessonIndex={lessonIndex}
          lessons={lessons}
          className="p-3"
        />
      ))}
    </section>
  );
}
