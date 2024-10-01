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

  return (
    <div className="space-y-4 col-span-2 @container">
      {tutorial?.contents.map((content, index) => (
        <Content
          key={content.content_id}
          contentType={content.type}
          form={form}
          className=""
          removeContent={removeContent(index)}
          contentPath={`tutorial.contents.${index}.content`}
        />
      ))}

      <ContentCreateButtonsGroup
        actions={handleContentCreate}
        className="grid grid-cols-2 @xl:grid-cols-3 @4xl:grid-cols-4 gap-2 py-0"
      />
    </div>
  );
}
