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
import { generateVideoEmbedUrl } from "@/functions/url-format";
import { CourseSchemaType, LessonContentSchemaType } from "@/schema/tutorial";
import { MoreVert } from "@mui/icons-material";
import Image from "next/image";
import { useFieldArray, useForm } from "react-hook-form";

export default function Content({
  content,
  form,
  index,
  lessonIndex,
  lessons
}: {
  form: ReturnType<typeof useForm<CourseSchemaType>>;
  content: LessonContentSchemaType;
  index: number;
  lessonIndex: number;
  lessons: ReturnType<typeof useFieldArray<CourseSchemaType, "lessons", "id">>;
}) {
  const removeContent = () => {
    lessons.update(lessonIndex, {
      ...lessons.fields[lessonIndex],
      contents: lessons.fields[lessonIndex].contents.filter(
        (c) => c.content_id !== content.content_id
      )
    });
  };
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <p>Content</p>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button
              type="button"
              variant={"ghost"}
              className="h-9 w-9 rounded-full hover:bg-card/70"
            >
              <MoreVert />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={removeContent}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {content.type === "text" && (
        <FormField
          control={form.control}
          name={`lessons.${lessonIndex}.contents.${index}.content`}
          render={({ field }) => (
            <FormItem>
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
      {content.type === "video" && (
        <video
          controls
          src={form.watch(`lessons.${lessonIndex}.contents.${index}.content`)}
        />
      )}
      {content.type === "image" && (
        <Image
          src={form.watch(`lessons.${lessonIndex}.contents.${index}.content`)}
          height={300}
          width={300}
          className="w-full aspect-video object-contain "
          alt="course-image"
        />
      )}
      {content.type === "iframe" && (
        <iframe
          src={generateVideoEmbedUrl(
            form.watch(`lessons.${lessonIndex}.contents.${index}.content`)
          )}
          className="w-full aspect-video "
        />
      )}
    </div>
  );
}
