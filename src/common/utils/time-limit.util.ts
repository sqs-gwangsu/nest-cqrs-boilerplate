export class TimeLimitUtil {
  static isRequiredMinutesOver(standardMinute: number, standardDate: Date) {
    const now = new Date()
    const diffTime = (now.getTime() - standardDate.getTime()) / (1000 * 60)
    return diffTime > standardMinute
  }
}
