import { LessonsSchemaType } from "@/schema/tutorial";
import { v4 } from "uuid";
import { useCurriculum } from "./curriculum-context";

export default function LessonCreateButton({
  chapterId,
  children,
  openAccordion
}: {
  chapterId: string;
  children?: React.ReactNode;
  openAccordion?: (lessonIds: string[]) => void;
}) {
  const { lessons } = useCurriculum();
  const generateNewLessonInstance = (
    chapterId: string,
    lessonId?: string
  ): LessonsSchemaType => {
    return {
      chapter_id: chapterId,
      lesson_id: lessonId || v4(),
      title: "",
      contents: [],
      saved: false,
      is_free: false
    };
  };

  const createLesson = (chapterId: string) => {
    const lessonId = v4();
    lessons.append(generateNewLessonInstance(chapterId, lessonId));
    openAccordion?.([lessonId]);
  };

  return <div onClick={() => createLesson(chapterId)}>{children}</div>;
}
