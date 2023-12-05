export class LoggingUtil {
  static toMessage(messages: any[]): string {
    return messages.map(this.convertString).join(' ')
  }

  private static convertString(message: any): string {
    if (typeof message === 'string') {
      return message
    }
    if (typeof message === 'number') {
      return `${message}`
    }
    if (typeof message === 'object') {
      return JSON.stringify(message, null, 2)
    }
    return (message || '').toString()
  }
}
