import { RichTextEditor } from "@/components/custom/editor";
import { Button } from "@/components/ui/button";
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
import Image from "next/image";
import { useFieldArray, useForm } from "react-hook-form";

export default function Lesson({
  form,
  lessonId,
  chapterIndex,
  dragHandler,
  lessons
}: {
  form: ReturnType<typeof useForm<CourseSchemaType>>;
  lessonId: string;
  chapterIndex: number;
  dragHandler?: React.ReactNode;
  lessons: ReturnType<typeof useFieldArray<CourseSchemaType, "lessons", "id">>;
}) {
  const lessonIndex = lessons.fields.findIndex((l) => l.lesson_id === lessonId);
  const lesson = lessons.fields[lessonIndex];

  const saveLesson = () => {
    const lessonData = form.getValues(`lessons.${lessonIndex}`);
    lessons.update(lessonIndex, { ...lessonData, saved: true });
  };

  const deleteLesson = () => {
    lessons.remove(lessonIndex);
  };

  return (
    <section className=" space-y-4">
      <div className="flex justify-between items-center">
        {lesson.saved ? (
          <>
            <p className="text-base flex justify-start items-center gap-2">
              {dragHandler}
              <span>{lesson.title}</span>
            </p>
            <FormField
              control={form.control}
              name="isFree"
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
            />
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
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
      <div className="outline outline-lightAccent rounded overflow-hidden">
        {form.watch(`lessons.${lessonIndex}.type`) === "text" && (
          <FormField
            control={form.control}
            name={`lessons.${lessonIndex}.content`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <RichTextEditor
                    content={field.value}
                    onUpdate={field.onChange}
                    editorWrapperClassName="border"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        )}
        {form.watch(`lessons.${lessonIndex}.type`) === "iframe" && (
          <iframe
            src={generateVideoEmbedUrl(
              form.watch(`lessons.${lessonIndex}.content`)
            )}
            className="w-full aspect-video "
          />
        )}
        {form.watch(`lessons.${lessonIndex}.type`) === "image" && (
          <Image
            src={form.watch(`lessons.${lessonIndex}.content`)}
            height={300}
            width={300}
            className="w-full aspect-video object-contain "
            alt="course-image"
          />
        )}
        {form.watch(`lessons.${lessonIndex}.type`) === "video" && (
          <video
            controls
            src={form.watch(`lessons.${lessonIndex}.content`)}
            title={form.watch(`lessons.${lessonIndex}.title`)}
          />
        )}
      </div>
    </section>
  );
}
