export const getFormattedIdFromTitle = (title: string) => {
  return title.replaceAll(" ", "-").toLowerCase();
};
