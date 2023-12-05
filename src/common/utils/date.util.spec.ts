import { DateUtil } from '@/common/utils/date.util'

describe('DateUtil', function () {
  describe('format', function () {
    it('should ', function () {
      const date = new Date('1994-11-22 10:20:30:080')

      const result = '19941122102030080'
      const expected = DateUtil.format(date, 'yyyyMMddHHmmssSSS')

      expect(result).toStrictEqual(expected)
    })
  })
})
