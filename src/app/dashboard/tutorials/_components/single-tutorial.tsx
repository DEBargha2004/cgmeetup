import { cn } from "@/lib/utils";
import { useSingleTutorialContext } from "./single-tutorial-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVert } from "@mui/icons-material";
import { Input } from "@/components/ui/input";
import { RichTextEditor } from "@/components/custom/editor";
import LessonCreateButton from "./lesson-create-button";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import Image from "next/image";
import { generateVideoEmbedUrl } from "@/functions/url-format";
import { Dialog } from "@/components/ui/dialog";
import { ContentType, LessonContentSchemaType } from "@/schema/tutorial";
import { useFieldArray } from "react-hook-form";
import { v4 } from "uuid";
import ContentCreateButtonsGroup from "./content-create-buttons-group";
import Content from "./content";

export default function SingleTutorial() {
  const { form } = useSingleTutorialContext();
  const tutorial = form.watch("tutorial");
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "tutorial.contents"
  });

  const generateNewLessonContentInstance = (
    contentType: ContentType,
    data: string
  ): LessonContentSchemaType => {
    const id = v4();
    return {
      type: contentType,
      content_id: id,
      content: data
    };
  };

  const handleContentCreate = (contentType: ContentType, data: string) => {
    append(generateNewLessonContentInstance(contentType, data));
  };

  const removeContent = (index: number) => () => {
    remove(index);
  };

  const saveTutorial = () => {
    form.setValue("tutorial.saved", true);
  };
  const editTutorial = () => {
    form.setValue("tutorial.saved", false);
  };
  const deleteTutorial = () => {
    form.setValue("tutorial.saved", false);
    //@ts-ignore
    form.setValue("tutorial", null);
  };
  return (
    <div className="space-y-4 col-span-2">
      <section
        className={cn(
          "border rounded bg-lightAccent",
          "flex justify-start items-start"
        )}
      >
        <div className="w-full divide-y-2">
          <div className="p-2 pl-3">
            {tutorial?.saved ? (
              <div className="flex justify-between items-center">
                <h1 className="text-lg">{tutorial?.title}</h1>
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
                    <DropdownMenuItem onClick={editTutorial}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={deleteTutorial}>
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex justify-between items-center w-full">
                <Input
                  className="max-w-[350px]"
                  onClick={(e) => e.stopPropagation()}
                  {...form.register(`tutorial.title`)}
                />

                <div className="flex items-center gap-4">
                  <Button className="h-8" type="button" onClick={saveTutorial}>
                    Save
                  </Button>
                  <Button
                    variant={"destructive"}
                    className="h-8"
                    type="button"
                    onClick={deleteTutorial}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="border-b">
            {tutorial?.contents.map((content, index) => (
              <Content
                key={content.content_id}
                contentType={content.type}
                form={form}
                removeContent={removeContent(index)}
              />
            ))}
            <div className="p-2">
              <ContentCreateButtonsGroup actions={handleContentCreate} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
