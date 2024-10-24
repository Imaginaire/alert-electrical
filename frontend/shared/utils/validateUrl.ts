export default function validateUrl(expectedUrl: string, actualUrl: string) {
  if (expectedUrl !== actualUrl) {
    return false
  }
  return true
}
