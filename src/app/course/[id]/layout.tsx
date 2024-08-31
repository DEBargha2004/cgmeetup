export default function Layout({
  children,
  params: { id }
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  return <>{children}</>;
}
