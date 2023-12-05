export class EnumUtil {
  /**
   * get enum values except not
   */
  static except<T>(enumType: Record<string, T>, not: T[]): T[] {
    return Object.values(enumType).filter((value) => !not.includes(value))
  }

  static isIn<T>(enumType: Record<string, T>, item: any): item is T {
    const valueList: string[] = Object.values(enumType) as string[]

    return valueList.includes(item)
  }
}
