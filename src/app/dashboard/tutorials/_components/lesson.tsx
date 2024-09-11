import { RichTextEditor } from "@/components/custom/editor";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { CourseSchemaType } from "@/schema/tutorial";
import { useForm } from "react-hook-form";

export default function Lesson({
  form,
  lessonId,
  lessonIndex,
  chapterIndex,
  dragHandler
}: {
  form: ReturnType<typeof useForm<CourseSchemaType>>;
  lessonId: string;
  lessonIndex: number;
  chapterIndex: number;
  dragHandler?: React.ReactNode;
}) {
  return (
    <section className=" space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-base flex justify-start items-center gap-2">
          {dragHandler}
          <span>New Lesson</span>
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
      </div>
      <div>
        {form.watch(`tutorial.${chapterIndex}.sections.${lessonIndex}.type`) ===
          "text" && (
          <FormField
            control={form.control}
            name={`tutorial.${lessonIndex}.sections.${chapterIndex}.content`}
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
      </div>
    </section>
  );
}
