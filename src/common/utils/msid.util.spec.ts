import { MsidUtil } from '@/common/utils/msid.util'

describe('MsidUtil', function () {
  describe('generateMsid', function () {
    it('length should be 6', function () {
      const result = MsidUtil.generateMsid()
      expect(result).toHaveLength(6)
    })
  })
})
