/**
 *
 * @returns {string} The base URL of the application
 * @TODO - Update to correct env variable
 */

export default function getBaseUrl(): string {
  return process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
}
