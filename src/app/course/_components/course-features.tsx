import { IconType } from "@/types/icon";
import ContentSectionHeader from "./content-section-header";
import {
  DesktopWindows,
  DownloadForOffline,
  EmojiEvents,
  Smartphone
} from "@mui/icons-material";
import { HTMLProps } from "react";
import { cn } from "@/lib/utils";

const features: { Icon: IconType; label: string }[] = [
  {
    Icon: DesktopWindows,
    label: "26 hours on-demand video"
  },
  {
    Icon: Smartphone,
    label: "Access on mobile and TV"
  },
  {
    Icon: DownloadForOffline,
    label: "2 downloadable resources"
  },
  {
    Icon: EmojiEvents,
    label: "Certificate of completion"
  }
];

export default function CourseFeatures({
  className,
  ...props
}: HTMLProps<HTMLDivElement> & {}) {
  return (
    <section className={cn("space-y-5", className)} {...props}>
      <ContentSectionHeader>This course includes:</ContentSectionHeader>
      <div className="grid md:grid-cols-2 gap-4">
        {features.map((f, idx) => (
          <p className="flex justify-start items-center gap-5" key={idx}>
            <f.Icon fontSize="small" />
            <span className="opacity-70">{f.label}</span>
          </p>
        ))}
      </div>
    </section>
  );
}
