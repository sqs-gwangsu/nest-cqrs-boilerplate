import { UnsignedNumber } from '@/common/utils/type.util'

export class NumberUtil {
  static abs(value: number): UnsignedNumber {
    return Math.abs(value) as UnsignedNumber
  }
}
