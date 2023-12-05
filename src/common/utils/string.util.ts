export class StringUtil {
  static camelize(str: string) {
    return str
      .split('_')
      .map((t, i) => {
        if (i === 0) {
          return t
        }

        return (t[0] || '').toUpperCase() + t.slice(1)
      })
      .join('')
  }

  /**
   * 양끝 공백 제거
   * 공백 2칸 이상 -> 한칸으로 변경
   * 한글 사이에 공백은 제거
   * @param name
   */
  static removeBlank(name: string) {
    return name
      .trim()
      .replace(/\s{2,}/g, ' ')
      .replace(/\s*([가-힣])\s*([가-힣])/g, '$1$2')
  }
}
