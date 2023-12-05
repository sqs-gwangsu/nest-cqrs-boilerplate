import * as dateFns from 'date-fns'
import { Nullable, Optional } from '@/common/utils/type.util'

export class DateUtil {
  static SECOND = 1000
  static MINUTE = 60 * 1000
  static HOUR = 60 * 60 * 1000
  static DAY = 24 * 60 * 60 * 1000

  static format(date: Date): string
  static format(format: string): string
  static format(date: Date, format: string): string
  static format(date: Date | string, format?: string): string {
    ;[date, format] =
      typeof date === 'string' ? [new Date(), date] : [date, format || 'yyyy-MM-dd HH:mm:ss']

    return dateFns.format(date, format)
  }

  static yymmdd(date: Date = new Date()): string {
    return this.format(date, 'yyMMdd')
  }

  static today(): Date {
    const date = new Date()
    return this.toStartAtDay(date)
  }

  static afterDay(day: number, date?: Date): Date {
    date = date ? this.toStartAtDay(date) : this.today()

    date.setDate(date.getDate() + day)
    return date
  }

  static isBetween(startDate: Date, endDate: Date, current: Date = new Date()) {
    return +current >= +startDate && +current <= +endDate
  }

  static diff(t1: Date, t2: Date = new Date()) {
    return Math.abs(t2.getTime() - t1.getTime())
  }

  static toStartAtDay(date: Date): Date {
    const result = new Date(date)
    result.setHours(0)
    result.setMinutes(0)
    result.setSeconds(0)
    result.setMilliseconds(0)
    return result
  }

  static addDays(day: number, date?: Date) {
    date = date || new Date()
    date.setDate(date.getDate() + day)
    return date
  }

  static fromString(dateString: Optional<string>): Nullable<Date> {
    if (!dateString) {
      return null
    }
    const date = new Date(dateString)
    if (Number.isNaN(date.getTime())) {
      return null
    }

    return date
  }
}
