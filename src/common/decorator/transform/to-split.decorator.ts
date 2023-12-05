import { Transform } from 'class-transformer'

export const ToSplit = (separator = ',') =>
  Transform(({ value }: { value: string }) => value.split(separator).map((t: string) => t.trim()))
