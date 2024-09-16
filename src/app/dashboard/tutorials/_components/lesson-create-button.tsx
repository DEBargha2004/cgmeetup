import { CourseSchemaType, LessonsSchemaType } from "@/schema/tutorial";
import { useFieldArray } from "react-hook-form";
import { v4 } from "uuid";

export default function LessonCreateButton({
  lessonsFieldArray,
  chapterId,
  children
}: {
  lessonsFieldArray: ReturnType<
    typeof useFieldArray<CourseSchemaType, "lessons", "id">
  >;
  chapterId: string;
  children?: React.ReactNode;
}) {
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
    lessonsFieldArray.append(generateNewLessonInstance(chapterId));
  };

  return <div onClick={() => createLesson(chapterId)}>{children}</div>;
}
