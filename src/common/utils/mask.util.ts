import { MaskingTypeEnum } from '@/common/type/common.type'

export class MaskUtil {
  static mask(type: string, str: string | undefined) {
    if (str === undefined) {
      return ''
    }
    let username: string = ''
    let maskedUsername: string
    switch (type) {
      case MaskingTypeEnum.EMAIL:
        const atIndex = str.indexOf('@')
        if (atIndex >= 0) {
          username = str.substring(0, atIndex)
          maskedUsername =
            username.length > 3 ? username.slice(0, -3) + '***' : username.slice(0, -1) + '*'
          const domain = str.substring(atIndex)
          str = maskedUsername + domain
        }
        break
      case MaskingTypeEnum.ACCOUNT_ID:
        username = str.substring(0, str.length)
        maskedUsername =
          username.length > 3 ? username.slice(0, -3) + '***' : username.slice(0, -1) + '*'
        str = maskedUsername
        break
      case MaskingTypeEnum.NAME:
        username = str.substring(0, str.length)
        maskedUsername =
          username.length > 3 ? username.slice(0, -3) + '***' : username.slice(0, -1) + '*'
        str = maskedUsername
        break
    }

    return str
  }
}
