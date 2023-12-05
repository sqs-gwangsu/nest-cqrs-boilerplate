import { QvValidationException } from '@/shared/exception/exception/qv.validation.exception'
import { ArrayUtil } from '@/common/utils/array.util'
import { DateUtil } from '@/common/utils/date.util'

type ValueType<T> = Record<string, T>

const check = <T,>(
  valueRecord: ValueType<T>,
  validator: (param: { name: string; value: T }) => boolean,
  message: (param: { name: string; value: T }) => string,
) => {
  const failColumn = Object.keys(valueRecord).find(
    (columnName) =>
      !validator({
        name: columnName,
        value: valueRecord[columnName],
      }),
  )

  if (!failColumn) {
    return
  }

  throw new QvValidationException({
    [failColumn]: message({
      value: valueRecord[failColumn],
      name: failColumn,
    }),
  })
}

export class QvAssert {
  static min(value: ValueType<number>, min: number) {
    check(
      value,
      ({ value }) => value >= min,
      ({ name }) => `${name} must not be less than ${min}`,
    )
  }

  static max(value: ValueType<number>, max: number) {
    check(
      value,
      ({ value }) => value <= max,
      ({ name }) => `${name} must not be greater than ${max}`,
    )
  }

  static range(value: ValueType<number>, min: number, max?: number) {
    min != null && this.min(value, min)
    max != null && this.max(value, max)
  }

  static divisionBy(value: ValueType<number>, num: number) {
    check(
      value,
      ({ value }) => value % num === 0,
      ({ name }) => `${name} must be divisible by ${num}`,
    )
  }

  static minLength(value: ValueType<string>, min: number) {
    check(
      value,
      ({ value }) => value.length >= min,
      ({ name }) => `${name} must be longer than or equal to ${min} characters`,
    )
  }

  static maxLength(value: ValueType<string>, max: number) {
    check(
      value,
      ({ value }) => value.length <= max,
      ({ name }) => `${name} must be shorter than or equal to ${max} characters`,
    )
  }

  static stringLength(value: ValueType<string>, min: number, max?: number) {
    min != null && this.minLength(value, min)
    max != null && this.maxLength(value, max)
  }

  static arrayUnique(value: ValueType<string[] | number[]>) {
    check(
      value,
      ({ value }) => ArrayUtil.isUnique(value as string[]),
      ({ name, value }) => `All ${name}'s elements must be unique`,
    )
  }

  static arrayLength(value: ValueType<any[]>, min: number, max?: number) {
    min != null &&
      check(
        value,
        ({ value }) => value.length >= min,
        ({ name, value }) => `${name} must contain at least ${min} elements`,
      )

    max != null &&
      check(
        value,
        ({ value }) => value.length <= max,
        ({ name, value }) => `${name} must contain not more than ${max} elements`,
      )
  }

  static notNull(value: ValueType<any>) {
    check(
      value,
      ({ value }) => value != null,
      ({ name, value }) => `${name} should not be null or undefined`,
    )
  }

  static isTruthy(value: ValueType<any>) {
    check(
      value,
      ({ value }) => Boolean(value),
      ({ name, value }) => `${name} should not be null or undefined`,
    )
  }

  static minDate(value: ValueType<Date>, minDate: Date) {
    check(
      value,
      ({ value }) => Number(value) >= Number(minDate),
      ({ name }) => `minimal allowed date for ${name} is ${DateUtil.format(minDate)}`,
    )
  }

  static maxDate(value: ValueType<Date>, maxDate: Date) {
    check(
      value,
      ({ value }) => Number(value) <= Number(maxDate),
      ({ name }) => `maximal allowed date for ${name} is ${DateUtil.format(maxDate)}`,
    )
  }

  static dateBetween(value: ValueType<Date>, minDate: Date, maxDate: Date) {
    this.minDate(value, minDate)
    this.maxDate(value, maxDate)
  }

  static validPeriod(value: ValueType<[Date, Date]>) {
    check(
      value,
      ({ name, value: [startDate, endDate] }) => {
        return (
          !!+startDate &&
          startDate instanceof Date &&
          !!+endDate &&
          endDate instanceof Date &&
          +startDate <= +endDate
        )
      },
      ({ name }) => `invalid period`,
    )
  }

  static isValid(value: ValueType<any>, isValid: boolean) {
    check(
      value,
      () => isValid,
      () => `invalid value`,
    )
  }

  static includes<T = number | string>(value: ValueType<T>, list: T[]) {
    check(
      value,
      ({ name, value }) => {
        return list.includes(value)
      },
      ({ name, value }) => `${name} must be one of the following values: ${JSON.stringify(value)}`,
    )
  }
}
