import { Transform } from 'class-transformer'

export const ToBooleanNumber = () => Transform(({ value }) => convertToBooleanNumber(value))

const convertToBooleanNumber = (value: any): null | number => {
  if (value == null) {
    return null
  }

  return +value
}
