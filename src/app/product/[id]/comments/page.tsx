import Comment from "@/components/custom/post/_components/comment";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export default function Page() {
  return (
    <Card className="bg-transparent border-none">
      <CardHeader>
        <CardTitle></CardTitle>
      </CardHeader>
      <CardContent>
        {Array.from({ length: 2 }).map((_, i) => (
          <Comment key={i} showNestedComments />
        ))}
        <div className="flex flex-col items-end justify-start gap-2">
          <Textarea />
          <Button>Post</Button>
        </div>
      </CardContent>
    </Card>
  );
}
