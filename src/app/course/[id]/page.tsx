import { AddFriend, ProfileInfoOverView } from "@/components/custom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  AddShoppingCart,
  Info,
  Language,
  Subtitles
} from "@mui/icons-material";
import Link from "next/link";
import ContentSectionHeader from "../_components/content-section-header";
import TutorialStats from "../_components/tutorial-stats";
import { Badge } from "@/components/ui/badge";
import CourseSyllabus from "../_components/course-syllabus";
import CourseFeatures from "../_components/course-features";
import ContentTimestamps from "../_components/content-timestamps";
import CourseRequirements from "../_components/course-requirements";
import CourseDescription from "../_components/course-description";
import InstructorInfo from "../_components/instructor-info";
import CourseRating from "../_components/course-rating";
import CourseSuggestions from "../_components/course-suggestions";
import "./style.css";

const related_topics = ["Web Development", "Frontend", "HTML"];
const requirements = [
  "Students will require an internet connection and PC or MAC Computer System.",
  "Please note that all required downloads are free.",
  "Text Editor such as Text Wrangler (MAC) or Notepad++ (Windows)",
  "FileZilla FTP Client (Downloaded in Section 9).",
  "PuTTY and PuTTY Key GEN for Windows users (Downloaded in Section 8).",
  "WAMP Server for Windows Users and MAMP Server for MAC Users (Downloaded in Section 7).",
  "Tight VNC Viewer for Windows Users and RealVNC Viewer for MAC Users (Downloaded in Section 8)."
];

export default function CoursePage({
  params: { id }
}: {
  params: { id: string };
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
                  <Link href="#">Tutorials</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#">Web Development</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div>
          <h1 className="text-2xl">Web Development Masterclass</h1>
        </div>
        <div className="w-full tutorial-container h-fit ">
          <div
            className={cn(
              "tutorial-preview",
              "space-y-4 w-full aspect-video bg-red-600 rounded"
            )}
          ></div>
          <div className={cn("w-full tutorial-sidebar", " md:min-w-[340px]")}>
            <div className="space-y-4 xl:sticky top-2">
              <Card className="bg-card">
                <CardHeader className="flex flex-row justify-between items-center w-full space-y-0">
                  <CardTitle className="text-2xl">$45.00</CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  <Button className="w-full py-6">
                    <AddShoppingCart /> Add to Cart
                  </Button>
                </CardContent>
              </Card>
              <Card className="bg-card">
                <CardContent className="pt-4">
                  <ProfileInfoOverView>
                    <AddFriend
                      isFriend={false}
                      className="h-8 w-8 cursor-pointer"
                    />
                  </ProfileInfoOverView>
                </CardContent>
              </Card>
              <Card className="bg-card">
                <CardContent className="pt-4">
                  <div className="flex flex-col justify-start items-start gap-2 [&>span]:text-base">
                    <div className="flex justify-start items-center gap-2">
                      <Info fontSize="small" />
                      <span>Last updated 9/2022</span>
                    </div>
                    <div className="flex justify-start items-center gap-2">
                      <Language fontSize="small" />
                      <span>English</span>
                    </div>
                    <div className="flex justify-start items-center gap-2">
                      <Subtitles fontSize="small" />
                      <span>English [Auto], Hindi [Auto]</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className={cn("tutorial-description", "w-full space-y-4")}>
            <Card className="bg-card">
              <CardHeader>
                <ContentSectionHeader className="leading-tight">
                  Web Development Masterclass - Online Certification Course
                </ContentSectionHeader>
              </CardHeader>
              <CardContent>
                <TutorialStats />
              </CardContent>
            </Card>
            <Card className="bg-card">
              <CardContent className="p-4 space-y-5">
                <ContentSectionHeader>
                  Explore related topics
                </ContentSectionHeader>
                <div className="flex flex-wrap gap-3">
                  {related_topics.map((topic, i) => (
                    <Link href={""} key={i}>
                      <Badge
                        className={cn(
                          "md:px-5 px-4 md:h-12 h-10",
                          "md:text-base text-sm font-normal rounded-full hover:bg-lightAccent/60"
                        )}
                      >
                        {topic}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </CardContent>
              <CardContent className="pt-4 space-y-4">
                <CourseSyllabus />
                <CourseFeatures />
                <ContentTimestamps />
                <CourseRequirements requirements={requirements} />
                <CourseDescription />
                <InstructorInfo />
                <CourseRating />
              </CardContent>
            </Card>
          </div>
        </div>
        <div className={cn("w-full", "space-y-3")} id="similar-products">
          <CourseSuggestions />
        </div>
      </section>
    </main>
  );
}
