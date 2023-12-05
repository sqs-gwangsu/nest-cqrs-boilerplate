import { v1, v4 } from 'uuid'
import crypto from 'crypto'
import { DateUtil } from '@/common/utils/date.util'

const crcTable = (function () {
  let c
  let crcTable = []
  for (let n = 0; n < 256; n++) {
    c = n
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    }
    crcTable[n] = c
  }
  return crcTable
})()

export class CodeUtil {
  static generateBigInt(): string {
    const date = new Date()
    const yymmdd = DateUtil.yymmdd(date)
    const timeString = `${Math.floor((+date - +DateUtil.today()) / 1000)}`.padStart(5, '0')
    const msTime = `${Math.floor(process.hrtime()[1] / 1000)}`.padStart(6, '0')
    const random = CodeUtil.generateNumberString(2)

    return `${yymmdd}${timeString}${msTime}${random}`
  }

  static to62(number: number): string {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    let result = ''
    let quotient = Math.abs(number)

    do {
      result = chars.charAt(quotient % 62) + result
      quotient = Math.floor(quotient / 62)
    } while (quotient > 0)

    if (number < 0) {
      result = '-' + result
    }

    return result
  }

  static uuid(option?: { version?: '1' | '4' | 1 | 4; removeHyphen?: boolean }) {
    const version: number = Number(option?.version) || 4
    const removeHyphen = option?.removeHyphen || true

    let value
    switch (version) {
      case 1:
        value = v1()
        break
      case 4:
        value = v4()
        break
      default:
        throw Error('uuid version')
    }

    return removeHyphen ? value.replace(/-/g, '') : value
  }

  static uuidV1(exceptHyphen: boolean = true): string {
    const uuid: string = v1({})
    return exceptHyphen ? uuid.replace(/-/g, '') : uuid
  }

  static removeHyphen(value: string) {
    return value.replace(/-/g, '').trim()
  }

  static generateBinary(length: number): string {
    const characters = '01'
    const charactersLength = characters.length
    return Array.from({ length })
      .map(() => characters.charAt(Math.floor(Math.random() * charactersLength)))
      .join('')
  }

  static generateInt(): number {
    return Math.floor(Math.random() * 2 ** 32)
  }

  static generateNumberString(length: number): string {
    const characters = '0123456789'
    const charactersLength = characters.length
    return Array.from({ length })
      .map(() => characters.charAt(Math.floor(Math.random() * charactersLength)))
      .join('')
  }

  static generateHex(length: number): string {
    const characters = '0123456789ABCDEF'
    const charactersLength = characters.length

    return Array.from({ length })
      .map(() => characters.charAt(Math.floor(Math.random() * charactersLength)))
      .join('')
  }

  static generateCode(length: number, ignoreCase = true): string {
    const characters = ignoreCase
      ? '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      : '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    const charactersLength = characters.length

    return Array.from({ length })
      .map(() => characters.charAt(Math.floor(Math.random() * charactersLength)))
      .join('')
  }

  static encrypt(text: string, key: string, iv: string) {
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv)
    let result = cipher.update(text, 'utf8', 'base64')
    result += cipher.final('base64')
    return result
  }

  static decrypt(text: string, key: string, iv: string) {
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv)
    let result = decipher.update(text, 'base64', 'utf8')
    result += decipher.final('utf8')
    return result
  }

  static crc32(text: string): number {
    if (!text) {
      return 0
    }
    let crc = 0 ^ -1

    for (let i = 0; i < text.length; i++) {
      crc = (crc >>> 8) ^ crcTable[(crc ^ text.charCodeAt(i)) & 0xff]
    }

    return (crc ^ -1) >>> 0
  }
}
