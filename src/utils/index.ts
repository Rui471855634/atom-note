import dayjs, { Dayjs } from 'dayjs'
import { platform } from '@/libs/ipc'

export function getDateTime(): string
export function getDateTime(date: Dayjs): string
export function getDateTime(format: string): string
export function getDateTime(date: Dayjs, format: string): string
export function getDateTime(arg1?: Dayjs | string, arg2: string = 'YYYY-MM-DD HH:mm:ss:ms') {
  if (!arg1) {
    return dayjs().format(arg2)
  } else if (typeof arg1 === 'string') {
    return dayjs().format(arg1)
  } else {
    return arg1.format(arg2)
  }
}

export const isNewUser = () => {
  const isNewUser = localStorage.getItem('isNewUser_0.0.1-beta.1') ? false : true
  if (isNewUser) {
    localStorage.setItem('isNewUser_0.0.1-beta.1', 'true')
  }
  return isNewUser
}

export const ctrlName = platform === 'mac' ? 'Command' : 'Ctrl'
