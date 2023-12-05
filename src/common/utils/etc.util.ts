export class EtcUtil {
  static encodeBase64(text: string): string {
    return Buffer.from(text).toString('base64')
  }
}
