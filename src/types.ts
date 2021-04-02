/**
 * Contains only shared typescript definitions.
 */

export interface InputData {
  id: string
  method: 'get' | 'put' | 'post' | 'delete' | 'patch'
  url: string
  payload?: string
  headers?: { [x: string]: string }
  scheduleTime: string
}
