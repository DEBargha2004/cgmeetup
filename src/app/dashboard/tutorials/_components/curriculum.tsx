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

  console.log(lessons.fields);

  return (
    <div className="space-y-2 col-span-2">
      {chapters.fields.map((chapter, ch_index) => (
        <React.Fragment key={chapter.id}>
          <section className="border rounded bg-lightAccent divide-y-2">
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
            {getLessonsByChapterId(chapter.chapter_id).map((lesson, index) => (
              <div
                className="p-3 border-b"
                key={lesson.lesson_id}
                draggable
                onDragStart={handleLessonDragStart(
                  lesson.lesson_id,
                  lesson.chapter_id
                )}
                onDrop={handleLessonDrop(lesson.lesson_id, lesson.chapter_id)}
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
                <div className="p-2">
                  <ContentCreateButtonsGroup
                    lessonId={lesson.lesson_id}
                    lessons={lessons}
                  />
                </div>
              </div>
            ))}
            <div className="p-2">
              <LessonCreateButton
                lessonsFieldArray={lessons}
                chapterId={chapter.chapter_id}
              >
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

{
  /* <Accordion type="multiple" className="col-span-2 space-y-3">
      {chapters.fields.map((chapter, ch_index) => (
        <React.Fragment key={chapter.id}>
          <AccordionItem
            value={chapter.id}
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
          {chapters.fields.length - 1 !== ch_index && (
            <div
              className={cn(
                "w-full opacity-0 hover:opacity-100",
                "grid place-content-center cursor-pointer relative"
              )}
            >
              <Separator className="absolute top-1/2 left-0 w-full" />
              <div className="flex justify-center items-center gap-2 z-30">
                <AddCircleOutline />
                <span>Add Chapter</span>
              </div>
            </div>
          )}
        </React.Fragment>
      ))}
</Accordion> */
}
