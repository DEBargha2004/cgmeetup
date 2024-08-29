export default function CoursePage({
  params: { id }
}: {
  params: { id: string };
}) {
  return <h1>{id}</h1>;
}
