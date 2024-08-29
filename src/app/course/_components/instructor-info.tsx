import { cn } from "@/lib/utils";
import { HTMLProps } from "react";
import ContentSectionHeader from "./content-section-header";
import Link from "next/link";
import Collabsible, {
  CollapsibleButton,
  CollapsibleButtonLabel,
  CollapsibleContainer,
  CollapsibleContainerOverflowCover
} from "./collapsible";
import Image from "next/image";
import profile from "@/../public/images/profile-1.jpg";
import { IconType } from "@/types/icon";
import { MilitaryTech, PeopleAlt, PlayCircle, Star } from "@mui/icons-material";

export default function InstructorInfo({
  className,
  ...props
}: HTMLProps<HTMLDivElement>) {
  return (
    <section className={cn("space-y-5")} {...props}>
      <ContentSectionHeader>Instructor</ContentSectionHeader>
      <Collabsible>
        <CollapsibleContainer collapsedHeight={300} className="space-y-4">
          <div className="space-y-1">
            <Link href={""}>
              <h2 className="text-primary text-2xl underline underline-offset-4">
                Dr. John Doe
              </h2>
            </Link>
            <p className="text-lg opacity-70">Developer and Lead Instructor</p>
          </div>
          <div className="grid grid-cols-[130px_1fr] gap-4">
            <div className="w-full aspect-square">
              <Image
                src={profile}
                alt="profile"
                width={100}
                height={100}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="space-y-2">
              <AchievmentContainer>
                <Star fontSize="small" />
                <span>4.7 Instructor Rating</span>
              </AchievmentContainer>
              <AchievmentContainer>
                <MilitaryTech fontSize="small" />
                <span>868,240 Reviews</span>
              </AchievmentContainer>
              <AchievmentContainer>
                <PeopleAlt fontSize="small" />
                <span>2,848,106 Students</span>
              </AchievmentContainer>
              <AchievmentContainer>
                <PlayCircle fontSize="small" />
                <span>7 Courses</span>
              </AchievmentContainer>
            </div>
          </div>
          <article>
            I'm Angela, I'm a developer with a passion for teaching. I'm the
            lead instructor at the London App Brewery, London's leading
            Programming Bootcamp. I've helped hundreds of thousands of students
            learn to code and change their lives by becoming a developer. I've
            been invited by companies such as Twitter, Facebook and Google to
            teach their employees. My first foray into programming was when I
            was just 12 years old, wanting to build my own Space Invader game.
            Since then, I've made hundred of websites, apps and games. But most
            importantly, I realised that my greatest passion is teaching. I
            spend most of my time researching how to make learning to code fun
            and make hard concepts easy to understand. I apply everything I
            discover into my bootcamp courses. In my courses, you'll find lots
            of geeky humour but also lots of explanations and animations to make
            sure everything is easy to understand. I'll be there for you every
            step of the way.
          </article>
          <CollapsibleContainerOverflowCover className="from-darkAccent" />
        </CollapsibleContainer>
        <CollapsibleButton
          variant={"ghost"}
          className="hover:bg-transparent px-0"
        >
          <CollapsibleButtonLabel />
        </CollapsibleButton>
      </Collabsible>
    </section>
  );
}

function AchievmentContainer({ children }: { children?: React.ReactNode }) {
  return (
    <div
      className={cn(
        "flex justify-start items-center gap-4",
        "[&>span]:text-sm [&>span]:opacity-70"
      )}
    >
      {children}
    </div>
  );
}
