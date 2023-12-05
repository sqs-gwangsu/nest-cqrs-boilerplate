export type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K
}[keyof T]

// 함수 제외
export type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>

// 클래스 선언
export type ClassType<T> = { new (...args: any): T }

export type Nullable<T> = T | null
export type Optional<T> = T | undefined

export type BrandString<T extends string> = string & { _brand: T }
export type BrandNumber<T extends string> = number & { _brand: T }

export type UnsignedNumber = BrandNumber<'UnSignedNumber'>

export type OptionalRecord<T extends {}> = {
  [Key in keyof T]: Optional<T[Key]>
}

export type PickOne<T extends Record<any, any>> = {
  [P in keyof T]: Record<P, T[P]> & Partial<Record<Exclude<keyof T, P>, undefined>>
}[keyof T]

export const assertNever = (param: never) => {
  throw Error('never')
}
