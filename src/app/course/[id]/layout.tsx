import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";
import ContentTimestamps from "../_components/content-timestamps";
import CourseCard from "../_components/course-card";
import CourseHeader from "../_components/course-header";
import CourseSyllabus from "../_components/course-syllabus";
import ContentSectionHeader from "../_components/content-section-header";
import CourseRequirements from "../_components/course-requirements";
import CourseFeatures from "../_components/course-features";
import CourseDescription from "../_components/course-description";
import InstructorInfo from "../_components/instructor-info";
import { TutorialsCard } from "@/components/custom/tutorials-list-container";
import CourseSuggestions from "../_components/course-suggestions";

const related_topics = ["Web Development", "Frontend", "HTML"];

const containerClass = "2xl:w-[1400px] xl:w-[1200px] ";

const requirements = [
  "Students will require an internet connection and PC or MAC Computer System.",
  "Please note that all required downloads are free.",
  "Text Editor such as Text Wrangler (MAC) or Notepad++ (Windows)",
  "FileZilla FTP Client (Downloaded in Section 9).",
  "PuTTY and PuTTY Key GEN for Windows users (Downloaded in Section 8).",
  "WAMP Server for Windows Users and MAMP Server for MAC Users (Downloaded in Section 7).",
  "Tight VNC Viewer for Windows Users and RealVNC Viewer for MAC Users (Downloaded in Section 8)."
];

export default function Layout({
  children,
  params: { id }
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  return (
    <div>
      <header
        className={cn(
          "bg-zinc-700",
          "flex justify-center items-start py-8",
          "h-[460px]"
        )}
      >
        <div
          className={cn(
            containerClass,
            "h-full",
            "flex justify-between items-start gap-2"
          )}
        >
          <div
            className={cn(
              "w-3/5 flex flex-col justify-start items-start gap-6 shrink-0"
            )}
          >
            <CourseHeader />
          </div>
          <div className="w-full flex items-start justify-center">
            <CourseCard />
          </div>
        </div>
      </header>
      <main className={cn(containerClass, "mx-auto")}>
        <div className="w-3/5 py-10 space-y-10">
          <div className="space-y-5">
            <ContentSectionHeader>Explore related topics</ContentSectionHeader>
            <div className="flex justify-start items-center gap-3">
              {related_topics.map((topic, i) => (
                <Link href={""} key={i}>
                  <Badge
                    className={cn(
                      "px-5 h-14",
                      "text-lg font-normal rounded-full hover:bg-lightAccent/60"
                    )}
                  >
                    {topic}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
          <CourseSyllabus />
          <CourseFeatures />
          <ContentTimestamps />
          <CourseRequirements requirements={requirements} />
          <CourseDescription />
          <InstructorInfo />
          <CourseSuggestions />
          {children}
        </div>
      </main>
    </div>
  );
}
