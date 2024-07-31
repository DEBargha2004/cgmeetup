export const getFormattedUrlFromTitle = (title: string) => {
  return title.replaceAll(' ', '-').toLowerCase()
}
