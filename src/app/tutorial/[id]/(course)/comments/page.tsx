import Comment from "@/components/custom/post/_components/comment";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function Comments({
  params: { id }
}: {
  params: { id: string };
}) {
  return (
    <section className="space-y-10">
      <div>
        {Array.from({ length: 4 }).map((_, i) => (
          <Comment key={i} showNestedComments />
        ))}
      </div>
      <div className="flex flex-col items-end justify-start gap-2">
        <Textarea />
        <Button>Comment</Button>
      </div>
    </section>
  );
}
