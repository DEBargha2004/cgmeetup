"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { courseContent } from "@/constants/course-content";
import { cn } from "@/lib/utils";
import { Description, YouTube } from "@mui/icons-material";
import { format } from "date-fns";
import { HTMLProps, useMemo, useState } from "react";
import ContentSectionHeader from "./content-section-header";

const formatTimeFromMinutes = (duration: number) => {
  const hours = Math.floor(duration / 60);
  const minutes = Math.floor(duration % 60);

  if (hours === 0) {
    return `${minutes} min`;
  } else if (minutes === 0) {
    return `${hours} hr`;
  } else {
    return `${hours} hr ${minutes} min`;
  }
};

export default function ContentTimestamps({
  className,
  ...props
}: HTMLProps<HTMLDivElement>) {
  const [activeAccordion, setActiveAccordion] = useState<string[]>([
    courseContent[0].title
  ]);
  const [isExpanded, setIsExpanded] = useState(false);

  const courseLectures = useMemo(() => {
    return courseContent.reduce((acc, course) => {
      const videoSections = course.sections.filter((c) => c.is_video);
      return acc + (videoSections?.length ?? 0);
    }, 0);
  }, []);
  const courseDurationInMinutes = useMemo(() => {
    return courseContent.reduce((acc, course) => {
      return acc + (course.gross_duration_in_minutes ?? 0);
    }, 0);
  }, []);
  const handleExpandAccordion = () => {
    setActiveAccordion(courseContent.map((c) => c.title));
    setIsExpanded(true);
  };
  const handleCollapseAccordion = () => {
    setActiveAccordion([]);
    setIsExpanded(false);
  };
  return (
    <section className={cn("space-y-5", className)} {...props}>
      <ContentSectionHeader>Course content</ContentSectionHeader>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <p className="space-x-1 md:[&>span]:text-sm [&>span]:text-xs [&>span]:opacity-70">
            <span>{courseContent.length} sections</span>
            <span>•</span>
            <span>
              {courseLectures}
              {courseLectures > 1 ? " lectures" : " lecture"}
            </span>
            <span>•</span>
            <span>
              {formatTimeFromMinutes(courseDurationInMinutes)} total length
            </span>
          </p>
          <p
            className="text-primary cursor-pointer sm:block hidden"
            onClick={
              isExpanded ? handleCollapseAccordion : handleExpandAccordion
            }
          >
            {isExpanded ? "Collapse" : "Expand"} all sections
          </p>
        </div>
        <Accordion
          type="multiple"
          className="border"
          value={activeAccordion}
          onValueChange={setActiveAccordion}
        >
          {courseContent.map((course, course_idx) => (
            <AccordionItem key={course_idx} value={course.title}>
              <AccordionTrigger
                className={cn(
                  "p-4 bg-lightAccent hover:no-underline",
                  "flex justify-between items-center gap-2"
                )}
              >
                <h1 className="w-full text-left md:text-lg text-base line-clamp-1">
                  {course.title}
                </h1>
                <div
                  className={cn(
                    "flex items-center gap-1 justify-start shrink-0",
                    "md:[&>span]:text-sm [&>span]:text-xs [&>span]:opacity-70"
                  )}
                >
                  <span>{course.sections.length} lectures</span>
                  <span>⋅</span>
                  <span>
                    {formatTimeFromMinutes(course.gross_duration_in_minutes)}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <Table>
                  <TableBody>
                    {course.sections.map((section, section_idx) => (
                      <TableRow
                        key={section.title}
                        className="hover:bg-transparent"
                      >
                        <TableCell className="w-fit pr-1 [&>svg]:text-base">
                          {section.is_video ? <YouTube /> : <Description />}
                        </TableCell>
                        <TableCell className="w-full pr-0">
                          <h1
                            className={cn(
                              "md:text-base text-sm cursor-pointer w-fit",
                              "hover:underline hover:text-primary"
                            )}
                          >
                            {section.title}
                          </h1>
                        </TableCell>
                        <TableCell>
                          {section.is_preview_available ? (
                            <p
                              className={cn(
                                "md:text-base text-sm cursor-pointer w-fit",
                                "hover:underline hover:text-primary"
                              )}
                            >
                              Preview
                            </p>
                          ) : null}
                        </TableCell>
                        <TableCell className="opacity-70 ">
                          {format(section.lecture_duration_in_minutes, "hh:mm")}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
