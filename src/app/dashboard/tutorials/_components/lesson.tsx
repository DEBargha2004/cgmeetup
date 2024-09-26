import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Delete, Done, MoreVert } from "@mui/icons-material";
import Content from "./content";
import React, { forwardRef, HTMLProps, useState } from "react";
import { useCurriculum } from "./curriculum-context";
import { DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const Lesson = forwardRef<
  HTMLDivElement,
  HTMLProps<HTMLDivElement> & {
    lessonId: string;
    dragHandler?: React.ReactNode;
  }
>(({ lessonId, dragHandler, className, ...props }, ref) => {
  const { form, lessons } = useCurriculum();
  const lessonIndex = lessons.fields.findIndex((l) => l.lesson_id === lessonId);
  const lesson = lessons.fields[lessonIndex];

  const saveLesson = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
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
    <div className={cn("flex justify-between items-center p-3", className)}>
      {lesson.saved ? (
        <>
          <div className="text-base flex justify-start items-center gap-2">
            {dragHandler}

            <span className="cursor-pointer hover:underline">
              {lesson.title}
            </span>
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
            placeholder="Lesson Name"
          />

          <div className="flex items-center gap-4">
            <Button
              className="h-7 w-7 p-0 rounded-full"
              type="button"
              onClick={saveLesson}
            >
              <Done fontSize="small" className="scale-75" />
            </Button>
            <Button
              variant={"destructive"}
              className="h-7 w-7 p-0 rounded-full"
              type="button"
              onClick={deleteLesson}
            >
              <Delete fontSize="small" className="scale-75" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
});

Lesson.displayName = "Lesson";

export default Lesson;
