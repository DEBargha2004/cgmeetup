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
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ContentType } from "@/schema/tutorial";
import { v4 } from "uuid";
import ContentCreateButtonsGroup from "./content-create-buttons-group";
import Content from "./content";

export default function SingleTutorial() {
  const { form } = useSingleTutorialContext();
  const tutorial = form.watch("tutorial");

  const handleContentCreate = (contentType: ContentType, data: string) => {
    const id = v4();
    form.setValue("tutorial.contents", [
      ...form.getValues("tutorial.contents"),
      { content_id: id, type: contentType, content: data }
    ]);
  };

  const removeContent = (index: number) => () => {
    form.setValue(
      "tutorial.contents",
      form.getValues("tutorial.contents").filter((_, i) => i !== index)
    );
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
        <div className="w-full">
          <Dialog>
            <div className="p-2 pl-3">
              {tutorial?.saved ? (
                <div className="flex justify-between items-center">
                  <DialogTrigger>
                    <h1 className="text-lg cursor-pointer hover:underline">
                      {tutorial?.title}
                    </h1>
                  </DialogTrigger>
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
                    <Button
                      className="h-8"
                      type="button"
                      onClick={saveTutorial}
                    >
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

            <DialogContent className="bg-card max-w-[1000px] max-h-[calc(100lvh-40px)] overflow-y-auto scroller">
              {tutorial?.contents.map((content, index) => (
                <Content
                  key={content.content_id}
                  contentType={content.type}
                  form={form}
                  className="p-3"
                  removeContent={removeContent(index)}
                  contentPath={`tutorial.contents.${index}.content`}
                />
              ))}
              <div className="p-3">
                <ContentCreateButtonsGroup actions={handleContentCreate} />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </section>
    </div>
  );
}
