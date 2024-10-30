export const formatTitleAsHandle = (title: string) => {
  return title.toLowerCase().replace(/\s+/g, '-').trim()
}
