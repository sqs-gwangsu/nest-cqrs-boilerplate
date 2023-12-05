export class SmsUtil {
  static getSmsType(body: string) {
    if (this.getStringByteSize(body) > 90) {
      return 'lms'
    } else {
      return 'sms'
    }
  }

  static getStringByteSize(str: string) {
    if (str == null) {
      return 0
    }

    let byteSize = 0

    for (let i = 0; i < str.length; i++) {
      const charCode = str.charCodeAt(i)

      if (charCode < 0x80) {
        byteSize += 1
      } else if (charCode < 0x800) {
        byteSize += 2
      } else if (charCode < 0xd800 || charCode >= 0xe000) {
        byteSize += 3
      } else {
        byteSize += 4
        i++
      }
    }

    return byteSize
  }
}
