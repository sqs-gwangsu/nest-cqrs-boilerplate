type BasicType = number | string | boolean | null

export type Cacheable = {
  [Key in string]: BasicType | BasicType[] | Cacheable | Cacheable[]
}
