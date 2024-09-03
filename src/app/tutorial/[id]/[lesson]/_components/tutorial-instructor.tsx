import ContentSectionHeader from "@/app/tutorial/_components/content-section-header";
import { AddFriend, ProfileInfoOverView } from "@/components/custom";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { HTMLProps } from "react";

export default function TutorialInstructor({
  className,
  ...props
}: HTMLProps<HTMLDivElement>) {
  return (
    <section className={cn("space-y-4", className)} {...props}>
      <ContentSectionHeader>Instructors</ContentSectionHeader>
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <ProfileInfoOverView
            key={i}
            descriptionValue=""
            titleValue=""
            textContainer="justify-center"
            className="w-fit space-x-3"
            content={
              <div>
                <p>
                  by{" "}
                  <Link href={""}>
                    <strong>Envar Studio</strong>
                  </Link>{" "}
                  — Industry leading visual development studio
                </p>
              </div>
            }
          >
            <AddFriend
              isFriend={false}
              className="h-7 w-7 [&>svg]:text-base my-auto cursor-pointer"
            />
          </ProfileInfoOverView>
        ))}
      </div>
    </section>
  );
}
