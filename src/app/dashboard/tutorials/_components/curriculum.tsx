import {
  AddLinkOutlined,
  DragIndicator,
  ImageOutlined,
  PlayCircleOutline,
  Title
} from "@mui/icons-material";
import LessionCreateButton from "./lession-create-button";
import { cn } from "@/lib/utils";
import Lesson from "./lesson";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useFieldArray, useForm } from "react-hook-form";
import {
  CourseSchemaType,
  LessonsSchemaType,
  LessonType
} from "@/schema/tutorial";
import { Input } from "@/components/ui/input";
import { v4 } from "uuid";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger
} from "@/components/ui/dialog";
import { useState } from "react";
import LessonCreateButtonsGroup from "./lesson-create-buttons-group";

export default function Curriculum({
  form,
  chapters,
  lessons
}: {
  form: ReturnType<typeof useForm<CourseSchemaType>>;
  chapters: ReturnType<
    typeof useFieldArray<CourseSchemaType, "chapters", "id">
  >;
  lessons: ReturnType<typeof useFieldArray<CourseSchemaType, "lessons", "id">>;
}) {
  const getOriginalLessonIndex = (lessonId: string) => {
    return lessons.fields.findIndex((l) => l.lesson_id === lessonId);
  };

  const handleLessonDragStart =
    (sourceLessonId: string, sourceChapterId: string) =>
    (e: React.DragEvent<HTMLDivElement>) => {
      e.stopPropagation();

      e.dataTransfer.setData(
        "application/json",
        JSON.stringify({
          lessonId: sourceLessonId,
          chapterId: sourceChapterId
        })
      );
    };

  const handleLessonDrop =
    (destinationLessonId: string, destinationChapterId: string) =>
    (e: React.DragEvent<HTMLDivElement>) => {
      e.stopPropagation();

      const { lessonId, chapterId } = JSON.parse(
        e.dataTransfer.getData("application/json")
      );

      if (
        lessonId === destinationLessonId &&
        chapterId === destinationChapterId
      )
        return;

      const originalSourceLessonIndex = getOriginalLessonIndex(lessonId);

      const originalDestinationLessonIndex =
        getOriginalLessonIndex(destinationLessonId);

      if (destinationChapterId !== chapterId) {
        lessons.update(originalSourceLessonIndex, {
          ...lessons.fields[originalSourceLessonIndex],
          chapter_id: destinationChapterId
        });

        lessons.update(originalDestinationLessonIndex, {
          ...lessons.fields[originalDestinationLessonIndex],
          chapter_id: chapterId
        });
      }

      lessons.swap(originalSourceLessonIndex, originalDestinationLessonIndex);
    };

  const saveChapter =
    (chapterIndex: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      const chapter = form.getValues(`chapters.${chapterIndex}`);
      chapters.update(chapterIndex, {
        ...chapter,
        title: chapter.title,
        saved: true
      });
    };

  const removeChapter = (chapterIndex: number) => () => {
    chapters.remove(chapterIndex);
  };

  const getLessonsByChapterId = (chapterId: string) => {
    return lessons.fields.filter((lesson) => lesson.chapter_id === chapterId);
  };

  console.log(lessons.fields);

  return (
    <Accordion type="multiple" className="col-span-2">
      {chapters.fields.map((chapter, ch_index) => (
        <AccordionItem
          value={chapter.id}
          key={chapter.id}
          className="hover:bg-card border mb-3 transition-none"
        >
          <AccordionTrigger className="px-3 hover:no-underline bg-lightAccent hover:bg-lightAccent gap-2">
            {chapter.saved ? (
              <h1 className="text-white text-lg font-semibold line-clamp-1">
                {chapter.title}
              </h1>
            ) : (
              <div className="flex justify-between items-center w-full">
                <Input
                  className="max-w-[350px]"
                  onClick={(e) => e.stopPropagation()}
                  {...form.register(`chapters.${ch_index}.title`)}
                />

                <div className="flex items-center gap-4">
                  <Button
                    className="h-8"
                    type="button"
                    onClick={saveChapter(ch_index)}
                  >
                    Save
                  </Button>
                  <Button
                    variant={"destructive"}
                    className="h-8"
                    type="button"
                    onClick={removeChapter(ch_index)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </AccordionTrigger>
          <AccordionContent
            disableAnimation
            className={cn("bg-transparent flex flex-col gap-4 pb-0")}
          >
            <div>
              {getLessonsByChapterId(chapter.chapter_id).map(
                (lesson, index) => (
                  <div
                    className="p-3 border-b"
                    key={lesson.lesson_id}
                    draggable
                    onDragStart={handleLessonDragStart(
                      lesson.lesson_id,
                      lesson.chapter_id
                    )}
                    onDrop={handleLessonDrop(
                      lesson.lesson_id,
                      lesson.chapter_id
                    )}
                  >
                    <Lesson
                      form={form}
                      lessonId={lesson.lesson_id}
                      lessons={lessons}
                      chapterIndex={ch_index}
                      dragHandler={
                        <div className="relative bottom-0.5">
                          <DragIndicator />
                        </div>
                      }
                    />
                  </div>
                )
              )}
            </div>

            {chapter.saved ? (
              <LessonCreateButtonsGroup
                chapterId={chapter.chapter_id}
                lessons={lessons}
              />
            ) : null}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
