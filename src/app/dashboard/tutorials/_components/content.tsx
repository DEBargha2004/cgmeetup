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
import { cn } from "@/lib/utils";
import { CourseSchemaType, LessonContentSchemaType } from "@/schema/tutorial";
import { MoreVert } from "@mui/icons-material";
import Image from "next/image";
import { HTMLProps } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

export default function Content({
  contentType,
  form,
  className,
  removeContent,
  contentPath,
  ...props
}: Omit<HTMLProps<HTMLDivElement>, "content" | "form"> & {
  form: ReturnType<typeof useForm<CourseSchemaType>>;
  contentType: LessonContentSchemaType["type"];
  removeContent: () => void;
  contentPath?: string;
}) {
  return (
    <div className={cn("space-y-2", className)} {...props}>
      <div className="flex justify-between items-center">
        <p>Content</p>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button
              type="button"
              variant={"ghost"}
              className="h-8 w-8 rounded-full hover:bg-card/70"
            >
              <MoreVert />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={removeContent}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {contentType === "text" && (
        <FormField
          control={form.control}
          // @ts-ignore
          name={contentPath}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RichTextEditor
                  // @ts-ignore
                  content={field.value}
                  onUpdate={field.onChange}
                  editorWrapperClassName="border"
                />
              </FormControl>
            </FormItem>
          )}
        />
      )}
      {contentType === "video" && (
        <video
          controls
          //@ts-ignore
          src={form.watch(contentPath)}
        />
      )}
      {contentType === "image" && (
        <Image
          //@ts-ignore
          src={form.watch(contentPath)}
          height={300}
          width={300}
          className="w-full aspect-video object-contain "
          alt="course-image"
        />
      )}
      {contentType === "iframe" && (
        <iframe
          src={generateVideoEmbedUrl(
            //@ts-ignore
            form.watch(contentPath)
          )}
          className="w-full aspect-video "
        />
      )}
    </div>
  );
}
