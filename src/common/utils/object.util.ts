import { StringUtil } from '@/common/utils/string.util'
import { ArrayUtil } from '@/common/utils/array.util'

export class ObjectUtil {
  static toCamel(o: any): any {
    let newO: any, origKey, newKey, value
    if (o instanceof Array) {
      return o.map((value) => {
        if (typeof value === 'object') {
          value = ObjectUtil.toCamel(value)
        }
        return value
      })
    } else {
      newO = {}
      for (origKey in o) {
        if (o.hasOwnProperty(origKey)) {
          // newKey = (origKey.charAt(0).toLowerCase() + origKey.slice(1) || origKey).toString()
          newKey = StringUtil.camelize(origKey)
          value = o[origKey]
          if (value instanceof Array || (value !== null && value.constructor === Object)) {
            value = ObjectUtil.toCamel(value)
          }
          newO[newKey] = value
        }
      }
    }
    return newO
  }

  static parseDotNotation(obj: any): object {
    const result = {}

    // For each object path (property key) in the object
    for (const objectPath in obj) {
      // Split path into component parts
      const parts = objectPath.split('.')

      // Create sub-objects along path as needed
      let target: any = result
      while (parts.length > 1) {
        const part = parts.shift() as any
        target = target[part] = target[part] || {}
      }

      // Set value at end of path
      target[parts[0]] = obj[objectPath]
    }

    return result
  }

  static isEqual(t1: Record<string, any>, t2: Record<string, any>) {
    if (!ArrayUtil.isSame(Object.keys(t1), Object.keys(t2), false)) {
      return false
    }

    return Object.keys(t1).every((key: string) => t1[key] === t2[key])
  }

  static removeEmpty<T extends Record<string, any>>(obj: T): Partial<T> {
    let newObj: Partial<T> = {}
    Object.keys(obj).forEach((key: keyof T) => {
      if (obj[key] === Object(obj[key])) {
        newObj[key] = this.removeEmpty(obj[key]) as any
      } else if (obj[key] !== undefined) {
        newObj[key] = obj[key]
      }
    })
    return newObj
  }

  static isAllElementsEmptyStrings(obj: any) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key) && typeof obj[key] === 'string' && obj[key].trim() === '') {
        return false
      }
    }
    return true
  }

  static filter<T extends Record<string, any>>(
    obj: T,
    filter?: (key: keyof T) => boolean,
  ): Partial<T> {
    filter = filter || ((key: keyof T) => obj[key] !== undefined)

    return Object.keys(obj)
      .filter(filter)
      .reduce((acc, key) => {
        acc[key as keyof T] = obj[key]
        return acc
      }, {} as T)
  }
}
