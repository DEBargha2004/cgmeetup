import { CourseSchemaType, LessonsSchemaType } from "@/schema/tutorial";
import { useFieldArray } from "react-hook-form";
import { v4 } from "uuid";
import { useCurriculum } from "./curriculum-context";

export default function LessonCreateButton({
  chapterId,
  children
}: {
  chapterId: string;
  children?: React.ReactNode;
}) {
  const { lessons } = useCurriculum();
  const generateNewLessonInstance = (
    chapterId: string
  ): LessonsSchemaType[number] => {
    return {
      chapter_id: chapterId,
      lesson_id: v4(),
      title: "",
      contents: [],
      saved: false,
      is_free: false
    };
  };

  const createLesson = (chapterId: string) => {
    lessons.append(generateNewLessonInstance(chapterId));
  };

  return <div onClick={() => createLesson(chapterId)}>{children}</div>;
}
