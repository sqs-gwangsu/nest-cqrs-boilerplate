import { CodeUtil } from '@/common/utils/code.util'

describe('CodeUtil', function () {
  describe('generateNumberString', function () {
    it('should only number', function () {
      expect(CodeUtil.generateNumberString(100)).toMatch(/^[0-9]{100}$/)
    })
  })

  describe('generateHex', function () {
    it('should hex', function () {
      expect(CodeUtil.generateHex(100)).toMatch(/^[0-9A-F]{100}$/)
      expect(CodeUtil.generateHex(100)).toMatch(/[0-9]/)
      expect(CodeUtil.generateHex(100)).toMatch(/[A-F]/)
      expect(CodeUtil.generateHex(100)).not.toMatch(/[a-z]/)
      expect(CodeUtil.generateHex(100)).not.toMatch(/[G-Z]/)
    })
  })
})
