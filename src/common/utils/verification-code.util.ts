export class VerificationCodeUtil {
  static generateRandomStr(num: number): string {
    let result = ''
    const characters = '1234567890'
    const charactersLength = characters.length - 1
    for (let i = 0; i < num; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }

    return result
  }

  static generateCode(): string {
    return this.generateRandomStr(6)
  }
}
