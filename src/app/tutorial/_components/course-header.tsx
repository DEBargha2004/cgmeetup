import StarRating from "@/components/custom/star-rating";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Info, Language, Subtitles } from "@mui/icons-material";
import Link from "next/link";

export default function CourseHeader() {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink>Development</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>Web Development</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Frontend</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-4xl font-bold leading-tight">
        Web Development Masterclass - Online Certification Course
      </h1>
      <h3 className="text-xl font-semibold">
        Cloud Computing | Web Apps | Linux | Web Servers | DBMS | LAMP Stack |
        HTML | CSS | JavaScript | PHP | + More
      </h3>
      <div className="flex justify-start items-center gap-2 [&>*]:text-lg ">
        <span className="text-golden font-semibold">4.4</span>
        <div className="relative bottom-0.5">
          <StarRating
            numberOfStars={5}
            rating={4.4}
            starDimension="18px"
            starSpacing="1px"
          />
        </div>
        <Link href={""}>
          <span className="hover:text-primary underline underline-offset-4">
            (9,009 ratings)
          </span>
        </Link>
        <span>45,000 students</span>
      </div>
      <p>
        Created by{" "}
        <Link href={""}>
          <span className="hover:text-primary underline underline-offset-2">
            Ransomware group
          </span>
        </Link>
      </p>
      <div className="flex justify-start items-center gap-2 [&>span]:text-base">
        <Info fontSize="small" />
        <span>Last updated 9/2022</span>
        <Language fontSize="small" />
        <span>English</span>
        <Subtitles fontSize="small" />
        <span>English [Auto], Hindi [Auto]</span>
      </div>
    </>
  );
}
