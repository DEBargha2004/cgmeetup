import capitalize from "./capitalize";

export default function getFormattedTitleFromId(id: string) {
  return id
    .split("-")
    .map((word) => capitalize(word))
    .join(" ");
}
