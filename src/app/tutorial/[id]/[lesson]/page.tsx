import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";
import Link from "next/link";
import "./style.css";
import { Card, CardContent } from "@/components/ui/card";
import TutorialTimestamp from "./_components/tutorial-timestamp";
import TutorialDescription from "./_components/tutorial-description";
import TutorialInstructor from "./_components/tutorial-instructor";
import CourseSuggestions from "../../_components/course-suggestions";
import TutorialStats from "./_components/tutorial-stats";

export default function Page({
  params: { id, lesson }
}: {
  params: {
    id: string;
    lesson: string;
  };
}) {
  return (
    <main className="flex justify-center items-start pb-10 px-2">
      <section
        className={cn(
          "4xl:w-[1616px] 2xl:w-[1328px] xl:w-[1040px] lg:w-[843px] w-full",
          "grid gap-4"
        )}
      >
        <header
          className="z-30 flex md:h-10 pt-2 items-center gap-4 bg-background
  sm:static sm:h-auto sm:bg-transparent"
        >
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#">Tutorial</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#">Web Development</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbPage>
                <BreadcrumbLink asChild>
                  <Link href="#">HTML</Link>
                </BreadcrumbLink>
              </BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="tutorial-container">
          <div className="tutorial-preview">
            <div className="w-full aspect-video bg-red-600 rounded"></div>
          </div>
          <div className="tutorial-sidebar xl:min-w-[340px] 4xl:h-[692px] xl:h-[546px]">
            <Card className="w-full h-full overflow-y-auto scroller bg-card">
              <CardContent className="px-0 h-full pb-0">
                <TutorialTimestamp />
              </CardContent>
            </Card>
          </div>
          <div className="tutorial-description">
            <Card className="bg-card">
              <CardContent className="pt-4 space-y-10">
                <TutorialStats />
                <TutorialInstructor />
                <TutorialDescription />
              </CardContent>
            </Card>
          </div>
        </div>
        <CourseSuggestions />
      </section>
    </main>
  );
}
