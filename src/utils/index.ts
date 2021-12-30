import dayjs, { Dayjs } from 'dayjs'

// export function getDateTime(format:string = 'YYYY-MM-DD HH:mm:ss', date: Dayjs): string

export function getDateTime(): string
export function getDateTime(date: Dayjs): string
export function getDateTime(date: Dayjs, format: string): string
export function getDateTime(arg1?: Dayjs, arg2: string = 'YYYY-MM-DD HH:mm:ss') {
  if (!arg1) {
    return dayjs().format(arg2)
  } else if (typeof arg1 === 'string') {
    return dayjs().format(arg1)
  } else {
    return arg1.format(arg2)
  }
}
