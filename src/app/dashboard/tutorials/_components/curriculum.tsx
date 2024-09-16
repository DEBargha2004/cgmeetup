import {
  Add,
  AddCircleOutline,
  DragIndicator,
  MoreVert
} from "@mui/icons-material";
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
import { CourseSchemaType } from "@/schema/tutorial";
import { Input } from "@/components/ui/input";
import React from "react";
import LessonCreateButtonsGroup from "./content-create-buttons-group";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import LessonCreateButton from "./lesson-create-button";
import ContentCreateButtonsGroup from "./content-create-buttons-group";
import { v4 } from "uuid";
import { useCurriculum } from "./curriculum-context";

export default function Curriculum() {
  const currentDraggingChapterId = React.useRef<string | null>(null);
  const currentDraggingLessonId = React.useRef<string | null>(null);
  const { chapters, form, lessons } = useCurriculum();

  const getOriginalLessonIndex = (lessonId: string) => {
    return lessons.fields.findIndex((l) => l.lesson_id === lessonId);
  };

  const handleLessonDragStart =
    (sourceLessonId: string) => (e: React.DragEvent<HTMLDivElement>) => {
      e.stopPropagation();

      currentDraggingLessonId.current = sourceLessonId;
    };

  const handleLessonDrop =
    (destinationLessonId: string, destinationChapterId: string) =>
    (e: React.DragEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentDraggingLessonId.current) return;
      const lessonId = currentDraggingLessonId.current;

      const chapterId = lessons.fields.find((l) => l.lesson_id === lessonId)
        ?.chapter_id as string;

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

  const editChapter = (chapterIndex: number) => () => {
    chapters.update(chapterIndex, {
      ...chapters.fields[chapterIndex],
      saved: false
    });
  };

  const getLessonsByChapterId = (chapterId: string) => {
    return lessons.fields.filter((lesson) => lesson.chapter_id === chapterId);
  };

  const addChapter = (index: number) => {
    chapters.insert(index, {
      chapter_id: v4(),
      title: "",
      img: "",
      saved: false
    });
  };

  const onChapterDragStart =
    (chapterId: string) => (e: React.DragEvent<HTMLDivElement>) => {
      e.dataTransfer.setData("text/plain", "");

      currentDraggingChapterId.current = chapterId;
    };

  const onChapterDrop =
    (chapterId: string) => (e: React.DragEvent<HTMLDivElement>) => {
      if (!currentDraggingChapterId.current) return;
      if (currentDraggingChapterId.current === chapterId) return;

      const originalSourceChapterIndex = chapters.fields.findIndex(
        (chapter) => chapter.chapter_id === currentDraggingChapterId.current
      );

      const originalDestinationChapterIndex = chapters.fields.findIndex(
        (chapter) => chapter.chapter_id === chapterId
      );

      chapters.swap(
        originalSourceChapterIndex,
        originalDestinationChapterIndex
      );
      currentDraggingChapterId.current = null;
    };

  return (
    <div className="space-y-4 col-span-2">
      {chapters.fields.map((chapter, ch_index) => (
        <React.Fragment key={chapter.id}>
          <section
            className={cn(
              "border rounded bg-lightAccent",
              "flex justify-start items-start"
            )}
            draggable
            onDragStart={onChapterDragStart(chapter.chapter_id)}
            onDrop={onChapterDrop(chapter.chapter_id)}
          >
            <div className="px-2 py-5 border-r self-stretch cursor-grab active:cursor-grabbing bg-card/60">
              <DragIndicator />
            </div>
            <div className="w-full divide-y-2">
              <div className="p-2 pl-3">
                {chapter.saved ? (
                  <div className="flex justify-between items-center">
                    <h1 className="text-lg">{chapter.title}</h1>
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
                        <DropdownMenuItem onClick={editChapter(ch_index)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={removeChapter(ch_index)}>
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
              </div>
              {getLessonsByChapterId(chapter.chapter_id).map(
                (lesson, index) => (
                  <div
                    className="border-b"
                    key={lesson.lesson_id}
                    draggable
                    onDragStart={handleLessonDragStart(lesson.lesson_id)}
                    onDrop={handleLessonDrop(
                      lesson.lesson_id,
                      lesson.chapter_id
                    )}
                  >
                    <Lesson
                      lessonId={lesson.lesson_id}
                      chapterIndex={ch_index}
                      dragHandler={
                        <div className="relative bottom-0.5 cursor-grab active:cursor-grabbing">
                          <DragIndicator />
                        </div>
                      }
                    />
                    <div className="p-2">
                      <ContentCreateButtonsGroup lessonId={lesson.lesson_id} />
                    </div>
                  </div>
                )
              )}
              <div className="p-2">
                <LessonCreateButton chapterId={chapter.chapter_id}>
                  <Button
                    type="button"
                    variant={"light_ghost"}
                    className="space-x-2 bg-transparent hover:bg-card/70"
                  >
                    <Add />
                    <span>Add Lesson</span>
                  </Button>
                </LessonCreateButton>
              </div>
            </div>
          </section>
          {chapters.fields.length - 1 !== ch_index && (
            <div
              className="flex justify-start items-center cursor-pointer opacity-0 hover:opacity-100"
              onClick={() => addChapter(ch_index + 1)}
            >
              <Add fontSize="small" className="mr-2" />
              <span className="whitespace-nowrap mr-2">Add Chapter</span>
              <Separator className="w-full shrink" />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
