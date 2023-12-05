import { Transform } from 'class-transformer'

export const ToDate = () => Transform(({ value }) => convertDate(value))

const convertDate = (value: any): null | Date => {
  if (value == null) {
    return null
  }

  if (typeof value === 'string' && !!+value) {
    value = +value
  }

  if (typeof value === 'number') {
    return new Date(value > 10000000000 ? value : value * 1000) || null
  }

  if (!!+value) {
    return new Date(+value) || null
  }

  return new Date(value) || null
}
