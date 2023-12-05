import { Transform } from 'class-transformer'

export const ToPhoneFormat = () => Transform(({ value }) => convertToPhoneFormatString(value))

const convertToPhoneFormatString = (value: any): null | string => {
  if (value == null) {
    return null
  }

  if (typeof value === 'number') {
    value = value.toString()
  }

  return value.replaceAll('-', '')
}
