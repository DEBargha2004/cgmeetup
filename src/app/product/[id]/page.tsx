import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import _ from "lodash";
import { tags } from "@/constants/job-filters";
import ImageTag from "@/components/custom/post/_components/image-tag";
import profile from "@/../public/images/profile-1.jpg";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <Card className="bg-transparent border-none">
      <CardHeader className="px-0">
        <CardTitle className="text-lg">Description</CardTitle>
      </CardHeader>
      <CardContent className="px-0 space-y-6">
        <CardDescription className="text-white opacity-70 font-extralight text-sm">
          The XPeng X2 is a fifth generation eVTOL multicopter aircraft which
          holds two passengers, has eight propellers, eight electric motors,
          powered by batteries, has a maximum speed of 130 kp/h (81 mph) and a
          flight time of 35 minutes. The aircraft is flown autonomously, has
          fixed-skid type landing gear and has been made specifically for Urban
          Air Mobility (UAM).
        </CardDescription>
        <div>
          <span className="text-lg">Category : </span>
          <span>3D Models</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <CardTitle className="text-lg">Software : </CardTitle>
          {/* <SellOutlined fontSize="small" className="mr-4" /> */}
          {tags.slice(0, 5).map((tag, tag_idx) => (
            <ImageTag key={tag_idx} title={tag} image={profile} />
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <CardTitle className="text-lg">Tags : </CardTitle>
          {/* <SellOutlined fontSize="small" className="mr-4" /> */}
          {tags.map((tag, tag_idx) => (
            <Badge key={tag_idx}>{tag}</Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
