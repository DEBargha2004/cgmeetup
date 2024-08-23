import { ProfileInfoOverView } from "@/components/custom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThumbDown, ThumbUp } from "@mui/icons-material";

export default function Page() {
  return (
    <Card className="border-none bg-transparent">
      <CardHeader>
        <CardTitle></CardTitle>
      </CardHeader>
      <CardContent>
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
                      <span className="lg:text-base text-xs">Recommended</span>
                    </p>
                    <p className="lg:text-base text-sm">Very Nice Product</p>
                  </div>
                }
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
