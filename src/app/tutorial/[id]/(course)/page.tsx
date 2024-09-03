import CourseRating from "../../_components/course-rating";

export default function CoursePage({
  params: { id }
}: {
  params: { id: string };
}) {
  return <CourseRating />;
}
