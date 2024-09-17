import { RichTextEditor } from "@/components/custom/editor";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { generateVideoEmbedUrl } from "@/functions/url-format";
import { CourseSchemaType } from "@/schema/tutorial";
import { DragIndicator, MoreVert } from "@mui/icons-material";
import Image from "next/image";
import { useFieldArray, useForm } from "react-hook-form";
import Content from "./content";
import React, { HTMLProps, useState } from "react";
import { useCurriculum } from "./curriculum-context";
import ContentCreateButtonsGroup from "./content-create-buttons-group";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

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
    <>
      <section className="divide-y-2">
        <div className="p-3">
          <AccordionTrigger hideChevron className="hover:no-underline">
            {lesson.saved ? (
              <div className="flex justify-between items-center w-full">
                <p className="text-base flex justify-start items-center gap-2">
                  {dragHandler}
                  <span>{lesson.title}</span>
                </p>
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
                    <DropdownMenuItem onClick={editLesson}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={deleteLesson}>
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
          </AccordionTrigger>
        </div>

        <AccordionContent>
          {lesson.contents.map((content, index) => (
            <Content
              key={content.content_id}
              content={content}
              form={form}
              index={index}
              lessonIndex={lessonIndex}
              lessons={lessons}
              className="p-3"
            />
          ))}

          <ContentCreateButtonsGroup lessonId={lesson.lesson_id} />
        </AccordionContent>
      </section>
    </>
  );
}

export function Lessons({ chapterId }: { chapterId: string }) {
  const [accordionValues, setAccordionValues] = useState<string[]>([]);
  const currentDraggingLessonId = React.useRef<string | null>(null);
  const { lessons } = useCurriculum();

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
  const getLessonsByChapterId = (chapterId: string) => {
    return lessons.fields.filter((lesson) => lesson.chapter_id === chapterId);
  };

  console.log({ accordionValues });
  return (
    <Accordion
      type="multiple"
      value={accordionValues}
      onValueChange={setAccordionValues}
    >
      {getLessonsByChapterId(chapterId).map((lesson, index) => (
        <AccordionItem
          value={lesson.id}
          className="border-b"
          key={lesson.lesson_id}
          draggable
          onDragStart={handleLessonDragStart(lesson.lesson_id)}
          onDrop={handleLessonDrop(lesson.lesson_id, lesson.chapter_id)}
        >
          <Lesson
            lessonId={lesson.lesson_id}
            dragHandler={
              <div className="relative bottom-0.5 cursor-grab active:cursor-grabbing">
                <DragIndicator />
              </div>
            }
          />
        </AccordionItem>
      ))}
    </Accordion>
  );
}
