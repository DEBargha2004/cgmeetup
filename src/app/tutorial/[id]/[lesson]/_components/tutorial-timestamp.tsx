import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { courseContent } from "@/constants/course-content";
import { formatTimeFromMinutes } from "@/functions/format-time-from-minutes";
import coverImage from "@/../public/images/cover-image.jpg";
import Image from "next/image";

export default function TutorialTimestamp() {
  return (
    <Accordion type="multiple">
      {courseContent.map((lession, lession_idx) => (
        <AccordionItem
          key={lession_idx}
          value={lession.title}
          className="hover:bg-transparent last:border-none"
        >
          <AccordionTrigger className="px-3 hover:no-underline">
            <div className="w-full grid grid-cols-[auto_1fr] gap-3">
              <div className="h-14 aspect-video rounded overflow-hidden">
                <Image
                  src={coverImage}
                  alt="cover"
                  height={200}
                  width={200}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-start gap-2">
                  <h4 className="text-sm opacity-80">PART {lession_idx + 1}</h4>
                  <span>-</span>
                  <p className="text-xs opacity-70">
                    {formatTimeFromMinutes(lession.gross_duration_in_minutes)}
                  </p>
                </div>
                <div className="text-left">
                  <h2 className="text-base font-semibold">{lession.title}</h2>
                </div>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-0">
            <Table>
              <TableBody className="[&_tr:last-child]:border-l-4">
                {lession.sections.map((section, section_idx) => (
                  <TableRow
                    key={section_idx}
                    className="border-l-4 border-l-primary"
                  >
                    <TableCell>{section.title}</TableCell>
                    <TableCell className="text-right">
                      {formatTimeFromMinutes(
                        section.lecture_duration_in_minutes
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
