"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCurrentEditor } from "@tiptap/react";
import { forwardRef, HTMLProps, useEffect, useState } from "react";
import MaterialSymbolIcon from "../material-symbol-icon";
import { Level } from "@tiptap/extension-heading";
import { Separator } from "@/components/ui/separator";
import "./styles.css";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { urlSchema, UrlSchemaType } from "@/schema/url";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDropzone } from "react-dropzone";
import {
  ArrowDropDown,
  FormatAlignCenter,
  FormatAlignJustify,
  FormatAlignLeft,
  FormatAlignRight,
  FormatBold,
  FormatItalic,
  FormatListBulleted,
  FormatListNumbered,
  FormatStrikethrough,
  FormatUnderlined,
  Subscript,
  Superscript,
  Image as ImageIcon,
  Videocam
} from "@mui/icons-material";
import { IconType } from "@/types/icon";

type TextType = { element: JSX.Element; level: number; label: string };
export default function EditorMenuBar() {
  const { editor } = useCurrentEditor();
  const urlForm = useForm<UrlSchemaType>({
    resolver: zodResolver(urlSchema)
  });
  const imageUploader = useDropzone({
    multiple: false,
    accept: {
      "image/*": []
    }
  });

  const videoUploader = useDropzone({
    multiple: false,
    accept: {
      "video/*": []
    }
  });

  const [selectedColor, setSelectedColor] = useState({
    highlight: "red"
  });

  const changeTextType = (level: number) => {
    if (level === 0) {
      editor?.chain().focus().setParagraph().run();
    } else {
      editor
        ?.chain()
        .focus()
        .setHeading({ level: level as Level })
        .run();
    }
  };
  const currentTextType = (() => {
    if (!editor) return null;

    if (editor.isActive("paragraph")) return 0;

    return textTypes.find((type) =>
      editor.isActive("heading", { level: type.level })
    )?.level;
  })();

  const handleUrlSubmit = (data: UrlSchemaType) => {
    editor?.chain().focus().setImage({ src: data.url }).run();
    urlForm.reset({ url: "" });
  };
  const handleVideoUrlSubmit = (data: UrlSchemaType) => {
    console.log(data);
    editor?.chain().focus().setYoutubeVideo({ src: data.url }).run();
    urlForm.reset({ url: "" });
  };

  // useEffect(() => {
  //   if (!editor) return;

  //   if (imageUploader.acceptedFiles.length) {
  //     const reader = new FileReader();

  //     reader.readAsDataURL(imageUploader.acceptedFiles[0]);

  //     reader.onloadend = () => {
  //       editor
  //         .chain()
  //         .focus()
  //         .setImage({ src: reader.result as string })
  //         .run();
  //     };
  //   }
  // }, [editor, imageUploader.acceptedFiles]);

  // useEffect(() => {
  //   if (!editor) return;

  //   if (videoUploader.acceptedFiles.length) {
  //     const reader = new FileReader();

  //     reader.readAsDataURL(videoUploader.acceptedFiles[0]);

  //     reader.onloadend = () => {
  //       editor
  //         .chain()
  //         .focus()
  //         .setVideo({ src: reader.result as string })
  //         .run();
  //     };
  //   }
  // }, [editor, videoUploader.acceptedFiles]);

  if (!editor) return null;

  return (
    <div className="flex flex-wrap gap-1 border-b p-2">
      <>
        <DropdownMenu>
          <DropdownMenuTrigger className="w-1/6 min-w-[120px] bg-transparent">
            <div className="w-full flex justify-between items-center border p-2 rounded hover:bg-lightAccent transition-all">
              <p className="text-sm flex justify-start">
                {
                  textTypes.find((type) => type.level === currentTextType)
                    ?.label
                }
              </p>
              <ArrowDropDown className="h-[14px]" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {textTypes.slice(0, 1).map((type) => (
              <DropdownMenuItem
                key={type.level}
                onClick={() => changeTextType(type.level)}
              >
                {type.element}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            {textTypes.slice(1).map((type) => (
              <DropdownMenuItem
                key={type.level}
                onClick={() => changeTextType(type.level)}
              >
                {type.element}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </>
      <Separator orientation="vertical" className="h-10" />
      <>
        <Button
          variant={editor.isActive("bold") ? "secondary" : "light_ghost"}
          disabled={!editor.can().toggleBold()}
          onClick={() => editor.chain().focus().toggleBold().run()}
          size={"icon"}
          type="button"
        >
          <FormatBold />
        </Button>
        <Button
          variant={editor.isActive("italic") ? "secondary" : "light_ghost"}
          disabled={!editor.can().toggleItalic()}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          size={"icon"}
          type="button"
        >
          <FormatItalic />
        </Button>
        <Button
          variant={editor.isActive("underline") ? "secondary" : "light_ghost"}
          disabled={!editor.can().toggleUnderline()}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          size={"icon"}
          type="button"
        >
          <FormatUnderlined />
        </Button>
        <Button
          variant={editor.isActive("strike") ? "secondary" : "light_ghost"}
          disabled={!editor.can().toggleStrike()}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          size={"icon"}
          type="button"
        >
          <FormatStrikethrough />
        </Button>
        <Button
          variant={editor.isActive("subscript") ? "secondary" : "light_ghost"}
          disabled={!editor.can().toggleSubscript()}
          onClick={() => editor.chain().focus().toggleSubscript().run()}
          size={"icon"}
          type="button"
        >
          <Subscript />
        </Button>
        <Button
          variant={editor.isActive("superscript") ? "secondary" : "light_ghost"}
          disabled={!editor.can().toggleSuperscript()}
          onClick={() => editor.chain().focus().toggleSuperscript().run()}
          size={"icon"}
          type="button"
        >
          <Superscript />
        </Button>
      </>
      <Separator orientation="vertical" className="h-10" />
      <>
        <div className="h-10 flex justify-start items-center gap-1">
          <Button
            className="relative"
            variant={editor.isActive("highlight") ? "secondary" : "light_ghost"}
            size={"icon"}
            type="button"
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleHighlight({
                  color: selectedColor.highlight || "#0fffff"
                })
                .run()
            }
            disabled={!editor.can().toggleHighlight()}
          >
            <MaterialSymbolIcon className="text-base">
              ink_highlighter
            </MaterialSymbolIcon>
            <div
              style={{ backgroundColor: selectedColor.highlight }}
              className="absolute bottom-2 left-1/2 -translate-x-1/2 h-[2px] w-3/5"
            />
          </Button>

          <Popover>
            <PopoverTrigger asChild>
              <div className="h-10 p-[1px] hover:bg-lightAccent grid place-content-center cursor-pointer rounded">
                <ArrowDropDown />
              </div>
            </PopoverTrigger>
            <PopoverContent className="bg-darkAccent p-1 grid gap-2 w-[240px]">
              <div className="grid grid-cols-10 gap-1">
                {color_hex.map((color, idx) => (
                  <div
                    className={cn(
                      "w-full aspect-square rounded-[2px] cursor-pointer hover:opacity-80",
                      selectedColor.highlight === color
                        ? "ring-2 ring-primary"
                        : ""
                    )}
                    style={{ backgroundColor: color }}
                    key={idx}
                    onClick={() =>
                      setSelectedColor((prev) => ({
                        ...prev,
                        highlight: color
                      }))
                    }
                  />
                ))}
              </div>

              <div className="flex justify-between items-center relative">
                <label
                  htmlFor="color-picker"
                  className="w-full hover:bg-lightAccent p-2 rounded cursor-pointer text-sm"
                >
                  <p>More Colors</p>
                </label>
                <Input
                  type="color"
                  id="color-picker"
                  className="w-1/4 absolute left-0 opacity-0"
                  onChange={(e) =>
                    setSelectedColor((prev) => ({
                      ...prev,
                      highlight: e.target.value
                    }))
                  }
                />
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <Button
          variant={editor.isActive("bulletList") ? "secondary" : "light_ghost"}
          size={"icon"}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          disabled={!editor.can().toggleBulletList()}
          type="button"
        >
          <FormatListBulleted />
        </Button>
        <Button
          variant={editor.isActive("orderedList") ? "secondary" : "light_ghost"}
          size={"icon"}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          disabled={!editor.can().toggleOrderedList()}
          type="button"
        >
          <FormatListNumbered />
        </Button>
      </>
      <Separator orientation="vertical" className="h-10" />
      <>
        <Popover>
          <PopoverTrigger asChild>
            <Button size={"icon"} variant={"light_ghost"} type="button">
              <FormatAlignJustify />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            side="bottom"
            className="p-1 max-w-fit gap-1 bg-darkAccent"
          >
            <div className="flex justify-between items-baseline gap-1">
              {justifyTypes.map((type) => (
                <Button
                  key={type.value}
                  size={"icon"}
                  disabled={!editor.can().setTextAlign(type.value)}
                  variant={
                    editor.isActive({ textAlign: type.value })
                      ? "secondary"
                      : "light_ghost"
                  }
                  onClick={() =>
                    editor.chain().focus().setTextAlign(type.value).run()
                  }
                  type="button"
                >
                  <type.Icon />
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </>
    </div>
  );
}

const textTypes: TextType[] = [
  {
    element: <p>Paragraph</p>,
    level: 0,
    label: "Paragraph"
  },
  {
    element: <h1>Heading 1</h1>,
    level: 1,
    label: "Heading 1"
  },
  {
    element: <h2>Heading 2</h2>,
    level: 2,
    label: "Heading 2"
  },
  {
    element: <h3>Heading 3</h3>,
    level: 3,
    label: "Heading 3"
  },
  {
    element: <h4>Heading 4</h4>,
    level: 4,
    label: "Heading 4"
  },
  {
    element: <h5>Heading 5</h5>,
    level: 5,
    label: "Heading 5"
  },
  {
    element: <h6>Heading 6</h6>,
    level: 6,
    label: "Heading 6"
  }
];

// const fontSizes = [
//   "Default",
//   8,
//   10,
//   12,
//   14,
//   16,
//   18,
//   20,
//   24,
//   30,
//   36,
//   48,
//   60,
//   72,
//   96
// ];

const justifyTypes: { Icon: IconType; value: string }[] = [
  { Icon: FormatAlignLeft, value: "left" },
  { Icon: FormatAlignCenter, value: "center" },
  { Icon: FormatAlignRight, value: "right" },
  { Icon: FormatAlignJustify, value: "justify" }
];

const color_hex = [
  "#000000",
  "#FFFFFF",
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFFF00",
  "#FF00FF",
  "#00FFFF",
  "#808080",
  "#800000",
  "#808000",
  "#800080",
  "#008000",
  "#8000FF"
];
