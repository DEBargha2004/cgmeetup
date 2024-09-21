import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { MoreVert } from "@mui/icons-material";
import Content from "./content";
import React, { HTMLProps, useState } from "react";
import { useCurriculum } from "./curriculum-context";
import { DialogTrigger } from "@/components/ui/dialog";

export default function Lesson({
  lessonId,
  dragHandler
}: HTMLProps<HTMLDivElement> & {
  lessonId: string;
  dragHandler?: React.ReactNode;
}) {
  const { form, lessons } = useCurriculum();
  const lessonIndex = lessons.fields.findIndex((l) => l.lesson_id === lessonId);
  const lesson = lessons.fields[lessonIndex];

  const saveLesson = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const lessonData = form.getValues(`lessons.${lessonIndex}`);
    lessons.update(lessonIndex, { ...lessonData, saved: true });
  };

  const deleteLesson = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    lessons.remove(lessonIndex);
  };

  const editLesson = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    const lessonData = form.getValues(`lessons.${lessonIndex}`);
    lessons.update(lessonIndex, { ...lessonData, saved: false });
  };

  return (
    <div className="flex justify-between items-center p-3">
      {lesson.saved ? (
        <>
          <div className="text-base flex justify-start items-center gap-2">
            {dragHandler}
            <DialogTrigger asChild>
              <span className="cursor-pointer hover:underline">
                {lesson.title}
              </span>
            </DialogTrigger>
          </div>
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
              <DropdownMenuItem onClick={deleteLesson}>Delete</DropdownMenuItem>
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
  );
}
