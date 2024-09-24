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
import {
  ContentType,
  CourseSchemaType,
  LessonContentSchemaType
} from "@/schema/tutorial";
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
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Content from "./content";

export default function Curriculum() {
  const currentDraggingChapterId = React.useRef<string | null>(null);
  const currentDraggingLessonId = React.useRef<string | null>(null);
  const { chapters, form, lessons } = useCurriculum();

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

  const getOriginalLessonIndex = (lessonId: string) => {
    return lessons.fields.findIndex((lesson) => lesson.lesson_id === lessonId);
  };

  const handleContentCreate =
    (lessonId: string) => (contentType: ContentType, data: string) => {
      const id = v4();
      const lessonIndex = getOriginalLessonIndex(lessonId);
      const lessonInfo = form.getValues("lessons")[lessonIndex];

      lessons.update(lessonIndex, {
        ...lessonInfo,
        contents: [
          ...lessonInfo.contents,
          { content_id: id, type: contentType, content: data }
        ]
      });
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

  const removeContent = (contentId: string) => () => {};

  const handleLessonDragStart =
    (lessonId: string) => (e: React.DragEvent<HTMLDivElement>) => {
      e.dataTransfer.setData("text/plain", "");
      e.stopPropagation();
      currentDraggingLessonId.current = lessonId;
    };

  const handleLessonDrop =
    (lessonId: string) => (e: React.DragEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if (!currentDraggingLessonId.current) return;

      const draggingLesson = lessons.fields.find(
        (l) => l.lesson_id === currentDraggingLessonId.current
      )!;
      const droppedLesson = lessons.fields.find(
        (l) => l.lesson_id === lessonId
      )!;

      const originalSourceLessonIndex = lessons.fields.findIndex(
        (l) => l.lesson_id === currentDraggingLessonId.current
      );
      const originalDestinationLessonIndex = lessons.fields.findIndex(
        (l) => l.lesson_id === lessonId
      );
      if (draggingLesson?.chapter_id === droppedLesson?.chapter_id) {
        lessons.swap(originalSourceLessonIndex, originalDestinationLessonIndex);
      } else {
        lessons.update(originalSourceLessonIndex, {
          ...lessons.fields[originalSourceLessonIndex],
          chapter_id: droppedLesson.chapter_id
        });

        lessons.update(originalDestinationLessonIndex, {
          ...lessons.fields[originalDestinationLessonIndex],
          chapter_id: draggingLesson.chapter_id
        });
      }
      currentDraggingLessonId.current = null;
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
            onDragOver={(e) => e.preventDefault()}
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
                (lesson, lessonIndex) => (
                  <Dialog key={lesson.lesson_id}>
                    <div
                      className="border-b"
                      draggable
                      onDrag={handleLessonDragStart(lesson.lesson_id)}
                      onDrop={handleLessonDrop(lesson.lesson_id)}
                      onDragOver={(e) => e.preventDefault()}
                    >
                      <Lesson
                        lessonId={lesson.lesson_id}
                        dragHandler={
                          <div className="relative bottom-0.5 cursor-grab active:cursor-grabbing">
                            <DragIndicator />
                          </div>
                        }
                      />
                      <DialogContent className="bg-card max-w-[1000px] max-h-[calc(100lvh-40px)] overflow-y-auto scroller">
                        {lesson.contents.map((content, index) => (
                          <Content
                            key={content.content_id}
                            form={form}
                            contentType={content.type}
                            className="p-3"
                            removeContent={removeContent(content.content_id)}
                            contentPath={`lessons.${getOriginalLessonIndex(lesson.lesson_id)}.contents.${index}.content`}
                          />
                        ))}
                        <div className="p-2">
                          <ContentCreateButtonsGroup
                            actions={handleContentCreate(lesson.lesson_id)}
                            className="grid grid-cols-4 gap-2 p-2"
                          />
                        </div>
                      </DialogContent>
                    </div>
                  </Dialog>
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
              <span className="whitespace-nowrap mr-2">Add Section</span>
              <Separator className="w-full shrink" />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
