import { Transform } from 'class-transformer'

export const ToBooleanString = () => Transform(({ value }) => convertToBooleanString(value))

const convertToBooleanString = (value: any): null | string => {
  if (value == null) {
    return null
  }

  return value.toString()
}
