import { Transform } from 'class-transformer'

export const ToDateFormatString = () => Transform(({ value }) => convertToDateFormatString(value))

const convertToDateFormatString = (value: any): null | string => {
  if (!value) {
    return null
  }

  if (typeof value === 'number') {
    value = value.toString()
  }

  return `${value.substring(0, 4)}-${value.substring(4, 6)}-${value.substring(6, 8)}`
}
