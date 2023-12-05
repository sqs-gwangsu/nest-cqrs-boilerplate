export class MsidUtil {
  static generateRandomStr(num: number): string {
    let result = ''
    const characters = 'abcdefghijklmnopqrstuvwxyz1234567890'
    const charactersLength = characters.length - 1
    for (let i = 0; i < num; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }

    return result
  }

  static generateMsid(): string {
    const prefix = this.generateRandomStr(1)
    const suffix = this.generateRandomStr(5)
    return prefix + suffix
  }
}
