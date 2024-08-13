import { ProfileInfoOverView } from "@/components/custom";
import Comment from "@/components/custom/post/_components/comment";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { tags } from "@/constants/job-filters";
import { SellOutlined, ThumbDown, ThumbUp } from "@mui/icons-material";

export default function ProductDescription() {
  return (
    <Card className="bg-card p-4 h-fit">
      <Tabs defaultValue="details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="comments">Comments (2)</TabsTrigger>
          <TabsTrigger value="reviews">Reviews (2)</TabsTrigger>
        </TabsList>
        <div className="ml-4">
          <TabsContent value="details">
            <Card className="bg-transparent border-none">
              <CardHeader className="px-0">
                <CardTitle className="text-lg">Description</CardTitle>
              </CardHeader>
              <CardContent className="px-0">
                <CardDescription className="text-white opacity-70 font-extralight text-sm">
                  The XPeng X2 is a fifth generation eVTOL multicopter aircraft
                  which holds two passengers, has eight propellers, eight
                  electric motors, powered by batteries, has a maximum speed of
                  130 kp/h (81 mph) and a flight time of 35 minutes. The
                  aircraft is flown autonomously, has fixed-skid type landing
                  gear and has been made specifically for Urban Air Mobility
                  (UAM).
                </CardDescription>
                <div className="mt-6 flex flex-wrap gap-2">
                  <SellOutlined fontSize="small" className="mr-4" />
                  {tags.map((tag, tag_idx) => (
                    <Badge key={tag_idx}>{tag}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="comments" className="space-y-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <Comment key={i} showNestedComments />
            ))}
            <div className="flex flex-col items-end justify-start gap-2">
              <Textarea />
              <Button>Post</Button>
            </div>
          </TabsContent>
          <TabsContent value="reviews">
            <div className="flex justify-between py-3 px-1 border-b-2 border-primary w-[300px]">
              <h3 className="lg:text-lg text-base">Item rating</h3>
              <div className="flex justify-start items-center gap-5">
                <div className="flex justify-start items-center gap-2">
                  <ThumbUp fontSize="small" className="text-primary" />
                  <span>3</span>
                </div>
                <div className="flex justify-start items-center gap-2 opacity-70">
                  <ThumbDown fontSize="small" />
                  <span>0</span>
                </div>
              </div>
            </div>
            <div className="py-3 space-y-4">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i}>
                  <ProfileInfoOverView
                    textContainer="w-full "
                    content={
                      <div className="p-4 flex flex-col gap-3 justify-start items-start border rounded-sm w-full mt-3">
                        <p className="flex justify-start items-center gap-2">
                          <ThumbUp
                            fontSize="small"
                            className="h-5 w-5 text-primary"
                          />
                          <span className="lg:text-base text-xs">
                            Recommended
                          </span>
                        </p>
                        <p className="lg:text-base text-sm">
                          Very Nice Product
                        </p>
                      </div>
                    }
                  />
                </div>
              ))}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </Card>
  );
}
